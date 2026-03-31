import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Home from './pages/Home';
import Send from './pages/Send';
import Receive from './pages/Receive';

// A premium animated background component
const PremiumBackground = () => (
  <div className="fixed inset-0 z-[-1] overflow-hidden bg-[var(--bg-dark)]">
    {/* Subtle Dot/Grid Pattern */}
    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,#000_60%,transparent_100%)] pointer-events-none"></div>
    
    {/* Colored Blurry Orbs */}
    <motion.div 
      animate={{ 
        x: [0, 80, -20, 0], 
        y: [0, -60, 40, 0],
        scale: [1, 1.1, 0.9, 1] 
      }}
      transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[var(--primary)] rounded-full mix-blend-screen filter blur-[140px] opacity-30 pointer-events-none"
    ></motion.div>
    
    <motion.div 
      animate={{ 
        x: [0, -100, 50, 0], 
        y: [0, 80, -50, 0],
        scale: [1, 1.2, 0.8, 1] 
      }}
      transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      className="absolute bottom-[-15%] right-[-10%] w-[60%] h-[60%] bg-[#22C55E] rounded-full mix-blend-screen filter blur-[150px] opacity-25 pointer-events-none"
    ></motion.div>

    <motion.div 
      animate={{ 
        scale: [1, 1.2, 1],
        opacity: [0.1, 0.3, 0.1]
      }}
      transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      className="absolute top-[30%] right-[15%] w-[30%] h-[30%] bg-[#4F46E5] rounded-full mix-blend-screen filter blur-[100px] opacity-20 pointer-events-none"
    ></motion.div>
  </div>
);

function App() {
  return (
    <Router>
      <div className="min-h-screen text-white font-inter selection:bg-[var(--primary)] selection:text-white relative">
        <PremiumBackground />
        <main className="relative z-10 w-full min-h-screen flex flex-col">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/send" element={<Send />} />
              <Route path="/receive" element={<Receive />} />
            </Routes>
          </AnimatePresence>
        </main>
      </div>
    </Router>
  );
}

export default App;
