import { Link } from 'react-router-dom';
import {
  FiHome,
  FiBriefcase,
  FiChevronRight,
  FiChevronDown,
  FiPackage,
  FiDatabase,
  FiShoppingCart,
  FiUsers,
  FiSettings,
  FiBarChart,
  FiUser,
  FiCodesandbox,
  FiMessageSquare,
} from 'react-icons/fi';

import './Sidebar.css';

function Sidebar({ setLoginStatus }) {
  //handlers
  const logOutHandler = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };
  return (
    <nav id="sidebar">
      {/* <div className="sidebar-header">
        <img src="/assets/images/logo.png" />
      </div> */}
      <div className="sidebar-header">
        <p className="sidebar-text-logo">Aporajita Tumi</p>
      </div>

      <ul className="list-unstyled components">
        <li>
          <Link to="/" className="waves-effect waves-button">
            <div className="sidebar-item-container">
              <FiHome className="feather-icon" />
              <div className="sidebar-title-container">
                <span className="sidebar-title">Dashboard</span>
              </div>
            </div>
          </Link>
        </li>
        <li>
          <a
            data-bs-toggle="collapse"
            data-bs-target="#POS"
            aria-expanded="false"
            className="clickable"
          >
            <div className="sidebar-item-container">
              <FiBriefcase className="feather-icon" />
              <div className="sidebar-title-container">
                <span className="sidebar-title">POS</span>
                <FiChevronRight className="feather-icon-dropdown up" />
                <FiChevronDown className="feather-icon-dropdown down" />
              </div>
            </div>
          </a>
          <div className="sidebar-collapse collapse list-unstyled" id="POS">
            <Link to="/admin/pos/sales/new">Process Sale</Link>
            <Link to="/admin/pos/sales">Sales History</Link>
            <Link to="/admin/pos/outlets">Outlets</Link>
            <Link to="/admin/pos/registers">Registers</Link>
            <Link to="/admin/pos/shifts">Register Closures</Link>
            {/*
              <Link to="/admin/pos/product-labels">Print Labels</Link>
            */}
          </div>
        </li>
        <li>
          <a
            data-bs-toggle="collapse"
            data-bs-target="#Products"
            aria-expanded="false"
            className="clickable"
          >
            <div className="sidebar-item-container">
              <FiPackage className="feather-icon" />
              <div className="sidebar-title-container">
                <span className="sidebar-title">Products</span>
                <FiChevronRight className="feather-icon-dropdown up" />
                <FiChevronDown className="feather-icon-dropdown down" />
              </div>
            </div>
          </a>
          <div
            className="sidebar-collapse collapse list-unstyled"
            id="Products"
          >
            <Link to="/admin/products">All Products</Link>
            <Link to="/admin/products/new">Add New Product</Link>
            <Link to="/admin/brands">
              <span
                className="translation_missing"
                title="translation missing: en.all_product_brands"
              >
                All Product Brands
              </span>
            </Link>
            <Link to="/admin/product-categories">
              <span
                className="translation_missing"
                title="translation missing: en.all_product_brands"
              >
                All Product Categories
              </span>
            </Link>
            <Link to="/admin/stock-controls">Products Inventory</Link>
            <Link to="/admin/product-bulk-operations">
              Bulk Update Products
            </Link>
          </div>
        </li>
        <li>
          <a
            data-bs-toggle="collapse"
            data-bs-target="#Inventory"
            aria-expanded="false"
            className="clickable"
          >
            <div className="sidebar-item-container">
              <FiDatabase className="feather-icon" />
              <div className="sidebar-title-container">
                <span className="sidebar-title">Inventory</span>
                <FiChevronRight className="feather-icon-dropdown up" />
                <FiChevronDown className="feather-icon-dropdown down" />
              </div>
            </div>
          </a>
          <div
            className="sidebar-collapse collapse list-unstyled"
            id="Inventory"
          >
            <Link to="/admin/inventory/purchase-orders">Purchase Orders</Link>
            <Link to="/admin/inventory/transfer-orders">
              Inventory Transfers
            </Link>
            <Link to="/admin/inventory/suppliers">Suppliers</Link>
            <Link to="/admin/inventory/locations">Inventory Locations</Link>
            <Link to="/admin/inventory/bulk-adjustments">
              Bulk Inventory Entry
            </Link>
          </div>
        </li>
        <li>
          <a
            data-bs-toggle="collapse"
            data-bs-target="#Orders"
            aria-expanded="false"
            className="clickable"
          >
            <div className="sidebar-item-container">
              <FiShoppingCart className="feather-icon" />
              <div className="sidebar-title-container">
                <span className="sidebar-title">Orders</span>
                <FiChevronRight className="feather-icon-dropdown up" />
                <FiChevronDown className="feather-icon-dropdown down" />
              </div>
            </div>
          </a>
          <div className="sidebar-collapse collapse list-unstyled" id="Orders">
            <Link to="/admin/orders">All Orders</Link>
            <Link to="/admin/pos/sales">In Store Sales</Link>
            <Link to="/admin/manual_orders/new">Create Manual Order</Link>
            <Link to="/admin/orders/delivery">Pathao Delivery</Link>
          </div>
        </li>
        <li>
          <a
            data-bs-toggle="collapse"
            data-bs-target="#Customers"
            aria-expanded="false"
            className="clickable"
          >
            <div className="sidebar-item-container">
              <FiUsers className="feather-icon" />
              <div className="sidebar-title-container">
                <span className="sidebar-title">Customers</span>
                <FiChevronRight className="feather-icon-dropdown up" />
                <FiChevronDown className="feather-icon-dropdown down" />
              </div>
            </div>
          </a>
          <div
            className="sidebar-collapse collapse list-unstyled"
            id="Customers"
          >
            <Link to="/admin/customers">All Customer</Link>
            <Link to="/admin/customers/manage">Manage Customer Groups</Link>
          </div>
        </li>
        <li>
          <a
            data-bs-toggle="collapse"
            data-bs-target="#Reports"
            aria-expanded="false"
            className="clickable"
          >
            <div className="sidebar-item-container">
              <FiBarChart className="feather-icon" />
              <div className="sidebar-title-container">
                <span className="sidebar-title">Reports</span>
                <FiChevronRight className="feather-icon-dropdown up" />
                <FiChevronDown className="feather-icon-dropdown down" />
              </div>
            </div>
          </a>
          <div className="sidebar-collapse collapse list-unstyled" id="Reports">
            <Link to="/admin/reports/finance-summary">Finance Reports</Link>
            <Link to="/admin/reports/current-inventory-report">
              Inventory Reports
            </Link>
            <Link to="/admin/reports/visitor-report">Visitor Report</Link>
            <Link to="/admin/reports/customer-message-report">
              Customer Messages
            </Link>
            <Link to="/admin/reports/customer-review-report">
              Customer Reviews
            </Link>
          </div>
        </li>
        <li>
          <a
            data-bs-toggle="collapse"
            data-bs-target="#Apps"
            aria-expanded="false"
            className="clickable"
          >
            <div className="sidebar-item-container">
              <FiCodesandbox className="feather-icon" />
              <div className="sidebar-title-container">
                <span className="sidebar-title">Apps</span>
                <FiChevronRight className="feather-icon-dropdown up" />
                <FiChevronDown className="feather-icon-dropdown down" />
              </div>
            </div>
          </a>
          <div className="sidebar-collapse collapse list-unstyled" id="Apps">
            <Link to="/admin/apps/external-apps">External Apps</Link>
            <Link to="/admin/apps/store-popup">Store Popup</Link>
            <Link to="/admin/apps/discount-coupons">Discount Coupons</Link>
            <Link to="/admin/apps/add-news">Add News</Link>
            <Link to="/admin/apps/multi-message">Customer Message</Link>
          </div>
        </li>
        <li>
          <a
            data-bs-toggle="collapse"
            data-bs-target="#Settings"
            aria-expanded="false"
            className="clickable"
          >
            <div className="sidebar-item-container">
              <FiSettings className="feather-icon" />
              <div className="sidebar-title-container">
                <span className="sidebar-title">Settings</span>
                <FiChevronRight className="feather-icon-dropdown up" />
                <FiChevronDown className="feather-icon-dropdown down" />
              </div>
            </div>
          </a>
          <div
            className="sidebar-collapse collapse list-unstyled"
            id="Settings"
          >
            <Link id="general_settings" to="/admin/settings/general">
              General Settings
            </Link>
            <Link
              id="checkout_settings"
              to="/admin/settings/edit-checkout-settings"
            >
              Checkout Settings
            </Link>
            <Link to="/admin/store-payment-methods">Payment Methods</Link>
            <Link to="/admin/delivery-services">Shipping Methods</Link>
            <Link to="/admin/tax-rates">Tax Rates</Link>
            <Link to="/admin/users">Users</Link>
          </div>
        </li>
        <li>
          <a
            data-bs-toggle="collapse"
            data-bs-target="#Profile"
            aria-expanded="false"
            className="clickable"
          >
            <div className="sidebar-item-container">
              <FiUser className="feather-icon" />
              <div className="sidebar-title-container">
                <span className="sidebar-title">Profile</span>
                <FiChevronRight className="feather-icon-dropdown up" />
                <FiChevronDown className="feather-icon-dropdown down" />
              </div>
            </div>
          </a>
          <div className="sidebar-collapse collapse list-unstyled" id="Profile">
            <Link to="/admin/settings/1/edit-profile">Update Profile</Link>
            <Link to="/admin/settings/1/edit-password">Change Password</Link>
            <a
              className="clickable"
              onClick={() => {
                logOutHandler();
              }}
            >
              Log out
            </a>
          </div>
        </li>
      </ul>
      <div className="sms-remaining-container">
        <FiMessageSquare className="feather-icon" />
        <span className="sms-remaining">SMS Remaining: 0</span>
      </div>
    </nav>
  );
}

export default Sidebar;
