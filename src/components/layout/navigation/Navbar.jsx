import { useState } from 'react';
import {
  ChevronDown,
  Globe,
  Maximize2,
  Menu,
  Minimize2,
  Plus,
} from 'react-feather';
import {
  FaChevronDown,
  FaGlobeAmericas,
  FaBars,
  FaPlus,
  FaExpandAlt,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

import './Navbar.css';

function Navbar({ setLoginStatus }) {
  const [navbarMenuClickedStatus, setNavbarMenuClickedStatus] = useState(false);
  const [fullScreenStatus, setFullScreenStatus] = useState(false);

  //handlers
  const logOutHandler = () => {
    setLoginStatus(false);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container" style={{ paddingLeft: '0px' }}>
        <button
          type="button"
          id="sidebarCollapse"
          className="btn btn-borderless"
          style={{ padding: '20px 18px' }}
          onClick={() => {
            setNavbarMenuClickedStatus(!navbarMenuClickedStatus);
            const sidebar = document.getElementById('sidebar');
            const navbar = document.getElementsByClassName('navbar')[0];
            const pageContainerParent = document.getElementById(
              'page-container-parent'
            );
            if (sidebar.classList.contains('active')) {
              sidebar.classList.remove('active');
              pageContainerParent.classList.remove('sidebar-active');
              navbar.classList.remove('full');
            } else {
              sidebar.classList.add('active');
              pageContainerParent.classList.add('sidebar-active');
              navbar.classList.add('full');
            }
          }}
        >
          <FaBars
            className="clickable"
            style={{
              width: '10.5px',
              height: '13px',
            }}
          />
        </button>
        <div className="mobile-logo-container">
          <Link to="/" className="navbar-logo">
            Aporajita Tumi
          </Link>
        </div>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="nav navbar-nav">
            <div className="d-flex align-items-center">
              <li className="nav-item">
                <a>
                  {fullScreenStatus ? (
                    <FaExpandAlt
                      className="clickable"
                      style={{
                        width: '10.5px',
                        height: '13px',
                        strokeWidth: '20px',
                        marginLeft: '8px',
                        marginRight: '20px',
                      }}
                      onClick={() => {
                        document.exitFullscreen();
                        setFullScreenStatus(false);
                      }}
                    />
                  ) : (
                    <FaExpandAlt
                      className="clickable"
                      style={{
                        width: '12px',
                        height: '14px',
                        strokeWidth: '20px',
                        marginRight: '20px',
                        marginLeft: '14px',
                      }}
                      onClick={() => {
                        document.documentElement.requestFullscreen();
                        setFullScreenStatus(true);
                      }}
                    />
                  )}
                </a>
              </li>
              <div className="m-2">
                <div className="dropdown">
                  <div
                    type="button"
                    id="user"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <div className="navbar-title-container">
                      <p className="navbar-title mx-2">Add</p>
                      <FaPlus
                        style={{
                          width: '10.5px',
                          height: '13px',
                          strokeWidth: '20px',
                        }}
                      />
                    </div>
                  </div>
                  <ul className="dropdown-menu" aria-labelledby="user">
                    <li>
                      <Link to="/admin/products/new" className="dropdown-item">
                        Add New Product
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/admin/product-categories"
                        className="dropdown-item"
                      >
                        New Collection
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/admin/inventory/purchase-orders/new"
                        className="dropdown-item"
                      >
                        New Purchase Order
                      </Link>
                    </li>
                    <li>
                      <Link to="/admin/pos/sales/new" className="dropdown-item">
                        New Sale
                      </Link>
                    </li>
                    <li>
                      <Link to="/admin/customers/new" className="dropdown-item">
                        New Customer
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="d-flex align-items-center">
              <div className="m-2">
                <li className="nav-item">
                  <a
                    href="http://www.aporajitatumi.com/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <div className="navbar-title-container">
                      <p className="navbar-title mx-2">Online Store</p>
                      <FaGlobeAmericas className="nav-icon globe" />
                    </div>
                  </a>
                </li>
              </div>
              <div className="dropdown user">
                <div
                  type="button"
                  id="user"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <div className="navbar-title-container">
                    <p className="navbar-title" style={{ marginLeft: '25px' }}>
                      {JSON.parse(localStorage.user).name}
                    </p>
                    <FaChevronDown className="nav-icon chevron" />
                  </div>
                </div>
                <ul className="dropdown-menu" aria-labelledby="user">
                  <li>
                    <Link
                      to="/admin/settings/1/edit-profile"
                      className="dropdown-item"
                    >
                      Update Profile
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/admin/settings/1/edit-password"
                      className="dropdown-item"
                    >
                      Change Password
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/"
                      className="dropdown-item"
                      onClick={() => {
                        logOutHandler();
                      }}
                    >
                      Log out
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
