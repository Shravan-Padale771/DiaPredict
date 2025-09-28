import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollToTop } from '../components/UseScrollToTop';

// --- Reusable UI Components ---

// Custom Yes/No button toggle
const YesNoToggle = ({ label, value, onChange, required }) => (
    <div>
        <label className="block text-lg font-semibold text-dark mb-3">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
        </label>
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
const StyledSelect = ({ label, value, onChange, options, placeholder, required }) => (
    <div>
        <label className="block text-lg font-semibold text-dark mb-3">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
        </label>
        <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full p-4 bg-light border-2 border-dark/10 text-dark focus:outline-none focus:border-highlight"
            required={required}
        >
            <option value="" disabled>{placeholder}</option>
            {options.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
        </select>
    </div>
);

// Custom styled number input without spinners
const StyledNumberInput = ({ label, value, onChange, placeholder, required }) => (
     <div>
        <label className="block text-lg font-semibold text-dark mb-3">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
        </label>
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
            required={required}
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
        Gender: '',
        Polyuria: '',
        Polydipsia: '',
        'sudden weight loss': '',
        weakness: '',
        Polyphagia: '',
        'Genital thrush': '',
        'visual blurring': '',
        Itching: '',
        Irritability: '',
        'delayed healing': '',
        'partial paresis': '',
        'muscle stiffness': '',
        Alopecia: '',
        Obesity: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [predictionResult, setPredictionResult] = useState(null);
    const [error, setError] = useState(null);
    const [formErrors, setFormErrors] = useState({});

    const handleFormChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        // Clear error when user starts typing
        if (formErrors[field]) {
            setFormErrors(prev => ({ ...prev, [field]: '' }));
        }
    };

    const validateCurrentStep = () => {
        const errors = {};
        
        switch (step) {
            case 1:
                if (!formData.Age) errors.Age = 'Age is required';
                if (!formData.Gender) errors.Gender = 'Gender is required';
                if (!formData.Polyuria) errors.Polyuria = 'This field is required';
                if (!formData.Polydipsia) errors.Polydipsia = 'This field is required';
                if (!formData['sudden weight loss']) errors['sudden weight loss'] = 'This field is required';
                break;
            case 2:
                if (!formData.weakness) errors.weakness = 'This field is required';
                if (!formData.Polyphagia) errors.Polyphagia = 'This field is required';
                if (!formData['Genital thrush']) errors['Genital thrush'] = 'This field is required';
                if (!formData['visual blurring']) errors['visual blurring'] = 'This field is required';
                if (!formData.Itching) errors.Itching = 'This field is required';
                break;
            case 3:
                if (!formData.Irritability) errors.Irritability = 'This field is required';
                if (!formData['delayed healing']) errors['delayed healing'] = 'This field is required';
                if (!formData['partial paresis']) errors['partial paresis'] = 'This field is required';
                if (!formData['muscle stiffness']) errors['muscle stiffness'] = 'This field is required';
                if (!formData.Alopecia) errors.Alopecia = 'This field is required';
                if (!formData.Obesity) errors.Obesity = 'This field is required';
                break;
        }
        
        return errors;
    };

    const validateAllSteps = () => {
        const errors1 = validateCurrentStep(1);
        const errors2 = validateCurrentStep(2);
        const errors3 = validateCurrentStep(3);
        return { ...errors1, ...errors2, ...errors3 };
    };

    const nextStep = () => {
        const errors = validateCurrentStep();
        
        if (Object.keys(errors).length === 0) {
            setStep(prev => prev + 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
            setFormErrors({});
        } else {
            setFormErrors(errors);
            // Scroll to first error
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const prevStep = () => {
        setStep(prev => prev - 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setFormErrors({});
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validate all steps before submitting
        const allErrors = validateAllSteps();
        
        if (Object.keys(allErrors).length > 0) {
            setFormErrors(allErrors);
            // Find the first step with errors and go to it
            const firstErrorStep = Object.keys(allErrors).some(field => 
                ['Age', 'Gender', 'Polyuria', 'Polydipsia', 'sudden weight loss'].includes(field)
            ) ? 1 : Object.keys(allErrors).some(field => 
                ['weakness', 'Polyphagia', 'Genital thrush', 'visual blurring', 'Itching'].includes(field)
            ) ? 2 : 3;
            
            setStep(firstErrorStep);
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }

        setIsLoading(true);
        setPredictionResult(null);
        setError(null);
        setFormErrors({});

        // Scroll to top when submitting
        window.scrollTo({ top: 0, behavior: 'smooth' });

        try {
            const response = await fetch("/api/predict", {
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
            Gender: '',
            Polyuria: '',
            Polydipsia: '',
            'sudden weight loss': '',
            weakness: '',
            Polyphagia: '',
            'Genital thrush': '',
            'visual blurring': '',
            Itching: '',
            Irritability: '',
            'delayed healing': '',
            'partial paresis': '',
            'muscle stiffness': '',
            Alopecia: '',
            Obesity: ''
        });
        setPredictionResult(null);
        setError(null);
        setFormErrors({});
    };

    const renderStepContent = () => {
        switch (step) {
            case 1:
                return (
                    <div className="space-y-8">
                        <h3 className="font-brand-serif text-3xl font-bold text-dark">Basic Information</h3>
                        <div>
                            <StyledNumberInput 
                                label="Age" 
                                value={formData.Age} 
                                onChange={val => handleFormChange('Age', val)} 
                                placeholder="Enter your age"
                                required={true}
                            />
                            {formErrors.Age && <p className="text-red-500 text-sm mt-1">{formErrors.Age}</p>}
                        </div>
                        <div>
                            <StyledSelect 
                                label="Gender" 
                                value={formData.Gender} 
                                onChange={val => handleFormChange('Gender', val)} 
                                placeholder="Select your gender" 
                                options={[
                                    {value: 'Male', label: 'Male'}, 
                                    {value: 'Female', label: 'Female'}
                                ]} 
                                required={true}
                            />
                            {formErrors.Gender && <p className="text-red-500 text-sm mt-1">{formErrors.Gender}</p>}
                        </div>
                        <div>
                            <YesNoToggle 
                                label="Polyuria (makes large amounts of urine)" 
                                value={formData.Polyuria} 
                                onChange={val => handleFormChange('Polyuria', val)} 
                                required={true}
                            />
                            {formErrors.Polyuria && <p className="text-red-500 text-sm mt-1">{formErrors.Polyuria}</p>}
                        </div>
                        <div>
                            <YesNoToggle 
                                label="Polydipsia (excessive thirst)" 
                                value={formData.Polydipsia} 
                                onChange={val => handleFormChange('Polydipsia', val)} 
                                required={true}
                            />
                            {formErrors.Polydipsia && <p className="text-red-500 text-sm mt-1">{formErrors.Polydipsia}</p>}
                        </div>
                        <div>
                            <YesNoToggle 
                                label="Sudden weight loss" 
                                value={formData['sudden weight loss']} 
                                onChange={val => handleFormChange('sudden weight loss', val)} 
                                required={true}
                            />
                            {formErrors['sudden weight loss'] && <p className="text-red-500 text-sm mt-1">{formErrors['sudden weight loss']}</p>}
                        </div>
                    </div>
                );
            case 2:
                return (
                    <div className="space-y-8">
                        <h3 className="font-brand-serif text-3xl font-bold text-dark">Symptoms & Signs</h3>
                        <div>
                            <YesNoToggle 
                                label="Weakness" 
                                value={formData.weakness} 
                                onChange={val => handleFormChange('weakness', val)} 
                                required={true}
                            />
                            {formErrors.weakness && <p className="text-red-500 text-sm mt-1">{formErrors.weakness}</p>}
                        </div>
                        <div>
                            <YesNoToggle 
                                label="Polyphagia (a feeling of extreme hunger)" 
                                value={formData.Polyphagia} 
                                onChange={val => handleFormChange('Polyphagia', val)} 
                                required={true}
                            />
                            {formErrors.Polyphagia && <p className="text-red-500 text-sm mt-1">{formErrors.Polyphagia}</p>}
                        </div>
                        <div>
                            <YesNoToggle 
                                label="Genital thrush (fungal infection)" 
                                value={formData['Genital thrush']} 
                                onChange={val => handleFormChange('Genital thrush', val)} 
                                required={true}
                            />
                            {formErrors['Genital thrush'] && <p className="text-red-500 text-sm mt-1">{formErrors['Genital thrush']}</p>}
                        </div>
                        <div>
                            <YesNoToggle 
                                label="Visual blurring" 
                                value={formData['visual blurring']} 
                                onChange={val => handleFormChange('visual blurring', val)} 
                                required={true}
                            />
                            {formErrors['visual blurring'] && <p className="text-red-500 text-sm mt-1">{formErrors['visual blurring']}</p>}
                        </div>
                        <div>
                            <YesNoToggle 
                                label="Itching" 
                                value={formData.Itching} 
                                onChange={val => handleFormChange('Itching', val)} 
                                required={true}
                            />
                            {formErrors.Itching && <p className="text-red-500 text-sm mt-1">{formErrors.Itching}</p>}
                        </div>
                    </div>
                );
            case 3:
                return (
                     <div className="space-y-8">
                        <h3 className="font-brand-serif text-3xl font-bold text-dark">Additional Symptoms</h3>
                        <div>
                            <YesNoToggle 
                                label="Irritability (increased anger)" 
                                value={formData.Irritability} 
                                onChange={val => handleFormChange('Irritability', val)} 
                                required={true}
                            />
                            {formErrors.Irritability && <p className="text-red-500 text-sm mt-1">{formErrors.Irritability}</p>}
                        </div>
                        <div>
                            <YesNoToggle 
                                label="Delayed healing" 
                                value={formData['delayed healing']} 
                                onChange={val => handleFormChange('delayed healing', val)} 
                                required={true}
                            />
                            {formErrors['delayed healing'] && <p className="text-red-500 text-sm mt-1">{formErrors['delayed healing']}</p>}
                        </div>
                        <div>
                            <YesNoToggle 
                                label="Partial paresis" 
                                value={formData['partial paresis']} 
                                onChange={val => handleFormChange('partial paresis', val)} 
                                required={true}
                            />
                            {formErrors['partial paresis'] && <p className="text-red-500 text-sm mt-1">{formErrors['partial paresis']}</p>}
                        </div>
                        <div>
                            <YesNoToggle 
                                label="Muscle stiffness" 
                                value={formData['muscle stiffness']} 
                                onChange={val => handleFormChange('muscle stiffness', val)} 
                                required={true}
                            />
                            {formErrors['muscle stiffness'] && <p className="text-red-500 text-sm mt-1">{formErrors['muscle stiffness']}</p>}
                        </div>
                        <div>
                            <YesNoToggle 
                                label="Alopecia (hair loss)" 
                                value={formData.Alopecia} 
                                onChange={val => handleFormChange('Alopecia', val)} 
                                required={true}
                            />
                            {formErrors.Alopecia && <p className="text-red-500 text-sm mt-1">{formErrors.Alopecia}</p>}
                        </div>
                        <div>
                            <YesNoToggle 
                                label="Obesity (excessive accumulation of body fat)" 
                                value={formData.Obesity} 
                                onChange={val => handleFormChange('Obesity', val)} 
                                required={true}
                            />
                            {formErrors.Obesity && <p className="text-red-500 text-sm mt-1">{formErrors.Obesity}</p>}
                        </div>
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
                                <p className="mt-2 text-sm text-red-500">
                                    * All fields are required
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