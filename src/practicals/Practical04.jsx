import React, { useState } from 'react';

export default function Practical04() {
  const [isLogin, setIsLogin] = useState(true);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      alert('Login Successful\nEmail: ' + email);
    } else {
      alert('Registered Successfully\nName: ' + name);
    }
  };

  return (
    <div>
      <h2>Practical 04 — Login / Register</h2>

      
      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <input
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        )}

        <br /><br />

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <br /><br />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <br /><br />

        <button type="submit">
          {isLogin ? 'Login' : 'Register'}
        </button>
      </form>

      <br />

      <button onClick={() => setIsLogin(!isLogin)}>
        Switch to {isLogin ? 'Register' : 'Login'}
      </button>

      <hr />
      <p>Name : Vishal Rajesh Bhutekar</p>
      <p>Roll no: BT24S05F002</p>
    </div>
  );
}
