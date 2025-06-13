import React, { useState } from 'react';
import DarkModeToggle from './DarkModeToggle';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      <div className="topbar">
        <button
          className="hamburger"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          ☰
        </button>
        {isOpen && (
          <div className="dark-mode-container">
            <DarkModeToggle />
          </div>
        )}
      </div>

      <nav className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
        <h3 className="title">{isOpen && 'Topic'}</h3>
       <ul>
        <li>
          <Link to="/virtualized-list">
            <i className="bx bx-list-ul"></i>
            {isOpen && <span style={{ marginLeft: '10px' }}>Virtualized List</span>}
          </Link>
        </li>
        <li>
          <Link to="/pagination-hook">
            <i className="bx bx-sync"></i>
            {isOpen && <span style={{ marginLeft: '10px' }}>Pagination Hook</span>}
         </Link>
        </li>
        <li>
          <Link to="/product-crud">
            <i className="bx bx-package"></i>
            {isOpen && <span style={{ marginLeft: '10px' }}>Product CRUD</span>}
          </Link>
        </li>
        <li>
          <Link to="/user-register">
            <i class="bx bx-log-in"></i>
            {isOpen && <span style={{ marginLeft: '10px' }}>Register Form</span>}
          </Link>
        </li>
        <li>
          <Link to="/infinite-scroll">
             <i className="bx bx-loader"></i> 
            {isOpen && <span style={{ marginLeft: '10px' }}>Infinite Scroll</span>}
          </Link>
        </li>
        <li>
          <Link to="/cart">
              <i className='bx bx-cart'></i>
            {isOpen && <span style={{ marginLeft: '10px' }}>Cart FakeAPI</span>}
          </Link>
        </li>
        <li>
          <Link to="/csv">
              <i className="bx bx-export"></i>
            {isOpen && <span style={{ marginLeft: '10px' }}>Export CSV</span>}
          </Link>
        </li>
     </ul>
    </nav>
    </>
  );
};

export default Sidebar;

