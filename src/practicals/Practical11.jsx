import React, { useState } from 'react';
import '../styles/grocery.css';

export default function Practical11() {
  // Use a single state object to manage the form (Controlled Components)
  const [formData, setFormData] = useState({
    fullName: '',
    address: '',
    deliverySpeed: 'standard', // default radio option
    saveDetails: true,         // default checkbox option
  });

  const [submitted, setSubmitted] = useState(false);

  // Generic change handler for all inputs
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, send formData to the server here
    console.log('Order Details Submitted:', formData);
    setSubmitted(true);
  };

  // Modern input styles
  const inputStyle = {
    width: '100%', padding: '12px 16px', borderRadius: 8,
    border: '1px solid #cbd5e1', fontSize: '1rem', outline: 'none',
    boxSizing: 'border-box', marginTop: 8, marginBottom: 16,
    fontFamily: 'inherit'
  };

  const labelStyle = { fontWeight: 600, color: '#334155', display: 'block' };

  return (
    <div className="g-container" style={{ minHeight: '100vh', paddingBottom: 60 }}>
      <nav className="g-navbar">
        <h2 className="g-navbar-brand">React Forms Demo</h2>
      </nav>

      <div style={{ maxWidth: 600, margin: '40px auto', padding: '0 24px' }}>
        
        {submitted ? (
          <div style={{ textAlign: 'center', padding: 40, background: '#ecfdf5', borderRadius: 16, border: '2px solid #10b981' }}>
            <div style={{ fontSize: '3rem', marginBottom: 16 }}>🚚</div>
            <h2 style={{ color: '#059669', margin: '0 0 12px 0' }}>Order Received!</h2>
            <p style={{ color: '#334155', margin: 0 }}>
              Thanks, <strong>{formData.fullName}</strong>. Your groceries will be delivered via <strong>{formData.deliverySpeed}</strong> shipping to:
            </p>
            <p style={{ background: 'white', padding: 12, borderRadius: 8, marginTop: 16 }}>{formData.address}</p>
            <button className="g-btn-add" onClick={() => setSubmitted(false)} style={{ marginTop: 24 }}>
              Submit Another Order
            </button>
          </div>
        ) : (
          <div style={{ background: 'white', padding: 32, borderRadius: 16, boxShadow: '0 4px 6px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0' }}>
            <h2 style={{ margin: '0 0 8px 0', color: '#1e293b' }}>Delivery Details</h2>
            <p style={{ color: '#64748b', marginBottom: 24 }}>Demonstrating Controlled Components in React.</p>

            <form onSubmit={handleSubmit}>
              {/* Text Input */}
              <label style={labelStyle}>Full Name</label>
              <input 
                type="text" 
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
                style={inputStyle}
                placeholder="John Doe"
              />

              {/* Textarea */}
              <label style={labelStyle}>Delivery Address</label>
              <textarea 
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                style={{ ...inputStyle, minHeight: 100, resize: 'vertical' }}
                placeholder="123 Fresh Lane, Metro City"
              />

              {/* Radio Buttons */}
              <label style={labelStyle}>Delivery Speed</label>
              <div style={{ display: 'flex', gap: 24, marginTop: 12, marginBottom: 24 }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                  <input 
                    type="radio" 
                    name="deliverySpeed" 
                    value="standard" 
                    checked={formData.deliverySpeed === 'standard'}
                    onChange={handleChange}
                  /> Standard (2-3 hrs)
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                  <input 
                    type="radio" 
                    name="deliverySpeed" 
                    value="express" 
                    checked={formData.deliverySpeed === 'express'}
                    onChange={handleChange}
                  /> Express (45 mins)
                </label>
              </div>

              {/* Checkbox */}
              <label style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer', marginBottom: 32, padding: 16, background: '#f8fafc', borderRadius: 8 }}>
                <input 
                  type="checkbox" 
                  name="saveDetails"
                  checked={formData.saveDetails}
                  onChange={handleChange}
                  style={{ width: 18, height: 18 }}
                /> 
                <span style={{ fontWeight: 600, color: '#334155' }}>Save this address for fast checkout next time</span>
              </label>

              {/* Submit */}
              <button type="submit" className="g-btn-add" style={{ width: '100%', padding: '16px', fontSize: '1.1rem' }}>
                Confirm & Ship Order
              </button>
            </form>
          </div>
        )}

      </div>
      
      <div style={{ textAlign: 'center', padding: '20px', color: '#64748b', fontSize: '0.9rem', marginTop: 20 }}>
        <p style={{ margin: '0 0 4px 0' }}>Name : Vishal Rajesh Bhutekar</p>
        <p style={{ margin: 0 }}>Roll no: BT24S05F002</p>
      </div>
    </div>
  );
}
