import React from 'react';

const Home: React.FC = () => (
  <div className="container">
    <div style={{ textAlign: 'center', marginTop: '3rem' }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '1rem', color: '#e0b07d' }}>
        Welcome to Stacey Steakz
      </h1>
      <p style={{ fontSize: '1.3rem', color: '#f5f3ef', maxWidth: 600, margin: '0 auto 2rem' }}>
        Experience the best steaks in town. Enjoy our cozy, wood-inspired atmosphere and a menu crafted for true steak lovers at Stacey Steakz.
      </p>
      <a href="/menu" className="btn" style={{ marginRight: 16 }}>View Menu</a>
      <a href="/reservations" className="btn" style={{ background: 'transparent', border: '2px solid #e0b07d', color: '#e0b07d' }}>Book a Table</a>
    </div>
    <div style={{ marginTop: '4rem', display: 'flex', flexWrap: 'wrap', gap: '2rem', justifyContent: 'center' }}>
      <div className="card" style={{ maxWidth: 340 }}>
        <h2>Premium Steaks</h2>
        <p>Hand-selected cuts, expertly grilled over a real coal fire for a smoky, unforgettable flavor.</p>
      </div>
      <div className="card" style={{ maxWidth: 340 }}>
        <h2>Signature Cocktails</h2>
        <p>Enjoy a curated selection of craft cocktails and fine wines to complement your meal.</p>
      </div>
      <div className="card" style={{ maxWidth: 340 }}>
        <h2>Group Dining</h2>
        <p>Perfect for celebrations, business dinners, or a night out with friends and family.</p>
      </div>
    </div>
  </div>
);

export default Home;
