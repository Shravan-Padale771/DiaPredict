import React from 'react';

export default function Footer() {
    return (
        <footer className="bg-dark text-light font-brand-sans">
             <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 text-center">
                 <p>&copy; {new Date().getFullYear()} DiaPredict. All Rights Reserved.</p>
                 <p className="text-sm text-light/70 mt-2">Disclaimer: This tool is for informational purposes only and does not constitute medical advice.</p>
             </div>
        </footer>
    );
}
