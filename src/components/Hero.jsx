import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

// Preload critical images
const preloadImages = () => {
  const images = [
    './img/p1.webp',
    './img/p2.webp', 
    './img/p3.webp',
    './img/p4.webp'
  ];
  
  images.forEach(src => {
    const img = new Image();
    img.src = src;
  });
};

// Optimized Hero Component
const Hero = () => {
    const [hoveredImage, setHoveredImage] = useState(null);
    const [imagesLoaded, setImagesLoaded] = useState(false);

    // Preload images on component mount
    React.useEffect(() => {
        preloadImages();
        // Set a small delay to ensure preloading starts
        const timer = setTimeout(() => setImagesLoaded(true), 100);
        return () => clearTimeout(timer);
    }, []);

    // Memoized variants to prevent unnecessary re-renders
    const variants = useMemo(() => ({
        container: {
            hidden: { opacity: 0 },
            visible: {
                opacity: 1,
                transition: {
                    staggerChildren: 0.15, // Reduced for faster load
                    delayChildren: 0.1,    // Reduced initial delay
                },
            },
        },
        text: {
            hidden: { opacity: 0, y: 20 }, // Reduced movement
            visible: {
                opacity: 1,
                y: 0,
                transition: {
                    duration: 0.6, // Faster duration
                    ease: "easeOut"
                },
            },
        },
        imageGrid: {
            hidden: {},
            visible: {
                transition: {
                    staggerChildren: 0.2, // Faster staggering
                },
            },
        },
        image: {
            hidden: { opacity: 0, scale: 0.98 }, // Minimal scale
            visible: {
                opacity: 1,
                scale: 1,
                transition: {
                    duration: 0.6, // Faster duration
                    ease: "easeOut"
                },
            },
        },
        button: {
            hover: {
                scale: 1.03, // Reduced scale for performance
                y: -1,
                transition: { 
                    type: 'spring', 
                    stiffness: 500, // Stiffer spring for snappier response
                    damping: 30,
                    duration: 0.2
                }
            },
            tap: { 
                scale: 0.98,
                transition: { duration: 0.1 }
            }
        },
        imageHover: {
            hover: {
                y: -8, // Reduced movement
                scale: 1.01, // Minimal scale
                zIndex: 20,
                transition: { 
                    type: "spring", 
                    stiffness: 500, 
                    damping: 30,
                    mass: 0.8 // Lighter mass
                }
            }
        },
        overlay: {
            hidden: { opacity: 0 },
            visible: { 
                opacity: 1,
                transition: { 
                    duration: 0.3, // Faster transitions
                    ease: "easeOut" 
                }
            }
        },
        textSlide: {
            hidden: { y: 10, opacity: 0 }, // Minimal movement
            visible: { 
                y: 0, 
                opacity: 1,
                transition: { 
                    duration: 0.3, 
                    ease: "easeOut",
                    delay: 0.05 // Reduced delay
                }
            }
        }
    }), []);

    // Memoized image data
    const imageData = useMemo(() => ({
        1: {
            src: "./img/p1.webp",
            alt: "Doctor analyzing health data on a laptop",
            title: "Expert Analysis",
            description: "AI-powered health insights"
        },
        2: {
            src: "./img/p2.webp",
            alt: "Person smiling while looking at positive health results on a phone",
            title: "Positive Results",
            description: "Life-changing outcomes"
        },
        3: {
            src: "./img/p3.webp",
            alt: "Abstract AI visualization representing data processing",
            title: "AI Technology",
            description: "Advanced algorithms"
        },
        4: {
            src: "./img/p4.webp",
            alt: "Person smiling while looking at positive health results on a phone",
            title: "Health Journey",
            description: "Personalized care"
        }
    }), []);

    // Optimized hover handlers with debouncing
    const handleImageHover = React.useCallback((imageId) => {
        setHoveredImage(imageId);
    }, []);

    const handleImageLeave = React.useCallback(() => {
        setHoveredImage(null);
    }, []);

    // Optimized Image Card Component
    const ImageCard = React.memo(({ id, className, imageData }) => (
        <motion.div 
            className={`absolute shadow-2xl cursor-pointer overflow-hidden ${className}`}
            variants={variants.image}
            whileHover={variants.imageHover.hover}
            onHoverStart={() => handleImageHover(id)}
            onHoverEnd={handleImageLeave}
        >
            <img 
                src={imageData.src}
                alt={imageData.alt}
                className="w-full h-full object-cover"
                loading="lazy"
                decoding="async" // Better image decoding
            />
            
            {/* Gradient Overlay */}
            <motion.div 
                className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none"
                initial="hidden"
                animate={hoveredImage === id ? "visible" : "hidden"}
                variants={variants.overlay}
            />
            
            {/* Hover Text Content */}
            <motion.div 
                className="absolute bottom-0 left-0 right-0 p-4 text-white pointer-events-none"
                initial="hidden"
                animate={hoveredImage === id ? "visible" : "hidden"}
                variants={variants.textSlide}
            >
                <h3 className="text-lg font-bold mb-1">{imageData.title}</h3>
                <p className="text-xs opacity-90">{imageData.description}</p>
            </motion.div>

            {/* Background Overlay for non-hovered images */}
            <motion.div 
                className="absolute inset-0 bg-black pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ 
                    opacity: hoveredImage && hoveredImage !== id ? 0.25 : 0 
                }}
                transition={{ duration: 0.3, ease: "easeOut" }}
            />
        </motion.div>
    ));

    // Show loading state if images aren't ready
    if (!imagesLoaded) {
        return (
            <section className="relative bg-slate-200 font-brand-sans overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="relative min-h-screen flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-12 py-24">
                        <div className="w-full lg:w-1/2 text-center lg:text-left z-10">
                            <div className="h-24 bg-gray-300 animate-pulse rounded mb-6"></div>
                            <div className="h-4 bg-gray-300 animate-pulse rounded w-3/4 mb-4"></div>
                            <div className="h-12 bg-gray-300 animate-pulse rounded w-1/2 mt-8"></div>
                        </div>
                        <div className="w-full lg:w-1/2 h-96 lg:h-[600px] relative">
                            <div className="absolute inset-0 bg-gray-300 animate-pulse rounded"></div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section id="home" className="relative bg-slate-200 font-brand-sans overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="relative min-h-screen flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-12 py-24">

                    {/* Text Content */}
                    <motion.div
                        variants={variants.container}
                        initial="hidden"
                        animate="visible"
                        className="w-full lg:w-1/2 text-center lg:text-left z-10"
                    >
                        <motion.h1
                            variants={variants.text}
                            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-brand-serif tracking-tight text-dark"
                        >
                            Clarity for Your Health Journey
                        </motion.h1>

                        <motion.p
                            variants={variants.text}
                            className="mt-6 text-lg md:text-xl text-primary max-w-xl mx-auto lg:mx-0"
                        >
                            Harness the power of predictive AI to understand your diabetes risk. Our assessment provides clear, actionable insights, guiding you towards a healthier future.
                        </motion.p>

                        <motion.div variants={variants.text} className="mt-12">
                            <Link to="/assessment">
                                <motion.button
                                    variants={variants.button}
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
                        variants={variants.imageGrid}
                        initial="hidden"
                        animate="visible"
                    >
                        <ImageCard 
                            id={1}
                            className="w-7/12 h-2/3 top-0 right-0"
                            imageData={imageData[1]}
                        />
                        
                        <ImageCard 
                            id={2}
                            className="w-5/12 h-2/3 top-2/4 left-0 z-10"
                            imageData={imageData[2]}
                        />
                        
                        <ImageCard 
                            id={3}
                            className="w-5/12 h-1/2 top-0 left-0"
                            imageData={imageData[3]}
                        />
                        
                        <ImageCard 
                            id={4}
                            className="w-7/12 h-1/2 top-2/3 right-0 z-10"
                            imageData={imageData[4]}
                        />
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default React.memo(Hero);