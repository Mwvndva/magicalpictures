import { motion, useInView } from 'framer-motion';
import { ReactNode, useRef, useEffect } from 'react';

type SectionWrapperProps = {
  children: ReactNode;
  id?: string;
  className?: string;
  delay?: number;
  threshold?: number;
};

const SectionWrapper = ({ 
  children, 
  id, 
  className = '',
  delay = 0,
  threshold = 0.1
}: SectionWrapperProps) => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { 
    amount: threshold,
    once: false, // Trigger on both scroll directions
    margin: '-15% 0px -15% 0px' // Adjusts when the animation triggers
  });

  return (
    <motion.section
      ref={ref}
      id={id}
      className={`relative overflow-hidden ${className}`}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? 'visible' : 'hidden'}
      variants={{
        visible: { 
          opacity: 1, 
          y: 0,
          transition: { 
            duration: 0.8,
            ease: [0.25, 0.1, 0.25, 1],
            delay: delay * 0.1 // Add staggered delay based on section order
          }
        },
        hidden: { 
          opacity: 0, 
          y: 30,
          transition: {
            duration: 0.5,
            ease: [0.25, 0.1, 0.25, 1]
          }
        }
      }}
      viewport={{ once: false }}
    >
      {children}
    </motion.section>
  );
};

export default SectionWrapper;
