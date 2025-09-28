import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollToTop } from '../components/UseScrollToTop';

// --- Reusable UI Components ---

// Custom Yes/No button toggle
const YesNoToggle = ({ label, value, onChange }) => (
    <div>
        <label className="block text-lg font-semibold text-dark mb-3">{label}</label>
        <div className="flex space-x-4">
            <button
                type="button"
                onClick={() => onChange('Yes')}
                className={`flex-1 py-4 text-center font-bold border-2 transition-all duration-200 ${value === 'Yes' ? 'bg-highlight text-light border-highlight' : 'bg-light border-dark/10 text-dark hover:border-highlight'}`}
            >
                Yes
            </button>
            <button
                type="button"
                onClick={() => onChange('No')}
                className={`flex-1 py-4 text-center font-bold border-2 transition-all duration-200 ${value === 'No' ? 'bg-highlight text-light border-highlight' : 'bg-light border-dark/10 text-dark hover:border-highlight'}`}
            >
                No
            </button>
        </div>
    </div>
);

// Custom styled select dropdown
const StyledSelect = ({ label, value, onChange, options, placeholder }) => (
    <div>
        <label className="block  text-lg font-semibold text-dark mb-3">{label}</label>
        <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full p-4 bg-light border-2 border-dark/10 text-dark focus:outline-none focus:border-highlight"
        >
            <option value="" disabled>{placeholder}</option>
            {options.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
        </select>
    </div>
);

// Custom styled number input
// Custom styled number input without spinners
const StyledNumberInput = ({ label, value, onChange, placeholder }) => (
     <div>
        <label className="block text-lg font-semibold text-dark mb-3">{label}</label>
        <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            value={value}
            onChange={(e) => {
                // Only allow numbers
                const numericValue = e.target.value.replace(/[^0-9]/g, '');
                onChange(numericValue);
            }}
            placeholder={placeholder}
            className="w-full p-4 bg-light border-2 border-dark/10 text-dark focus:outline-none focus:border-highlight"
        />
    </div>
);

// Loading Spinner Component
const LoadingSpinner = () => (
    <div className="flex flex-col items-center justify-center text-center p-8">
        <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            className="w-20 h-20 border-8 border-light border-t-highlight"
            style={{ borderRadius: '50%' }}
        />
        <h3 className="text-3xl font-bold font-brand-serif text-light mt-8">Analyzing Your Profile...</h3>
        <p className="text-light/80 mt-2">Our AI is processing your information.</p>
    </div>
);


// --- Main Assessment Component ---

const Assessment = () => {
    useScrollToTop();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        Age: '',
        Gender: 'Male',
        Polyuria: 'No',
        Polydipsia: 'No',
        'sudden weight loss': 'No',
        weakness: 'No',
        Polyphagia: 'No',
        'Genital thrush': 'No',
        'visual blurring': 'No',
        Itching: 'No',
        Irritability: 'No',
        'delayed healing': 'No',
        'partial paresis': 'No',
        'muscle stiffness': 'No',
        Alopecia: 'No',
        Obesity: 'No'
    });
    const [isLoading, setIsLoading] = useState(false);
    const [predictionResult, setPredictionResult] = useState(null);
    const [error, setError] = useState(null);

    const handleFormChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const nextStep = () => {
        setStep(prev => prev + 1);
        // Scroll to top when moving to next step
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const prevStep = () => {
        setStep(prev => prev - 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setPredictionResult(null);
        setError(null);

        // Scroll to top when submitting
        window.scrollTo({ top: 0, behavior: 'smooth' });

        try {
            const response = await fetch("http://localhost:5000/predict", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (data.error) {
                setError(data.error);
            } else {
                setPredictionResult(data);
            }
        } catch (err) {
            setError("Failed to connect to backend. Please make sure the server is running.");
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };
    
    const resetForm = () => {
        setStep(1);
        setFormData({
            Age: '',
            Gender: 'Male',
            Polyuria: 'No',
            Polydipsia: 'No',
            'sudden weight loss': 'No',
            weakness: 'No',
            Polyphagia: 'No',
            'Genital thrush': 'No',
            'visual blurring': 'No',
            Itching: 'No',
            Irritability: 'No',
            'delayed healing': 'No',
            'partial paresis': 'No',
            'muscle stiffness': 'No',
            Alopecia: 'No',
            Obesity: 'No'
        });
        setPredictionResult(null);
        setError(null);
    };

    const renderStepContent = () => {
        switch (step) {
            case 1:
                return (
                    <div className="space-y-8">
                        <h3 className="font-brand-serif text-3xl font-bold text-dark">Basic Information</h3>
                        <StyledNumberInput 
                            label="Age:" 
                            value={formData.Age} 
                            onChange={val => handleFormChange('Age', val)} 
                            placeholder="Enter your age"
                        />
                        <StyledSelect 
                            label="Gender:" 
                            value={formData.Gender} 
                            onChange={val => handleFormChange('Gender', val)} 
                            placeholder="Select your gender" 
                            options={[
                                {value: 'Male', label: 'Male'}, 
                                {value: 'Female', label: 'Female'}
                            ]} 
                        />
                        <YesNoToggle 
                            label="Polyuria (makes large amounts of urine):" 
                            value={formData.Polyuria} 
                            onChange={val => handleFormChange('Polyuria', val)} 
                        />
                        <YesNoToggle 
                            label="Polydipsia (excessive thirst):" 
                            value={formData.Polydipsia} 
                            onChange={val => handleFormChange('Polydipsia', val)} 
                        />
                        <YesNoToggle 
                            label="Sudden weight loss:" 
                            value={formData['sudden weight loss']} 
                            onChange={val => handleFormChange('sudden weight loss', val)} 
                        />
                    </div>
                );
            case 2:
                return (
                    <div className="space-y-8">
                        <h3 className="font-brand-serif text-3xl font-bold text-dark">Symptoms & Signs</h3>
                        <YesNoToggle 
                            label="Weakness:" 
                            value={formData.weakness} 
                            onChange={val => handleFormChange('weakness', val)} 
                        />
                        <YesNoToggle 
                            label="Polyphagia (a feeling of extreme hunger):" 
                            value={formData.Polyphagia} 
                            onChange={val => handleFormChange('Polyphagia', val)} 
                        />
                        <YesNoToggle 
                            label="Genital thrush (fungal infection):" 
                            value={formData['Genital thrush']} 
                            onChange={val => handleFormChange('Genital thrush', val)} 
                        />
                        <YesNoToggle 
                            label="Visual blurring:" 
                            value={formData['visual blurring']} 
                            onChange={val => handleFormChange('visual blurring', val)} 
                        />
                        <YesNoToggle 
                            label="Itching:" 
                            value={formData.Itching} 
                            onChange={val => handleFormChange('Itching', val)} 
                        />
                    </div>
                );
            case 3:
                return (
                     <div className="space-y-8">
                        <h3 className="font-brand-serif text-3xl font-bold text-dark">Additional Symptoms</h3>
                        <YesNoToggle 
                            label="Irritability (increased anger):" 
                            value={formData.Irritability} 
                            onChange={val => handleFormChange('Irritability', val)} 
                        />
                        <YesNoToggle 
                            label="Delayed healing:" 
                            value={formData['delayed healing']} 
                            onChange={val => handleFormChange('delayed healing', val)} 
                        />
                        <YesNoToggle 
                            label="Partial paresis:" 
                            value={formData['partial paresis']} 
                            onChange={val => handleFormChange('partial paresis', val)} 
                        />
                        <YesNoToggle 
                            label="Muscle stiffness:" 
                            value={formData['muscle stiffness']} 
                            onChange={val => handleFormChange('muscle stiffness', val)} 
                        />
                        <YesNoToggle 
                            label="Alopecia (hair loss):" 
                            value={formData.Alopecia} 
                            onChange={val => handleFormChange('Alopecia', val)} 
                        />
                        <YesNoToggle 
                            label="Obesity (excessive accumulation of body fat):" 
                            value={formData.Obesity} 
                            onChange={val => handleFormChange('Obesity', val)} 
                        />
                    </div>
                );
            default:
                return <div>End of Form</div>;
        }
    };
    
    const resultColor = predictionResult?.diabetic === "Positive" ? 'text-red-500' : 'text-green-500';
    const resultText = predictionResult?.diabetic === "Positive" ? 'Positive' : 'Negative';

    return (
        <section className="bg-slate-200 min-h-screen py-24 sm:py-32 font-brand-sans">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                 <AnimatePresence mode="wait">
                    {isLoading ? (
                         <motion.div key="loader" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="bg-dark/90 fixed inset-0 flex items-center justify-center z-50">
                            <LoadingSpinner />
                        </motion.div>
                    ) : predictionResult !== null ? (
                        <motion.div key="result" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} className="text-center bg-light p-12 shadow-lg">
                             <h2 className="text-3xl font-bold font-brand-serif text-dark mb-4">Your Result</h2>
                             <p className={`text-8xl font-bold font-brand-serif my-6 ${resultColor}`}>
                                 {(predictionResult.probability_positive * 100).toFixed(1)}%
                             </p>
                             <p className={`text-2xl font-semibold mb-4 ${resultColor}`}>
                                 Prediction: {resultText}
                             </p>
                             <p className="text-primary max-w-xl mx-auto mb-8">
                                 {predictionResult.diabetic === "Positive" 
                                     ? "Please consult with a healthcare professional for proper diagnosis and treatment."
                                     : "Continue maintaining a healthy lifestyle with regular check-ups."}
                             </p>
                             <button 
                                 onClick={resetForm} 
                                 className="bg-highlight text-light font-bold py-4 px-12 text-lg"
                             >
                                 Start Over
                             </button>
                        </motion.div>
                    ) : (
                        <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                            <div className="text-center">
                                <h2 className="text-4xl sm:text-5xl font-bold font-brand-serif text-dark tracking-tight">
                                    Diabetes Prediction
                                </h2>
                                <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-primary">
                                    Fill out the form below to assess your diabetes risk using our AI-powered prediction model
                                </p>
                            </div>
                            
                            {/* Progress Bar */}
                            <div className="mt-12 mb-8">
                                <div className="bg-dark/10 h-2 w-full">
                                    <motion.div
                                        className="bg-highlight h-2"
                                        initial={{ width: '0%' }}
                                        animate={{ width: `${(step / 3) * 100}%` }}
                                        transition={{ duration: 0.5, ease: 'easeInOut' }}
                                    />
                                </div>
                                <p className="text-center text-primary mt-2">Step {step} of 3</p>
                            </div>
                            
                            <form onSubmit={handleSubmit} className="bg-light p-8 sm:p-12 shadow-lg">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={step}
                                        initial={{ opacity: 0, x: 50 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -50 }}
                                        transition={{ duration: 0.4, ease: 'easeInOut' }}
                                    >
                                        {renderStepContent()}
                                    </motion.div>
                                </AnimatePresence>

                                <div className="mt-12 flex justify-between items-center">
                                    <button
                                        type="button"
                                        onClick={prevStep}
                                        disabled={step === 1}
                                        className="bg-dark/20 text-dark font-bold py-4 px-12 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        Back
                                    </button>
                                     {step === 3 ? (
                                        <button type="submit" className="bg-highlight text-light font-bold py-4 px-12 text-lg">
                                            Predict
                                        </button>
                                    ) : (
                                        <button type="button" onClick={nextStep} className="bg-highlight text-light font-bold py-4 px-12 text-lg">
                                            Next
                                        </button>
                                    )}
                                </div>
                            </form>
                        </motion.div>
                    )}
                 </AnimatePresence>
                 {error && (
                     <motion.div 
                         initial={{ opacity: 0, y: -10 }}
                         animate={{ opacity: 1, y: 0 }}
                         className="text-red-500 text-center mt-4 p-4 bg-red-100 border-l-4 border-red-500"
                     >
                         {error}
                     </motion.div>
                 )}
            </div>
        </section>
    );
};

export default Assessment;