import React, { useState } from 'react';
import '../styles/grocery.css';

export default function Practical13() {
  const [count, setCount] = useState(0);
  const [fruit, setFruit] = useState('Apple');
  const [tasks, setTasks] = useState(['Buy groceries', 'Learn React hooks']);
  const [input, setInput] = useState('');

  const addTask = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setTasks((prev) => [...prev, input.trim()]);
    setInput('');
  };

  return (
    <div className="g-container" style={{ minHeight: '100vh', paddingBottom: 60 }}>
      <nav className="g-navbar">
        <h2 className="g-navbar-brand">State Hooks Demo</h2>
      </nav>

      <div style={{ maxWidth: 820, margin: '40px auto', padding: '0 24px' }}>
        <p style={{ color: '#64748b', fontSize: '1.1rem', marginBottom: 24 }}>
          This practical demonstrates multiple uses of the <code>useState</code> hook to handle numbers, text, and arrays.
        </p>

        <div style={{ display: 'grid', gap: 24 }}>
          <section style={{ background: 'white', padding: 26, borderRadius: 18, border: '1px solid #e2e8f0' }}>
            <h3 style={{ margin: '0 0 18px 0', color: '#1e293b' }}>Counter example</h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
              <button className="g-btn-add" onClick={() => setCount((c) => c - 1)}>-</button>
              <strong style={{ fontSize: '1.5rem', color: '#0f172a' }}>{count}</strong>
              <button className="g-btn-add" onClick={() => setCount((c) => c + 1)}>+</button>
            </div>
            <p style={{ color: '#475569', marginTop: 16 }}>The counter value is stored in a state hook and updated on each click.</p>
          </section>

          <section style={{ background: 'white', padding: 26, borderRadius: 18, border: '1px solid #e2e8f0' }}>
            <h3 style={{ margin: '0 0 18px 0', color: '#1e293b' }}>Dynamic selection</h3>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
              {['Apple', 'Banana', 'Cherry'].map((item) => (
                <button
                  key={item}
                  onClick={() => setFruit(item)}
                  style={{
                    padding: '12px 18px', borderRadius: 999, border: fruit === item ? '2px solid #0ea5e9' : '1px solid #cbd5e1',
                    background: fruit === item ? '#e0f2fe' : '#f8fafc', cursor: 'pointer'
                  }}
                >
                  {item}
                </button>
              ))}
            </div>
            <p style={{ color: '#475569', marginTop: 16 }}>Selected fruit: <strong>{fruit}</strong></p>
          </section>

          <section style={{ background: 'white', padding: 26, borderRadius: 18, border: '1px solid #e2e8f0' }}>
            <h3 style={{ margin: '0 0 18px 0', color: '#1e293b' }}>Todo list</h3>
            <form onSubmit={addTask} style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Add new task"
                style={{ flex: '1 1 240px', padding: '12px 16px', borderRadius: 10, border: '1px solid #cbd5e1', fontSize: '1rem' }}
              />
              <button type="submit" className="g-btn-add" style={{ whiteSpace: 'nowrap' }}>Add task</button>
            </form>
            <ul style={{ marginTop: 18, paddingLeft: 20, color: '#475569' }}>
              {tasks.map((task, index) => (
                <li key={`${task}-${index}`} style={{ marginBottom: 10 }}>{task}</li>
              ))}
            </ul>
            <p style={{ color: '#64748b', marginTop: 12 }}>This list updates immediately when state changes.</p>
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
