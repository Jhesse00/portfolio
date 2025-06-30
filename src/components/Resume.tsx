import { motion } from "framer-motion";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Resume() {
  return (
    <section 
      id="resume" 
      className="container mx-auto px-4 py-16 md:py-24 space-y-8 border-t border-gray-200 dark:border-gray-700"
    >
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Resume
        </h2>
        <p className="text-gray-600 dark:text-gray-300 max-w-xl mx-auto">
          View my resume below to learn more about my professional background and skills in cybersecurity.
        </p>
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex justify-center"
      >
        <div className="w-full max-w-4xl">
          <iframe
            src="/assets/resume.pdf"
            title="Johanne Hesse Resume"
            className="w-full h-96 border border-gray-200 dark:border-gray-700 rounded-lg"
          >
            <p className="text-center text-gray-500 dark:text-gray-400">
              Your browser does not support PDF viewing.
            </p>
          </iframe>
        </div>
      </motion.div>
    </section>
  );
}
