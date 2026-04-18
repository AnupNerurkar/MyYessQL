import React from 'react';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="container nav-container">
        <div className="logo-group">
          <div className="logo-icon" />
          <div className="logo serif italic">NEXUS</div>
        </div>
        <div className="nav-links">
          <a href="#" className="label">Portal</a>
          <a href="#" className="label">Protocol</a>
          <a href="#" className="label">Registry</a>
        </div>
        <button className="nav-menu label">Menu</button>
      </div>
    </nav>
  );
};

export default Navbar;
