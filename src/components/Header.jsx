import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const navItems = [
    { path: '/', label: 'Accueil' },
    { path: '/recherche', label: 'Recherche' },
    { path: '/favoris', label: 'Favoris' },
    { path: '/ajouter', label: 'Ajouter' }
  ];

  return (
    <header style={{ 
      background: 'linear-gradient(135deg, #8b7355 0%, #a0826d 50%, #8b7355 100%)',
      boxShadow: '0 4px 20px rgba(139, 115, 85, 0.15)',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      backdropFilter: 'blur(10px)',
      WebkitBackdropFilter: 'blur(10px)'
    }}>
      <div className="header-container">
        {/* Logo */}
        <Link 
          to="/" 
          className="logo"
          style={{
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <div style={{
            width: '40px',
            height: '40px',
            background: 'linear-gradient(45deg, #ffffff, #f7f3e9)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: '0.75rem',
            fontSize: '1.2rem',
            fontWeight: 'bold',
            color: '#8b7355',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
          }}>
            M
          </div>
          <span style={{ 
            fontWeight: '800',
            fontSize: '1.5rem',
            background: 'linear-gradient(45deg, #ffffff, #f7f3e9)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            textFillColor: 'transparent'
          }}>
            MovieDB
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav style={{ display: 'none' }} className="desktop-nav">
          <ul style={{ 
            display: 'flex', 
            listStyle: 'none', 
            gap: '0.5rem',
            margin: 0,
            padding: 0
          }}>
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  style={{
                    color: 'white',
                    textDecoration: 'none',
                    padding: '0.75rem 1.5rem',
                    borderRadius: '2rem',
                    fontWeight: '600',
                    fontSize: '0.95rem',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    background: isActive(item.path) 
                      ? 'rgba(255, 255, 255, 0.2)' 
                      : 'transparent',
                    backdropFilter: isActive(item.path) ? 'blur(10px)' : 'none',
                    border: isActive(item.path) 
                      ? '1px solid rgba(255, 255, 255, 0.3)' 
                      : '1px solid transparent',
                    display: 'flex',
                    alignItems: 'center',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive(item.path)) {
                      e.target.style.background = 'rgba(255, 255, 255, 0.15)';
                      e.target.style.transform = 'translateY(-2px)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive(item.path)) {
                      e.target.style.background = 'transparent';
                      e.target.style.transform = 'translateY(0)';
                    }
                  }}
                >
                  <span>{item.label}</span>
                  {isActive(item.path) && (
                    <div style={{
                      position: 'absolute',
                      bottom: '0',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: '30px',
                      height: '3px',
                      background: 'linear-gradient(90deg, #ffffff, #f7f3e9)',
                      borderRadius: '2px',
                      animation: 'slideIn 0.3s ease-out'
                    }} />
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="mobile-menu-btn"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          style={{
            display: 'none',
            background: 'none',
            border: 'none',
            color: 'white',
            fontSize: '1.5rem',
            cursor: 'pointer',
            padding: '0.5rem',
            borderRadius: '0.5rem',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.target.style.background = 'rgba(255, 255, 255, 0.1)';
          }}
          onMouseLeave={(e) => {
            e.target.style.background = 'none';
          }}
        >
          {isMobileMenuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile Menu */}
      <div 
        className="mobile-menu"
        style={{
          display: isMobileMenuOpen ? 'block' : 'none',
          position: 'absolute',
          top: '100%',
          left: '0',
          right: '0',
          background: 'linear-gradient(135deg, #8b7355 0%, #a0826d 100%)',
          boxShadow: '0 8px 32px rgba(139, 115, 85, 0.3)',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          transform: isMobileMenuOpen ? 'translateY(0)' : 'translateY(-100%)',
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          zIndex: 999
        }}
      >
        <div style={{ padding: '2rem' }}>
          <ul style={{ 
            listStyle: 'none', 
            margin: 0, 
            padding: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem'
          }}>
            {navItems.map((item, index) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  style={{
                    color: 'white',
                    textDecoration: 'none',
                    padding: '1rem 1.5rem',
                    borderRadius: '1rem',
                    fontWeight: '600',
                    fontSize: '1.1rem',
                    transition: 'all 0.3s ease',
                    background: isActive(item.path) 
                      ? 'rgba(255, 255, 255, 0.2)' 
                      : 'transparent',
                    border: isActive(item.path) 
                      ? '1px solid rgba(255, 255, 255, 0.3)' 
                      : '1px solid transparent',
                    display: 'flex',
                    alignItems: 'center',
                    animation: `slideInUp 0.4s ease-out ${index * 0.1}s both`
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive(item.path)) {
                      e.target.style.background = 'rgba(255, 255, 255, 0.15)';
                      e.target.style.transform = 'translateX(8px)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive(item.path)) {
                      e.target.style.background = 'transparent';
                      e.target.style.transform = 'translateX(0)';
                    }
                  }}
                >
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Styles */}
      <style jsx>{`
        @keyframes slideIn {
          from {
            width: 0;
            opacity: 0;
          }
          to {
            width: 30px;
            opacity: 1;
          }
        }

        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .desktop-nav {
          display: flex !important;
        }

        .mobile-menu-btn {
          display: none !important;
        }

        @media (max-width: 768px) {
          .desktop-nav {
            display: none !important;
          }
          
          .mobile-menu-btn {
            display: block !important;
          }
        }
      `}</style>
    </header>
  );
};

export default Header;
