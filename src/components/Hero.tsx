import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import profileImage from "../assets/IMG_6590.jpeg";

export function Hero() {
  const scrollToProjects = () => {
    document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-b from-background to-accent/20"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-grid-black/[0.02] dark:bg-grid-white/[0.02]" />
        <div className="absolute -inset-x-2 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        <div className="absolute -inset-x-2 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        <div className="absolute -inset-y-2 left-0 w-px bg-gradient-to-b from-transparent via-primary/30 to-transparent" />
        <div className="absolute -inset-y-2 right-0 w-px bg-gradient-to-b from-transparent via-primary/30 to-transparent" />
      </div>
      
      {/* Content */}
      <div className="container px-4 md:px-6 relative">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}mak
            className="flex flex-col justify-center space-y-4"
          >
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Hi, I'm Johanne 👋.
                <br />
                Welcome to my Portfolio
              </h1>
              <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                Exploring the world of tech one byte at a time
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button
                onClick={scrollToProjects}
                className="inline-flex items-center gap-2"
                size="lg"
              >
                View My Projects
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center justify-center"
          >
            <div className="relative w-[400px] h-[400px]">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/20 rounded-full blur-3xl" />
              <div className="relative w-full h-full rounded-full overflow-hidden">
                <img
                  src={profileImage}
                  alt="Johanne Hesse"
                  className="w-full h-full object-cover rounded-full"
                  style={{
                    WebkitMaskImage: 'radial-gradient(circle, black 100%, transparent 100%)',
                    maskImage: 'radial-gradient(circle, black 100%, transparent 100%)'
                  }}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}