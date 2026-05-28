import type { MetadataField } from "@/lib/metadataScanner";

const TIFF_TAGS: Record<number, string> = {
  0x010f: "Camera Make",
  0x0110: "Camera Model",
  0x0131: "Software",
  0x0132: "Modified Date",
  0x013b: "Artist",
  0x8298: "Copyright",
  0x8769: "EXIF Data",
  0x8825: "GPS Data",
};

const EXIF_TAGS: Record<number, string> = {
  0x9003: "Created Date",
  0x9004: "Digitized Date",
  0x9291: "Created Subseconds",
};

const GPS_TAGS: Record<number, string> = {
  0x0001: "GPS Latitude Ref",
  0x0002: "GPS Latitude",
  0x0003: "GPS Longitude Ref",
  0x0004: "GPS Longitude",
  0x0012: "GPS Map Datum",
  0x001d: "GPS Date Stamp",
};

function getRiskForField(field: string): MetadataField["risk"] {
  const normalized = field.toLowerCase();

  if (normalized.includes("gps") || normalized.includes("artist") || normalized.includes("copyright")) {
    return "High";
  }

  if (
    normalized.includes("camera") ||
    normalized.includes("software") ||
    normalized.includes("date") ||
    normalized.includes("time")
  ) {
    return "Medium";
  }

  return "Low";
}

function readAscii(view: DataView, offset: number, length: number) {
  const chars: string[] = [];
  for (let index = 0; index < length; index += 1) {
    const value = view.getUint8(offset + index);
    if (value !== 0) {
      chars.push(String.fromCharCode(value));
    }
  }
  return chars.join("").trim();
}

function readRational(view: DataView, offset: number, littleEndian: boolean) {
  const numerator = view.getUint32(offset, littleEndian);
  const denominator = view.getUint32(offset + 4, littleEndian);
  return denominator ? numerator / denominator : 0;
}

function readValue(view: DataView, tiffStart: number, entryOffset: number, littleEndian: boolean) {
  const type = view.getUint16(entryOffset + 2, littleEndian);
  const count = view.getUint32(entryOffset + 4, littleEndian);
  const valueOffset = entryOffset + 8;
  const dataOffset = count <= 4 ? valueOffset : tiffStart + view.getUint32(valueOffset, littleEndian);

  if (dataOffset < 0 || dataOffset >= view.byteLength) {
    return undefined;
  }

  if (type === 2) {
    return readAscii(view, dataOffset, count);
  }

  if (type === 3) {
    return view.getUint16(dataOffset, littleEndian).toString();
  }

  if (type === 4) {
    return view.getUint32(dataOffset, littleEndian).toString();
  }

  if (type === 5) {
    const values: number[] = [];
    for (let index = 0; index < count; index += 1) {
      values.push(readRational(view, dataOffset + index * 8, littleEndian));
    }
    return values.map((value) => Number(value.toFixed(6))).join(", ");
  }

  return undefined;
}

function parseIfd(
  view: DataView,
  tiffStart: number,
  ifdOffset: number,
  littleEndian: boolean,
  tagNames: Record<number, string>,
  fields: MetadataField[],
) {
  const directoryOffset = tiffStart + ifdOffset;
  if (directoryOffset < 0 || directoryOffset + 2 > view.byteLength) {
    return;
  }

  const entryCount = view.getUint16(directoryOffset, littleEndian);
  for (let index = 0; index < entryCount; index += 1) {
    const entryOffset = directoryOffset + 2 + index * 12;
    if (entryOffset + 12 > view.byteLength) {
      continue;
    }

    const tag = view.getUint16(entryOffset, littleEndian);
    const field = tagNames[tag];
    const value = readValue(view, tiffStart, entryOffset, littleEndian);

    if (field === "EXIF Data" || field === "GPS Data") {
      const nestedOffset = Number(value);
      if (Number.isFinite(nestedOffset)) {
        parseIfd(view, tiffStart, nestedOffset, littleEndian, field === "GPS Data" ? GPS_TAGS : EXIF_TAGS, fields);
      }
      continue;
    }

    if (field && value) {
      fields.push({ field, value, risk: getRiskForField(field) });
    }
  }
}

export function parseJpegExif(buffer: ArrayBuffer): MetadataField[] {
  const view = new DataView(buffer);
  const fields: MetadataField[] = [];

  if (view.byteLength < 4 || view.getUint16(0) !== 0xffd8) {
    return fields;
  }

  let offset = 2;
  while (offset + 4 < view.byteLength) {
    if (view.getUint8(offset) !== 0xff) {
      break;
    }

    const marker = view.getUint8(offset + 1);
    const segmentLength = view.getUint16(offset + 2);
    const segmentStart = offset + 4;

    if (marker === 0xe1 && readAscii(view, segmentStart, 6) === "Exif") {
      const tiffStart = segmentStart + 6;
      const byteOrder = readAscii(view, tiffStart, 2);
      const littleEndian = byteOrder === "II";

      if (byteOrder !== "II" && byteOrder !== "MM") {
        return fields;
      }

      const firstIfdOffset = view.getUint32(tiffStart + 4, littleEndian);
      parseIfd(view, tiffStart, firstIfdOffset, littleEndian, TIFF_TAGS, fields);
      return fields;
    }

    offset += 2 + segmentLength;
  }

  return fields;
}
