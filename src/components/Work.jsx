import React from 'react';
import { motion } from 'framer-motion';

// A reusable Icon component for visual consistency
const StepIcon = ({ children }) => (
    <div className="flex items-center justify-center w-16 h-16 bg-highlight/10 mb-6">
        {children}
    </div>
);

// SVG Icons for each step
const DataIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-highlight" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4M4 7l8 5 8-5" />
    </svg>
);

const BrainIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-highlight" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 17v2a2 2 0 002 2h2a2 2 0 002-2v-2" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 7V5a2 2 0 012-2h2a2 2 0 012 2v2" />
    </svg>
);

const FormIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-highlight" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
    </svg>
);

const ResultIcon = () => (
     <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-highlight" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    </svg>
);


const HowItWorks = () => {
    // Animation for the container to stagger children
    const containerVariants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.3,
            },
        },
    };

    // Animation for each step card
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

    const steps = [
        {
            icon: <DataIcon />,
            title: '1. Data-Driven Foundation',
            description: 'Our system is built on a foundation of extensive, anonymized health data. Using principles of data science, we prepared and processed this information to identify key patterns and risk factors associated with diabetes.'
        },
        {
            icon: <BrainIcon />,
            title: '2. Intelligent Model Training',
            description: 'We employed advanced Machine Learning (ML) algorithms to train our predictive model. This process is like teaching an AI to recognize complex relationships in the data, enabling it to learn from thousands of examples and make highly accurate predictions.'
        },
        {
            icon: <FormIcon />,
            title: '3. Your Health Profile',
            description: 'When you answer the questions in our assessment, you provide the model with a unique health profile. Your inputs are instantly and securely processed, serving as the variables for the AI to analyze.'
        },
        {
            icon: <ResultIcon />,
            title: '4. Your Personalized Prediction',
            description: 'The trained model analyzes your profile against the patterns it learned. The result is a percentage-based prediction, giving you a clear, data-backed insight into your potential diabetes risk, empowering you to take proactive steps.'
        },
    ];

    return (
        <section id="how-it-works" className="bg-slate-200 py-24 sm:py-32 font-brand-sans">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h2 className="text-base font-semibold text-highlight tracking-wider uppercase">How It Works</h2>
                    <p className="mt-2 text-4xl sm:text-5xl font-bold font-brand-serif text-dark tracking-tight">
                        The Science Behind Your Results
                    </p>
                    <p className="mt-6 max-w-2xl mx-auto text-lg md:text-xl text-primary">
                        We use cutting-edge AI to turn your answers into actionable health insights. Here’s a look at the four-step process that powers your prediction.
                    </p>
                </div>

                <motion.div 
                    className="mt-20 grid md:grid-cols-2 xl:grid-cols-4 gap-8"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                >
                    {steps.map((step, index) => (
                        <motion.div 
                            key={index} 
                            className="bg-light p-8 text-left h-full shadow-sm border-b-4 border-transparent"
                            variants={itemVariants}
                            whileHover={{
                                y: -8,
                                borderColor: 'rgba(59, 130, 246, 1)', // highlight color
                                boxShadow: '0px 20px 40px -15px rgba(0, 0, 0, 0.1)',
                                transition: { type: 'spring', stiffness: 300 }
                            }}
                        >
                            <StepIcon>{step.icon}</StepIcon>
                            <h3 className="text-xl font-bold text-dark font-brand-serif">{step.title}</h3>
                            <p className="mt-4 text-base text-primary leading-relaxed">{step.description}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default HowItWorks;

