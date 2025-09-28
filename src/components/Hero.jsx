import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Hero = () => {
    const [hoveredImage, setHoveredImage] = useState(null);

    // Smoother container animation with better staggering
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3,
            },
        },
    };

    // Smoother text animations with better easing
    const textVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: [0.25, 0.1, 0.25, 1] // Smoother ease-out
            },
        },
    };

    // Optimized image grid with better staggering
    const imageGridVariants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.25,
            },
        },
    };

    // Smoother image animations
    const imageVariants = {
        hidden: { opacity: 0, scale: 0.95 }, // Slightly less scale for smoother feel
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.8,
                ease: [0.25, 0.1, 0.25, 1] // Consistent easing
            },
        },
    };

    // Smoother button animations
    const buttonVariants = {
        hover: {
            scale: 1.05,
            y: -2, // Add subtle lift for depth
            transition: { 
                type: 'spring', 
                stiffness: 400, // Smoother spring
                damping: 25,
                duration: 0.3
            }
        },
        tap: { 
            scale: 0.98,
            transition: { duration: 0.15 }
        }
    };

    // Optimized hover animation for images
    const imageHoverVariants = {
        hover: {
            y: -12, // Slightly reduced movement
            scale: 1.02,
            zIndex: 20,
            transition: { 
                type: "spring", 
                stiffness: 350, // Smoother spring
                damping: 25,
                mass: 1
            }
        }
    };

    // Smoother overlay transitions
    const overlayVariants = {
        hidden: { opacity: 0 },
        visible: { 
            opacity: 1,
            transition: { 
                duration: 0.4, // Slightly longer for smoothness
                ease: "easeOut" 
            }
        }
    };

    // Smoother text transitions
    const textSlideVariants = {
        hidden: { y: 15, opacity: 0 }, // Reduced movement
        visible: { 
            y: 0, 
            opacity: 1,
            transition: { 
                duration: 0.4, 
                ease: "easeOut",
                delay: 0.1 
            }
        }
    };

    // Image data
    const imageData = {
        1: {
            src: "https://images.pexels.com/photos/4386464/pexels-photo-4386464.jpeg",
            alt: "Doctor analyzing health data on a laptop",
            title: "Expert Analysis",
            description: "AI-powered health insights"
        },
        2: {
            src: "https://images.pexels.com/photos/4031688/pexels-photo-4031688.jpeg",
            alt: "Person smiling while looking at positive health results on a phone",
            title: "Positive Results",
            description: "Life-changing outcomes"
        },
        3: {
            src: "https://images.pexels.com/photos/12326657/pexels-photo-12326657.jpeg",
            alt: "Abstract AI visualization representing data processing",
            title: "AI Technology",
            description: "Advanced algorithms"
        },
        4: {
            src: "https://images.pexels.com/photos/28436267/pexels-photo-28436267.jpeg",
            alt: "Person smiling while looking at positive health results on a phone",
            title: "Health Journey",
            description: "Personalized care"
        }
    };

    // Debounced hover handlers for better performance
    const handleImageHover = (imageId) => {
        setHoveredImage(imageId);
    };

    const handleImageLeave = () => {
        setHoveredImage(null);
    };

    // Reusable Image Component for better performance
    const ImageCard = ({ id, className, imageData }) => (
        <motion.div 
            className={`absolute shadow-2xl cursor-pointer overflow-hidden ${className}`}
            variants={imageVariants}
            whileHover="hover"
            onHoverStart={() => handleImageHover(id)}
            onHoverEnd={handleImageLeave}
        >
            <img 
                src={imageData.src}
                alt={imageData.alt}
                className="w-full h-full object-cover"
                loading="lazy" // Add lazy loading for better performance
            />
            
            {/* Gradient Overlay */}
            <motion.div 
                className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent"
                initial="hidden"
                animate={hoveredImage === id ? "visible" : "hidden"}
                variants={overlayVariants}
            />
            
            {/* Hover Text Content */}
            <motion.div 
                className="absolute bottom-0 left-0 right-0 p-6 text-white"
                initial="hidden"
                animate={hoveredImage === id ? "visible" : "hidden"}
                variants={textSlideVariants}
            >
                <h3 className="text-xl font-bold mb-2">{imageData.title}</h3>
                <p className="text-sm opacity-90">{imageData.description}</p>
            </motion.div>

            {/* Background Overlay for non-hovered images */}
            <motion.div 
                className="absolute inset-0 bg-black"
                initial={{ opacity: 0 }}
                animate={{ 
                    opacity: hoveredImage && hoveredImage !== id ? 0.3 : 0 
                }}
                transition={{ duration: 0.4, ease: "easeOut" }}
            />
        </motion.div>
    );

    return (
        <section id="home" className="relative bg-slate-200 font-brand-sans overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="relative min-h-screen flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-12 py-24">

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
                        {/* Image 1 - Larger, back-right */}
                        <motion.div 
                            className="absolute w-7/12 h-3/4 top-0 right-0 shadow-2xl cursor-pointer overflow-hidden" 
                            variants={imageVariants}
                            whileHover={imageHoverVariants.hover}
                            onHoverStart={() => handleImageHover(1)}
                            onHoverEnd={handleImageLeave}
                        >
                            <img 
                                src={imageData[1].src}
                                alt={imageData[1].alt}
                                className="w-full h-full object-cover"
                                loading="lazy"
                            />
                            
                            <motion.div 
                                className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent"
                                animate={{ 
                                    opacity: hoveredImage === 1 ? 1 : 0 
                                }}
                                transition={{ duration: 0.4 }}
                            />
                            
                            <motion.div 
                                className="absolute bottom-0 left-0 right-0 p-6 text-white"
                                animate={{ 
                                    y: hoveredImage === 1 ? 0 : 15,
                                    opacity: hoveredImage === 1 ? 1 : 0
                                }}
                                transition={{ duration: 0.4, delay: 0.1 }}
                            >
                                <h3 className="text-xl font-bold mb-2">{imageData[1].title}</h3>
                                <p className="text-sm opacity-90">{imageData[1].description}</p>
                            </motion.div>

                            <motion.div 
                                className="absolute inset-0 bg-black"
                                animate={{ 
                                    opacity: hoveredImage && hoveredImage !== 1 ? 0.3 : 0 
                                }}
                                transition={{ duration: 0.4 }}
                            />
                        </motion.div>

                        {/* Image 2 - Middle, front */}
                        <motion.div 
                            className="absolute w-5/12 h-2/3 top-2/4 left-0 shadow-2xl z-10 cursor-pointer overflow-hidden" 
                            variants={imageVariants}
                            whileHover={imageHoverVariants.hover}
                            onHoverStart={() => handleImageHover(2)}
                            onHoverEnd={handleImageLeave}
                        >
                            <img 
                                src={imageData[2].src}
                                alt={imageData[2].alt}
                                className="w-full h-full object-cover"
                                loading="lazy"
                            />
                            
                            <motion.div 
                                className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent"
                                animate={{ 
                                    opacity: hoveredImage === 2 ? 1 : 0 
                                }}
                                transition={{ duration: 0.4 }}
                            />
                            
                            <motion.div 
                                className="absolute bottom-0 left-0 right-0 p-6 text-white"
                                animate={{ 
                                    y: hoveredImage === 2 ? 0 : 15,
                                    opacity: hoveredImage === 2 ? 1 : 0
                                }}
                                transition={{ duration: 0.4, delay: 0.1 }}
                            >
                                <h3 className="text-xl font-bold mb-2">{imageData[2].title}</h3>
                                <p className="text-sm opacity-90">{imageData[2].description}</p>
                            </motion.div>

                            <motion.div 
                                className="absolute inset-0 bg-black"
                                animate={{ 
                                    opacity: hoveredImage && hoveredImage !== 2 ? 0.3 : 0 
                                }}
                                transition={{ duration: 0.4 }}
                            />
                        </motion.div>

                        {/* Image 3 - Bottom-left */}
                        <motion.div 
                            className="absolute w-5/12 h-1/2 top-0 left-0 shadow-xl cursor-pointer overflow-hidden" 
                            variants={imageVariants}
                            whileHover={imageHoverVariants.hover}
                            onHoverStart={() => handleImageHover(3)}
                            onHoverEnd={handleImageLeave}
                        >
                            <img 
                                src={imageData[3].src}
                                alt={imageData[3].alt}
                                className="w-full h-full object-cover"
                                loading="lazy"
                            />
                            
                            <motion.div 
                                className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent"
                                animate={{ 
                                    opacity: hoveredImage === 3 ? 1 : 0 
                                }}
                                transition={{ duration: 0.4 }}
                            />
                            
                            <motion.div 
                                className="absolute bottom-0 left-0 right-0 p-6 text-white"
                                animate={{ 
                                    y: hoveredImage === 3 ? 0 : 15,
                                    opacity: hoveredImage === 3 ? 1 : 0
                                }}
                                transition={{ duration: 0.4, delay: 0.1 }}
                            >
                                <h3 className="text-xl font-bold mb-2">{imageData[3].title}</h3>
                                <p className="text-sm opacity-90">{imageData[3].description}</p>
                            </motion.div>

                            <motion.div 
                                className="absolute inset-0 bg-black"
                                animate={{ 
                                    opacity: hoveredImage && hoveredImage !== 3 ? 0.3 : 0 
                                }}
                                transition={{ duration: 0.4 }}
                            />
                        </motion.div>

                        {/* Image 4 */}
                        <motion.div 
                            className="absolute w-7/12 h-1/2 top-2/3 right-0 shadow-2xl z-10 cursor-pointer overflow-hidden" 
                            variants={imageVariants}
                            whileHover={imageHoverVariants.hover}
                            onHoverStart={() => handleImageHover(4)}
                            onHoverEnd={handleImageLeave}
                        >
                            <img 
                                src={imageData[4].src}
                                alt={imageData[4].alt}
                                className="w-full h-full object-cover"
                                loading="lazy"
                            />
                            
                            <motion.div 
                                className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent"
                                animate={{ 
                                    opacity: hoveredImage === 4 ? 1 : 0 
                                }}
                                transition={{ duration: 0.4 }}
                            />
                            
                            <motion.div 
                                className="absolute bottom-0 left-0 right-0 p-6 text-white"
                                animate={{ 
                                    y: hoveredImage === 4 ? 0 : 15,
                                    opacity: hoveredImage === 4 ? 1 : 0
                                }}
                                transition={{ duration: 0.4, delay: 0.1 }}
                            >
                                <h3 className="text-xl font-bold mb-2">{imageData[4].title}</h3>
                                <p className="text-sm opacity-90">{imageData[4].description}</p>
                            </motion.div>

                            <motion.div 
                                className="absolute inset-0 bg-black"
                                animate={{ 
                                    opacity: hoveredImage && hoveredImage !== 4 ? 0.3 : 0 
                                }}
                                transition={{ duration: 0.4 }}
                            />
                        </motion.div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default Hero;