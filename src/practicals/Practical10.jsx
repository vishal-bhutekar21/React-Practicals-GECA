import React from 'react';
import '../styles/grocery.css';

// --- Wrapper Components (Demonstrating Composition) ---

// 1. A generic Section Wrapper
function GrocerySection({ title, children, bgColor = '#ffffff' }) {
  return (
    <section style={{ backgroundColor: bgColor, padding: '40px 24px', borderRadius: 16, marginBottom: 24 }}>
      <h2 style={{ margin: '0 0 24px 0', fontSize: '1.75rem', color: '#1e293b' }}>{title}</h2>
      {/* props.children is where the nested content gets injected */}
      {children}
    </section>
  );
}

// 2. A Call-To-Action Promo Card
function PromoCard({ children }) {
  return (
    <div style={{ 
      background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', 
      color: 'white', padding: 32, borderRadius: 16, textAlign: 'center',
      boxShadow: '0 10px 15px -3px rgba(16,185,129,0.3)'
    }}>
      {children}
    </div>
  );
}

// 3. A Simple flexible row container
function FlexRow({ children }) {
  return (
    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
      {children}
    </div>
  );
}

// --- Specific Content Components ---
function GroceryItem({ name, emoji }) {
  return (
    <div style={{ 
      background: 'white', border: '1px solid #e2e8f0', borderRadius: 12, 
      padding: '16px 24px', display: 'flex', alignItems: 'center', gap: 12,
      fontWeight: 600, color: '#334155', boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
    }}>
      <span style={{ fontSize: '1.5rem' }}>{emoji}</span> {name}
    </div>
  );
}

export default function Practical10() {
  return (
    <div className="g-container" style={{ paddingBottom: 40 }}>
      <nav className="g-navbar">
        <h2 className="g-navbar-brand">Composition Demo</h2>
      </nav>

      <div style={{ maxWidth: 800, margin: '40px auto', padding: '0 24px' }}>
        <p style={{ color: '#64748b', fontSize: '1.1rem', marginBottom: 32 }}>
          This practical demonstrates building generic Layout components (Wrappers) that render custom content via <code>props.children</code>.
        </p>

        {/* Using Composition: Passing elements inside GrocerySection */}
        <GrocerySection title="Fresh Daily Picks" bgColor="#f8fafc">
          <FlexRow>
            <GroceryItem name="Organic Bananas" emoji="🍌" />
            <GroceryItem name="Green Apples" emoji="🍏" />
            <GroceryItem name="Watermelon" emoji="🍉" />
          </FlexRow>
        </GrocerySection>

        {/* Composing a completely different UI structure inside the same Wrappers */}
        <GrocerySection title="Special Offers">
          <PromoCard>
            <h3 style={{ margin: '0 0 8px 0', fontSize: '1.5rem' }}>Weekend Market Sale!</h3>
            <p style={{ margin: '0 0 24px 0', opacity: 0.9 }}>Get 20% off all dairy products when you order before Saturday.</p>
            <button style={{ 
              background: 'white', color: '#059669', border: 'none', 
              padding: '10px 20px', borderRadius: 8, fontWeight: 700, cursor: 'pointer' 
            }}>
              Claim Offer
            </button>
          </PromoCard>
        </GrocerySection>

      </div>

      <div style={{ textAlign: 'center', padding: '20px', color: '#64748b', fontSize: '0.9rem', borderTop: '1px solid #e2e8f0' }}>
        <p style={{ margin: '0 0 4px 0' }}>Name : Vishal Rajesh Bhutekar</p>
        <p style={{ margin: 0 }}>Roll no: BT24S05F002</p>
      </div>
    </div>
  );
}
