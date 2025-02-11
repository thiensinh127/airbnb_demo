"use client";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";

export const useAnimateOnScroll = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  const animationProps = {
    initial: { opacity: 0, y: 30 },
    animate: inView ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.6, ease: "easeOut" },
  };

  return { ref, animationProps, motion };
};
