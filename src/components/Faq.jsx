import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// The Plus/Minus icon component for the accordion
const AccordionIcon = ({ isOpen }) => {
    return (
        <motion.div
            className="relative w-6 h-6 flex-shrink-0"
            animate={{ rotate: isOpen ? 45 : 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
        >
            <div className="absolute w-full h-0.5 bg-dark top-1/2 -translate-y-1/2"></div>
            <div className="absolute h-full w-0.5 bg-dark left-1/2 -translate-x-1/2"></div>
        </motion.div>
    );
};


const FAQ = () => {
    // State to keep track of the currently open accordion item
    const [openIndex, setOpenIndex] = useState(null);

    const faqData = [
        {
            question: 'Is this a medical diagnosis?',
            answer: 'No, this tool is not a substitute for a professional medical diagnosis. It provides a risk assessment based on data patterns. We strongly recommend consulting with a qualified healthcare provider for any health concerns or for an official diagnosis.'
        },
        {
            question: 'How accurate is the prediction?',
            answer: 'Our model is trained on a vast dataset and uses advanced machine learning techniques to achieve a high degree of accuracy in risk prediction. However, it is a predictive tool and not a guarantee. Individual health outcomes can vary based on numerous factors not captured in this assessment.'
        },
        {
            question: 'Is my data secure?',
            answer: 'Absolutely. We prioritize your privacy. The data you provide is processed securely and is used solely for the purpose of generating your risk assessment. We do not store or share your personal health information.'
        },
        {
            question: 'What should I do with my results?',
            answer: 'Your result is a starting point for a conversation about your health. We encourage you to share and discuss your result with a doctor. They can provide context, recommend further tests if necessary, and help you create a personalized health plan.'
        },
        {
            question: 'Can I use this tool for someone else?',
            answer: 'This tool is designed for individual use. For an accurate prediction, the person whose risk is being assessed should answer the questions based on their own health information.'
        },
    ];

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section id="faq" className="bg-light py-24 sm:py-32 font-brand-sans">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-base font-semibold text-highlight tracking-wider uppercase">FAQ</h2>
                    <p className="mt-2 text-4xl sm:text-5xl font-bold font-brand-serif text-dark tracking-tight">
                        Frequently Asked Questions
                    </p>
                    <p className="mt-6 max-w-2xl mx-auto text-lg md:text-xl text-primary">
                        Have questions? We have answers. Here are some of the most common inquiries about our assessment tool.
                    </p>
                </div>

                <div className="space-y-4">
                    {faqData.map((item, index) => (
                        <motion.div 
                            key={index} 
                            className="border-b border-dark/10"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.5, margin: "-50px" }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <button
                                onClick={() => toggleFAQ(index)}
                                className="w-full flex justify-between items-center text-left py-6"
                            >
                                <span className="text-lg font-semibold text-dark pr-4">{item.question}</span>
                                <AccordionIcon isOpen={openIndex === index} />
                            </button>
                            <AnimatePresence>
                                {openIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.4, ease: 'easeInOut' }}
                                        className="overflow-hidden"
                                    >
                                        <p className="pb-6 text-base text-primary leading-relaxed pr-6">
                                            {item.answer}
                                        </p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQ;
