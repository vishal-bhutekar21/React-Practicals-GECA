import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import PracticalsList from './practicals/PracticalsList';
import Practical01 from './practicals/Practical01';
import Practical02 from './practicals/Practical02';
import Practical03 from './practicals/Practical03';
import Practical04 from './practicals/Practical04';
import Practical05 from './practicals/Practical05';
import Practical06 from './practicals/Practical06';
import Practical07 from './practicals/Practical07';
import Practical08 from './practicals/Practical08';
import Practical09 from './practicals/Practical09';
import Practical10 from './practicals/Practical10';
import Practical11 from './practicals/Practical11';
import Practical12 from './practicals/Practical12';
import Practical13 from './practicals/Practical13';
import Practical14 from './practicals/Practical14';
import Practical15 from './practicals/Practical15';
import GroceryDeliveryApp from './practicals/GroceryDeliveryApp';
import ErrorBoundary from './components/ErrorBoundary';

const components = {
  '01': Practical01,
  '02': Practical02,
  '03': Practical03,
  '04': Practical04,
  '05': Practical05,
  '06': Practical06,
  '07': Practical07,
  '08': Practical08,
  '09': Practical09,
  '10': Practical10,
  '11': Practical11,
  '12': Practical12,
  '13': Practical13,
  '14': Practical14,
  '15': Practical15,
  'grocery-delivery': GroceryDeliveryApp,
};

export default function App() {
  const [current, setCurrent] = useState(null);

  const Page = current ? components[current] : null;

  return (
    <div className="App" style={{ background: '#f8fafc', minHeight: '100vh' }}>
      <Header onHome={() => setCurrent(null)} showBack={!!current} />
      <div style={{ padding: '32px 16px', maxWidth: 1200, margin: '0 auto' }}>
        {!current && (
          <div style={{ marginBottom: 32, textAlign: 'center' }}>
            <h1 style={{ marginTop: 0, fontSize: '2.5rem', color: '#0f172a', fontWeight: 800 }}>Welcome to React Mastery</h1>
            <p style={{ color: '#64748b', fontSize: '1.1rem', maxWidth: 600, margin: '0 auto' }}>Select a module below to explore foundational and advanced React concepts through interactive practicals.</p>
          </div>
        )}
        <ErrorBoundary>
          {!current && (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <PracticalsList onSelect={(id) => setCurrent(id)} />
            </div>
          )}
          {current && Page && (
            <div style={{ animation: 'fadeIn 0.3s ease' }}>
              <Page />
            </div>
          )}
        </ErrorBoundary>
      </div>
    </div>
  );
}
