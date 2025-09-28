import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

// Animated Number Component
const AnimatedNumber = ({ value }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        const controls = {
            stop: () => {},
        };
        
        const animate = (start, end, duration) => {
            let startTimestamp = null;
            const step = (timestamp) => {
                if (!startTimestamp) startTimestamp = timestamp;
                const progress = Math.min((timestamp - startTimestamp) / duration, 1);
                setCount(Math.floor(progress * (end - start) + start));
                if (progress < 1) {
                    controls.stop = requestAnimationFrame(step);
                }
            };
            controls.stop = requestAnimationFrame(step);
        };
        
        animate(0, value, 2000); // Animate over 2 seconds

        return () => cancelAnimationFrame(controls.stop);
    }, [value]);

    return <span>{count.toLocaleString()}</span>;
};

// Data for the charts
const barChartData = [
    { name: 'Status', Diagnosed: 56, Undiagnosed: 45 },
];

const pieChartData = [
    { name: 'Unhealthy Diet', value: 35 },
    { name: 'Sedentary Lifestyle', value: 40 },
    { name: 'Genetic Factors', value: 15 },
    { name: 'Lack of Awareness', value: 10 },
];

const COLORS = ['#14b8a6', '#0891b2', '#0ea5e9', '#6366f1'];

const About = () => {
    const controls = useAnimation();
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.2,
    });

    useEffect(() => {
        if (inView) {
            controls.start('visible');
        }
    }, [controls, inView]);

    const containerVariants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.3,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: "easeOut",
            },
        },
    };

    return (
        <section id="about" className="bg-light2 py-24 sm:py-32 font-brand-sans">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h2 className="text-base font-semibold text-highlight tracking-wider uppercase">The Mission</h2>
                    <p className="mt-2 text-4xl sm:text-5xl font-bold font-brand-serif text-dark tracking-tight">
                        Understanding the Diabetes Challenge in India
                    </p>
                    <p className="mt-6 max-w-3xl mx-auto text-lg md:text-xl text-primary">
                        Our goal is to leverage technology to bring awareness to a silent epidemic. Early detection is key, and our mission is to empower individuals with the knowledge to act proactively.
                    </p>
                </div>

                {/* Animated Stats */}
                <motion.div
                    ref={ref}
                    variants={containerVariants}
                    initial="hidden"
                    animate={controls}
                    className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 text-center"
                >
                    <motion.div variants={itemVariants} className="bg-slate-200 p-8">
                        <p className="text-5xl font-bold font-brand-serif text-highlight">
                            {inView && <AnimatedNumber value={101} />}M+
                        </p>
                        <p className="mt-2 text-lg font-semibold text-dark">Adults with Diabetes</p>
                        <p className="mt-2 text-primary">India faces a significant and growing health challenge.</p>
                    </motion.div>
                    <motion.div variants={itemVariants} className="bg-slate-200 p-8">
                        <p className="text-5xl font-bold font-brand-serif text-highlight">
                           {inView && <AnimatedNumber value={136} />}M+
                        </p>
                        <p className="mt-2 text-lg font-semibold text-dark">Individuals with Pre-Diabetes</p>
                        <p className="mt-2 text-primary">A critical window of opportunity for prevention.</p>
                    </motion.div>
                    <motion.div variants={itemVariants} className="bg-slate-200 p-8">
                        <p className="text-5xl font-bold font-brand-serif text-highlight">
                            ~{inView && <AnimatedNumber value={45} />}%
                        </p>
                        <p className="mt-2 text-lg font-semibold text-dark">Cases Are Undiagnosed</p>
                        <p className="mt-2 text-primary">Nearly half are unaware of their condition, delaying crucial care.</p>
                    </motion.div>
                </motion.div>

                {/* Charts Section */}
                <div className="mt-24 grid lg:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                    >
                        <h3 className="text-3xl font-bold text-dark font-brand-serif mb-4">The Awareness Gap</h3>
                        <p className="text-lg text-primary mb-8">
                            One of the biggest hurdles is the large number of undiagnosed cases. This chart illustrates the millions who are aware of their condition versus those who are not, highlighting the urgent need for accessible screening tools.
                        </p>
                        <div style={{ width: '100%', background:"#e2e8f0", height: 300 }}>
                           <ResponsiveContainer>
                                <BarChart data={barChartData} margin={{ top: 20, right: 20, left: 20, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#d1d5db" />
                                    <XAxis dataKey="name" tick={{ fill: '#4b5563' }} />
                                    <YAxis label={{ value: 'Millions', angle: -90, position: 'insideLeft', fill: '#4b5563' }} tick={{ fill: '#4b5563' }} />
                                    <Tooltip cursor={{fill: 'rgba(239, 246, 255, 0.5)'}} contentStyle={{ backgroundColor: '#fff', border: '1px solid #d1d5db' }}/>
                                    <Bar dataKey="Diagnosed" fill="#14b8a6" name="Diagnosed (in Millions)" />
                                    <Bar dataKey="Undiagnosed" fill="#0ea5e9" name="Undiagnosed (in Millions)" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </motion.div>
                     <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                    >
                        <h3 className="text-3xl font-bold text-dark font-brand-serif mb-4">Key Contributing Factors</h3>
                        <p className="text-lg text-primary mb-14">
                            Modern lifestyle choices play a significant role in the rise of diabetes. This chart breaks down the major risk factors, emphasizing the power of lifestyle modification in prevention and management.
                        </p>
                        <div style={{ width: '100%', background:"#e2e8f0", height: 300 }}>
                            <ResponsiveContainer>
                                <PieChart>
                                    <Pie data={pieChartData} cx="50%" cy="50%" labelLine={false} outerRadius={110} fill="#8884d8" dataKey="value" nameKey="name">
                                        {pieChartData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #d1d5db' }}/>
                                    <Legend />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default About;

