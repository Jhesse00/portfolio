import { ThemeProvider } from "@/components/ThemeProvider";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Experience } from "@/components/Experience";
import { Projects } from "@/components/Projects";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { Toaster } from "@/components/ui/toaster";
import { MetadataScannerDemo } from "@/pages/MetadataScannerDemo";
import { ColorSchemeWheel } from "@/components/ColorSchemeWheel";
import { TelemetryBar } from "@/components/TelemetryBar";

function App() {
  const isMetadataScannerDemo = window.location.pathname === "/metadata-scanner";

  return (
    <ThemeProvider defaultTheme="dark" storageKey="portfolio-theme">
      <div className="min-h-screen bg-background font-sans antialiased">
        <Navbar />
        {isMetadataScannerDemo ? (
          <MetadataScannerDemo />
        ) : (
          <main>
            <Hero />
            <About />
            <Experience />
            <Projects />
            <Contact />
          </main>
        )}
        <Footer />
        <TelemetryBar />
        <ColorSchemeWheel />
        <Toaster />
      </div>
    </ThemeProvider>
  );
}

export default App;
