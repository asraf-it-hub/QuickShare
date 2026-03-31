import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Loader2, KeyRound, Download, Copy, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Receive() {
  const [pin, setPin] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const inputRefs = useRef([]);

  const handleChange = (index, value) => {
    if (!/^[0-9]*$/.test(value)) return;
    
    const newPin = [...pin];
    newPin[index] = value.substring(value.length - 1);
    setPin(newPin);
    
    // Auto focus next input
    if (value && index < 5 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !pin[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').trim();
    if (/^\d{6}$/.test(pastedData)) {
      setPin(pastedData.split(''));
      inputRefs.current[5].focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fullPin = pin.join('');
    if (fullPin.length !== 6) {
      setError('Please enter a valid 6-digit PIN.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await axios.get(`http://localhost:5000/api/receive/${fullPin}`);
      setData(response.data);
    } catch (err) {
      setError(err.response?.data?.error || 'PIN not found or has expired.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopyText = () => {
    if (data?.text) {
      navigator.clipboard.writeText(data.text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-8 relative">
      <Link to="/" className="absolute top-6 left-6 flex items-center gap-2 text-[var(--text-muted)] hover:text-white transition-colors z-20">
        <ChevronLeft className="w-5 h-5" /> Back
      </Link>

      <div className="max-w-xl mx-auto mt-16 z-10 relative">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center justify-center p-3 bg-[#22C55E]/20 rounded-full mb-4" style={{ boxShadow: '0 0 15px rgba(34, 197, 94, 0.4)' }}>
            <KeyRound className="w-6 h-6 text-[#22C55E]" />
          </div>
          <h2 className="text-3xl font-bold mb-2">Receive Data</h2>
          <p className="text-[var(--text-muted)]">Enter the 6-digit PIN provided to you.</p>
        </motion.div>

        <AnimatePresence mode="wait">
          {!data ? (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="glass-card rounded-2xl p-6 md:p-8 border-[#22C55E]/20"
            >
              <div className="flex gap-2 justify-center mb-8" onPaste={handlePaste}>
                {pin.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => (inputRefs.current[index] = el)}
                    type="text"
                    inputMode="numeric"
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className="w-12 h-16 md:w-16 md:h-20 text-center text-3xl font-bold bg-[var(--glass)] border border-[var(--glass-border)] rounded-xl text-[var(--text-main)] focus:outline-none focus:border-[#22C55E] focus:shadow-[0_0_15px_rgba(34,197,94,0.3)] transition-all"
                    maxLength={1}
                  />
                ))}
              </div>

              {error && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-[var(--error)]/10 border border-[var(--error)]/50 text-[var(--error)] p-3 rounded-lg mb-6 text-sm text-center"
                >
                  {error}
                </motion.div>
              )}

              <button 
                type="submit" 
                disabled={loading || pin.join('').length !== 6}
                className="w-full bg-[#22C55E] hover:bg-[#16a34a] text-white font-medium py-4 rounded-xl flex items-center justify-center gap-2 mt-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:shadow-[0_0_20px_rgba(34,197,94,0.4)]"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Get Data'}
              </button>
            </motion.form>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col gap-6"
            >
              {data.text && (
                <div className="glass-card rounded-2xl p-6 border-[var(--glass-border)] relative">
                  <h3 className="text-sm font-medium text-[var(--text-muted)] mb-3">Secret Message</h3>
                  <div className="bg-black/30 rounded-xl p-4 text-[var(--text-main)] min-h-[100px] whitespace-pre-wrap font-mono text-sm">
                    {data.text}
                  </div>
                  <button 
                    onClick={handleCopyText}
                    className="absolute top-5 right-6 text-[var(--text-muted)] hover:text-white transition-colors p-2"
                  >
                    {copied ? <CheckCircle2 className="w-5 h-5 text-[#22C55E]" /> : <Copy className="w-5 h-5" />}
                  </button>
                </div>
              )}

              {data.file && (
                <div className="glass-card rounded-2xl p-6 border-[var(--glass-border)] flex items-center justify-between gap-4">
                  <div className="overflow-hidden">
                    <h3 className="text-sm font-medium text-[var(--text-muted)] mb-1">Attached File</h3>
                    <p className="text-[var(--text-main)] font-medium truncate max-w-[200px] md:max-w-xs" title={data.file.originalname}>
                      {data.file.originalname}
                    </p>
                    <p className="text-xs text-[var(--text-muted)] mt-1">
                      {(data.file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                  
                  <a 
                    href={`http://localhost:5000${data.file.downloadUrl}`} 
                    download={data.file.originalname}
                    className="flex-shrink-0 bg-[var(--primary)] hover:bg-[var(--primary-dark)] p-3 rounded-full glow-effect transition-colors"
                  >
                    <Download className="w-6 h-6 text-white" />
                  </a>
                </div>
              )}

              <button 
                onClick={() => { setData(null); setPin(['', '', '', '', '', '']); setError(''); }}
                className="mt-4 px-6 py-2 rounded-full border border-[var(--glass-border)] hover:bg-[var(--glass)] transition-colors self-center text-sm"
              >
                Receive Another
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
