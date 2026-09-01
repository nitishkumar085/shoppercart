import { useState } from "react";
import "./payments.css";

/* ---------------- Data ---------------- */

const BALANCE_TREND = [30, 40, 34, 46, 38, 52, 44, 58, 50, 64];
const RATE_TREND = [10, 22, 16, 30, 24, 38, 30, 44];

const PAYOUT_MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const PAYOUT_VALUES = [55, 60, 70, 65, 80, 95, 85, 110, 120, 150, 165, 140];

const RECENT_SETTLEMENTS = [
  { date: "Nov 1", amount: "$12k" },
  { date: "Oct 28", amount: "$8k" },
  { date: "Oct 27", amount: "$7k" },
];

const TABS = ["Transaction History", "Pending Settlements", "Chargebacks", "Adjustments"];

const TRANSACTIONS = [
  { type: "Sale", orderId: "33400000200", date: "Nov 17, 2022", amount: "$185,000", status: "Completed" },
  { type: "Refund", orderId: "33400000223", date: "Oct 28, 2022", amount: "$150,000", status: "Completed" },
  { type: "Refund", orderId: "33400000426", date: "Oct 28, 2022", amount: "$3,230.00", status: "Pending" },
  { type: "Adjustment", orderId: "33400000837", date: "Oct 21, 2022", amount: "$175,000", status: "Completed" },
  { type: "Sale", orderId: "33400000330", date: "Oct 20, 2022", amount: "$353.00", status: "Completed" },
  { type: "Refund", orderId: "33400000361", date: "Oct 28, 2022", amount: "$150,000", status: "Completed" },
  { type: "Refund", orderId: "33400000356", date: "Oct 29, 2022", amount: "$255,000", status: "Completed" },
  { type: "Sale", orderId: "33400000957", date: "Oct 29, 2022", amount: "$125,000", status: "Pending" },
  { type: "Adjustment", orderId: "33400000912", date: "Oct 29, 2022", amount: "$250,000", status: "Completed" },
  { type: "Sale", orderId: "33400000151", date: "Oct 28, 2022", amount: "$750.00", status: "Pending" },
];

const INSIGHTS = [
  "Low withdrawal threshold alert",
  "Chargeback rate has increased - review recent orders",
  "A payment method is about to expire",
  "New payout method verified",
];

const DISPUTES = [
  { id: "Dispute #1001", sub: "Chargebacks" },
  { id: "Dispute #1002", sub: "Chargebacks" },
  { id: "Dispute #1003", sub: "Active Status" },
  { id: "Dispute #1004", sub: "Chargebacks" },
];

const TAX_DOCS = [
  { name: "Form 1099-K - 2022" },
  { name: "Form 1099-K - 2022" },
];

/* ---------------- Chart pieces ---------------- */

function Sparkline({ points, width = 260, height = 70, color = "#0f9d8e" }) {
  const max = Math.max(...points);
  const min = Math.min(...points);
  const step = width / (points.length - 1);
  const coords = points.map((p, i) => {
    const x = i * step;
    const y = height - ((p - min) / (max - min || 1)) * (height - 8) - 4;
    return [x, y];
  });
  const line = coords.map((c, i) => (i === 0 ? "M" : "L") + c[0] + "," + c[1]).join(" ");
  const area = `${line} L${width},${height} L0,${height} Z`;
  const gradId = `spark-${color.replace("#", "")}`;
  return (
    <svg viewBox={`0 0 ${width} ${height}`} width="100%" height="100%" preserveAspectRatio="none">
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.25" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill={`url(#${gradId})`} stroke="none" />
      <path d={line} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PayoutChart({ months, values, width = 640, height = 190 }) {
  const max = Math.max(...values);
  const barW = width / values.length;
  const step = width / (values.length - 1);
  const coords = values.map((v, i) => {
    const x = i * step;
    const y = height - (v / max) * (height - 14) - 6;
    return [x, y];
  });
  const line = coords.map((c, i) => (i === 0 ? "M" : "L") + c[0] + "," + c[1]).join(" ");
  const area = `${line} L${width},${height} L0,${height} Z`;
  return (
    <div className="pay-payout-chart">
      <svg viewBox={`0 0 ${width} ${height}`} width="100%" height={height} preserveAspectRatio="none">
        <defs>
          <linearGradient id="payoutArea" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0f9d8e" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#0f9d8e" stopOpacity="0" />
          </linearGradient>
        </defs>
        {values.map((v, i) => {
          const h = (v / max) * (height - 14);
          const x = i * barW + barW * 0.22;
          const w = barW * 0.56;
          return (
            <rect
              key={i}
              x={x}
              y={height - h}
              width={w}
              height={h}
              rx="3"
              className={i === values.length - 2 ? "pay-bar pay-bar-highlight" : "pay-bar"}
            />
          );
        })}
        <path d={area} fill="url(#payoutArea)" stroke="none" />
        <path d={line} fill="none" stroke="#0f9d8e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <div className="pay-payout-labels">
        {months.map((m) => (
          <span key={m}>{m}</span>
        ))}
      </div>
    </div>
  );
}

/* ---------------- Main component ---------------- */

export default function Payments() {
  const [activeTab, setActiveTab] = useState("Transaction History");
  const [search, setSearch] = useState("");

  const filtered = TRANSACTIONS.filter((t) => {
    const q = search.trim().toLowerCase();
    if (!q) return true;
    return (
      t.orderId.toLowerCase().includes(q) ||
      t.type.toLowerCase().includes(q) ||
      t.status.toLowerCase().includes(q)
    );
  });

  return (
    <div className="pay-dashboard">
    
      {/* Sub header */}
      <div className="pay-subheader">
        <h2>Payments Overview</h2>
      </div>

      {/* Top row */}
      <section className="pay-top-row">
        <div className="pay-col-narrow">
          <article className="pay-card pay-balance-card">
            <div className="pay-card-head">
              <span className="pay-label">Current Balance</span>
              <span className="pay-pill pay-pill-up">+10.1%</span>
            </div>
            <span className="pay-value">$185,250.00</span>
            <div className="pay-spark"><Sparkline points={BALANCE_TREND} /></div>
          </article>

          <article className="pay-card pay-rate-card">
            <div className="pay-card-head">
              <span className="pay-label">Balance Rate</span>
              <span className="pay-chip">Last 30 Days</span>
            </div>
            <span className="pay-value">$10.2M</span>
            <div className="pay-spark pay-spark-sm"><Sparkline points={RATE_TREND} color="#f2994a" /></div>
          </article>
        </div>

        <article className="pay-card pay-funds-card">
          <span className="pay-label">Funds Breakdown</span>
          <div className="pay-fund-box pay-fund-green">
            <span>Available to Withdraw</span>
            <strong>($150,000.00)</strong>
          </div>
          <div className="pay-fund-box pay-fund-amber">
            <span>Pending Settlements</span>
            <strong>($35,250.00)</strong>
          </div>
          <span className="pay-recent-label">Recent Settlements</span>
          <ul className="pay-recent-list">
            {RECENT_SETTLEMENTS.map((s) => (
              <li key={s.date}>
                <span>{s.date}</span>
                <span>{s.amount}</span>
              </li>
            ))}
          </ul>
        </article>

        <article className="pay-card pay-payout-card">
          <div className="pay-payout-head">
            <span className="pay-label">Payout History</span>
            <button className="pay-date-btn">&#128197; Custom Date <span>&#9662;</span></button>
          </div>
          <PayoutChart months={PAYOUT_MONTHS} values={PAYOUT_VALUES} />
          <div className="pay-payout-stats">
            <div>
              <span className="pay-stat-label">Total Payouts to Date</span>
              <span className="pay-stat-value">$1.1M</span>
            </div>
            <div>
              <span className="pay-stat-label">Average Payout</span>
              <span className="pay-stat-value">$92k</span>
            </div>
          </div>
        </article>
      </section>

      {/* Main grid */}
      <div className="pay-main-grid">
        <div className="pay-left-col">
          <section className="pay-card pay-tx-panel">
            <nav className="pay-main-tabs">
              {TABS.map((tab) => (
                <button
                  key={tab}
                  className={`pay-main-tab${activeTab === tab ? " active" : ""}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </nav>

            <div className="pay-toolbar">
              <span className="pay-filter-pill">All Transactions</span>
              <div className="pay-search-box">
                <span className="pay-search-icon">&#128269;</span>
                <input
                  type="text"
                  placeholder="Search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>

            <div className="pay-table-scroll">
              <table className="pay-table">
                <thead>
                  <tr>
                    <th>Transaction ID</th>
                    <th>Type</th>
                    <th>Order ID</th>
                    <th>Date</th>
                    <th>Amount</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((t, i) => (
                    <tr key={i}>
                      <td>Transaction ID</td>
                      <td>{t.type}</td>
                      <td>{t.orderId}</td>
                      <td>{t.date}</td>
                      <td>{t.amount}</td>
                      <td>
                        <span className={`pay-status ${t.status === "Completed" ? "pay-status-done" : "pay-status-pending"}`}>
                          {t.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {filtered.length === 0 && (
                    <tr>
                      <td colSpan={6} className="pay-empty">No transactions match your search.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="pay-footer-row">
              <div className="pay-search-box pay-search-bottom">
                <span className="pay-search-icon">&#128269;</span>
                <input type="text" placeholder="Search" />
              </div>
              <div className="pay-pagination">
                <button aria-label="First page">&#171;</button>
                <button aria-label="Previous page">&#8249;</button>
                <span>1 of 1</span>
                <button aria-label="Next page">&#8250;</button>
                <button aria-label="Last page">&#187;</button>
              </div>
            </div>
          </section>

          <section className="pay-card pay-quick-actions-card">
            <h3>Quick Actions</h3>
            <div className="pay-qa-list">
              <button className="pay-qa-btn pay-qa-green">Add Payout Method</button>
              <button className="pay-qa-btn pay-qa-green">Initiate Withdrawal</button>
              <button className="pay-qa-btn pay-qa-amber">Resolve Payment Dispute</button>
              <button className="pay-qa-btn pay-qa-green">View Tax Documents</button>
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <aside className="pay-sidebar">
          <section className="pay-card">
            <h3>Payment Insights</h3>
            <ul className="pay-insight-list">
              {INSIGHTS.map((text, i) => (
                <li key={i}>{text}</li>
              ))}
            </ul>
          </section>

          <section className="pay-card">
            <h3>Dispute Resolution</h3>
            <span className="pay-sub-label">Active Disputes</span>
            <ul className="pay-dispute-list">
              {DISPUTES.map((d) => (
                <li key={d.id}>
                  <span className="pay-dispute-info">
                    <span className="pay-dispute-id">{d.id}</span>
                    <span className="pay-dispute-sub">{d.sub}</span>
                  </span>
                  <button className="pay-resolve-btn">Resolve</button>
                </li>
              ))}
            </ul>
          </section>

          <section className="pay-card">
            <h3>Tax &amp; Compliance</h3>
            <span className="pay-sub-label">Generated Tax Documents</span>
            <ul className="pay-doc-list">
              {TAX_DOCS.map((doc, i) => (
                <li key={i}>
                  <span>{doc.name}</span>
                  <button className="pay-download-btn">&#8681; Download</button>
                </li>
              ))}
            </ul>
          </section>
        </aside>
      </div>

      <footer className="pay-footer">
        <span className="pay-brand">&#9632; ShopEase</span>
        <div className="pay-footer-right">
          <span className="pay-footer-links">
            <a href="#">Help Center</a>
            <a href="#">Contact</a>
          </span>
          <span className="pay-copyright">Copyright © 2022. ShopEase</span>
        </div>
      </footer>
    </div>
  );
}