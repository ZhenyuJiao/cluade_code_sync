import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isLoggedIn, logout } = useAuth();
  const location = useLocation();

  const isActive = (path) => location.pathname === path ? 'nav-active' : '';

  return (
    <nav className="navbar">
      <div className="container nav-inner">
        <Link to="/" className="logo">💰 AI 赚钱案例库</Link>
        <ul className={`nav-links ${menuOpen ? 'show' : ''}`}>
          <li><Link to="/" className={isActive('/')} onClick={() => setMenuOpen(false)}>首页</Link></li>
          <li><Link to="/cases" className={isActive('/cases')} onClick={() => setMenuOpen(false)}>案例库</Link></li>
          {isLoggedIn && (
            <li><Link to="/admin" className={isActive('/admin')} onClick={() => setMenuOpen(false)}>后台管理</Link></li>
          )}
          {isLoggedIn ? (
            <li><button onClick={() => { logout(); setMenuOpen(false); }} className="btn-logout">退出</button></li>
          ) : (
            <li><Link to="/admin/login" className={isActive('/admin/login')} onClick={() => setMenuOpen(false)}>管理</Link></li>
          )}
        </ul>
        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="菜单">
          <span></span><span></span><span></span>
        </button>
      </div>
    </nav>
  );
}
