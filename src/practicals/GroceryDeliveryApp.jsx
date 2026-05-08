import React, { useState, useEffect } from 'react';
import '../styles/grocery.css';

// Product Database
const PRODUCTS = {
  vegetables: [
    { id: 1, name: 'Tomato', price: 40, category: 'vegetables', emoji: '🍅', unit: 'kg' },
    { id: 2, name: 'Potato', price: 35, category: 'vegetables', emoji: '🥔', unit: 'kg' },
    { id: 3, name: 'Onion', price: 30, category: 'vegetables', emoji: '🧅', unit: 'kg' },
    { id: 4, name: 'Carrot', price: 45, category: 'vegetables', emoji: '🥕', unit: 'kg' },
    { id: 5, name: 'Broccoli', price: 60, category: 'vegetables', emoji: '🥦', unit: 'kg' },
    { id: 6, name: 'Lettuce', price: 50, category: 'vegetables', emoji: '🥬', unit: 'kg' },
  ],
  fruits: [
    { id: 7, name: 'Apple', price: 80, category: 'fruits', emoji: '🍎', unit: 'kg' },
    { id: 8, name: 'Banana', price: 50, category: 'fruits', emoji: '🍌', unit: 'kg' },
    { id: 9, name: 'Orange', price: 60, category: 'fruits', emoji: '🍊', unit: 'kg' },
    { id: 10, name: 'Strawberry', price: 120, category: 'fruits', emoji: '🍓', unit: 'kg' },
    { id: 11, name: 'Grapes', price: 100, category: 'fruits', emoji: '🍇', unit: 'kg' },
    { id: 12, name: 'Mango', price: 90, category: 'fruits', emoji: '🥭', unit: 'kg' },
  ],
  dairy: [
    { id: 13, name: 'Milk', price: 55, category: 'dairy', emoji: '🥛', unit: 'liter' },
    { id: 14, name: 'Yogurt', price: 40, category: 'dairy', emoji: '🍨', unit: 'pack' },
    { id: 15, name: 'Cheese', price: 150, category: 'dairy', emoji: '🧀', unit: 'kg' },
    { id: 16, name: 'Butter', price: 180, category: 'dairy', emoji: '🧈', unit: 'kg' },
    { id: 17, name: 'Paneer', price: 200, category: 'dairy', emoji: '🥘', unit: 'kg' },
    { id: 18, name: 'Cream', price: 120, category: 'dairy', emoji: '☁️', unit: 'pack' },
  ],
  bakery: [
    { id: 19, name: 'Bread', price: 45, category: 'bakery', emoji: '🍞', unit: 'loaf' },
    { id: 20, name: 'Croissant', price: 30, category: 'bakery', emoji: '🥐', unit: 'piece' },
    { id: 21, name: 'Bagel', price: 25, category: 'bakery', emoji: '🍩', unit: 'piece' },
    { id: 22, name: 'Donut', price: 35, category: 'bakery', emoji: '🍪', unit: 'piece' },
    { id: 23, name: 'Cake', price: 200, category: 'bakery', emoji: '🎂', unit: 'whole' },
    { id: 24, name: 'Cookies', price: 80, category: 'bakery', emoji: '🍪', unit: 'pack' },
  ],
};

export default function GroceryDeliveryApp() {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('groceryCart');
    return saved ? JSON.parse(saved) : [];
  });
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('groceryOrders');
    return saved ? JSON.parse(saved) : [];
  });
  const [currentScreen, setCurrentScreen] = useState('home'); // home, cart, checkout, orders, track
  const [selectedCategory, setSelectedCategory] = useState('vegetables');
  const [deliveryInfo, setDeliveryInfo] = useState({ name: '', phone: '', address: '', city: '', zipcode: '' });
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  // Save cart to localStorage
  useEffect(() => {
    localStorage.setItem('groceryCart', JSON.stringify(cart));
  }, [cart]);

  // Save orders to localStorage
  useEffect(() => {
    localStorage.setItem('groceryOrders', JSON.stringify(orders));
  }, [orders]);

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const calculateSubtotal = () => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const calculateDiscount = () => {
    const subtotal = calculateSubtotal();
    if (appliedCoupon === 'SAVE20') return subtotal * 0.2;
    if (appliedCoupon === 'SAVE10') return subtotal * 0.1;
    return 0;
  };

  const calculateDelivery = () => {
    const subtotal = calculateSubtotal();
    if (subtotal > 500) return 0;
    if (subtotal > 300) return 30;
    return 50;
  };

  const calculateTotal = () => {
    return calculateSubtotal() - calculateDiscount() + calculateDelivery();
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert('Your cart is empty!');
      return;
    }
    if (!deliveryInfo.name || !deliveryInfo.phone || !deliveryInfo.address) {
      alert('Please fill all delivery details');
      return;
    }
    
    const newOrder = {
      id: Date.now(),
      items: cart,
      subtotal: calculateSubtotal(),
      discount: calculateDiscount(),
      delivery: calculateDelivery(),
      total: calculateTotal(),
      deliveryInfo,
      coupon: appliedCoupon,
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
      status: 'Order Placed',
      estimatedDelivery: '30-45 mins'
    };

    setOrders((prev) => [newOrder, ...prev]);
    setCart([]);
    setAppliedCoupon(null);
    setDeliveryInfo({ name: '', phone: '', address: '', city: '', zipcode: '' });
    alert('Order placed successfully! Order ID: ' + newOrder.id);
    setCurrentScreen('orders');
  };

  const applyCoupon = (code) => {
    if (code === 'SAVE20' || code === 'SAVE10') {
      setAppliedCoupon(code);
    } else {
      alert('Invalid coupon code');
    }
  };

  // HOME SCREEN
  if (currentScreen === 'home') {
    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', paddingBottom: 80 }}>
        {/* Header */}
        <nav style={{ background: 'rgba(0,0,0,0.1)', padding: '16px 24px', backdropFilter: 'blur(10px)', boxShadow: '0 4px 20px rgba(0,0,0,0.2)' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h1 style={{ color: 'white', margin: 0, fontSize: '1.8rem', fontWeight: 800 }}>🛒 Fresh Groceries</h1>
            <div style={{ display: 'flex', gap: 12 }}>
              <button
                onClick={() => setCurrentScreen('cart')}
                style={{
                  padding: '10px 20px',
                  borderRadius: 8,
                  background: '#10b981',
                  color: 'white',
                  border: 'none',
                  cursor: 'pointer',
                  fontWeight: 600,
                  fontSize: '1rem',
                  position: 'relative'
                }}
              >
                🛒 Cart {cart.length > 0 && <span style={{ marginLeft: 8 }}>({cart.length})</span>}
              </button>
              <button
                onClick={() => setCurrentScreen('orders')}
                style={{
                  padding: '10px 20px',
                  borderRadius: 8,
                  background: '#f59e0b',
                  color: 'white',
                  border: 'none',
                  cursor: 'pointer',
                  fontWeight: 600,
                  fontSize: '1rem'
                }}
              >
                📦 Orders
              </button>
            </div>
          </div>
        </nav>

        <div style={{ maxWidth: 1200, margin: '40px auto', padding: '0 24px' }}>
          {/* Hero Section */}
          <div style={{ background: 'rgba(255,255,255,0.1)', padding: 40, borderRadius: 20, marginBottom: 40, backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.2)' }}>
            <h2 style={{ color: 'white', fontSize: '2.5rem', margin: '0 0 12px 0', fontWeight: 800 }}>Fresh Grocery Delivery</h2>
            <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '1.1rem', margin: 0 }}>Get fresh vegetables, fruits & dairy delivered to your doorstep in 30-45 minutes!</p>
          </div>

          {/* Category Tabs */}
          <div style={{ display: 'flex', gap: 12, marginBottom: 40, flexWrap: 'wrap' }}>
            {Object.keys(PRODUCTS).map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  padding: '12px 24px',
                  borderRadius: 12,
                  border: 'none',
                  cursor: 'pointer',
                  fontWeight: 600,
                  fontSize: '1rem',
                  background: selectedCategory === cat ? 'white' : 'rgba(255,255,255,0.2)',
                  color: selectedCategory === cat ? '#667eea' : 'white',
                  transition: 'all 0.3s',
                  boxShadow: selectedCategory === cat ? '0 8px 20px rgba(0,0,0,0.3)' : 'none'
                }}
              >
                {cat === 'vegetables' && '🥬'} {cat === 'fruits' && '🍎'} {cat === 'dairy' && '🥛'} {cat === 'bakery' && '🍞'} {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>

          {/* Products Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 24, marginBottom: 40 }}>
            {PRODUCTS[selectedCategory].map((product) => (
              <div
                key={product.id}
                style={{
                  background: 'white',
                  borderRadius: 16,
                  overflow: 'hidden',
                  boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
                  transition: 'all 0.3s',
                  cursor: 'pointer',
                  transform: 'translateY(0)',
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = '0 12px 30px rgba(0,0,0,0.2)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.1)';
                }}
              >
                <div style={{ padding: 20, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', height: 120 }}>
                  <div style={{ fontSize: '4rem' }}>{product.emoji}</div>
                </div>
                <div style={{ padding: 16 }}>
                  <h3 style={{ margin: '0 0 8px 0', fontSize: '1.2rem', fontWeight: 700, color: '#1f2937' }}>{product.name}</h3>
                  <p style={{ margin: '0 0 12px 0', color: '#6b7280', fontSize: '0.9rem' }}>₹{product.price}/{product.unit}</p>
                  <button
                    onClick={() => addToCart(product)}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: 8,
                      background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                      color: 'white',
                      border: 'none',
                      cursor: 'pointer',
                      fontWeight: 600,
                      fontSize: '1rem',
                      transition: 'all 0.3s'
                    }}
                    onMouseOver={(e) => (e.target.style.transform = 'scale(1.02)')}
                    onMouseOut={(e) => (e.target.style.transform = 'scale(1)')}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // CART SCREEN
  if (currentScreen === 'cart') {
    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', paddingBottom: 80 }}>
        {/* Header */}
        <nav style={{ background: 'rgba(0,0,0,0.1)', padding: '16px 24px', backdropFilter: 'blur(10px)', boxShadow: '0 4px 20px rgba(0,0,0,0.2)' }}>
          <div style={{ maxWidth: 1000, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <button
              onClick={() => setCurrentScreen('home')}
              style={{
                padding: '10px 20px',
                borderRadius: 8,
                background: 'rgba(255,255,255,0.2)',
                color: 'white',
                border: 'none',
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: '1rem'
              }}
            >
              ← Back to Shop
            </button>
            <h1 style={{ color: 'white', margin: 0, fontSize: '1.8rem', fontWeight: 800 }}>🛒 Shopping Cart</h1>
            <div />
          </div>
        </nav>

        <div style={{ maxWidth: 1000, margin: '40px auto', padding: '0 24px' }}>
          {cart.length === 0 ? (
            <div style={{ background: 'white', padding: 60, borderRadius: 16, textAlign: 'center' }}>
              <div style={{ fontSize: '4rem', marginBottom: 20 }}>📭</div>
              <h2 style={{ color: '#1f2937', marginBottom: 10 }}>Your cart is empty</h2>
              <p style={{ color: '#6b7280', marginBottom: 24 }}>Start shopping to fill your cart with fresh groceries</p>
              <button
                onClick={() => setCurrentScreen('home')}
                style={{
                  padding: '12px 32px',
                  borderRadius: 8,
                  background: '#10b981',
                  color: 'white',
                  border: 'none',
                  cursor: 'pointer',
                  fontWeight: 600,
                  fontSize: '1rem'
                }}
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: 24 }}>
              {/* Cart Items */}
              <div>
                {cart.map((item) => (
                  <div
                    key={item.id}
                    style={{
                      background: 'white',
                      padding: 16,
                      borderRadius: 12,
                      marginBottom: 12,
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                      <div style={{ fontSize: '2.5rem' }}>{item.emoji}</div>
                      <div>
                        <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 600 }}>{item.name}</h3>
                        <p style={{ margin: '4px 0 0 0', color: '#6b7280', fontSize: '0.9rem' }}>₹{item.price}/{item.unit}</p>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        style={{ width: 32, height: 32, borderRadius: 6, background: '#f3f4f6', border: 'none', cursor: 'pointer', fontWeight: 600 }}
                      >
                        −
                      </button>
                      <span style={{ minWidth: 30, textAlign: 'center', fontWeight: 600 }}>{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        style={{ width: 32, height: 32, borderRadius: 6, background: '#f3f4f6', border: 'none', cursor: 'pointer', fontWeight: 600 }}
                      >
                        +
                      </button>
                      <div style={{ minWidth: 80, textAlign: 'right' }}>
                        <p style={{ margin: 0, fontWeight: 600 }}>₹{item.price * item.quantity}</p>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        style={{ background: '#fee2e2', color: '#dc2626', border: 'none', padding: '6px 12px', borderRadius: 6, cursor: 'pointer', fontWeight: 600 }}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Summary */}
              <div style={{ background: 'white', padding: 24, borderRadius: 12, height: 'fit-content', position: 'sticky', top: 20 }}>
                <h3 style={{ margin: '0 0 16px 0', fontSize: '1.2rem', fontWeight: 700 }}>Order Summary</h3>
                <div style={{ borderBottom: '1px solid #e5e7eb', paddingBottom: 12, marginBottom: 12 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                    <span style={{ color: '#6b7280' }}>Subtotal</span>
                    <span style={{ fontWeight: 600 }}>₹{calculateSubtotal()}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                    <span style={{ color: '#6b7280' }}>Delivery</span>
                    <span style={{ fontWeight: 600, color: calculateDelivery() === 0 ? '#10b981' : '#1f2937' }}>
                      {calculateDelivery() === 0 ? 'FREE' : '₹' + calculateDelivery()}
                    </span>
                  </div>
                  {calculateDiscount() > 0 && (
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: '#10b981' }}>Discount</span>
                      <span style={{ fontWeight: 600, color: '#10b981' }}>-₹{calculateDiscount()}</span>
                    </div>
                  )}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16, fontSize: '1.2rem', fontWeight: 700 }}>
                  <span>Total</span>
                  <span>₹{calculateTotal()}</span>
                </div>

                {/* Coupon Section */}
                <div style={{ marginBottom: 16, paddingBottom: 16, borderBottom: '1px solid #e5e7eb' }}>
                  <p style={{ margin: '0 0 8px 0', fontSize: '0.9rem', color: '#6b7280', fontWeight: 600 }}>Apply Coupon</p>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button
                      onClick={() => applyCoupon('SAVE20')}
                      style={{
                        flex: 1,
                        padding: '8px 12px',
                        borderRadius: 6,
                        background: appliedCoupon === 'SAVE20' ? '#10b981' : '#f3f4f6',
                        color: appliedCoupon === 'SAVE20' ? 'white' : '#1f2937',
                        border: 'none',
                        cursor: 'pointer',
                        fontWeight: 600,
                        fontSize: '0.85rem'
                      }}
                    >
                      SAVE20 (20%)
                    </button>
                    <button
                      onClick={() => applyCoupon('SAVE10')}
                      style={{
                        flex: 1,
                        padding: '8px 12px',
                        borderRadius: 6,
                        background: appliedCoupon === 'SAVE10' ? '#10b981' : '#f3f4f6',
                        color: appliedCoupon === 'SAVE10' ? 'white' : '#1f2937',
                        border: 'none',
                        cursor: 'pointer',
                        fontWeight: 600,
                        fontSize: '0.85rem'
                      }}
                    >
                      SAVE10 (10%)
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => setCurrentScreen('checkout')}
                  style={{
                    width: '100%',
                    padding: '14px 16px',
                    borderRadius: 8,
                    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                    color: 'white',
                    border: 'none',
                    cursor: 'pointer',
                    fontWeight: 600,
                    fontSize: '1.05rem'
                  }}
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // CHECKOUT SCREEN
  if (currentScreen === 'checkout') {
    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', paddingBottom: 80 }}>
        <nav style={{ background: 'rgba(0,0,0,0.1)', padding: '16px 24px', backdropFilter: 'blur(10px)' }}>
          <div style={{ maxWidth: 1000, margin: '0 auto' }}>
            <button
              onClick={() => setCurrentScreen('cart')}
              style={{
                padding: '10px 20px',
                borderRadius: 8,
                background: 'rgba(255,255,255,0.2)',
                color: 'white',
                border: 'none',
                cursor: 'pointer',
                fontWeight: 600
              }}
            >
              ← Back to Cart
            </button>
          </div>
        </nav>

        <div style={{ maxWidth: 1000, margin: '40px auto', padding: '0 24px' }}>
          <h1 style={{ color: 'white', fontSize: '2rem', marginBottom: 32, fontWeight: 800 }}>🚚 Delivery Details</h1>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: 24 }}>
            {/* Delivery Form */}
            <div style={{ background: 'white', padding: 32, borderRadius: 16 }}>
              <h2 style={{ margin: '0 0 24px 0', fontSize: '1.3rem', fontWeight: 700 }}>Delivery Address</h2>
              <div style={{ display: 'grid', gap: 16 }}>
                <div>
                  <label style={{ display: 'block', marginBottom: 8, fontWeight: 600, color: '#1f2937' }}>Full Name *</label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    value={deliveryInfo.name}
                    onChange={(e) => setDeliveryInfo({ ...deliveryInfo, name: e.target.value })}
                    style={{ width: '100%', padding: '12px 16px', borderRadius: 8, border: '1px solid #e5e7eb', fontSize: '1rem', boxSizing: 'border-box' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: 8, fontWeight: 600, color: '#1f2937' }}>Phone Number *</label>
                  <input
                    type="tel"
                    placeholder="9876543210"
                    value={deliveryInfo.phone}
                    onChange={(e) => setDeliveryInfo({ ...deliveryInfo, phone: e.target.value })}
                    style={{ width: '100%', padding: '12px 16px', borderRadius: 8, border: '1px solid #e5e7eb', fontSize: '1rem', boxSizing: 'border-box' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: 8, fontWeight: 600, color: '#1f2937' }}>Delivery Address *</label>
                  <textarea
                    placeholder="123 Main Street, Apartment 4B"
                    value={deliveryInfo.address}
                    onChange={(e) => setDeliveryInfo({ ...deliveryInfo, address: e.target.value })}
                    style={{ width: '100%', padding: '12px 16px', borderRadius: 8, border: '1px solid #e5e7eb', fontSize: '1rem', minHeight: 100, boxSizing: 'border-box', fontFamily: 'inherit' }}
                  />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: 8, fontWeight: 600, color: '#1f2937' }}>City</label>
                    <input
                      type="text"
                      placeholder="New York"
                      value={deliveryInfo.city}
                      onChange={(e) => setDeliveryInfo({ ...deliveryInfo, city: e.target.value })}
                      style={{ width: '100%', padding: '12px 16px', borderRadius: 8, border: '1px solid #e5e7eb', fontSize: '1rem', boxSizing: 'border-box' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: 8, fontWeight: 600, color: '#1f2937' }}>Zip Code</label>
                    <input
                      type="text"
                      placeholder="10001"
                      value={deliveryInfo.zipcode}
                      onChange={(e) => setDeliveryInfo({ ...deliveryInfo, zipcode: e.target.value })}
                      style={{ width: '100%', padding: '12px 16px', borderRadius: 8, border: '1px solid #e5e7eb', fontSize: '1rem', boxSizing: 'border-box' }}
                    />
                  </div>
                </div>
              </div>

              <h2 style={{ margin: '32px 0 24px 0', fontSize: '1.3rem', fontWeight: 700 }}>Order Items</h2>
              {cart.map((item) => (
                <div
                  key={item.id}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingBottom: 12,
                    marginBottom: 12,
                    borderBottom: '1px solid #e5e7eb'
                  }}
                >
                  <span style={{ fontWeight: 600 }}>{item.emoji} {item.name} x{item.quantity}</span>
                  <span style={{ fontWeight: 600 }}>₹{item.price * item.quantity}</span>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div style={{ background: 'white', padding: 24, borderRadius: 12, height: 'fit-content', position: 'sticky', top: 20 }}>
              <h3 style={{ margin: '0 0 16px 0', fontSize: '1.2rem', fontWeight: 700 }}>Order Summary</h3>
              <div style={{ borderBottom: '1px solid #e5e7eb', paddingBottom: 12, marginBottom: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span style={{ color: '#6b7280' }}>Subtotal</span>
                  <span style={{ fontWeight: 600 }}>₹{calculateSubtotal()}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span style={{ color: '#6b7280' }}>Delivery</span>
                  <span style={{ fontWeight: 600, color: calculateDelivery() === 0 ? '#10b981' : '#1f2937' }}>
                    {calculateDelivery() === 0 ? 'FREE' : '₹' + calculateDelivery()}
                  </span>
                </div>
                {calculateDiscount() > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#10b981' }}>Discount</span>
                    <span style={{ fontWeight: 600, color: '#10b981' }}>-₹{calculateDiscount()}</span>
                  </div>
                )}
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 24, fontSize: '1.2rem', fontWeight: 700 }}>
                <span>Total</span>
                <span>₹{calculateTotal()}</span>
              </div>

              <div style={{ background: '#eff6ff', padding: 12, borderRadius: 8, marginBottom: 16, borderLeft: '4px solid #3b82f6' }}>
                <p style={{ margin: 0, fontSize: '0.9rem', color: '#1e40af', fontWeight: 600 }}>✓ Estimated Delivery: 30-45 mins</p>
              </div>

              <button
                onClick={handleCheckout}
                style={{
                  width: '100%',
                  padding: '14px 16px',
                  borderRadius: 8,
                  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                  color: 'white',
                  border: 'none',
                  cursor: 'pointer',
                  fontWeight: 600,
                  fontSize: '1.05rem'
                }}
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ORDERS SCREEN
  if (currentScreen === 'orders') {
    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', paddingBottom: 80 }}>
        <nav style={{ background: 'rgba(0,0,0,0.1)', padding: '16px 24px', backdropFilter: 'blur(10px)' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', gap: 12 }}>
            <button
              onClick={() => setCurrentScreen('home')}
              style={{
                padding: '10px 20px',
                borderRadius: 8,
                background: 'rgba(255,255,255,0.2)',
                color: 'white',
                border: 'none',
                cursor: 'pointer',
                fontWeight: 600
              }}
            >
              ← Back to Shop
            </button>
          </div>
        </nav>

        <div style={{ maxWidth: 1200, margin: '40px auto', padding: '0 24px' }}>
          <h1 style={{ color: 'white', fontSize: '2rem', marginBottom: 32, fontWeight: 800 }}>📦 My Orders</h1>

          {orders.length === 0 ? (
            <div style={{ background: 'white', padding: 60, borderRadius: 16, textAlign: 'center' }}>
              <div style={{ fontSize: '4rem', marginBottom: 20 }}>📭</div>
              <h2 style={{ color: '#1f2937', marginBottom: 10 }}>No orders yet</h2>
              <p style={{ color: '#6b7280', marginBottom: 24 }}>Start shopping to place your first order</p>
              <button
                onClick={() => setCurrentScreen('home')}
                style={{
                  padding: '12px 32px',
                  borderRadius: 8,
                  background: '#10b981',
                  color: 'white',
                  border: 'none',
                  cursor: 'pointer',
                  fontWeight: 600,
                  fontSize: '1rem'
                }}
              >
                Start Shopping
              </button>
            </div>
          ) : (
            <div style={{ display: 'grid', gap: 24 }}>
              {orders.map((order) => (
                <div
                  key={order.id}
                  style={{
                    background: 'white',
                    borderRadius: 16,
                    overflow: 'hidden',
                    boxShadow: '0 8px 20px rgba(0,0,0,0.1)'
                  }}
                >
                  <div style={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', padding: 20, color: 'white' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                      <div>
                        <p style={{ margin: '0 0 4px 0', fontSize: '0.9rem', opacity: 0.9 }}>Order ID: {order.id}</p>
                        <p style={{ margin: 0, fontSize: '0.9rem', opacity: 0.9 }}>{order.date} at {order.time}</p>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <p style={{ margin: '0 0 4px 0', fontSize: '1.2rem', fontWeight: 700 }}>₹{order.total}</p>
                        <p style={{ margin: 0, fontSize: '0.9rem', background: 'rgba(255,255,255,0.2)', padding: '4px 8px', borderRadius: 4, display: 'inline-block' }}>🚚 {order.status}</p>
                      </div>
                    </div>
                    <p style={{ margin: 0, fontSize: '0.9rem' }}>⏱️ {order.estimatedDelivery}</p>
                  </div>
                  <div style={{ padding: 20 }}>
                    <h4 style={{ margin: '0 0 12px 0', fontWeight: 700 }}>Items ({order.items.length})</h4>
                    <div style={{ marginBottom: 16 }}>
                      {order.items.map((item) => (
                        <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: 8, borderBottom: '1px solid #e5e7eb', marginBottom: 8 }}>
                          <span>{item.emoji} {item.name} x{item.quantity}</span>
                          <span style={{ fontWeight: 600 }}>₹{item.price * item.quantity}</span>
                        </div>
                      ))}
                    </div>
                    <div style={{ background: '#f9fafb', padding: 12, borderRadius: 8, display: 'grid', gap: 8 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                        <span>Subtotal</span>
                        <span>₹{order.subtotal}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                        <span>Delivery</span>
                        <span>{order.delivery === 0 ? 'FREE' : '₹' + order.delivery}</span>
                      </div>
                      {order.discount > 0 && (
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: '#10b981' }}>
                          <span>Discount ({order.coupon})</span>
                          <span>-₹{order.discount}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }
}
