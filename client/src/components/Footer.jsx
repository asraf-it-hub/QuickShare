
import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full text-center p-6 text-textMuted text-sm glass-card !rounded-none !border-b-0 !border-x-0 !border-t-white/5 mt-auto relative z-20">
      <p>
        &copy; {new Date().getFullYear()} QuickShare. Secure PIN-based sharing.
      </p>
    </footer>
  );
};

export default Footer;
