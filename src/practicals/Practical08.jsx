import React, { useState, useEffect } from 'react';
import '../styles/grocery.css';

export default function Practical08() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('grocery_cart');
    if (saved) {
      try {
        setCart(JSON.parse(saved));
      } catch (e) {}
    }
  }, []);

  const updateQty = (id, delta) => {
    setCart((prev) => {
      const newCart = prev.map((item) => {
        if (item.id === id) {
          const newQty = item.qty + delta;
          return newQty > 0 ? { ...item, qty: newQty } : item;
        }
        return item;
      }).filter((item) => item.qty > 0 || delta > 0); 
      
      const finalCart = newCart.filter(item => {
        if (item.id === id && item.qty === 0 && delta === -1) return false;
        return true;
      });
      
      localStorage.setItem('grocery_cart', JSON.stringify(finalCart));
      return finalCart;
    });
  };

  const removeItem = (id) => {
    setCart((prev) => {
      const newCart = prev.filter((item) => item.id !== id);
      localStorage.setItem('grocery_cart', JSON.stringify(newCart));
      return newCart;
    });
  };

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const tax = subtotal * 0.05; 
  const shipping = subtotal > 0 ? 50 : 0;
  const total = subtotal + tax + shipping;

  const totalItems = cart.reduce((s, x) => s + x.qty, 0);

  return (
    <div className="g-container">
      {/* Upgraded Modern Header */}
      <nav className="g-navbar">
        <h2 className="g-navbar-brand">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
          Grocery<span>Mart</span> Checkout
        </h2>
        
        <div className="g-nav-actions">
          <button className="g-nav-icon-btn" title="Notifications">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
            <span style={{ position: 'absolute', top: 4, right: 6, width: 8, height: 8, background: '#ef4444', borderRadius: '50%', border: '2px solid white' }}></span>
          </button>
          
          <button className="g-btn g-btn-cart">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
            Cart
            {totalItems > 0 && <span className="g-cart-badge">{totalItems}</span>}
          </button>

          <div className="g-nav-profile" title="Vishal">
            V
          </div>
        </div>
      </nav>

      {/* Progress Stepper UI */}
      <div style={{ maxWidth: 800, margin: '30px auto 10px auto', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#10b981', fontWeight: 700 }}>
          <div style={{ width: 24, height: 24, borderRadius: '50%', background: '#10b981', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem' }}>1</div>
          Cart
        </div>
        <div style={{ width: 40, height: 2, background: '#e2e8f0' }}></div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#94a3b8', fontWeight: 600 }}>
          <div style={{ width: 24, height: 24, borderRadius: '50%', background: '#e2e8f0', color: '#64748b', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem' }}>2</div>
          Delivery
        </div>
        <div style={{ width: 40, height: 2, background: '#e2e8f0' }}></div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#94a3b8', fontWeight: 600 }}>
          <div style={{ width: 24, height: 24, borderRadius: '50%', background: '#e2e8f0', color: '#64748b', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem' }}>3</div>
          Payment
        </div>
      </div>

      {cart.length === 0 ? (
        <div className="g-empty-cart" style={{ background: '#fff', maxWidth: 600, margin: '40px auto', borderRadius: 16, border: '1px solid #e2e8f0', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
          <div style={{ background: '#f1f5f9', width: 80, height: 80, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px auto' }}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
          </div>
          <h2 style={{ color: '#1e293b', margin: '0 0 12px 0' }}>Your cart is empty</h2>
          <p style={{ margin: '0 auto 24px auto', maxWidth: 300 }}>Looks like you haven't added anything to your cart yet.</p>
          <button className="g-btn-add" onClick={() => alert('Head back to Practical 05!')}>Continue Shopping</button>
        </div>
      ) : (
        <div className="g-cart-layout">
          <div className="g-cart-items-section" style={{ border: '1px solid #e2e8f0', background: '#fff' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #f8fafc', paddingBottom: 16, marginBottom: 24 }}>
              <h2 style={{ margin: 0, fontSize: '1.5rem', border: 'none', padding: 0 }}>Shopping Cart ({totalItems} items)</h2>
            </div>
            
            {cart.map((item) => (
              <div key={item.id} className="g-cart-item" style={{ padding: '24px 0', borderColor: '#f1f5f9' }}>
                <img className="g-cart-item-img" src={item.img} alt={item.name} style={{ width: 100, height: 100, borderRadius: 12, boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }} />
                <div className="g-cart-item-details">
                  <h4 className="g-cart-item-title" style={{ fontSize: '1.2rem' }}>{item.name}</h4>
                  <div className="g-cart-item-price" style={{ color: '#10b981', fontWeight: 600 }}>₹{item.price} / unit</div>
                  <button onClick={() => removeItem(item.id)} style={{ display: 'inline-flex', alignItems: 'center', gap: 4, background: '#fef2f2', border: '1px solid #fca5a5', color: '#ef4444', fontSize: '0.8rem', cursor: 'pointer', padding: '4px 8px', borderRadius: 6, marginTop: '12px', fontWeight: 600 }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                    Remove
                  </button>
                </div>
                <div className="g-qty-controls" style={{ border: '1px solid #e2e8f0' }}>
                  <button className="g-qty-btn" onClick={() => updateQty(item.id, -1)}>-</button>
                  <div className="g-qty-value">{item.qty}</div>
                  <button className="g-qty-btn" onClick={() => updateQty(item.id, 1)}>+</button>
                </div>
                <div className="g-cart-item-total" style={{ fontSize: '1.25rem' }}>
                  ₹{item.price * item.qty}
                </div>
              </div>
            ))}
          </div>

          <div className="g-summary-section" style={{ background: 'linear-gradient(180deg, #f8fafc 0%, #ffffff 100%)', border: '1px solid #e2e8f0' }}>
            <h3 style={{ borderBottom: '2px solid #e2e8f0', paddingBottom: 16, marginBottom: 16 }}>Order Summary</h3>
            <div className="g-summary-row">
              <span style={{ color: '#64748b' }}>Subtotal</span>
              <span style={{ fontWeight: 600 }}>₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="g-summary-row">
              <span style={{ color: '#64748b' }}>Estimated Tax (5%)</span>
              <span style={{ fontWeight: 600 }}>₹{tax.toFixed(2)}</span>
            </div>
            <div className="g-summary-row">
              <span style={{ color: '#64748b' }}>Fast Delivery</span>
              <span style={{ fontWeight: 600 }}>₹{shipping.toFixed(2)}</span>
            </div>
            
            {/* Promo Code Dummy Input */}
            <div style={{ display: 'flex', gap: 8, marginTop: 24, marginBottom: 8 }}>
              <input type="text" placeholder="Promo code" style={{ flex: 1, padding: '10px 12px', borderRadius: 8, border: '1px solid #cbd5e1', outline: 'none' }} />
              <button style={{ background: '#1e293b', color: 'white', border: 'none', borderRadius: 8, padding: '0 16px', fontWeight: 600, cursor: 'pointer' }}>Apply</button>
            </div>

            <div className="g-summary-row total" style={{ borderTopColor: '#e2e8f0', borderTopWidth: 1, fontSize: '1.5rem', color: '#10b981' }}>
              <span>Total</span>
              <span>₹{total.toFixed(2)}</span>
            </div>
            <button className="g-btn-checkout" onClick={() => alert('Proceeding to Next Step (Practical 11 Form)!')} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
              Proceed to Checkout
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </button>
          </div>
        </div>
      )}

      <div style={{ textAlign: 'center', padding: '40px 20px', color: '#64748b', fontSize: '0.9rem' }}>
        <p style={{ margin: '0 0 4px 0' }}>Name : Vishal Rajesh Bhutekar</p>
        <p style={{ margin: 0 }}>Roll no: BT24S05F002</p>
      </div>
    </div>
  );
}
