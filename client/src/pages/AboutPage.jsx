import React from 'react';
import { motion } from 'framer-motion';
import { Share2, Code, Shield } from 'lucide-react';
import GlassCard from '../components/GlassCard';

const AboutPage = () => {
  return (
    <div className="w-full max-w-3xl mt-24 px-4 min-h-[60vh] flex flex-col items-center">
      <motion.div 
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }} 
        className="text-center mb-12"
      >
        <h2 className="text-4xl font-bold mb-4 text-glow">About QuickShare</h2>
        <p className="text-lg text-textMuted max-w-xl mx-auto">
          A secure, self-destructing platform for sharing sensitive files and text privately.
        </p>
      </motion.div>

      <GlassCard delay={0.2} className="space-y-8 p-10">
        
        <div className="flex gap-6 items-start">
          <div className="p-4 bg-primary/20 rounded-2xl flex-shrink-0">
            <Share2 className="w-6 h-6 text-primaryLight" />
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">How it Works</h3>
            <p className="text-textMuted leading-relaxed">
              When you upload a file or text, QuickShare securely stores it on our servers and generates a unique, single-use 6-digit PIN. You can securely share this PIN with anyone via any channel. They just need to enter it on the receive page to instantly decrypt and access the data.
            </p>
          </div>
        </div>

        <div className="flex gap-6 items-start border-t border-white/5 pt-8">
          <div className="p-4 bg-accentRed/20 rounded-2xl flex-shrink-0">
            <Shield className="w-6 h-6 text-accentRed" />
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Security & Privacy</h3>
            <p className="text-textMuted leading-relaxed">
              We treat your data with the utmost security. All files have an automatic 10-minute time-to-live (TTL). Furthermore, data is destroyed *immediately* upon the first successful download, ensuring nobody else can ever access the original file. No logs. No accounts. Total anonymity.
            </p>
          </div>
        </div>

        <div className="flex gap-6 items-start border-t border-white/5 pt-8">
          <div className="p-4 bg-accentGreen/20 rounded-2xl flex-shrink-0">
            <Code className="w-6 h-6 text-accentGreen" />
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Technology Used</h3>
            <ul className="text-textMuted space-y-2 list-disc list-inside">
              <li>React & Vite on the Frontend</li>
              <li>Tailwind CSS & Framer Motion for UI</li>
              <li>Node.js & Express server</li>
              <li>MongoDB for fast, TTL-based storage</li>
            </ul>
          </div>
        </div>

      </GlassCard>
    </div>
  );
};

export default AboutPage;
