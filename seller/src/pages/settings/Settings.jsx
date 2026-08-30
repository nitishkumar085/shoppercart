import { useState } from "react";
import "./settings.css";

/* ---------------- Data ---------------- */

const TABS = ["General", "Notification Settings", "User Management", "Tax & Compliance"];

const USERS = [
  { name: "Pune Store", email: "admin@sample.com", role: "Admin", perm: "Full", login: "Nov 17, 2022" },
  { name: "Pune Darli", email: "admin@sample.com", role: "Admin", perm: "Full", login: "Nov 17, 2022" },
  { name: "John Marson", email: "admin@sample.com", role: "Manager", perm: "Partial", login: "Oct 28, 2022" },
  { name: "Fate Miimon", email: "admin@sample.com", role: "Manager", perm: "Read-Only", login: "Oct 28, 2022" },
  { name: "Pune Store", email: "admin@sample.com", role: "Admin", perm: "Full", login: "Oct 27, 2022" },
  { name: "Pate Minner", email: "admin@sample.com", role: "Editor", perm: "Partial", login: "Oct 28, 2022" },
  { name: "John Winson", email: "admin@sample.com", role: "Editor", perm: "Read-Only", login: "Oct 28, 2022" },
  { name: "Jonn Store", email: "admin@sample.com", role: "Editor", perm: "Full", login: "Oct 29, 2022" },
  { name: "John Smith", email: "editor@sample.com", role: "Editor", perm: "Read-Only", login: "Oct 21, 2022" },
  { name: "", email: "", role: "", perm: "Editor", permTag: "Full", action: "[Edit Permissions]", login: "" },
  { name: "", email: "", role: "", perm: "Manager", permTag: "Partial", action: "[Deactivate User]", login: "" },
  { name: "", email: "", role: "", perm: "Editor", permTag: "Read-Only", login: "" },
];

const AUDIT_LOG = [
  "Nov 17, 2022 - Admin - Updated Store Info",
  "Oct 28, 2022 - Manager - Changed Password",
  "Oct 28, 2022 - Manager - Changed Password",
];

const INTEGRATIONS = [
  { name: "PayPal", icon: "🅿️", status: "Connected", tone: "teal" },
  { name: "PayPal", icon: "🅿️", status: "Connected", tone: "teal" },
  { name: "ShopifySync", icon: "🛍️", status: "Connected", tone: "teal" },
  { name: "—", icon: "⛔", status: "Disconnected", tone: "coral" },
];

/* ---------------- Reusable bits ---------------- */

function Toggle({ checked, onChange }) {
  return (
    <button
      className={`set-toggle${checked ? " on" : ""}`}
      role="switch"
      aria-checked={checked}
      onClick={onChange}
    >
      <span className="set-toggle-knob" />
    </button>
  );
}

/* ---------------- Main component ---------------- */

export default function Settings() {
  const [activeTab, setActiveTab] = useState("User Management");
  const [search, setSearch] = useState("");
  const [prefs, setPrefs] = useState({
    push: true,
    darkMode: true,
    backup: false,
  });

  const filteredUsers = USERS.filter((u) => {
    const q = search.trim().toLowerCase();
    if (!q) return true;
    return (
      u.name.toLowerCase().includes(q) ||
      u.email.toLowerCase().includes(q) ||
      u.role.toLowerCase().includes(q)
    );
  });

  return (
    <div className="set-dashboard">
      {/* Header */}
      <header className="set-header">
        <h1>Settings Management</h1>
        <span className="set-welcome">Welcome back, Seller!</span>
      </header>

      {/* Top row */}
      <section className="set-top-row">
        {/* Store info */}
        <article className="set-card set-store-card">
          <h2>Store Information &amp; Profile</h2>
          <div className="set-store-identity">
            <span className="set-store-icon">🏬</span>
            <div>
              <span className="set-store-name">ShopEase Pune Store</span>
              <span className="set-role-pill">Admin</span>
            </div>
          </div>
          <span className="set-quick-links-label">Quick Links</span>
          <ul className="set-quick-links">
            <li><a href="#">&#9998; Edit Profile Info</a></li>
            <li><a href="#">&#128393; Manage Store Profile Picture</a></li>
          </ul>
        </article>

        {/* Security */}
        <article className="set-card set-security-card">
          <h2>Security &amp; Access Control</h2>
          <button className="set-option set-option-green">Change Password</button>
          <button className="set-option set-option-green">Manage Two-Factor Authentication (2FA)</button>
          <button className="set-option set-option-amber">API Key Management</button>
          <span className="set-2fa-status">
            <span className="set-check">&#10003;</span> 2FA: Enabled
          </span>
        </article>

        {/* Preferences */}
        <article className="set-card set-prefs-card">
          <h2>Store Preferences</h2>
          <div className="set-pref-row">
            <span>Receive Push Notifications</span>
            <Toggle
              checked={prefs.push}
              onChange={() => setPrefs((p) => ({ ...p, push: !p.push }))}
            />
          </div>
          <div className="set-pref-row">
            <span>Enable Dark Mode</span>
            <Toggle
              checked={prefs.darkMode}
              onChange={() => setPrefs((p) => ({ ...p, darkMode: !p.darkMode }))}
            />
          </div>
          <div className="set-pref-row">
            <span>Automatically Backup Data</span>
            <Toggle
              checked={prefs.backup}
              onChange={() => setPrefs((p) => ({ ...p, backup: !p.backup }))}
            />
          </div>
        </article>
      </section>

      {/* Tabs */}
      <nav className="set-tabs">
        {TABS.map((tab) => (
          <button
            key={tab}
            className={`set-tab${activeTab === tab ? " active" : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </nav>

      {/* Main grid */}
      <div className="set-main-grid">
        {/* Left column */}
        <div className="set-left-col">
          <section className="set-card set-users-panel">
            <h2>API &amp; Integrations</h2>

            <div className="set-panel-toolbar">
              <span className="set-panel-pill">Active User Management</span>
              <div className="set-search-box">
                <span className="set-search-icon">&#128269;</span>
                <input
                  type="text"
                  placeholder="Search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>

            <div className="set-table-scroll">
              <table className="set-table">
                <thead>
                  <tr>
                    <th>User Image</th>
                    <th>Full Name</th>
                    <th>Email Address</th>
                    <th>Role</th>
                    <th>Permissions Level</th>
                    <th>Last Login</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((u, i) => (
                    <tr key={i}>
                      <td><span className="set-avatar" /></td>
                      <td>{u.name}</td>
                      <td>{u.email}</td>
                      <td>{u.role}</td>
                      <td>
                        {u.permTag ? (
                          <span className={`set-perm-tag ${u.permTag === "Full" ? "green" : "amber"}`}>
                            {u.permTag}
                          </span>
                        ) : (
                          u.perm
                        )}
                      </td>
                      <td>{u.login}</td>
                      <td className="set-row-action">
                        {u.action ? (
                          <span className="set-action-link">{u.action}</span>
                        ) : (
                          <button className="set-more-btn" aria-label="More actions">⋯</button>
                        )}
                      </td>
                    </tr>
                  ))}
                  {filteredUsers.length === 0 && (
                    <tr>
                      <td colSpan={7} className="set-empty">No users match your search.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="set-footer-row">
              <div className="set-search-box set-search-bottom">
                <span className="set-search-icon">&#128269;</span>
                <input type="text" placeholder="Search" />
              </div>
              <div className="set-pagination">
                <button aria-label="First page">&#171;</button>
                <button aria-label="Previous page">&#8249;</button>
                <span>1 of 1</span>
                <button aria-label="Next page">&#8250;</button>
                <button aria-label="Last page">&#187;</button>
              </div>
            </div>
          </section>

          <section className="set-card set-quick-actions-card">
            <h2>Quick Actions</h2>
            <div className="set-qa-list">
              <button className="set-qa-btn set-qa-green">+ Add New Team Member</button>
              <button className="set-qa-btn set-qa-green">Configure Webhooks</button>
              <button className="set-qa-btn set-qa-amber">View API Docs</button>
              <button className="set-qa-btn set-qa-green">Manage Billing Plan</button>
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <aside className="set-sidebar">
          <section className="set-card">
            <h3>Subscription &amp; Billing Details</h3>
            <ul className="set-billing-list">
              <li><span className="set-billing-label">Current Plan:</span> Premium Seller</li>
              <li><span className="set-billing-label">Billing Cycle:</span> Annual</li>
              <li><span className="set-billing-label">Next Renewal Date:</span> Jan 15, 2023</li>
            </ul>
            <a href="#" className="set-upgrade-link">[Upgrade/Downgrade Plan]</a>
            <p className="set-benefits">
              &#8226; Plan Benefits: All analytics, unlimited products, priority support
            </p>
          </section>

          <section className="set-card">
            <h3>Audit Log</h3>
            <span className="set-audit-columns">(Date, User, Action)</span>
            <ul className="set-audit-list">
              {AUDIT_LOG.map((entry, i) => (
                <li key={i}>{entry}</li>
              ))}
            </ul>
          </section>

          <section className="set-card">
            <h3>Integration Management</h3>
            <ul className="set-integration-list">
              {INTEGRATIONS.map((it, i) => (
                <li key={i}>
                  <span className="set-int-icon">{it.icon}</span>
                  <span className="set-int-info">
                    <span className="set-int-name">{it.name}</span>
                    <span className={`set-int-status set-int-${it.tone}`}>{it.status}</span>
                  </span>
                  <button className="set-manage-btn">Manage App</button>
                </li>
              ))}
            </ul>
          </section>
        </aside>
      </div>

      <footer className="set-footer">
        <span className="set-brand">&#9632; ShopEase</span>
        <div className="set-footer-right">
          <span className="set-footer-links">
            <a href="#">Help Center</a>
            <a href="#">Contact</a>
          </span>
          <span className="set-copyright">Copyright © 2022. ShopEase</span>
        </div>
      </footer>
    </div>
  );
}