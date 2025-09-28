import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

// --- SVG ICONS ---
const MenuIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
    </svg>
);

const CloseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
);


export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    // Close the mobile menu automatically on route change
    useEffect(() => {
        setIsOpen(false);
    }, [location.pathname]);
    
    // Prevents scrolling when the mobile menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        // Cleanup function
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    const menuVariants = {
        closed: {
            opacity: 0,
            transition: {
                when: "afterChildren",
                staggerChildren: 0.1,
                staggerDirection: -1,
            },
        },
        open: {
            opacity: 1,
            transition: {
                when: "beforeChildren",
                staggerChildren: 0.1,
            },
        },
    };
    
    const navLinkVariants = {
        closed: { opacity: 0, y: -20 },
        open: { opacity: 1, y: 0 },
    };

    return (
        <>
            <header className="bg-light/80 backdrop-blur-lg sticky top-0 z-50 border-b border-dark/10 font-brand-sans">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-20">
                        <Link to="/" className="flex-shrink-0">
                            <h1 className="text-2xl font-bold font-brand-serif text-dark">Dia<span className="text-highlight">Predict</span></h1>
                        </Link>
                        
                        {/* Desktop Navigation */}
                        <nav className="hidden md:flex md:space-x-8">
                             <a  href="/#about" className="text-primary hover:text-dark font-semibold transition-colors">About</a>
                             <a href="/#how-it-works" className="text-primary hover:text-dark font-semibold transition-colors">How It Works</a>
                             <a href="/#faq" className="text-primary hover:text-dark font-semibold transition-colors">FAQ</a>
                        </nav>
                        
                        <div className="hidden md:flex items-center">
                            <Link to="/assessment">
                                <button className="bg-highlight text-light font-bold py-3 px-6 text-base hover:opacity-90 transition-opacity">
                                    Get Started
                                </button>
                            </Link>
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="md:hidden">
                            <button onClick={() => setIsOpen(!isOpen)} className="text-dark z-50 relative">
                                {isOpen ? <CloseIcon /> : <MenuIcon />}
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Full-Screen Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        variants={menuVariants}
                        initial="closed"
                        animate="open"
                        exit="closed"
                        className="md:hidden fixed inset-0 bg-light z-40 flex flex-col items-center justify-center"
                    >
                        <nav className="flex flex-col items-center space-y-8">
                             <motion.a variants={navLinkVariants} onClick={() => setIsOpen(!isOpen)} href="/#about" className="text-3xl font-semibold text-primary">About</motion.a>
                             <motion.a variants={navLinkVariants} onClick={() => setIsOpen(!isOpen)} href="/#how-it-works" className="text-3xl font-semibold text-primary">How It Works</motion.a>
                             <motion.a variants={navLinkVariants} onClick={() => setIsOpen(!isOpen)} href="/#faq" className="text-3xl font-semibold text-primary">FAQ</motion.a>
                             <motion.div variants={navLinkVariants} className="mt-4">
                                <Link to="/assessment">
                                    <button onClick={() => setIsOpen(!isOpen)} className="bg-highlight text-light font-bold py-4 px-12 text-lg">
                                        Get Started
                                    </button>
                                </Link>
                             </motion.div>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

