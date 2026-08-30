import { useState } from "react";
import "./customers.css";

const STATUS_DATA = [
  { label: "Delivered", value: 45, color: "var(--c-delivered)" },
  { label: "Processing", value: 25, color: "var(--c-processing)" },
  { label: "Cancelled", value: 12, color: "var(--c-cancelled)" },
  { label: "On Hold", value: 10, color: "var(--c-onhold)" },
  { label: "Returned", value: 8, color: "var(--c-returned)" },
];

const ORDER_BAR_PAIRS = [
  [40, 55], [30, 70], [65, 50], [35, 45], [55, 80], [45, 60], [70, 40],
];

const SPARK_POINTS = [10, 22, 18, 30, 26, 40, 34, 48, 44, 58];

const FULFILL_BARS = [30, 45, 55, 40, 65, 50, 75, 60, 80, 70, 85, 65];

const TABS = [
  "All Orders",
  "Active Orders",
  "Awaiting Fulfillment",
  "Shipped",
  "Returned",
  "Cancelled",
];

const ORDERS = [
  { id: "#120370", date: "01/01/2020", name: "Karan Mehtar", product: "AuraSmart Speaker x2", addr: "Jashion S…", amount: "$125.00", status: "Shipped", action: "View Details" },
  { id: "#120371", date: "01/01/2021", name: "Priya Patel", product: "Apex Gadets", addr: "Electronic…", amount: "$150.00", status: "Processing", action: "Print Label" },
  { id: "#120372", date: "01/01/2021", name: "Priya Patel", product: "Apsx Gagets", addr: "Fashion R…", amount: "$125.00", status: "Processing", action: "View Details" },
  { id: "#120373", date: "01/01/2023", name: "Priya Patel", product: "AuraSmart", addr: "Electronic…", amount: "$250.00", status: "Shipped", action: "View Details" },
  { id: "#120374", date: "01/01/2023", name: "Priya Patel", product: "AuraSmart", addr: "Electronic…", amount: "$125.00", status: "Shipped", action: "View Details" },
  { id: "#120375", date: "05/01/2023", name: "Karan Mehtar", product: "AuraSmart", addr: "Electronic…", amount: "$120.00", status: "Shipped", action: "Print Label" },
  { id: "#120375", date: "03/01/2024", name: "Priya Patel", product: "AuraSmart x2", addr: "Electronics", amount: "$125.00", status: "Shipped", action: "View Details" },
  { id: "#120376", date: "08/01/2025", name: "Priya Patel", product: "AuraSmart x2", addr: "Electronic…", amount: "$120.00", status: "Processing", action: "Print Label" },
  { id: "#120377", date: "08/01/2024", name: "Aman Singh", product: "AuraSmart Speaker", addr: "Fashion S…", amount: "$100.00", status: "Processing", action: "View Details" },
  { id: "#120378", date: "01/05/2029", name: "Aman Singh", product: "AnraSmart x2", addr: "Boring Me…", amount: "$100.00", status: "Processing", action: "View Details" },
  { id: "#120379", date: "03/01/2021", name: "Aman Singh", product: "AuraSmart x2", addr: "Fashion …", amount: "$105.00", status: "Shipped", action: "Print Label" },
  { id: "#120370", date: "07/06/2023", name: "Karan Mehtar", product: "AuraSmart x2", addr: "Electronics", amount: "$55.00", status: "Shipped", action: "View Details" },
  { id: "#120371", date: "07/06/2023", name: "Karan Mehtar", product: "AuraSmart x2", addr: "Fashion …", amount: "$55.00", status: "Shipped", action: "Print Label" },
  { id: "#120372", date: "07/05/2038", name: "Vicran Kapor", product: "AuraSmart x2", addr: "Electronics", amount: "$55.00", status: "Shipped", action: "Print Label" },
];

const SHIPMENTS = [
  { id: "#120371", carrier: "FedEx" },
  { id: "#120372", carrier: "FedEx" },
  { id: "#120373", carrier: "FedEx" },
  { id: "#120374", carrier: "FedEx" },
  { id: "#120374", carrier: "FedEx" },
];

function Sparkline({ points, width = 260, height = 56 }) {
  const max = Math.max(...points);
  const min = Math.min(...points);
  const step = width / (points.length - 1);
  const coords = points.map((p, i) => {
    const x = i * step;
    const y = height - ((p - min) / (max - min)) * (height - 8) - 4;
    return [x, y];
  });
  const linePath = coords.map((c, i) => (i === 0 ? "M" : "L") + c[0] + "," + c[1]).join(" ");
  const areaPath = `${linePath} L${width},${height} L0,${height} Z`;
  return (
    <svg viewBox={`0 0 ${width} ${height}`} width="100%" height="100%" preserveAspectRatio="none">
      <defs>
        <linearGradient id="sparkFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0f9d8e" stopOpacity="0.28" />
          <stop offset="100%" stopColor="#0f9d8e" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={areaPath} fill="url(#sparkFill)" stroke="none" />
      <path d={linePath} fill="none" stroke="#0f9d8e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function GroupedBars({ pairs }) {
  return (
    <div className="bars">
      {pairs.map(([a, b], i) => (
        <div className="bar-pair" key={i}>
          <div className="seg dark" style={{ height: `${a}%` }} />
          <div className="seg light" style={{ height: `${b}%` }} />
        </div>
      ))}
    </div>
  );
}

function MiniBars({ values }) {
  return (
    <div className="mini-bars">
      {values.map((v, i) => (
        <div className="bar" key={i} style={{ height: `${v}%` }} />
      ))}
    </div>
  );
}

function Donut({ data, size = 120, r = 46, stroke = 18 }) {
  const cx = size / 2;
  const cy = size / 2;
  const circumference = 2 * Math.PI * r;
  let offsetAcc = 0;
  return (
    <svg viewBox={`0 0 ${size} ${size}`} className="donut">
      {data.map((seg, i) => {
        const len = (seg.value / 100) * circumference;
        const dashoffset = -offsetAcc;
        offsetAcc += len;
        return (
          <circle
            key={i}
            cx={cx}
            cy={cy}
            r={r}
            fill="none"
            stroke={seg.color}
            strokeWidth={stroke}
            strokeDasharray={`${len} ${circumference - len}`}
            strokeDashoffset={dashoffset}
            transform={`rotate(-90 ${cx} ${cy})`}
          />
        );
      })}
    </svg>
  );
}

export default function Customers() {
  const [activeTab, setActiveTab] = useState(TABS[0]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState("");

  const filteredOrders = ORDERS.filter((o) => {
    const q = search.trim().toLowerCase();
    if (!q) return true;
    return (
      o.id.toLowerCase().includes(q) ||
      o.name.toLowerCase().includes(q) ||
      o.product.toLowerCase().includes(q)
    );
  });

  return (
    <div className="dashboard">
      {/* Header */}
      <header className="dash-header">
        <h1>Orders Overview &amp; Actions</h1>
        <div className="account-menu">
          <button
            className="account-trigger"
            aria-expanded={menuOpen}
            aria-haspopup="true"
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span className="dot" /> Account
          </button>
          {menuOpen && (
            <div className="account-dropdown open">
              <a href="#">My Store</a>
              <a href="#">Plan Info</a>
              <a href="#">Logout</a>
            </div>
          )}
        </div>
      </header>

      {/* Stat cards */}
      <section className="stat-row">
        <article className="card stat-card">
          <div className="stat-top">
            <span className="stat-label">Total Order Value</span>
          </div>
          <div className="stat-main">
            <span className="stat-value">$150,000.00</span>
            <span className="pill pill-up">+12.5%</span>
          </div>
          <p className="stat-sub">+12.5% vs. prev 30 days</p>
          <div className="spark">
            <Sparkline points={SPARK_POINTS} />
          </div>
          <div className="stat-axis">
            <span>$5K</span>
            <span>Last 30 days</span>
          </div>
        </article>

        <article className="card stat-card">
          <div className="stat-top">
            <span className="stat-label">Total Orders</span>
          </div>
          <div className="stat-main">
            <span className="stat-value">
              2,150 <small>orders</small>
            </span>
            <span className="pill pill-up">+8.1%</span>
          </div>
          <p className="stat-sub">+12.1% vs. prev 30 days</p>
          <GroupedBars pairs={ORDER_BAR_PAIRS} />
          <div className="stat-axis">
            <span>Fulfilled vs. Unfulfilled</span>
            <span>Last 30 days</span>
          </div>
        </article>

        <article className="card status-card">
          <span className="stat-label">Status Breakdown</span>
          <div className="donut-wrap">
            <Donut data={STATUS_DATA} />
            <ul className="legend">
              {STATUS_DATA.map((s) => (
                <li key={s.label}>
                  <span className="swatch" style={{ background: s.color }} />
                  {s.label}
                </li>
              ))}
            </ul>
          </div>
        </article>
      </section>

      {/* Quick actions */}
      <section className="quick-actions">
        <h2>Quick Action Buttons</h2>
        <div className="action-row">
          <button className="btn btn-primary">+ Create New Order</button>
          <button className="btn">☰ Manage Shipping</button>
          <button className="btn">↻ Process Refunds</button>
          <button className="btn">⇩ Orders Export</button>
        </div>
      </section>

      {/* Main grid */}
      <div className="main-grid">
        {/* Orders panel */}
        <section className="card orders-panel">
          <nav className="tabs">
            {TABS.map((tab) => (
              <button
                key={tab}
                className={`tab${activeTab === tab ? " active" : ""}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </nav>

          <div className="orders-toolbar">
            <h3>Orders</h3>
            <div className="search-box">
              <span className="search-icon">🔍</span>
              <input
                type="text"
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          <div className="table-scroll">
            <table className="orders-table">
              <thead>
                <tr>
                  <th className="col-check">
                    <input type="checkbox" />
                  </th>
                  <th>Order ID</th>
                  <th>Date</th>
                  <th>Customer Name</th>
                  <th>Product Details</th>
                  <th>Shipping Address</th>
                  <th>Total Amount</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((o, i) => (
                  <tr key={`${o.id}-${i}`}>
                    <td className="col-check">
                      <input type="checkbox" />
                    </td>
                    <td>{o.id}</td>
                    <td>{o.date}</td>
                    <td>{o.name}</td>
                    <td>
                      <div className="product-cell">
                        <span className="product-thumb">📦</span>
                        <span>{o.product}</span>
                      </div>
                    </td>
                    <td>{o.addr}</td>
                    <td>{o.amount}</td>
                    <td>
                      <span
                        className={`badge ${
                          o.status === "Shipped" ? "badge-shipped" : "badge-processing"
                        }`}
                      >
                        {o.status}
                      </span>
                    </td>
                    <td>
                      <a className="link-action" href="#">
                        {o.action}
                      </a>
                    </td>
                  </tr>
                ))}
                {filteredOrders.length === 0 && (
                  <tr>
                    <td colSpan={9} style={{ textAlign: "center", padding: "24px", color: "var(--ink-faint)" }}>
                      No orders match your search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="pagination">
            <button aria-label="First page">«</button>
            <button aria-label="Previous page">‹</button>
            <span>1 of 1</span>
            <button aria-label="Next page">›</button>
            <button aria-label="Last page">»</button>
          </div>
        </section>

        {/* Sidebar */}
        <aside className="sidebar">
          <section className="card">
            <h3>Fulfillment Performance &amp; Insights</h3>

            <div className="sub-card">
              <span className="mini-label">
                Average Fulfillment Time <small>(in days)</small>
              </span>
              <MiniBars values={FULFILL_BARS} />
              <div className="stat-axis">
                <span>Last 30 days</span>
                <span>Last 30 days</span>
              </div>
            </div>

            <div className="sub-card">
              <span className="mini-label">Top Product Performance by Orders</span>
              <ul className="tag-list">
                <li className="tag">Electronics</li>
                <li className="tag muted">Low Stock</li>
                <li className="tag">Fashion</li>
                <li className="tag muted">High Turnover</li>
              </ul>
            </div>

            <div className="sub-card">
              <span className="mini-label">Orders Alerts</span>
              <ul className="alert-list">
                <li className="alert">High-Priority Delayed Shipments</li>
                <li className="alert">Recent High-Value Orders</li>
                <li className="alert">Recent High-Value Orders</li>
              </ul>
            </div>
          </section>

          <section className="card">
            <h3>Recent Shipping Activity</h3>
            <ul className="ship-list">
              {SHIPMENTS.map((s, i) => (
                <li key={i}>
                  <b>{s.id}</b>: In Transit via {s.carrier}
                </li>
              ))}
            </ul>
          </section>
        </aside>
      </div>

      <footer className="dash-footer">
        <span className="brand">■ ShopEase</span>
        <span className="footer-links">
          <a href="#">Help Center</a>
          <a href="#">Contact</a>
        </span>
      </footer>
    </div>
  );
}