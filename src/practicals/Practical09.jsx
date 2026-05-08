import React, { useState } from 'react';
import '../styles/grocery.css';

export default function Practical09() {
  const [hoverState, setHoverState] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [discountCode, setDiscountCode] = useState('');
  const [message, setMessage] = useState('');

  // 1. Mouse Event: onMouseEnter / onMouseLeave
  const handleMouseEnter = () => setHoverState(true);
  const handleMouseLeave = () => setHoverState(false);

  // 2. Click Event: onClick
  const handleClick = () => setClickCount(c => c + 1);

  // 3. Keyboard Event / Input Change: onChange
  const handleChange = (e) => setDiscountCode(e.target.value.toUpperCase());

  // 4. Form Submit Event: onSubmit
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents page reload
    if (discountCode === 'FRESH50') {
      setMessage('🎉 Success! 50% discount applied to your next grocery order.');
    } else {
      setMessage('❌ Invalid code. Try "FRESH50".');
    }
  };

  return (
    <div className="g-container">
      <nav className="g-navbar">
        <h2 className="g-navbar-brand">Event Handling Demo</h2>
      </nav>

      <div style={{ maxWidth: 800, margin: '40px auto', padding: '0 24px' }}>
        <p style={{ color: '#64748b', fontSize: '1.1rem', marginBottom: 32 }}>
          This practical demonstrates various synthetic events in React like hovering, clicking, keyboard input, and form submission.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
          {/* Card 1: Mouse and Click Events */}
          <div 
            style={{
              padding: 24, 
              borderRadius: 16,
              background: hoverState ? '#ecfdf5' : '#ffffff',
              border: `2px solid ${hoverState ? '#10b981' : '#e2e8f0'}`,
              transition: 'all 0.3s ease',
              textAlign: 'center',
              cursor: 'pointer'
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}
          >
            <div style={{ fontSize: '3rem', marginBottom: 12 }}>{hoverState ? '🥑' : '🍎'}</div>
            <h3 style={{ margin: '0 0 12px 0', color: '#1e293b' }}>
              {hoverState ? 'Hovered! Real-time state.' : 'Hover over me!'}
            </h3>
            <p style={{ color: '#64748b' }}>
              You have clicked this card <strong>{clickCount}</strong> times.
            </p>
          </div>

          {/* Card 2: Keyboard and Form Events */}
          <div style={{ padding: 24, borderRadius: 16, background: '#ffffff', border: '1px solid #e2e8f0' }}>
            <h3 style={{ margin: '0 0 16px 0', color: '#1e293b' }}>Promo Code Validator</h3>
            
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: 16 }}>
                <input 
                  type="text" 
                  value={discountCode}
                  onChange={handleChange}
                  placeholder="Enter code..." 
                  style={{
                    width: '100%', padding: '12px 16px', borderRadius: 8,
                    border: '1px solid #cbd5e1', fontSize: '1rem', outline: 'none',
                    boxSizing: 'border-box'
                  }}
                />
              </div>
              <button 
                type="submit" 
                className="g-btn-add" 
                style={{ width: '100%', padding: '12px' }}
              >
                Apply Coupon (Submit Event)
              </button>
            </form>

            {message && (
              <div style={{ marginTop: 16, padding: 12, borderRadius: 8, background: '#f8fafc', color: message.includes('❌') ? '#ef4444' : '#10b981', fontWeight: 600 }}>
                {message}
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div style={{ textAlign: 'center', padding: '20px', color: '#64748b', fontSize: '0.9rem', marginTop: 40, borderTop: '1px solid #e2e8f0' }}>
        <p style={{ margin: '0 0 4px 0' }}>Name : Vishal Rajesh Bhutekar</p>
        <p style={{ margin: 0 }}>Roll no: BT24S05F002</p>
      </div>
    </div>
  );
}
