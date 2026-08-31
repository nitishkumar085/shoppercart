import { useState } from "react";
import "./inventory.css";

/* ---------------- Data ---------------- */

const VALUE_TREND = [20, 32, 26, 45, 38, 52, 44, 60, 50, 66, 58, 72];

const STOCK_STATUS = [
  { label: "In Stock", value: 62, color: "var(--c-instock)" },
  { label: "Low Stock", value: 23, color: "var(--c-lowstock)" },
  { label: "Out of Stock", value: 15, color: "var(--c-outstock)" },
];

const TOP_CATEGORIES = [
  { label: "Electronics", value: 90, color: "var(--teal)" },
  { label: "Fashion", value: 70, color: "var(--amber)" },
  { label: "Consors", value: 55, color: "var(--teal-soft)" },
  { label: "High Turnover", value: 30, color: "var(--coral)" },
];

const INVENTORY_ALERTS = [
  { title: "High Priority Low Stock", sub: "High Stock: 3", tag: "High Stock", tagClass: "tag-high" },
  { title: "Low Stock Bouquets", sub: "High Stock: 5", tag: "Low Stock", tagClass: "tag-low" },
  { title: "Low Priority Low Stock", sub: "High Stock: 8", tag: "Low Stock", tagClass: "tag-low" },
];

const PRODUCTS = [
  { sku: "#0012001", name: "AuraSmart Speaker", category: "Electronics", stock: 80, current: 250, transit: 0, reorder: 50 },
  { sku: "#0012002", name: "Apex Gadgets", category: "Category", stock: 55, current: 150, transit: 0, reorder: 50 },
  { sku: "#0012033", name: "Priya Patel", category: "Fashion", stock: 80, current: 250, transit: 0, reorder: 50 },
  { sku: "#0012024", name: "Priya Patel", category: "Electronics", stock: 40, current: 100, transit: 0, reorder: 50 },
  { sku: "#0012035", name: "Aman Singh", category: "Category", stock: 32, current: 90, transit: 0, reorder: 5 },
  { sku: "#0012036", name: "Aman Singh", category: "Category", stock: 15, current: 35, transit: 0, reorder: 5 },
  { sku: "#0012037", name: "Karan Mehtar", category: "Fashion", stock: 20, current: 45, transit: 0, reorder: 5 },
  { sku: "#0012038", name: "Vicran Kapor", category: "Category", stock: 15, current: 35, transit: 0, reorder: 5 },
];

const WAREHOUSES = [
  { name: "Warehouse 1", sub: "Warehouse", used: 50 },
  { name: "Warehouse 2", sub: "Warehouse", used: 50 },
  { name: "Warehouse 3", sub: "Warehouse", used: 50 },
  { name: "Warehouse 4", sub: "Warehouse", used: 20 },
];

const SUPPLIERS = [
  { name: "Priya Patel", role: "Top supplier", time: "15 mins" },
  { name: "Aman Singh", role: "Avg supplier", time: "15 mins" },
  { name: "Priya Patel", role: "Avg supplier", time: "15 mins" },
  { name: "Aman Singh", role: "Avg supplier", time: "15 mins" },
];

const REPLENISH_REQUESTS = [
  { title: "Purchase order", sub: "Purchase order" },
  { title: "Purchase order", sub: "New new stock" },
  { title: "Purchase order", sub: "Recently created order" },
  { title: "Purchase order", sub: "New new stock" },
];

/* ---------------- Small chart pieces ---------------- */

function TrendLine({ points, width = 320, height = 74 }) {
  const max = Math.max(...points);
  const min = Math.min(...points);
  const step = width / (points.length - 1);
  const coords = points.map((p, i) => {
    const x = i * step;
    const y = height - ((p - min) / (max - min)) * (height - 10) - 5;
    return [x, y];
  });
  const line = coords.map((c, i) => (i === 0 ? "M" : "L") + c[0] + "," + c[1]).join(" ");
  const area = `${line} L${width},${height} L0,${height} Z`;
  return (
    <svg viewBox={`0 0 ${width} ${height}`} width="100%" height="100%" preserveAspectRatio="none">
      <defs>
        <linearGradient id="invValueFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0f9d8e" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#0f9d8e" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill="url(#invValueFill)" stroke="none" />
      <path d={line} fill="none" stroke="#0f9d8e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function MiniSpark({ points = [4, 8, 5, 10, 7, 12, 9], width = 60, height = 24 }) {
  const max = Math.max(...points);
  const min = Math.min(...points);
  const step = width / (points.length - 1);
  const line = points
    .map((p, i) => {
      const x = i * step;
      const y = height - ((p - min) / (max - min || 1)) * (height - 4) - 2;
      return (i === 0 ? "M" : "L") + x + "," + y;
    })
    .join(" ");
  return (
    <svg viewBox={`0 0 ${width} ${height}`} width={width} height={height}>
      <path d={line} fill="none" stroke="#0f9d8e" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Donut({ data, size = 108, r = 42, stroke = 17 }) {
  const cx = size / 2;
  const cy = size / 2;
  const circumference = 2 * Math.PI * r;
  let acc = 0;
  return (
    <svg viewBox={`0 0 ${size} ${size}`} className="inv-donut">
      {data.map((seg, i) => {
        const len = (seg.value / 100) * circumference;
        const dashoffset = -acc;
        acc += len;
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

/* ---------------- Main component ---------------- */

export default function Inventory() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [alertRange, setAlertRange] = useState("Last 7 Days");
  const [search, setSearch] = useState("");

  const filteredProducts = PRODUCTS.filter((p) => {
    const q = search.trim().toLowerCase();
    if (!q) return true;
    return (
      p.sku.toLowerCase().includes(q) ||
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
    );
  });

  return (
    <div className="inv-dashboard">
      {/* Header */}
      <header className="inv-header">
        <h1 className="inv-title">Inventory Overview &amp; Actions</h1>
        <h2 className="inv-subtitle">Inventory Performance &amp; Alerts</h2>
        
      </header>

      {/* Top row: value card + performance/alerts card */}
      <section className="inv-top-row">
        {/* Left column */}
        <div className="inv-top-left">
          <article className="inv-card inv-value-card">
            <span className="inv-label">Total Inventory Value</span>
            <div className="inv-value-main">
              <span className="inv-value">$1.2M</span>
              <span className="inv-pill inv-pill-up">+14.2%</span>
            </div>
            <div className="inv-spark">
              <TrendLine points={VALUE_TREND} />
            </div>
            <div className="inv-axis">
              <span>$5K</span>
              <span>Last 30 days</span>
            </div>
          </article>

          <section className="inv-quick-actions">
            <h3>Quick Action Buttons</h3>
            <div className="inv-action-row">
              <button className="inv-btn inv-btn-primary">+ Add New Product</button>
              <button className="inv-btn">&#9776; Manage Categories</button>
              <button className="inv-btn">&#8635; Replenish Stock</button>
              <button className="inv-btn">&#128203; Stock Take</button>
            </div>
          </section>
        </div>

        {/* Right column: performance & alerts */}
        <article className="inv-card inv-perf-card">
          <div className="inv-perf-tabs">
            <button
              className={`inv-range-btn${alertRange === "Last 7 Days" ? " active" : ""}`}
              onClick={() => setAlertRange("Last 7 Days")}
            >
              Last 7 Days
            </button>
            <button
              className={`inv-range-btn${alertRange === "This Month" ? " active" : ""}`}
              onClick={() => setAlertRange("This Month")}
            >
              This Month
            </button>
          </div>

          <div className="inv-perf-grid">
            <div className="inv-stock-status">
              <span className="inv-sub-label">Stock Status</span>
              <div className="inv-donut-wrap">
                <Donut data={STOCK_STATUS} />
                <ul className="inv-legend">
                  {STOCK_STATUS.map((s) => (
                    <li key={s.label}>
                      <span className="inv-swatch" style={{ background: s.color }} />
                      {s.label}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="inv-top-cats">
              <span className="inv-sub-label">Top Performance Categories</span>
              <ul className="inv-cat-list">
                {TOP_CATEGORIES.map((c) => (
                  <li key={c.label}>
                    <span className="inv-cat-name">{c.label}</span>
                    <span className="inv-cat-bar-track">
                      <span
                        className="inv-cat-bar-fill"
                        style={{ width: `${c.value}%`, background: c.color }}
                      />
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="inv-alerts">
            <span className="inv-sub-label">Inventory Alerts</span>
            <ul className="inv-alert-list">
              {INVENTORY_ALERTS.map((a, i) => (
                <li className="inv-alert-row" key={i}>
                  <div className="inv-alert-text">
                    <span className="inv-alert-title">{a.title}</span>
                    <span className="inv-alert-sub">{a.sub}</span>
                  </div>
                  <span className={`inv-tag ${a.tagClass}`}>{a.tag}</span>
                  <button className="inv-restock-btn">Order Restock</button>
                </li>
              ))}
            </ul>
          </div>
        </article>
      </section>

      {/* Detailed product list */}
      <section className="inv-card inv-product-panel">
        <div className="inv-panel-toolbar">
          <h3>Detailed Product List</h3>
          <div className="inv-filters">
            <button className="inv-filter-btn">By status <span>▾</span></button>
            <button className="inv-filter-btn">Category <span>▾</span></button>
            <button className="inv-filter-btn">Sorting <span>▾</span></button>
            <div className="inv-search-box">
              <span className="inv-search-icon">&#128269;</span>
              <input
                type="text"
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="inv-table-scroll">
          <table className="inv-table">
            <thead>
              <tr>
                <th className="inv-col-check"><input type="checkbox" /></th>
                <th>Product Image</th>
                <th>SKU</th>
                <th>Product Name</th>
                <th>Category</th>
                <th>Stock Level</th>
                <th>Current Inventory</th>
                <th>In Transit</th>
                <th>Reorder Point</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((p, i) => (
                <tr key={`${p.sku}-${i}`}>
                  <td className="inv-col-check"><input type="checkbox" /></td>
                  <td><span className="inv-thumb" /></td>
                  <td>{p.sku}</td>
                  <td>{p.name}</td>
                  <td>{p.category}</td>
                  <td>
                    <span className="inv-stock-track">
                      <span className="inv-stock-fill" style={{ width: `${p.stock}%` }} />
                    </span>
                  </td>
                  <td>{p.current}</td>
                  <td>{p.transit}</td>
                  <td>{p.reorder}</td>
                  <td>
                    <div className="inv-actions-cell">
                      <MiniSpark />
                      <button className="inv-more-btn" aria-label="More actions">⋯</button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredProducts.length === 0 && (
                <tr>
                  <td colSpan={10} className="inv-empty">No products match your search.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="inv-pagination">
          <button aria-label="First page">&#171;</button>
          <button aria-label="Previous page">&#8249;</button>
          <span>1 of 1</span>
          <button aria-label="Next page">&#8250;</button>
          <button aria-label="Last page">&#187;</button>
        </div>
      </section>

      {/* Warehouse / supplier / replenishment */}
      <section className="inv-bottom-grid">
        <article className="inv-card inv-warehouse-card">
          <h3>Warehouse &amp; Supplier Management</h3>
          <table className="inv-wh-table">
            <thead>
              <tr>
                <th>Warehouse</th>
                <th>Current Space</th>
                <th>Available Capacity</th>
              </tr>
            </thead>
            <tbody>
              {WAREHOUSES.map((w) => (
                <tr key={w.name}>
                  <td>
                    <span className="inv-wh-name">{w.name}</span>
                    <span className="inv-wh-sub">{w.sub}</span>
                  </td>
                  <td>
                    <div className="inv-wh-space">
                      <span>Current space {w.used}%</span>
                      <span className="inv-stock-track">
                        <span className="inv-stock-fill" style={{ width: `${w.used}%` }} />
                      </span>
                    </div>
                  </td>
                  <td className="inv-wh-avail">Available capacity</td>
                </tr>
              ))}
            </tbody>
          </table>
        </article>

        <article className="inv-card inv-suppliers-card">
          <div className="inv-suppliers-head">
            <h3>Supplier Lead Times</h3>
            <span className="inv-col-hint">Delivery Time</span>
          </div>
          <span className="inv-sub-label inv-top-suppliers-label">Top Suppliers</span>
          <ul className="inv-supplier-list">
            {SUPPLIERS.map((s, i) => (
              <li key={i}>
                <span className="inv-avatar" />
                <span className="inv-supplier-info">
                  <span className="inv-supplier-name">{s.name}</span>
                  <span className="inv-supplier-role">{s.role}</span>
                </span>
                <span className="inv-supplier-time">{s.time}</span>
              </li>
            ))}
          </ul>
        </article>

        <article className="inv-card inv-replenish-card">
          <h3>Replenishment Requests</h3>
          <ul className="inv-replenish-list">
            {REPLENISH_REQUESTS.map((r, i) => (
              <li key={i}>
                <span className="inv-req-icon">&#128230;</span>
                <span className="inv-req-info">
                  <span className="inv-req-title">{r.title}</span>
                  <span className="inv-req-sub">{r.sub}</span>
                </span>
                <span className="inv-req-chevron">&#8250;</span>
              </li>
            ))}
          </ul>
        </article>
      </section>

      <footer className="inv-footer">
        <span className="inv-brand">&#9632; ShopEase</span>
        <div className="inv-footer-right">
          <span className="inv-footer-links">
            <a href="#">Help Center</a>
            <a href="#">Contact</a>
          </span>
          <span className="inv-copyright">Copyright © 2022. ShopEase</span>
        </div>
      </footer>
    </div>
  );
}