import React from 'react';
import './Navbar.css';
import Logo from './asserts/CodeWise aquos.png'

const Navbar = () => {

  return (
    <nav className="navbar">
    <div className="container">
      <a className="logo">
        <img src={Logo} alt='logo' className='Logo' /> 
      </a>
      <ul className="nav-links">
        <li><a>Home</a></li>
        <li><a>World</a></li>
        <li><a>Politics</a></li>
        <li><a to="/business">Business</a></li>
        <li><a>Technology</a></li>
        <li><a>Entertainment</a></li>
        <li><a>Sports</a></li>
        <li><a>Health</a></li>
        <li><a>Science</a></li>
      </ul>
    </div>
  </nav>
  );
};

export default Navbar;
