import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Send, Download, ShieldCheck, Zap, Clock } from 'lucide-react';
import GlassCard from '../components/GlassCard';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-[80vh] px-4 py-20 lg:py-32">
      
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center max-w-3xl mb-16"
      >
        <h1 className="text-5xl lg:text-7xl font-bold mb-6 tracking-tight">
          Share Files <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accentGreen text-glow">
            Securely with a PIN
          </span>
        </h1>
        <p className="text-lg lg:text-xl text-textMuted mb-10">
          Fast, private, temporary file and text sharing. No login required.
          End-to-end encrypted feel with self-destructing capabilities.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button 
            onClick={() => navigate('/send')}
            className="flex items-center gap-2 bg-primary hover:bg-primaryDark text-white px-8 py-4 rounded-xl font-medium transition-all shadow-[0_0_20px_rgba(99,102,241,0.4)] hover:shadow-[0_0_30px_rgba(99,102,241,0.6)] hover:-translate-y-1 w-full sm:w-auto justify-center"
          >
            <Send className="w-5 h-5" />
            Send Data
          </button>
          <button 
            onClick={() => navigate('/receive')}
            className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 px-8 py-4 rounded-xl font-medium transition-all hover:-translate-y-1 w-full sm:w-auto justify-center"
          >
            <Download className="w-5 h-5" />
            Receive Data
          </button>
        </div>
      </motion.div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl mt-12">
        <GlassCard delay={0.2} className="flex flex-col items-center text-center hover:bg-white/10 transition-colors group">
          <div className="p-4 bg-primary/20 rounded-2xl mb-4 group-hover:scale-110 transition-transform">
            <Zap className="w-8 h-8 text-primaryLight" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Lightning Fast</h3>
          <p className="text-textMuted text-sm">Upload your data and instantly generate a 6-digit sharing PIN.</p>
        </GlassCard>

        <GlassCard delay={0.4} className="flex flex-col items-center text-center hover:bg-white/10 transition-colors group">
          <div className="p-4 bg-accentGreen/20 rounded-2xl mb-4 group-hover:scale-110 transition-transform">
            <ShieldCheck className="w-8 h-8 text-accentGreen" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Secure</h3>
          <p className="text-textMuted text-sm">Your files and text are only accessible to those with the exact PIN.</p>
        </GlassCard>

        <GlassCard delay={0.6} className="flex flex-col items-center text-center hover:bg-white/10 transition-colors group">
          <div className="p-4 bg-accentRed/20 rounded-2xl mb-4 group-hover:scale-110 transition-transform">
            <Clock className="w-8 h-8 text-accentRed" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Auto-Expiring</h3>
          <p className="text-textMuted text-sm">Data self-destructs after 10 minutes or upon first successful download.</p>
        </GlassCard>
      </div>
    </div>
  );
};

export default LandingPage;
