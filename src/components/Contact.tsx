import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Github, Linkedin } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import emailjs from "@emailjs/browser";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

const socialLinks = [
  {
    name: "GitHub",
    href: "https://github.com/Jhesse00",
    icon: Github,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/johanne-hesse-ab965521a",
    icon: Linkedin,
  },
];

export const Contact: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const currentTime = new Date().toLocaleString();
    emailjs.send(
      "service_ldefmzp", // EmailJS Service ID
      "template_fzmw17w", // EmailJS Template ID
      {
        name: values.name,
        email: values.email,
        message: values.message,
        time: currentTime,
      },
      "37ZPVtoKipem5zUWb" // Public Key provided
    ).then(
      (result) => {
        toast({
          title: "Message sent!",
          description: "Thank you for your message. I'll get back to you soon.",
        });
        form.reset();
      },
      (error) => {
        toast({
          title: "Error",
          description: "Failed to send message. Please try again later.",
        });
        console.error("EmailJS error:", error);
      }
    );
  }

  return (
    <section id="contact" className="py-24 bg-accent/50">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
        className="container px-4 md:px-6"
      >
        <div className="mx-auto max-w-2xl space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Let's Connect! 🤝
            </h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
              Feel free to reach out for collaborations or just a friendly chat! 💬
            </p>
          </div>
          <div className="mx-auto grid gap-8">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Your email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Your message"
                          className="min-h-[120px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full">
                  Send Message
                </Button>
              </form>
            </Form>
            <div className="flex justify-center space-x-4">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 hover:text-primary"
                >
                  <link.icon className="h-6 w-6" />
                  <span className="sr-only">{link.name}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
