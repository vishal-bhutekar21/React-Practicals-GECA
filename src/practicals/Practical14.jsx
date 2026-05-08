import React, { useState } from 'react';
import '../styles/grocery.css';

function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);
  const increment = () => setCount((value) => value + 1);
  const decrement = () => setCount((value) => value - 1);
  const reset = () => setCount(initialValue);
  return { count, increment, decrement, reset };
}

function useInput(initialValue = '') {
  const [value, setValue] = useState(initialValue);
  const onChange = (e) => setValue(e.target.value);
  const clear = () => setValue(initialValue);
  return { value, onChange, clear };
}

export default function Practical14() {
  const counter = useCounter(0);
  const nameInput = useInput('');
  const colorInput = useInput('');
  const [saved, setSaved] = useState(null);

  const handleSave = (e) => {
    e.preventDefault();
    setSaved({ name: nameInput.value || 'Guest', color: colorInput.value || 'Blue' });
    nameInput.clear();
    colorInput.clear();
  };

  return (
    <div className="g-container" style={{ minHeight: '100vh', paddingBottom: 60 }}>
      <nav className="g-navbar">
        <h2 className="g-navbar-brand">Build Your Hooks in React</h2>
      </nav>

      <div style={{ maxWidth: 840, margin: '40px auto', padding: '0 24px' }}>
        <p style={{ color: '#64748b', fontSize: '1.1rem', marginBottom: 24 }}>
          This practical demonstrates how to build and reuse custom hooks in React to keep logic clean and shareable.
        </p>

        <div style={{ display: 'grid', gap: 24 }}>
          <section style={{ background: 'white', padding: 28, borderRadius: 18, border: '1px solid #e2e8f0' }}>
            <h3 style={{ marginTop: 0, color: '#1e293b' }}>Custom Counter Hook</h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
              <button className="g-btn-add" onClick={counter.decrement}>-</button>
              <strong style={{ fontSize: '2rem', color: '#0f172a' }}>{counter.count}</strong>
              <button className="g-btn-add" onClick={counter.increment}>+</button>
            </div>
            <button onClick={counter.reset} className="g-btn-add" style={{ marginTop: 18 }}>
              Reset Counter
            </button>
            <p style={{ color: '#475569', marginTop: 16 }}>
              The <code>useCounter</code> hook keeps all counter logic in one place so the component stays simple.
            </p>
          </section>

          <section style={{ background: 'white', padding: 28, borderRadius: 18, border: '1px solid #e2e8f0' }}>
            <h3 style={{ marginTop: 0, color: '#1e293b' }}>Custom Input Hook</h3>
            <form onSubmit={handleSave} style={{ display: 'grid', gap: 18 }}>
              <div style={{ display: 'grid', gap: 8 }}>
                <label style={{ fontWeight: 600, color: '#334155' }}>Your name</label>
                <input
                  value={nameInput.value}
                  onChange={nameInput.onChange}
                  placeholder="Type your name"
                  style={{ padding: '12px 16px', borderRadius: 10, border: '1px solid #cbd5e1', fontSize: '1rem' }}
                />
              </div>
              <div style={{ display: 'grid', gap: 8 }}>
                <label style={{ fontWeight: 600, color: '#334155' }}>Favorite color</label>
                <input
                  value={colorInput.value}
                  onChange={colorInput.onChange}
                  placeholder="Type a color"
                  style={{ padding: '12px 16px', borderRadius: 10, border: '1px solid #cbd5e1', fontSize: '1rem' }}
                />
              </div>
              <button type="submit" className="g-btn-add" style={{ width: 'fit-content' }}>
                Save profile
              </button>
            </form>
            {saved && (
              <div style={{ marginTop: 22, padding: 18, borderRadius: 16, background: '#f8fafc', border: '1px solid #cbd5e1' }}>
                <p style={{ margin: 0, color: '#334155' }}>
                  Saved <strong>{saved.name}</strong> with favorite color <strong>{saved.color}</strong>.
                </p>
              </div>
            )}
            <p style={{ color: '#475569', marginTop: 16 }}>
              The <code>useInput</code> hook centralizes input state and change handling so the form is easy to reuse.
            </p>
          </section>

          <section style={{ background: 'white', padding: 28, borderRadius: 18, border: '1px solid #e2e8f0' }}>
            <h3 style={{ marginTop: 0, color: '#1e293b' }}>Why custom hooks?</h3>
            <ul style={{ color: '#475569', lineHeight: 1.8, paddingLeft: 18 }}>
              <li>Custom hooks let you extract reusable logic from components.</li>
              <li>They keep components easier to read and test.</li>
              <li>Hooks can be shared across different parts of your app without repeating code.</li>
            </ul>
          </section>
        </div>
      </div>

      <div style={{ textAlign: 'center', padding: '20px', color: '#64748b', fontSize: '0.9rem', marginTop: 20 }}>
        <p style={{ margin: '0 0 4px 0' }}>Name : Vishal Rajesh Bhutekar</p>
        <p style={{ margin: 0 }}>Roll no: BT24S05F002</p>
      </div>
    </div>
  );
}
