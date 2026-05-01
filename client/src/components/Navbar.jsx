import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Share2 } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();

  const navLinks = [
    { name: 'Send', path: '/send' },
    { name: 'Receive', path: '/receive' },
    { name: 'About', path: '/about' },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 glass-card !rounded-none !border-t-0 !border-x-0 !border-b-white/5 py-4 px-6 lg:px-12 flex items-center justify-between">
      <Link to="/" className="flex items-center gap-2 group">
        <div className="p-2 bg-primary/20 rounded-xl group-hover:bg-primary/30 transition-colors">
          <Share2 className="text-primary w-6 h-6" />
        </div>
        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primaryLight to-accentGreen">
          QuickShare
        </span>
      </Link>
      
      <div className="flex gap-6 items-center">
        {navLinks.map((link) => (
          <Link
            key={link.name}
            to={link.path}
            className={`text-sm tracking-wide transition-colors ${
              location.pathname.startsWith(link.path)
                ? 'text-primaryLight font-medium w-fit'
                : 'text-textMuted hover:text-white'
            }`}
          >
            {link.name}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
