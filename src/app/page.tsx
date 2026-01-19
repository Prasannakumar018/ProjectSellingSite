"use client";

import Image from "next/image";
import { FloatingDock } from "@/components/ui/floating-dock";
import {
  IconBrandGithub,
  IconBrandX,
  IconExchange,
  IconHome,
  IconNewSection,
  IconTerminal2,
} from "@tabler/icons-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import { useMotionValueEvent, useSpring } from "framer-motion";

export default function Home() {
  const links = [
    {
      title: "Home",
      icon: (
        <IconHome className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
    },

    {
      title: "Products",
      icon: (
        <IconTerminal2 className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
    },
    {
      title: "Components",
      icon: (
        <IconNewSection className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
    },
    {
      title: "Aceternity UI",
      icon: (
        <img
          src="https://assets.aceternity.com/logo-dark.png"
          width={20}
          height={20}
          alt="Aceternity Logo"
        />
      ),
      href: "#",
    },
    {
      title: "Changelog",
      icon: (
        <IconExchange className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
    },

    {
      title: "Twitter",
      icon: (
        <IconBrandX className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
    },
    {
      title: "GitHub",
      icon: (
        <IconBrandGithub className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
    },
  ];

  const { scrollYProgress } = useScroll();

  const [windowWidth, setWindowWidth] = useState(0);
  const [isBackgroundSwapped, setIsBackgroundSwapped] = useState(false);
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const minWidth = 200;
  const minHeight = 100;
  const maxWidth = (windowWidth || minWidth) * 3;
  const maxHeight = maxWidth;

  const width = useTransform(scrollYProgress, [0, 1], [minWidth, maxWidth]);
  const height = useTransform(scrollYProgress, [0, 1], [minHeight, maxHeight]);

  // Animate from center (50%) to left edge (0%)
  const leftPosition = useTransform(scrollYProgress, [0, 1], [50, 0]);
  const rightPosition = useTransform(scrollYProgress, [1, 0], [0, 50]);

  // Add spring for smoothness
  const springWidth = useSpring(width, {
    mass: 0.3,
    stiffness: 50,
    damping: 20,
  });
  const springHeight = useSpring(height, {
    mass: 0.3,
    stiffness: 50,
    damping: 20,
  });
  const springLeft = useSpring(leftPosition, {
    mass: 0.3,
    stiffness: 50,
    damping: 20,
  });
  const springRight = useSpring(rightPosition, {
    mass: 0.3,
    stiffness: 50,
    damping: 20,
  });

  // Track current width/height for viewBox and path
  const [currentWidth, setCurrentWidth] = useState(minWidth);
  const [currentHeight, setCurrentHeight] = useState(minHeight);

  useMotionValueEvent(springWidth, "change", (v) => setCurrentWidth(v));
  useMotionValueEvent(springHeight, "change", (v) => setCurrentHeight(v));

  // Swap background when scroll is near complete
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setIsBackgroundSwapped(v > 0.6);
  });

  return (
    <div
      className="font-sans relative min-h-screen transition-colors duration-1000"
      style={{
        backgroundColor: isBackgroundSwapped
          ? "var(--background-swapped)"
          : "transparent",
        color: isBackgroundSwapped ? "var(--foreground-swapped)" : "inherit",
      }}
    >
      <div className="flex items-center justify-center h-[35rem] w-full">
        {/* <FloatingDock
          mobileClassName="translate-y-20" // only for demo, remove for production
          items={links}
        /> */}
      </div>
      <motion.svg
        style={{
          width: springWidth,
          height: springHeight,
          position: "fixed",
          bottom: 0,
          left: springLeft,
          x: "-50%",
          zIndex: 10,
          opacity: isBackgroundSwapped ? 0 : 1,
          transition: "opacity 1s ease-out",
        }}
        viewBox={`0 0 ${currentWidth} ${currentHeight}`}
        className="text-neutral-800 dark:text-neutral-200"
      >
        <path
          d={`M0,${currentHeight} A${currentWidth / 2},${
            currentWidth / 2
          } 0 0 1 ${currentWidth},${currentHeight} Z`}
          fill="currentColor"
        />
      </motion.svg>
      <motion.svg
        style={{
          width: springWidth,
          height: springHeight,
          position: "fixed",
          bottom: 0,
          right: springRight,
          x: "50%",
          zIndex: 10,
          opacity: isBackgroundSwapped ? 0 : 1,
          transition: "opacity 1s ease-out",
        }}
        viewBox={`0 0 ${currentWidth} ${currentHeight}`}
        className="text-neutral-800 dark:text-neutral-200"
      >
        <path
          d={`M0,${currentHeight} A${currentWidth / 2},${
            currentWidth / 2
          } 0 0 1 ${currentWidth},${currentHeight} Z`}
          fill="currentColor"
        />
      </motion.svg>

      {/* Hero Section */}
      <section className="relative z-20 min-h-screen flex flex-col items-center justify-center px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto text-center"
        >
          <h1 className="text-5xl sm:text-7xl font-bold tracking-tight mb-6">
            Turn Your Ideas Into
            <span className="block bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
              Profitable Projects
            </span>
          </h1>
          <p className="text-xl sm:text-2xl text-neutral-600 dark:text-neutral-400 mb-12 max-w-3xl mx-auto">
            The marketplace for buying and selling premium web projects, SaaS
            products, and digital businesses.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-neutral-900 dark:bg-white text-white dark:text-black rounded-full font-semibold text-lg hover:scale-105 transition-transform">
              Browse Projects
            </button>
            <button className="px-8 py-4 border-2 border-neutral-900 dark:border-white rounded-full font-semibold text-lg hover:scale-105 transition-transform">
              Sell Your Project
            </button>
          </div>
        </motion.div>
      </section>

      {/* Scroll hint */}
      <section className="relative z-20 h-screen flex flex-col items-center justify-center px-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="text-center"
        >
          <p className="text-2xl mb-4">Discover What's Possible</p>
          <div className="animate-bounce">
            <svg
              className="w-8 h-8 mx-auto"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        </motion.div>
      </section>

      {/* Content that appears on the new background */}
      <section className="relative z-20 min-h-screen flex items-center justify-center px-8 py-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl sm:text-6xl font-bold text-center mb-16">
            Featured Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="p-8 rounded-2xl bg-white/10 dark:bg-black/10 backdrop-blur-sm border border-neutral-200 dark:border-neutral-800 hover:scale-105 transition-transform"
              >
                <div className="aspect-video bg-neutral-300 dark:bg-neutral-700 rounded-lg mb-4"></div>
                <h3 className="text-2xl font-bold mb-2">Project {i}</h3>
                <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                  A complete SaaS solution ready for deployment
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold">$4,999</span>
                  <button className="px-4 py-2 bg-neutral-900 dark:bg-white text-white dark:text-black rounded-lg font-semibold hover:scale-105 transition-transform">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* More sections */}
      <section className="relative z-20 min-h-screen flex items-center justify-center px-8 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl sm:text-6xl font-bold mb-8">
            Why Choose Our Platform?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-16">
            <div>
              <div className="text-5xl mb-4">🚀</div>
              <h3 className="text-2xl font-bold mb-4">Launch Fast</h3>
              <p className="text-neutral-600 dark:text-neutral-400">
                Get production-ready projects that you can deploy immediately
              </p>
            </div>
            <div>
              <div className="text-5xl mb-4">💎</div>
              <h3 className="text-2xl font-bold mb-4">Premium Quality</h3>
              <p className="text-neutral-600 dark:text-neutral-400">
                Every project is vetted and built with best practices
              </p>
            </div>
            <div>
              <div className="text-5xl mb-4">🔒</div>
              <h3 className="text-2xl font-bold mb-4">Secure Transfers</h3>
              <p className="text-neutral-600 dark:text-neutral-400">
                Safe transactions with escrow protection
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative z-20 min-h-screen flex items-center justify-center px-8 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl sm:text-6xl font-bold mb-8">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-neutral-600 dark:text-neutral-400 mb-12">
            Join thousands of developers buying and selling projects
          </p>
          <button className="px-12 py-6 bg-neutral-900 dark:bg-white text-white dark:text-black rounded-full font-semibold text-xl hover:scale-105 transition-transform">
            Create Your Account
          </button>
        </div>
      </section>
    </div>
  );
}
