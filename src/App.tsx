import { ThemeProvider } from "@/components/ThemeProvider";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Projects } from "@/components/Projects";
import { Resume } from "@/components/Resume";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { Toaster } from "@/components/ui/toaster";
import { MetadataScannerDemo } from "@/pages/MetadataScannerDemo";

function App() {
  const isMetadataScannerDemo = window.location.pathname === "/metadata-scanner";

  return (
    <ThemeProvider defaultTheme="system" storageKey="portfolio-theme">
      <div className="min-h-screen bg-background font-sans antialiased">
        <Navbar />
        {isMetadataScannerDemo ? (
          <MetadataScannerDemo />
        ) : (
          <main>
            <Hero />
            <About />
            <Projects />
            <Resume />
            <Contact />
          </main>
        )}
        <Footer />
        <Toaster />
      </div>
    </ThemeProvider>
  );
}

export default App;
