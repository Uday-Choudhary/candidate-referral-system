import React from 'react';

const Footer = () => {
    return (
        <footer className="text-center py-6 text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Candidate Referral System. All rights reserved.
        </footer>
    );
};

export default Footer;
