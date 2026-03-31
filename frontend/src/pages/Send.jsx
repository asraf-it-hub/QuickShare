import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UploadCloud, File, X, ChevronLeft, Loader2, Share2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Send() {
  const [text, setText] = useState('');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [pin, setPin] = useState(null);
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim() && !file) {
      setError('Please provide text or upload a file.');
      return;
    }

    setLoading(true);
    setError('');

    const formData = new FormData();
    if (text.trim()) formData.append('text', text);
    if (file) formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:5000/api/share', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setPin(response.data.pin);
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong while sharing.');
    } finally {
      setLoading(false);
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
          <div className="inline-flex items-center justify-center p-3 bg-[var(--primary)]/20 rounded-full mb-4 glow-effect">
            <Share2 className="w-6 h-6 text-[var(--primary)]" />
          </div>
          <h2 className="text-3xl font-bold mb-2">Share Data</h2>
          <p className="text-[var(--text-muted)]">Upload a file or paste text to generate a PIN.</p>
        </motion.div>

        <AnimatePresence mode="wait">
          {!pin ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="glass-card rounded-2xl p-6 md:p-8"
            >
              {error && (
                <div className="bg-[var(--error)]/10 border border-[var(--error)]/50 text-[var(--error)] p-3 rounded-lg mb-6 text-sm text-center">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-[var(--text-muted)]">Secret Message (Optional)</label>
                  <textarea 
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Type something..."
                    className="w-full bg-[var(--glass)] border border-[var(--glass-border)] rounded-xl p-4 text-[var(--text-main)] placeholder-[var(--text-muted)]/50 focus:outline-none focus:border-[var(--primary)] resize-none h-32 transition-colors"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-[var(--text-muted)]">File Attachment (Optional)</label>
                  
                  {!file ? (
                    <label className="border-2 border-dashed border-[var(--glass-border)] rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer hover:border-[var(--primary)] hover:bg-[var(--primary)]/5 transition-all group">
                      <UploadCloud className="w-8 h-8 text-[var(--text-muted)] group-hover:text-[var(--primary)] mb-3 transition-colors" />
                      <span className="text-sm text-[var(--text-muted)]">Click or drag file to upload</span>
                      <input type="file" onChange={handleFileChange} className="hidden" />
                    </label>
                  ) : (
                    <div className="bg-[var(--glass)] border border-[var(--primary)]/50 rounded-xl p-4 flex items-center justify-between">
                      <div className="flex items-center gap-3 overflow-hidden">
                        <File className="w-6 h-6 text-[var(--primary)] flex-shrink-0" />
                        <span className="text-sm truncate pr-4">{file.name}</span>
                      </div>
                      <button type="button" onClick={handleRemoveFile} className="p-1 hover:bg-white/10 rounded-full transition-colors">
                        <X className="w-5 h-5 text-[var(--text-muted)]" />
                      </button>
                    </div>
                  )}
                </div>

                <button 
                  type="submit" 
                  disabled={loading || (!text.trim() && !file)}
                  className="w-full glow-btn text-white font-medium py-4 rounded-xl flex items-center justify-center gap-2 mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Generate PIN'}
                </button>
              </form>
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-card rounded-2xl p-8 text-center border-[var(--primary)]/50 relative overflow-hidden flex flex-col items-center justify-center min-h-[400px]"
            >
              <div className="absolute inset-0 bg-[var(--primary)]/5 pointer-events-none" />
              <div className="absolute -top-32 -left-32 w-64 h-64 bg-[var(--primary)]/20 rounded-full blur-[100px] pointer-events-none" />
              
              <h3 className="text-xl text-[var(--text-muted)] mb-2 relative z-10">Your Code Is Ready</h3>
              <p className="text-sm text-[var(--text-muted)]/70 mb-8 relative z-10 max-w-xs mx-auto">
                Share this PIN with the receiver. This data will be automatically deleted in 10 minutes.
              </p>
              
              <motion.div 
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                className="text-7xl font-bold tracking-[0.2em] text-[var(--text-main)] mb-12 drop-shadow-[0_0_25px_rgba(99,102,241,0.5)] bg-[var(--glass)] border border-[var(--glass-border)] py-6 px-4 rounded-2xl font-mono w-full"
              >
                {pin}
              </motion.div>

              <button 
                onClick={() => { setPin(null); setText(''); setFile(null); }}
                className="px-6 py-2 rounded-full border border-[var(--glass-border)] hover:bg-[var(--glass)] transition-colors relative z-10"
              >
                Share Another
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
