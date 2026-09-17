"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  Users,
  Trophy,
  Globe,
  Target,
  Rocket,
  Award,
  TrendingUp,
} from "lucide-react";

interface CounterProps {
  end: number;
  suffix?: string;
  duration?: number;
}

function AnimatedCounter({ end, suffix = "", duration = 2000 }: CounterProps) {
  const [count, setCount] = useState(0);
  const countRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 },
    );

    if (countRef.current) {
      observer.observe(countRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    const steps = 60;
    const stepValue = end / steps;
    const stepDuration = duration / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += stepValue;
      if (current >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [isVisible, end, duration]);

  return (
    <span ref={countRef}>
      <span>{count}</span>
      {suffix}
    </span>
  );
}

const values = [
  {
    icon: Users,
    title: "Client-Centric",
    description:
      "Your success is our priority. We build lasting partnerships based on trust and results.",
  },
  {
    icon: Trophy,
    title: "Excellence",
    description:
      "We deliver nothing but the highest quality solutions with meticulous attention to detail.",
  },
  {
    icon: Globe,
    title: "Innovation",
    description:
      "Staying ahead with cutting-edge technologies and forward-thinking methodologies.",
  },
];

const achievements = [
  { icon: Award, label: "ISO 27001 Certified" },
  { icon: TrendingUp, label: "AWS Advanced Partner" },
  { icon: Target, label: "Google Cloud Partner" },
  { icon: Rocket, label: "Microsoft Gold Partner" },
];

const stats = [
  { value: 5, suffix: "+", label: "Projects Completed" },
  { value: 3, suffix: "+", label: "Team Members" },
  { value: 4, suffix: "+", label: "Countries Served" },
  { value: 5, suffix: "%", label: "Client Retention" },
];

export function About() {
  return (
    <section id="about" className="py-24 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-6">
        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
        >
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="bg-card border border-border rounded-xl p-6 text-center"
            >
              <p className="text-3xl md:text-4xl font-bold text-primary mb-2">
                <AnimatedCounter
                  end={stat.value}
                  suffix={stat.suffix}
                  duration={2000 + index * 200}
                />
              </p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-primary text-sm font-semibold tracking-wider uppercase">
              About Us
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6 text-balance">
              Engineering Excellence Since 2012
            </h2>
            <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
              oasislabs was founded with a simple mission: to help businesses
              harness the power of technology to achieve their goals. Over the
              past decade, we&apos;ve grown from a small team of passionate
              developers to a global technology partner serving clients across
              industries.
            </p>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              Our team of 150+ experts combines deep technical expertise with
              business acumen to deliver solutions that not only work flawlessly
              but drive real business outcomes.
            </p>

            <div className="grid grid-cols-2 gap-4">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={achievement.label}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex items-center gap-3 bg-card border border-border rounded-lg p-3"
                >
                  <achievement.icon className="w-5 h-5 text-primary shrink-0" />
                  <span className="text-sm font-medium">
                    {achievement.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-card border border-border rounded-xl p-6 flex gap-5 hover:border-primary/50 transition-colors"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <value.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </div>
              </motion.div>
            ))}

            <div className="bg-primary rounded-xl p-8 text-primary-foreground">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-lg bg-primary-foreground/20 flex items-center justify-center">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-3xl font-bold">
                    <AnimatedCounter end={150} suffix="+" />
                  </p>
                  <p className="text-primary-foreground/80 text-sm">
                    Expert Team Members
                  </p>
                </div>
              </div>
              <p className="text-primary-foreground/90">
                Engineers, designers, and strategists ready to bring your vision
                to life with world-class expertise.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-20"
        >
          <h3 className="text-2xl font-bold text-center mb-12">Our Journey</h3>
          <div className="flex flex-col md:flex-row gap-4 md:gap-0 justify-between relative">
            <div className="hidden md:block absolute top-6 left-0 right-0 h-0.5 bg-border" />
            {[
              {
                year: "2022",
                title: "Freelancing",
                desc: "Started with freelancing",
              },
              {
                year: "2023",
                title: "Founded",
                desc: "Started with OasisLabs",
              },

              {
                year: "2024",
                title: "3 Projects",
                desc: "Delivered 3 projects",
              },
              {
                year: "2025",
                title: "4 Clients",
                desc: "Half a thousand success stories",
              },
            ].map((milestone, index) => (
              <div key={milestone.year} className="relative flex-1 text-center">
                <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-4 relative z-10 text-sm font-bold">
                  {milestone.year.slice(-2)}
                </div>
                <h4 className="font-semibold mb-1">{milestone.title}</h4>
                <p className="text-sm text-muted-foreground">
                  {milestone.desc}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
