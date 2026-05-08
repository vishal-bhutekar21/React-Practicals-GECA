import React, { useState } from 'react';

export default function Practical03() {
  const [a, setA] = useState('');
  const [b, setB] = useState('');
  const [result, setResult] = useState(null);

  const asNumber = (v) => parseFloat(v || 0);

  const handle = (op) => {
    const na = asNumber(a);
    const nb = asNumber(b);
    let res = null;
    switch (op) {
      case '+': res = na + nb; break;
      case '-': res = na - nb; break;
      case '*': res = na * nb; break;
      case '/': res = nb === 0 ? '∞' : na / nb; break;
      default: res = null;
    }
    setResult(res);
  };

  return (
    <div style={{ maxWidth: 640 }}>
      <h2>Practical 03 — Simple Calculator</h2>

      <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
        <div style={{ flex: 1 }}>
          <label style={{ display: 'block', fontSize: 13, color: '#334155', marginBottom: 6 }}>Number A</label>
          <input value={a} onChange={(e) => setA(e.target.value)} placeholder="0" style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid #e6eef8' }} />
        </div>

        <div style={{ flex: 1 }}>
          <label style={{ display: 'block', fontSize: 13, color: '#334155', marginBottom: 6 }}>Number B</label>
          <input value={b} onChange={(e) => setB(e.target.value)} placeholder="0" style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid #e6eef8' }} />
        </div>
      </div>

      <div style={{ marginTop: 12, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <button className="btn btn-primary" onClick={() => handle('+')}>Add</button>
        <button className="btn" onClick={() => handle('-')}>Subtract</button>
        <button className="btn" onClick={() => handle('*')}>Multiply</button>
        <button className="btn" onClick={() => handle('/')}>Divide</button>
        <button className="btn" onClick={() => { setA(''); setB(''); setResult(null); }}>Clear</button>
      </div>

      <div style={{ marginTop: 14, background: '#fff', border: '1px solid #eef2f7', padding: 12, borderRadius: 8 }}>
        <div style={{ fontSize: 13, color: '#475569' }}>Result</div>
        <div style={{ marginTop: 6, fontSize: 20, fontWeight: 700 }}>{result !== null ? result : '—'}</div>
      </div>

      <hr style={{ marginTop: 18 }} />
      <p>Name : Vishal Rajesh Bhutekar</p>
      <p>Roll no: BT24S05F002</p>
    </div>
  );
}
