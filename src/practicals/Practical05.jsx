import React, { useState, useEffect } from 'react';
import '../styles/grocery.css';

const initialProducts = [
  { id: 1, name: 'Premium Tomato', price: 30, qty: '1kg', img: 'https://images.unsplash.com/photo-1582515073490-3998132b3f3f?w=800&q=80&auto=format&fit=crop&ixlib=rb-4.0.3', badge: 'Fresh' },
  { id: 2, name: 'Organic Potato', price: 20, qty: '1kg', img: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800&q=80&auto=format&fit=crop&ixlib=rb-4.0.3', badge: 'Organic' },
  { id: 3, name: 'Red Onion', price: 25, qty: '1kg', img: 'https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?w=800&q=80&auto=format&fit=crop&ixlib=rb-4.0.3' },
  { id: 4, name: 'Sweet Carrot', price: 35, qty: '1kg', img: 'https://images.unsplash.com/photo-1506806732259-39c2d0268443?w=800&q=80&auto=format&fit=crop&ixlib=rb-4.0.3', badge: 'Sweet' },
  { id: 5, name: 'Green Capsicum', price: 40, qty: '500g', img: 'https://images.unsplash.com/photo-1582515073490-6ffb7a3e6f2f?w=800&q=80&auto=format&fit=crop&ixlib=rb-4.0.3' },
  { id: 6, name: 'Fresh Cabbage', price: 22, qty: '1pc', img: 'https://images.unsplash.com/photo-1604908176929-7f0d8e5d8e3b?w=800&q=80&auto=format&fit=crop&ixlib=rb-4.0.3' },
  { id: 7, name: 'Baby Spinach', price: 28, qty: '1 bunch', img: 'https://images.unsplash.com/photo-1518972559570-6e8b0b18b1f0?w=800&q=80&auto=format&fit=crop&ixlib=rb-4.0.3', badge: 'Leafy' },
  { id: 8, name: 'Purple Eggplant', price: 45, qty: '1pc', img: 'https://images.unsplash.com/photo-1582506605385-1f9f1f5b2f6d?w=800&q=80&auto=format&fit=crop&ixlib=rb-4.0.3' },
  { id: 9, name: 'Dry Garlic', price: 60, qty: '250g', img: 'https://images.unsplash.com/photo-1523986371872-9d3ba2e2f642?w=800&q=80&auto=format&fit=crop&ixlib=rb-4.0.3' },
  { id: 10, name: 'Fresh Ginger', price: 80, qty: '250g', img: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&q=80&auto=format&fit=crop&ixlib=rb-4.0.3' },
];

function ProductCard({ item, onAdd }) {
  return (
    <div className="g-product-card">
      <div style={{ position: 'relative' }}>
        <img className="g-product-img" src={item.img} alt={item.name} />
        {item.badge && (
          <span style={{ position: 'absolute', top: 12, right: 12, background: 'rgba(255,255,255,0.9)', padding: '4px 8px', borderRadius: 4, fontSize: '0.75rem', fontWeight: 700, color: '#10b981' }}>
            {item.badge}
          </span>
        )}
      </div>
      <div className="g-product-info">
        <h4 className="g-product-title">{item.name}</h4>
        <div className="g-product-qty">Unit: {item.qty}</div>
        <div className="g-product-price-row">
          <div className="g-product-price">₹{item.price}</div>
          <button className="g-btn-add" onClick={() => onAdd(item)}>+ Add</button>
        </div>
      </div>
    </div>
  );
}

export default function Practical05() {
  const [products] = useState(initialProducts);
  const [query, setQuery] = useState('');
  const [visible, setVisible] = useState(8);
  const [cart, setCart] = useState([]);

  // Load from local storage
  useEffect(() => {
    const saved = localStorage.getItem('grocery_cart');
    if (saved) {
      try {
        setCart(JSON.parse(saved));
      } catch (e) {}
    }
  }, []);

  // Save to local storage
  useEffect(() => {
    localStorage.setItem('grocery_cart', JSON.stringify(cart));
  }, [cart]);

  const filtered = products.filter((p) => p.name.toLowerCase().includes(query.toLowerCase()));

  const addToCart = (item) => {
    setCart((c) => {
      const found = c.find((x) => x.id === item.id);
      if (found) return c.map((x) => (x.id === item.id ? { ...x, qty: x.qty + 1 } : x));
      return [...c, { ...item, qty: 1 }];
    });
  };

  const totalItems = cart.reduce((s, x) => s + x.qty, 0);

  return (
    <div className="g-container">
      {/* Navigation */}
      <nav className="g-navbar">
        <h2 className="g-navbar-brand">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
          Grocery<span>Mart</span>
        </h2>
        <div className="g-search-wrapper">
          <input 
            type="search" 
            className="g-search-input" 
            placeholder="Search for fresh fruits, vegetables & more..." 
            value={query} 
            onChange={(e) => setQuery(e.target.value)} 
          />
        </div>
        <div className="g-nav-actions">
          <button className="g-nav-icon-btn" title="Notifications">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
            <span style={{ position: 'absolute', top: 4, right: 6, width: 8, height: 8, background: '#ef4444', borderRadius: '50%', border: '2px solid white' }}></span>
          </button>
          
          <button className="g-btn g-btn-cart" onClick={() => alert('Please navigate to Practical 08 to view your detailed cart!')}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
            Cart
            {totalItems > 0 && <span className="g-cart-badge">{totalItems}</span>}
          </button>
          
          <div className="g-nav-profile" title="Vishal">
            V
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="g-hero">
        <h1>Fresh Groceries, Delivered Fast.</h1>
        <p>Shop from our wide selection of premium and organic products. We guarantee the highest quality for your everyday needs.</p>
      </header>

      {/* Product Content */}
      <main className="g-content">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ fontSize: '1.5rem', margin: 0 }}>Trending Items</h3>
          <span style={{ color: '#64748b' }}>Showing {Math.min(visible, filtered.length)} of {filtered.length} products</span>
        </div>

        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 0', color: '#64748b' }}>
            <h3>No products found matching "{query}"</h3>
          </div>
        ) : (
          <div className="g-product-grid">
            {filtered.slice(0, visible).map((p) => (
              <ProductCard key={p.id} item={p} onAdd={addToCart} />
            ))}
          </div>
        )}

        {visible < filtered.length && (
          <button className="g-btn-load-more" onClick={() => setVisible((v) => v + 4)}>
            Load More Products
          </button>
        )}
      </main>

      <div style={{ textAlign: 'center', padding: '20px', color: '#64748b', fontSize: '0.9rem', borderTop: '1px solid #e2e8f0', background: '#fff' }}>
        <p style={{ margin: '0 0 4px 0' }}>Name : Vishal Rajesh Bhutekar</p>
        <p style={{ margin: 0 }}>Roll no: BT24S05F002</p>
      </div>
    </div>
  );
}
