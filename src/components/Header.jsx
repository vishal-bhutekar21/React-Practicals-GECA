import React from 'react';

export default function Header({ onHome, showBack }) {
  return (
    <header style={{ 
      background: 'rgba(15, 23, 42, 0.95)', 
      backdropFilter: 'blur(12px)', 
      borderBottom: '1px solid rgba(255,255,255,0.1)', 
      padding: '16px 24px', 
      position: 'sticky', 
      top: 0, 
      zIndex: 100,
      boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
    }}>
      <div style={{ 
        maxWidth: 1200, 
        margin: '0 auto', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between' 
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {/* Logo Icon */}
          <div style={{ 
            width: 32, 
            height: 32, 
            borderRadius: 8, 
            background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            color: 'white',
            fontWeight: 800,
            fontSize: '1.2rem',
            boxShadow: '0 2px 10px rgba(59, 130, 246, 0.3)'
          }}>
            R
          </div>
          <div style={{ fontSize: '1.25rem', color: '#f8fafc', fontWeight: 800, letterSpacing: '-0.02em' }}>
            React<span style={{ color: '#60a5fa', fontWeight: 400 }}>Mastery</span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          {showBack && (
            <button 
              onClick={onHome}
              style={{
                background: 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.2)',
                color: '#f8fafc',
                padding: '8px 16px',
                borderRadius: '999px',
                fontWeight: 600,
                fontSize: '0.9rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                transition: 'all 0.2s ease',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.2)';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
              View All Modules
            </button>
          )}
          
          <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#334155', border: '2px solid #475569', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#cbd5e1', fontWeight: 600, fontSize: '0.9rem', cursor: 'pointer' }}>
            US
          </div>
        </div>
      </div>
    </header>
  );
}
