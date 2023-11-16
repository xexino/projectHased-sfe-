import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/userActions";

function Header() {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(logout());
  };
  return (
    <header className="s-header">
      <div className="header-logo">
        <Link to="/" className="site-logo">
          <img src={logo} />
        </Link>
      </div>

      <nav className="header-nav-wrap">
        <ul className="header-nav">
          <li className="current">
            <Link to="/" className="site-logo">
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" className="site-logo">
              About
            </Link>
          </li>
          <li>
            <Link to="/event" className="site-logo">
              Event
            </Link>
          </li>
          <li>
            <Link to="/cart" className="site-logo">
              Cart
            </Link>
          </li>
          {userInfo ? (
            <li>
              <div className="dropdown">
                <button className="dropbtn">{userInfo.name}</button>
                <div className="dropdown-content">
                  <Link to="/profile">
                    <a>Profile</a>
                  </Link>
                  <button onClick={logoutHandler}>Logout</button>
                </div>
              </div>
            </li>
          ) : (
            <li>
              <Link to="/login">login</Link>
            </li>
          )}
          {userInfo && userInfo.isAdmin && (
            <li>
              <div className="dropdown">
                <button className="dropbtn">Admin</button>
                <div className="dropdown-content">
                  <Link to="/admin/userlist">
                    <a>Users</a>
                  </Link>
                  <Link to="/admin/productlist">
                    <a>Products</a>
                  </Link>
                  <Link to="/admin/ordelist">
                    <a>Orders</a>
                  </Link>
                </div>
              </div>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
