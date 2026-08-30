import { useState } from "react";
import "./dashboardHome.css";

/* ---------------- Data ---------------- */

const STATS = [
  { label: "Total Sales", value: "₹85,420", change: "12.5%", icon: "₹", tone: "green" },
  { label: "Orders", value: "156", change: "8.7%", icon: "🛍️", tone: "blue" },
  { label: "Visitors", value: "2,350", change: "15.3%", icon: "👥", tone: "purple" },
  { label: "Conversion Rate", value: "6.64%", change: "2.1%", icon: "%", tone: "amber" },
];

const RECENT_ORDERS = [
  { id: "#ORD12345", customer: "Amit Verma", amount: "₹1,299", status: "Delivered", date: "May 18, 2024" },
  { id: "#ORD12344", customer: "Priya Singh", amount: "₹2,499", status: "Shipped", date: "May 18, 2024" },
  { id: "#ORD12343", customer: "Karan Mehta", amount: "₹799", status: "Processing", date: "May 18, 2024" },
  { id: "#ORD12342", customer: "Neha Kapoor", amount: "₹1,599", status: "Pending", date: "May 17, 2024" },
  { id: "#ORD12341", customer: "Vikram Iyer", amount: "₹999", status: "Delivered", date: "May 17, 2024" },
];

const TOP_PRODUCTS = [
  { name: "Men's Cotton T-Shirt", sold: "320 sold", revenue: "₹38,400", icon: "👕" },
  { name: "Wireless Headphones", sold: "210 sold", revenue: "₹62,790", icon: "🎧" },
  { name: "Smart Watch", sold: "165 sold", revenue: "₹57,750", icon: "⌚" },
  { name: "Backpack", sold: "150 sold", revenue: "₹22,500", icon: "🎒" },
  { name: "Sneakers", sold: "120 sold", revenue: "₹35,880", icon: "👟" },
];

const SALES_DAYS = ["May 12", "May 13", "May 14", "May 15", "May 16", "May 17", "May 18"];
const SALES_VALUES = [14000, 12000, 19000, 26000, 17000, 22000, 20000];

const QUICK_ACTIONS = [
  { title: "Add Product", sub: "List a new product", icon: "🏷️", tone: "green" },
  { title: "Manage Inventory", sub: "Update stock", icon: "📦", tone: "amber" },
  { title: "View Analytics", sub: "Track performance", icon: "📊", tone: "purple" },
  { title: "Promote Store", sub: "Run campaigns", icon: "📣", tone: "pink" },
  { title: "Payouts", sub: "View earnings", icon: "💳", tone: "blue" },
];

function statusClass(status) {
  switch (status) {
    case "Delivered": return "sh-status-green";
    case "Shipped": return "sh-status-blue";
    case "Processing": return "sh-status-amber";
    default: return "sh-status-grey";
  }
}

/* ---------------- Chart ---------------- */

function SalesChart({ labels, values, width = 640, height = 200 }) {
  const max = Math.max(...values);
  const step = width / (values.length - 1);
  const coords = values.map((v, i) => {
    const x = i * step;
    const y = height - (v / max) * (height - 20) - 10;
    return [x, y];
  });
  const line = coords.map((c, i) => (i === 0 ? "M" : "L") + c[0] + "," + c[1]).join(" ");
  const area = `${line} L${width},${height} L0,${height} Z`;
  return (
    <div className="sh-chart">
      <svg viewBox={`0 0 ${width} ${height}`} width="100%" height={height} preserveAspectRatio="none">
        <defs>
          <linearGradient id="shSalesFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#16a34a" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#16a34a" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={area} fill="url(#shSalesFill)" stroke="none" />
        <path d={line} fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        {coords.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="3.5" fill="#16a34a" />
        ))}
      </svg>
      <div className="sh-chart-labels">
        {labels.map((l) => (
          <span key={l}>{l}</span>
        ))}
      </div>
    </div>
  );
}

/* ---------------- Main component ---------------- */

export default function DashboardHome() {
  const [bannerOpen, setBannerOpen] = useState(true);
  const [salesRange, setSalesRange] = useState("Last 7 days");

  return (
    <div className="sh-dashboard">
      {/* Greeting */}
      <header className="sh-greeting">
        <h1>Good morning, Rohit <span className="sh-wave">&#128075;</span></h1>
        <p>Here&apos;s what&apos;s happening with your store today.</p>
      </header>

      {/* Promo banner */}
      {bannerOpen && (
        <section className="sh-banner">
          <button className="sh-banner-close" aria-label="Dismiss" onClick={() => setBannerOpen(false)}>
            &#10005;
          </button>
          <div className="sh-banner-text">
            <h2>Grow your business</h2>
            <p>Keep your products updated and complete your store profile to attract more customers.</p>
            <button className="sh-banner-btn">Improve Store</button>
          </div>
          <div className="sh-banner-art" aria-hidden="true">
            <div className="sh-awning">
              {Array.from({ length: 6 }).map((_, i) => (
                <span key={i} className={i % 2 === 0 ? "dark" : "light"} />
              ))}
            </div>
            <div className="sh-shopfront">
              <div className="sh-shop-card" />
              <div className="sh-shop-shirt">&#128085;</div>
              <div className="sh-shop-chart">
                <svg viewBox="0 0 100 40" preserveAspectRatio="none">
                  <path d="M0,32 L15,26 L30,28 L45,14 L60,20 L75,8 L100,4" fill="none" stroke="#16a34a" strokeWidth="2.5" />
                </svg>
              </div>
            </div>
            <span className="sh-shop-plant">&#127793;</span>
          </div>
        </section>
      )}

      {/* Stat cards */}
      <section className="sh-stat-row">
        {STATS.map((s) => (
          <article className="sh-card sh-stat-card" key={s.label}>
            <span className={`sh-stat-icon sh-tone-${s.tone}`}>{s.icon}</span>
            <div className="sh-stat-body">
              <span className="sh-stat-label">{s.label}</span>
              <span className="sh-stat-value">{s.value}</span>
              <span className="sh-stat-change">&#8593; {s.change} <span>vs last 7 days</span></span>
            </div>
          </article>
        ))}
      </section>

      {/* Recent orders */}
      <section className="sh-card sh-orders-card">
        <div className="sh-card-head">
          <h3>Recent Orders</h3>
          <a href="#" className="sh-link">View all orders</a>
        </div>
        <div className="sh-table-scroll">
          <table className="sh-orders-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Date</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {RECENT_ORDERS.map((o) => (
                <tr key={o.id}>
                  <td className="sh-order-id">{o.id}</td>
                  <td>
                    <div className="sh-customer-cell">
                      <span className="sh-avatar" />
                      {o.customer}
                    </div>
                  </td>
                  <td>{o.amount}</td>
                  <td><span className={`sh-status ${statusClass(o.status)}`}>{o.status}</span></td>
                  <td className="sh-date">{o.date}</td>
                  <td className="sh-chevron">&#8250;</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Products + sales overview */}
      <section className="sh-two-col">
        <article className="sh-card sh-products-card">
          <div className="sh-card-head">
            <h3>Top Selling Products</h3>
            <a href="#" className="sh-link">View all products</a>
          </div>
          <ul className="sh-product-list">
            {TOP_PRODUCTS.map((p, i) => (
              <li key={i}>
                <span className="sh-product-thumb">{p.icon}</span>
                <div className="sh-product-info">
                  <span className="sh-product-name">{p.name}</span>
                  <span className="sh-product-sold">{p.sold}</span>
                </div>
                <span className="sh-product-revenue">{p.revenue}</span>
              </li>
            ))}
          </ul>
        </article>

        <article className="sh-card sh-sales-card">
          <div className="sh-card-head">
            <h3>Sales Overview</h3>
            <select
              className="sh-range-select"
              value={salesRange}
              onChange={(e) => setSalesRange(e.target.value)}
            >
              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>This month</option>
            </select>
          </div>
          <div className="sh-sales-summary">
            <span className="sh-sales-value">₹85,420</span>
            <span className="sh-sales-change">&#8593; 12.5%</span>
          </div>
          <div className="sh-sales-sub-row">
            <span className="sh-sales-sub-label">Total Sales</span>
            <span className="sh-sales-sub-vs">vs last 7 days</span>
          </div>
          <SalesChart labels={SALES_DAYS} values={SALES_VALUES} />
        </article>
      </section>

      {/* Quick actions */}
      <section className="sh-card sh-quick-actions-card">
        <h3>Quick Actions</h3>
        <div className="sh-qa-grid">
          {QUICK_ACTIONS.map((a) => (
            <button className="sh-qa-item" key={a.title}>
              <span className={`sh-qa-icon sh-tone-${a.tone}`}>{a.icon}</span>
              <span className="sh-qa-title">{a.title}</span>
              <span className="sh-qa-sub">{a.sub}</span>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}