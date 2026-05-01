import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { receiveData } from '../services/api';
import { Download, Lock, Loader2, FileText, CheckCircle, AlertCircle, RefreshCw } from 'lucide-react';
import GlassCard from '../components/GlassCard';

const ReceivePage = () => {
  const { pin: urlPin } = useParams();
  const navigate = useNavigate();
  const [pin, setPin] = useState(urlPin || '');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (urlPin && urlPin.length === 6) {
      handleReceive(urlPin);
    }
  }, [urlPin]);

  const handleInputChange = (e) => {
    const val = e.target.value.replace(/[^0-9]/g, '').slice(0, 6);
    setPin(val);
    setError('');
  };

  const handleReceive = async (pinToUse) => {
    if (pinToUse.length !== 6) {
      setError('PIN must be exactly 6 digits.');
      return;
    }
    setLoading(true);
    setError('');
    
    try {
      const res = await receiveData(pinToUse);
      setData(res);
    } catch (err) {
      setError(err.response?.data?.error || 'Invalid or expired PIN.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleReceive(pin);
  };

  const handleDownload = () => {
    if (!data?.fileUrl) return;
    const url = `http://localhost:5000${data.fileUrl}`;
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', data.fileName || 'download');
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  return (
    <div className="w-full max-w-2xl mt-24 px-4 min-h-[60vh] flex flex-col items-center">
      <motion.div 
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }} 
        className="text-center mb-12"
      >
        <h2 className="text-3xl font-bold mb-2 text-glow">Receive Securely</h2>
        <p className="text-textMuted">Enter the 6-digit PIN to access shared files or text.</p>
      </motion.div>

      <AnimatePresence mode="wait">
        {!data ? (
          <GlassCard key="entry" delay={0.2} className="relative overflow-hidden w-full max-w-md mx-auto">
            <form onSubmit={handleSubmit} className="flex flex-col gap-8 items-center text-center">
              
              <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mb-2 mx-auto">
                <Lock className="w-10 h-10 text-primaryLight" />
              </div>

              {error && (
                <motion.div 
                   initial={{ x: -10 }} 
                   animate={{ x: 0 }} 
                   className="p-3 bg-accentRed/10 border border-accentRed/30 rounded-lg flex items-center gap-2 text-accentRed w-full justify-center"
                >
                  <AlertCircle className="w-4 h-4" />
                  <p className="text-sm font-medium">{error}</p>
                </motion.div>
              )}

              <div className="w-full relative">
                <input
                  type="text"
                  inputMode="numeric"
                  value={pin}
                  onChange={handleInputChange}
                  placeholder="000000"
                  className="glass-input w-full text-center text-5xl font-mono tracking-[0.5em] py-6 rounded-2xl placeholder-textMuted/20"
                  autoComplete="off"
                />
              </div>

              <button 
                type="submit" 
                disabled={loading || pin.length !== 6}
                className="w-full py-4 rounded-xl font-semibold flex items-center justify-center transition-all bg-primary hover:bg-primaryDark text-white disabled:bg-white/10 disabled:text-textMuted/50 disabled:cursor-not-allowed shadow-[0_0_15px_rgba(99,102,241,0.5)] hover:shadow-[0_0_25px_rgba(99,102,241,0.7)]"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Retrieve Data'}
              </button>
            </form>
          </GlassCard>
        ) : (
          <GlassCard key="data" delay={0.1} className="w-full">
            <div className="flex items-center gap-3 mb-8 border-b border-white/10 pb-4">
              <CheckCircle className="text-accentGreen w-8 h-8" />
              <div>
                <h3 className="text-xl font-semibold text-textLight">Data Decrypted</h3>
                <p className="text-xs text-textMuted">This link will now self-destruct.</p>
              </div>
            </div>

            <div className="space-y-8">
              {data.text && (
                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-textMuted uppercase tracking-wider flex items-center gap-2">
                    <FileText className="w-4 h-4" /> Secret Message
                  </h4>
                  <div className="bg-bgDark/50 p-6 rounded-xl border border-white/5 relative">
                    <p className="text-textLight whitespace-pre-wrap leading-relaxed">
                      {data.text}
                    </p>
                  </div>
                </div>
              )}

              {data.fileUrl && (
                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-textMuted uppercase tracking-wider flex items-center gap-2">
                    <Download className="w-4 h-4" /> Attached File
                  </h4>
                  <div className="bg-bgDark/50 p-6 rounded-xl border border-white/5 flex items-center justify-between">
                    <span className="font-medium truncate max-w-[60%]">{data.fileName || 'Shared File'}</span>
                    <button 
                      onClick={handleDownload}
                      className="bg-accentGreen hover:bg-green-600 text-white px-5 py-2.5 rounded-lg font-medium transition-colors flex items-center gap-2 shadow-[0_0_15px_rgba(34,197,94,0.3)] hover:shadow-[0_0_25px_rgba(34,197,94,0.5)]"
                    >
                      <Download className="w-4 h-4" /> Download
                    </button>
                  </div>
                </div>
              )}

              <div className="pt-6 mt-8 border-t border-white/10 text-center">
                <button 
                  onClick={() => {
                    setData(null);
                    setPin('');
                    navigate('/receive');
                  }}
                  className="text-textMuted hover:text-white transition-colors flex items-center gap-2 justify-center mx-auto"
                >
                  <RefreshCw className="w-4 h-4" /> Receive Another
                </button>
              </div>
            </div>
          </GlassCard>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ReceivePage;
