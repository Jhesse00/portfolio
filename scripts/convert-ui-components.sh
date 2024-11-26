#!/bin/bash

# Directory containing UI components
UI_DIR="src/components/ui"

# Iterate through .js files
for file in "$UI_DIR"/*.js; do
    # Skip if file doesn't exist
    [ -e "$file" ] || continue

    # Get the filename without path and extension
    filename=$(basename "$file")
    name="${filename%.*}"

    # Convert to TypeScript
    mv "$file" "${file%.js}.tsx"

    # Add React import if not already present
    if ! grep -q "import React" "${file%.js}.tsx"; then
        sed -i '1i import React from "react";' "${file%.js}.tsx"
    fi

    echo "Converted $file to TypeScript"
done

# Ensure TypeScript files have correct exports
find "$UI_DIR" -name "*.tsx" -print0 | while IFS= read -r -d '' file; do
    # If no export, add default export
    if ! grep -q "export" "$file"; then
        echo -e "\nconst ${name^} = () => null;\nexport default ${name^};" >> "$file"
    fi
done
