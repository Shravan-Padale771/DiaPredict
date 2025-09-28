import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Hero = () => {
    const [hoveredImage, setHoveredImage] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);

    // Smooth loading with progressive delay
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoaded(true);
        }, 1000); // Longer delay for smooth feel
        return () => clearTimeout(timer);
    }, []);

    // Smooth and slow animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3, // Slower stagger
                delayChildren: 0.5,   // Longer initial delay
            },
        },
    };

    const textVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 1.2, // Slower duration
                ease: [0.25, 0.1, 0.25, 1] // Smooth easing
            },
        },
    };

    const imageGridVariants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.4, // Slower stagger
            },
        },
    };

    const imageVariants = {
        hidden: { opacity: 0, scale: 0.95 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 1.2, // Slower duration
                ease: [0.25, 0.1, 0.25, 1] // Smooth easing
            },
        },
    };

    const buttonVariants = {
        hover: {
            scale: 1.05,
            transition: { 
                type: 'spring', 
                stiffness: 200, // Softer spring
                damping: 15 
            }
        },
        tap: { 
            scale: 0.98,
            transition: { duration: 0.3 }
        }
    };

    // Image data
    const imageData = [
        {
            id: 1,
            src: "./img/p1.webp",
            alt: "Doctor analyzing health data on a laptop",
            title: "Expert Analysis",
            description: "AI-powered health insights",
            className: "w-7/12 h-2/3 top-0 right-0"
        },
        {
            id: 2,
            src: "./img/p2.webp",
            alt: "Person smiling while looking at positive health results on a phone",
            title: "Positive Results",
            description: "Life-changing outcomes",
            className: "w-5/12 h-2/3 top-2/4 left-0 z-10"
        },
        {
            id: 3,
            src: "./img/p3.webp",
            alt: "Abstract AI visualization representing data processing",
            title: "AI Technology",
            description: "Advanced algorithms",
            className: "w-5/12 h-1/2 top-0 left-0"
        },
        {
            id: 4,
            src: "./img/p4.webp",
            alt: "Person smiling while looking at positive health results on a phone",
            title: "Health Journey",
            description: "Personalized care",
            className: "w-7/12 h-1/2 top-2/3 right-0 z-10"
        }
    ];

    // Smooth loading state
    if (!isLoaded) {
        return (
            <section className="relative bg-slate-200 font-brand-sans overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="relative min-h-screen flex items-center justify-center">
                        <motion.div 
                            className="text-center"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                        >
                            <motion.div 
                                className="w-16 h-16 border-4 border-highlight/30 border-t-highlight rounded-full mx-auto mb-6"
                                animate={{ rotate: 360 }}
                                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                            />
                            <motion.p 
                                className="text-dark text-xl font-light"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3, duration: 0.6 }}
                            >
                                Preparing your experience...
                            </motion.p>
                        </motion.div>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section id="home" className="relative bg-slate-200 font-brand-sans overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div 
                    className="relative h-ma flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-12 py-24 mb-24"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                >
                    {/* Text Content */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="w-full lg:w-1/2 text-center lg:text-left z-10"
                    >
                        <motion.h1
                            variants={textVariants}
                            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-brand-serif tracking-tight text-dark"
                        >
                            Clarity for Your Health Journey
                        </motion.h1>

                        <motion.p
                            variants={textVariants}
                            className="mt-6 text-lg md:text-xl text-primary max-w-xl mx-auto lg:mx-0"
                        >
                            Harness the power of predictive AI to understand your diabetes risk. Our assessment provides clear, actionable insights, guiding you towards a healthier future.
                        </motion.p>

                        <motion.div variants={textVariants} className="mt-12">
                            <Link to="/assessment">
                                <motion.button
                                    variants={buttonVariants}
                                    whileHover="hover"
                                    whileTap="tap"
                                    className="bg-highlight text-light font-bold px-10 py-4 tracking-wider uppercase text-base shadow-lg"
                                    style={{ boxShadow: '0px 10px 30px -5px rgba(59, 130, 246, 0.3)'}}
                                >
                                    Begin Your Assessment
                                </motion.button>
                            </Link>
                        </motion.div>
                    </motion.div>
                    
                    {/* Image Composition */}
                    <motion.div 
                        className="relative w-full lg:w-1/2 h-96 lg:h-[600px]"
                        variants={imageGridVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {imageData.map((image) => (
                            <motion.div 
                                key={image.id}
                                className={`absolute shadow-2xl cursor-pointer overflow-hidden ${image.className}`}
                                variants={imageVariants}
                                whileHover={{
                                    y: -12, // Slightly reduced movement
                                    scale: 1.02,
                                    zIndex: 20,
                                    transition: { 
                                        type: "spring", 
                                        stiffness: 200, // Softer spring
                                        damping: 15,
                                        duration: 0.4
                                    }
                                }}
                                onHoverStart={() => setHoveredImage(image.id)}
                                onHoverEnd={() => setHoveredImage(null)}
                            >
                                <img 
                                    src={image.src}
                                    alt={image.alt}
                                    className="w-full h-full object-cover"
                                />
                                
                                {/* Gradient Overlay for text */}
                                <motion.div 
                                    className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0"
                                    animate={{ 
                                        opacity: hoveredImage === image.id ? 1 : 0 
                                    }}
                                    transition={{ duration: 0.5, ease: "easeOut" }} // Slower
                                />
                                
                                {/* Hover Text Content */}
                                <motion.div 
                                    className="absolute bottom-0 left-0 right-0 p-6 text-white"
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ 
                                        y: hoveredImage === image.id ? 0 : 20,
                                        opacity: hoveredImage === image.id ? 1 : 0
                                    }}
                                    transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }} // Slower
                                >
                                    <h3 className="text-xl font-bold mb-2">{image.title}</h3>
                                    <p className="text-sm opacity-90">{image.description}</p>
                                </motion.div>

                                {/* Background Overlay for other images when this is hovered */}
                                <motion.div 
                                    className="absolute inset-0 bg-black opacity-0"
                                    animate={{ 
                                        opacity: hoveredImage && hoveredImage !== image.id ? 0.3 : 0 
                                    }}
                                    transition={{ duration: 0.5, ease: "easeOut" }} // Slower
                                />
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;