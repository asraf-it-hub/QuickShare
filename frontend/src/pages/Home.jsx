import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Send, Download } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden focus:outline-none">
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[var(--primary)]/20 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#22C55E]/10 rounded-full blur-[100px] pointer-events-none"></div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="z-10 text-center max-w-2xl w-full"
      >
        <motion.div
           initial={{ scale: 0.8, opacity: 0 }}
           animate={{ scale: 1, opacity: 1 }}
           transition={{ delay: 0.2, duration: 0.8, type: "spring" }}
           className="inline-block mb-4"
        >
          <span className="px-4 py-1.5 rounded-full text-sm font-medium border border-[var(--glass-border)] bg-[var(--glass)] text-[var(--primary)] backdrop-blur-md">
            Simple & Secure Sharing
          </span>
        </motion.div>
        
        <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
          <span className="text-gradient">QuickShare</span>
        </h1>
        <p className="text-lg md:text-xl text-[var(--text-muted)] mb-12">
          Share files and text securely across devices using a 6-digit PIN. Fast, reliable, and beautifully simple.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-lg mx-auto">
          <Link to="/send" className="group focus:outline-none">
            <motion.div 
              whileHover={{ y: -5, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="glass-card p-6 rounded-2xl flex flex-col items-center gap-4 border border-[var(--glass-border)] transition-colors hover:border-[var(--primary)] hover:bg-[var(--glass)]/40 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="w-14 h-14 rounded-full bg-[var(--primary)]/20 flex items-center justify-center glow-effect">
                <Send className="w-7 h-7 text-[var(--text-main)] ml-1" />
              </div>
              <div className="text-center">
                <h3 className="font-semibold text-lg mb-1 text-[var(--text-main)]">Send Data</h3>
                <p className="text-sm text-[var(--text-muted)]">Upload files or write text</p>
              </div>
            </motion.div>
          </Link>

          <Link to="/receive" className="group focus:outline-none">
            <motion.div 
              whileHover={{ y: -5, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="glass-card p-6 rounded-2xl flex flex-col items-center gap-4 border border-[var(--glass-border)] transition-colors hover:border-[#22C55E]/50 hover:bg-[var(--glass)]/40 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#22C55E]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="w-14 h-14 rounded-full bg-[#22C55E]/20 flex items-center justify-center" style={{ boxShadow: '0 0 15px #22C55E' }}>
                <Download className="w-7 h-7 text-[var(--text-main)]" />
              </div>
              <div className="text-center">
                <h3 className="font-semibold text-lg mb-1 text-[var(--text-main)]">Receive Data</h3>
                <p className="text-sm text-[var(--text-muted)]">Enter PIN to download</p>
              </div>
            </motion.div>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
