import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Code2, Shield, Terminal } from 'lucide-react';

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  return (
    <section id="about" className="py-24 bg-accent/50">
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="container px-4 md:px-6"
      >
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <motion.div variants={itemVariants} className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              About Me
            </h2>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              I’m a passionate cybersecurity student 
              with a strong interest in coding and technology. 
              Currently pursuing a degree in cybersecurity, 
              I enjoy learning about protecting digital assets and building secure systems. 
              I created this website from scratch as part of my journey to expand my skills and knowledge in the field.
            </p>
            <div className="grid gap-4 md:grid-cols-3">
              <motion.div
                variants={itemVariants}
                className="flex flex-col items-center space-y-2 border rounded-lg p-4"
              >
                <Shield className="h-8 w-8 text-primary" />
                <h3 className="font-semibold">Security First</h3>
                <p className="text-sm text-center text-gray-500 dark:text-gray-400">
                  Prioritizing robust security measures in every project
                </p>
              </motion.div>
              <motion.div
                variants={itemVariants}
                className="flex flex-col items-center space-y-2 border rounded-lg p-4"
              >
                <Code2 className="h-8 w-8 text-primary" />
                <h3 className="font-semibold">Clean Code</h3>
                <p className="text-sm text-center text-gray-500 dark:text-gray-400">
                  Writing maintainable and secure code
                </p>
              </motion.div>
              <motion.div
                variants={itemVariants}
                className="flex flex-col items-center space-y-2 border rounded-lg p-4"
              >
                <Terminal className="h-8 w-8 text-primary" />
                <h3 className="font-semibold">Problem Solver</h3>
                <p className="text-sm text-center text-gray-500 dark:text-gray-400">
                  Finding innovative solutions to complex security challenges
                </p>
              </motion.div>
            </div>
          </motion.div>
          <motion.div
            variants={itemVariants}
            className="flex items-center justify-center"
          >
            <img
              src="https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2070&auto=format&fit=crop"
              alt="Cybersecurity Illustration"
              className="rounded-lg object-cover"
              width={600}
              height={400}
            />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default About;