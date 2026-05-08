import React, { useState } from 'react';
import '../styles/grocery.css';

export default function Practical12() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [name, setName] = useState('');
  const [status, setStatus] = useState('visitor');

  const handleLogin = (e) => {
    e.preventDefault();
    if (name.trim()) {
      setIsLoggedIn(true);
      setStatus('member');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setName('');
    setStatus('visitor');
  };

  return (
    <div className="g-container" style={{ minHeight: '100vh', paddingBottom: 60 }}>
      <nav className="g-navbar">
        <h2 className="g-navbar-brand">Conditional Rendering Demo</h2>
      </nav>

      <div style={{ maxWidth: 780, margin: '40px auto', padding: '0 24px' }}>
        <p style={{ color: '#64748b', fontSize: '1.1rem', marginBottom: 24 }}>
          This practical shows how React can render different content based on state, and how a component chooses what to show.
        </p>

        <div style={{ display: 'grid', gap: 24 }}>
          {!isLoggedIn ? (
            <div style={{ background: 'white', borderRadius: 18, padding: 28, border: '1px solid #e2e8f0' }}>
              <h3 style={{ marginTop: 0, color: '#1e293b' }}>Guest sign in</h3>
              <p style={{ color: '#475569' }}>Enter your name and become a site member. The page content updates when you log in.</p>
              <form onSubmit={handleLogin}> 
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Type your name..."
                  style={{ width: '100%', padding: '14px 16px', borderRadius: 10, border: '1px solid #cbd5e1', marginBottom: 18, fontSize: '1rem' }}
                />
                <button type="submit" className="g-btn-add" style={{ width: '100%' }}>
                  Log in and show member view
                </button>
              </form>
            </div>
          ) : (
            <div style={{ background: '#f8fafc', borderRadius: 18, padding: 28, border: '1px solid #d1fae5' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}>
                <div>
                  <h3 style={{ margin: 0, color: '#0f172a' }}>Welcome back, {name}!</h3>
                  <p style={{ margin: '8px 0 0', color: '#334155' }}>You are logged in as a {status}. Enjoy your dashboard.</p>
                </div>
                <button onClick={handleLogout} style={{ padding: '12px 18px', borderRadius: 10, background: '#f43f5e', color: 'white', border: 'none', cursor: 'pointer' }}>
                  Log out
                </button>
              </div>

              <div style={{ marginTop: 24, display: 'grid', gap: 18 }}>
                <Card title="Member-only summary" color="#0ea5e9">
                  You can see this because the conditional render showed the member UI instead of the guest form.
                </Card>
                <Card title="Conditional welcome" color="#10b981">
                  If there was no user, this component would not render. React chooses output based on <code>isLoggedIn</code>.
                </Card>
              </div>
            </div>
          )}

          <div style={{ background: 'white', padding: 24, borderRadius: 18, border: '1px solid #e2e8f0' }}>
            <h4 style={{ margin: '0 0 12px 0', color: '#1e293b' }}>What this demonstrates</h4>
            <ul style={{ color: '#475569', lineHeight: 1.8 }}>
              <li>Using a boolean state value to render either a login form or member dashboard.</li>
              <li>Showing/hiding content conditionally with JavaScript expressions in JSX.</li>
              <li>Updating the component display immediately when state changes.</li>
            </ul>
          </div>
        </div>
      </div>

      <div style={{ textAlign: 'center', padding: '20px', color: '#64748b', fontSize: '0.9rem', marginTop: 20 }}>
        <p style={{ margin: '0 0 4px 0' }}>Name : Vishal Rajesh Bhutekar</p>
        <p style={{ margin: 0 }}>Roll no: BT24S05F002</p>
      </div>
    </div>
  );
}

function Card({ title, children, color }) {
  return (
    <div style={{ padding: 20, borderRadius: 16, background: color === '#ffffff' ? '#fff' : '#ffffff', border: '1px solid #e2e8f0' }}>
      <h4 style={{ margin: '0 0 10px 0', color: '#0f172a' }}>{title}</h4>
      <p style={{ margin: 0, color: '#334155' }}>{children}</p>
    </div>
  );
}
