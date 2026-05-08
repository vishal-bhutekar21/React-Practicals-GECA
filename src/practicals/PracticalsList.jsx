import React from 'react';

const practicals = [
  { id: '01', title: 'Simple Hello World', desc: 'Introduction to React rendering and JSX syntax.' },
  { id: '02', title: 'Student Profile', desc: 'Display static data using JSX elements and styling.' },
  { id: '03', title: 'Simple Calculator', desc: 'Basic functional component with simple logic.' },
  { id: '04', title: 'Login / Register', desc: 'Building basic UI layouts with flexbox and conditionals.' },
  { id: '05', title: 'Grocery Store (Hooks & State)', desc: 'Managing application state like shopping carts and search queries.' },
  { id: '06', title: 'Parent-Child Data (Scorecard)', desc: 'Passing props from parent components to independent child components.' },
  { id: '07', title: 'State & Lifecycle Demo', desc: 'Understanding Component lifecycle using React Hooks (useEffect).' },
  { id: '08', title: 'Shopping Checkout Detailed', desc: 'Using local storage to pass data between unmounted components.' },
  { id: '09', title: 'Event Handling (Grocery Promos)', desc: 'Handling hover, click, and keyboard events within a React application.' },
  { id: '10', title: 'Composition (Grocery Layouts)', desc: 'Building reusable wrapper components and injecting data using `props.children`.' },
  { id: '11', title: 'React Forms (Checkout Delivery)', desc: 'Managing controlled inputs like textfields, checkboxes, and radio buttons.' },
  { id: '12', title: 'Conditional Rendering', desc: 'Show different UI content based on React state values.' },
  { id: '13', title: 'State Hooks Demonstration', desc: 'Managing multiple independent pieces of state with useState.' },
  { id: '14', title: 'Build Your Hooks', desc: 'Create and reuse custom hooks to keep React logic organized.' },
  { id: '15', title: 'Car Game Mini Project', desc: 'Build a small infinite road car game using React state and hooks.' },
];

const miniProjects = [
  { id: 'grocery-delivery', title: '🛒 Grocery Delivery App', desc: 'Full-featured e-commerce grocery app with cart, checkout, orders, and persistent storage.', icon: '🚀' },
  { id: '15', title: '🏁 Car Racing Game', desc: 'Interactive infinite road racing game with levels, lives, coins, and high score tracking.', icon: '🎮' },
];

export default function PracticalsList({ onSelect }) {
  return (
    <div style={{ width: '100%', minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', paddingBottom: 40 }}>
      {/* Header */}
      <div style={{ background: 'rgba(255,255,255,0.95)', padding: '40px 24px', textAlign: 'center', borderBottom: '2px solid #e5e7eb' }}>
        <h1 style={{ margin: '0 0 12px 0', fontSize: '2.5rem', fontWeight: 800, color: '#1e293b' }}>📚 React Practicals & Mini Projects</h1>
        <p style={{ margin: 0, color: '#64748b', fontSize: '1.1rem' }}>Master React through hands-on examples and real-world projects</p>
      </div>

      {/* Content */}
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '40px 24px' }}>
        {/* Practicals Section */}
        <div style={{ marginBottom: 60 }}>
          <h2 style={{ color: 'white', fontSize: '1.8rem', marginBottom: 24, fontWeight: 800, display: 'flex', alignItems: 'center', gap: 12 }}>
            ✅ Core Practicals (15 exercises)
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {practicals.map((p) => (
              <button
                key={p.id}
                onClick={() => onSelect && onSelect(p.id)}
                style={{ 
                  textAlign: 'left', padding: '16px 20px', borderRadius: 12, 
                  border: 'none', cursor: 'pointer', display: 'flex', 
                  gap: 16, alignItems: 'flex-start', background: 'white',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)', transition: 'all 0.3s'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.15)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
                }}
              >
                <div style={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', color: 'white', fontWeight: 800, padding: '10px 14px', borderRadius: 8, width: 40, textAlign: 'center', fontSize: '0.9rem', flexShrink: 0 }}>
                  {p.id}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: '1.1rem', color: '#1e293b', marginBottom: 4 }}>{p.title}</div>
                  <div style={{ fontSize: '0.9rem', color: '#64748b' }}>{p.desc}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Mini Projects Section */}
        <div>
          <h2 style={{ color: 'white', fontSize: '1.8rem', marginBottom: 24, fontWeight: 800, display: 'flex', alignItems: 'center', gap: 12 }}>
            🎯 Mini Projects
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {miniProjects.map((project) => (
              <button
                key={project.id}
                onClick={() => onSelect && onSelect(project.id)}
                style={{ 
                  textAlign: 'left', padding: '20px 24px', borderRadius: 12, 
                  border: '2px solid rgba(255,255,255,0.3)', cursor: 'pointer', display: 'flex', 
                  gap: 16, alignItems: 'flex-start', background: 'rgba(255,255,255,0.1)',
                  boxShadow: '0 8px 20px rgba(0,0,0,0.2)', transition: 'all 0.3s',
                  backdropFilter: 'blur(10px)'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.background = 'rgba(255,255,255,0.15)';
                  e.currentTarget.style.boxShadow = '0 12px 30px rgba(0,0,0,0.3)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                  e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.2)';
                }}
              >
                <div style={{ fontSize: '2rem', flexShrink: 0 }}>{project.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: '1.2rem', color: 'white', marginBottom: 4 }}>{project.title}</div>
                  <div style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.85)' }}>{project.desc}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Footer Info */}
        <div style={{ marginTop: 60, background: 'rgba(255,255,255,0.1)', padding: 24, borderRadius: 12, border: '1px solid rgba(255,255,255,0.2)', backdropFilter: 'blur(10px)', color: 'white' }}>
          <h3 style={{ margin: '0 0 12px 0', fontSize: '1.1rem', fontWeight: 700 }}>📖 Learning Path</h3>
          <ul style={{ margin: 0, paddingLeft: 20, lineHeight: 1.8 }}>
            <li>Start with Practicals 01-05 to learn React basics</li>
            <li>Continue with Practicals 06-11 to master state management and forms</li>
            <li>Complete Practicals 12-15 for advanced hooks and mini-projects</li>
            <li>Challenge yourself with Mini Projects for real-world applications</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

