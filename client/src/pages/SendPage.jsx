import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { shareData } from '../services/api';
import { UploadCloud, CheckCircle, Copy, Loader2, File, X, AlertCircle } from 'lucide-react';
import GlassCard from '../components/GlassCard';

const SendPage = () => {
  const [text, setText] = useState('');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (selectedFile) => {
    if (!selectedFile) return;
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain', 'application/zip', 'application/x-zip-compressed'];
    if (!allowedTypes.includes(selectedFile.type) && !selectedFile.name.endsWith('.zip')) {
      setError('Invalid file type. Allowed: pdf, jpg, png, docx, txt, zip.');
      return;
    }
    if (selectedFile.size > 10 * 1024 * 1024) {
      setError('File size exceeds 10MB limit.');
      return;
    }
    setError('');
    setFile(selectedFile);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text && !file) {
      setError('Please provide text or upload a file.');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      const formData = new FormData();
      if (text) formData.append('text', text);
      if (file) formData.append('file', file);
      
      const res = await shareData(formData);
      setResult(res);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to share data.');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (result?.pin) {
      navigator.clipboard.writeText(result.pin);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="w-full max-w-2xl mt-24 px-4 min-h-[60vh] flex flex-col items-center">
      <motion.div 
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }} 
        className="text-center mb-8"
      >
        <h2 className="text-3xl font-bold mb-2 text-glow">Send Securely</h2>
        <p className="text-textMuted">Upload a file or enter text to generate a secure sharing PIN.</p>
      </motion.div>

      <AnimatePresence mode="wait">
        {!result ? (
          <GlassCard key="form" delay={0.2} className="relative overflow-hidden">
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              
              {error && (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="p-4 bg-accentRed/10 border border-accentRed/30 rounded-xl flex items-center gap-3 text-accentRed">
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  <p className="text-sm">{error}</p>
                </motion.div>
              )}

              <div className="space-y-2">
                <label className="text-sm font-medium text-textMuted ml-1">Secret Text (Optional)</label>
                <textarea 
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Enter a secret message, links, or notes..."
                  className="glass-input w-full p-4 h-32 resize-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-textMuted ml-1">File Upload (Optional, max 10MB)</label>
                <div 
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`w-full border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 ${file ? 'border-primary bg-primary/5' : 'border-white/20 hover:border-primary/50 hover:bg-white/5'}`}
                >
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    className="hidden" 
                    onChange={(e) => handleFileChange(e.target.files[0])}
                    accept=".pdf,.jpg,.jpeg,.png,.docx,.txt,.zip"
                  />
                  {file ? (
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                        <File className="w-8 h-8 text-primaryLi" />
                      </div>
                      <div className="text-center">
                        <p className="font-medium text-textLight">{file.name}</p>
                        <p className="text-xs text-textMuted mt-1">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                      </div>
                      <button 
                        type="button" 
                        onClick={(e) => { e.stopPropagation(); setFile(null); }}
                        className="mt-2 text-xs text-accentRed hover:underline flex items-center gap-1"
                      >
                        <X className="w-3 h-3" /> Remove File
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-3 text-textMuted">
                      <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center">
                        <UploadCloud className="w-8 h-8 text-white/50" />
                      </div>
                      <p className="text-sm font-medium">Click or drag and drop to upload</p>
                      <p className="text-xs opacity-70">PNG, JPG, PDF, TXT, DOCX, ZIP (Max 10MB)</p>
                    </div>
                  )}
                </div>
              </div>

              <button 
                type="submit" 
                disabled={loading || (!text && !file)}
                className={`w-full py-4 mt-2 rounded-xl font-semibold flex items-center justify-center transition-all ${loading || (!text && !file) ? 'bg-white/10 text-white/50 cursor-not-allowed' : 'bg-primary hover:bg-primaryDark text-white shadow-[0_0_15px_rgba(99,102,241,0.5)] hover:shadow-[0_0_25px_rgba(99,102,241,0.7)]'}`}
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Generate Secure PIN'}
              </button>

            </form>
          </GlassCard>
        ) : (
          <GlassCard key="success" delay={0.1} className="text-center flex flex-col items-center py-12">
            <motion.div 
              initial={{ scale: 0 }} 
              animate={{ scale: 1 }} 
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="w-20 h-20 bg-accentGreen/20 text-accentGreen rounded-full flex items-center justify-center mb-6"
            >
              <CheckCircle className="w-10 h-10" />
            </motion.div>
            
            <h3 className="text-2xl font-bold mb-2">Data Secured</h3>
            <p className="text-textMuted mb-8 text-sm max-w-sm">Share this PIN with the receiver. The data will automatically expire in 10 minutes or after the first download.</p>
            
            <div className="bg-bgDark border border-white/10 rounded-2xl p-6 w-full max-w-sm mb-8 relative group">
              <p className="text-xs text-textMuted uppercase tracking-wider mb-2 font-semibold">Your Secret PIN</p>
              <div className="flex justify-center items-center gap-4">
                <span className="text-5xl font-mono font-bold tracking-[0.2em] text-white text-glow drop-shadow-md">
                  {result.pin}
                </span>
              </div>
              
              <button 
                onClick={copyToClipboard}
                className="absolute top-4 right-4 p-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors border border-white/10"
                title="Copy PIN"
              >
                {copied ? <CheckCircle className="w-5 h-5 text-accentGreen" /> : <Copy className="w-5 h-5 text-textMuted" />}
              </button>
            </div>
            
            <button 
              onClick={() => {
                setResult(null);
                setText('');
                setFile(null);
              }}
              className="text-primary hover:text-primaryLight transition-colors font-medium border-b border-primary/30 hover:border-primary pb-1"
            >
              Send Another File
            </button>
          </GlassCard>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SendPage;
