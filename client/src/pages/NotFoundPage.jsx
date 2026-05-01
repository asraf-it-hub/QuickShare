import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Home } from 'lucide-react';
import GlassCard from '../components/GlassCard';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full max-w-lg mt-24 px-4 min-h-[60vh] flex flex-col items-center justify-center text-center">
      <GlassCard delay={0.1} className="p-12">
        <motion.h1 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-8xl font-bold font-mono text-transparent bg-clip-text bg-gradient-to-r from-accentRed to-primaryLight mb-4 text-glow"
        >
          404
        </motion.h1>
        <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
        <p className="text-textMuted mb-8">
          The page you are looking for might have been removed, had its name changed, or vanished like an expired link.
        </p>
        <button 
          onClick={() => navigate('/')}
          className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-6 py-3 rounded-xl font-medium transition-all flex items-center gap-2 mx-auto justify-center"
        >
          <Home className="w-5 h-5" />
          Back to Home
        </button>
      </GlassCard>
    </div>
  );
};

export default NotFoundPage;
