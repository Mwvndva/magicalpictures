import React, { useEffect, useRef } from 'react';
import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion';

interface StatItemProps {
    value: number;
    suffix: string;
    label: string;
    delay?: number;
}

const StatItem: React.FC<StatItemProps> = ({ value, suffix, label, delay = 0 }) => {
    const count = useMotionValue(0);
    const rounded = useTransform(count, (latest) => Math.round(latest));
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.5 });

    useEffect(() => {
        if (isInView) {
            const animation = animate(count, value, {
                duration: 2,
                delay: delay,
                ease: "easeOut",
            });
            return animation.stop;
        }
    }, [isInView, count, value, delay]);

    return (
        <motion.div
            ref={ref}
            className="flex flex-col items-center justify-center p-4 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: delay }}
        >
            <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-yellow-500 mb-1.5">
                <motion.span>{rounded}</motion.span>{suffix}
            </div>
            <div className="text-[11px] sm:text-xs md:text-sm text-gray-400 uppercase tracking-wider font-medium">
                {label}
            </div>
        </motion.div>
    );
};

const StatsSection: React.FC = () => {
    const stats = [
        { value: 400, suffix: '+', label: 'Projects Completed' },
        { value: 70, suffix: '+', label: 'Brands Worked With' },
        { value: 10, suffix: 'M+', label: 'Reach' },
    ];

    return (
        <section className="w-full py-7 md:py-8 bg-black border-y border-gray-800/50">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {stats.map((stat, index) => (
                        <StatItem
                            key={index}
                            value={stat.value}
                            suffix={stat.suffix}
                            label={stat.label}
                            delay={index * 0.2}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default StatsSection;
