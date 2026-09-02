import { useState } from "react";
import "./Marketing.css";

/* ---------------- Data ---------------- */

const ACTIVE_TREND = [16, 28, 20, 34, 24, 40, 30, 46];
const BALANCE_TREND = [10, 20, 14, 26, 18, 30];

const PERF_MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const PERF_VALUES = [55, 60, 70, 65, 80, 95, 85, 110, 120, 150, 165, 140];

const TABS = ["Campaigns", "Promotions", "Discount Codes", "Ad Spend"];

const CAMPAIGNS = [
  { id: "33400000200", name: "Holiday Sale 2023", start: "Nov 17, 2023", end: "Nov 17, 2022", spend: "$18,500.00", roi: "+18.5%", up: true },
  { id: "33400000223", name: "Summer Essentials", start: "Nov 17, 2023", end: "End 28, 2022", spend: "$24,500.00", roi: "+18.5%", up: true },
  { id: "33400000026", name: "Brand Awareness", start: "Nov 17, 2023", end: "Oct 22, 2022", spend: "$24,500.00", roi: "-17.5%", up: false },
  { id: "33400000844", name: "Brand Awareness", start: "Nov 07, 2022", end: "Oct 21, 2022", spend: "$1,250.00", roi: "+11.0%", up: true },
  { id: "33400000356", name: "Brand Awareness", start: "Nov 28, 2022", end: "Oct 20, 2022", spend: "$350.00", roi: "+0.80%", up: true },
  { id: "33400000057", name: "Holiday Sale 2023", start: "Nov 18, 2022", end: "Oct 29, 2022", spend: "$1,250.00", roi: "+0.30%", up: true },
  { id: "33400000055", name: "Brand Awareness", start: "Nov 29, 2022", end: "Oct 29, 2022", spend: "$1250.00", roi: "-6.70%", up: false },
  { id: "33400000912", name: "Brand Awareness", start: "Nov 29, 2022", end: "Oct 29, 2022", spend: "$1250.00", roi: "-12.49%", up: false },
  { id: "33400000911", name: "Brand Awareness", start: "Nov 17, 2022", end: "Oct 29, 2022", spend: "$250,000", roi: "+0.50%", up: true },
  { id: "33400000904", name: "Flash Discount", start: "Sep 29, 2022", end: "Oct 28, 2022", spend: "$750.00", roi: "-12.80%", up: false },
];

const INSIGHTS = [
  "Your \"Summer Sale\" discount code is highly effective",
  "Ad spend on Google Shopping is yielding the best ROI",
  "Promote your top 3 items via targeted email campaigns",
];

const HEATMAP_CELLS = Array.from({ length: 30 }).map((_, i) => {
  const shades = [0.25, 0.4, 0.55, 0.7, 0.85, 1];
  return shades[(i * 7) % shades.length];
});
const HEATMAP_AMBER_INDEX = 11;

const MARKETING_TOOLS = [
  "Email Marketing Integration",
  "Ad Platform Pixel Setup",
  "Holiday Promotional Guide",
];

/* ---------------- Chart pieces ---------------- */

function Sparkline({ points, width = 240, height = 60, color = "#0f9d8e" }) {
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
  const gradId = `moSparkFill-${color.replace("#", "")}`;
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

function PerfChart({ months, values, width = 640, height = 190 }) {
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
    <div className="mo-perf-chart">
      <svg viewBox={`0 0 ${width} ${height}`} width="100%" height={height} preserveAspectRatio="none">
        <defs>
          <linearGradient id="moPerfArea" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0f9d8e" stopOpacity="0.2" />
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
              className={i === values.length - 2 ? "mo-bar mo-bar-highlight" : "mo-bar"}
            />
          );
        })}
        <path d={area} fill="url(#moPerfArea)" stroke="none" />
        <path d={line} fill="none" stroke="#0f9d8e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <div className="mo-perf-labels">
        {months.map((m) => (
          <span key={m}>{m}</span>
        ))}
      </div>
    </div>
  );
}

/* ---------------- Main component ---------------- */

export default function Marketing() {
  const [activeTab, setActiveTab] = useState("Campaigns");
  const [search, setSearch] = useState("");
  const [perfRange, setPerfRange] = useState("Custom Date");

  const filtered = CAMPAIGNS.filter((c) => {
    const q = search.trim().toLowerCase();
    if (!q) return true;
    return c.id.toLowerCase().includes(q) || c.name.toLowerCase().includes(q);
  });

  return (
    <div className="mo-dashboard">
      {/* Top bar */}
      <header className="mo-topbar">
        <h1>Marketing Overview</h1>
      </header>

      <div className="mo-subheader">
        <h2>Campaigns &amp; Promotions</h2>
      </div>

      {/* Top row */}
      <section className="mo-top-row">
        <div className="mo-col-narrow">
          <article className="mo-card mo-active-card">
            <span className="mo-label">Active Campaigns</span>
            <div className="mo-active-value">
              <strong>12 Active</strong> <span className="mo-arrow">&#8594;</span>
            </div>
            <div className="mo-spark"><Sparkline points={ACTIVE_TREND} /></div>
          </article>

          <article className="mo-card mo-balance-card">
            <div className="mo-card-head">
              <span className="mo-label">Balance Rate</span>
              <span className="mo-chip">Last 30 Days</span>
            </div>
            <span className="mo-value">$10.2M</span>
            <div className="mo-spark mo-spark-sm"><Sparkline points={BALANCE_TREND} color="#f2994a" /></div>
          </article>
        </div>

        <article className="mo-card mo-impact-card">
          <span className="mo-label">Promotion Impact</span>
          <div className="mo-metric-box mo-metric-green">
            <span>Estimated ROI</span>
            <strong>18.5% ROI</strong>
          </div>
          <div className="mo-metric-box mo-metric-amber">
            <span>Generated Revenue</span>
            <strong>$24,500.00</strong>
          </div>
          <span className="mo-pending-label">Pending Campaign Approvals</span>
          <span className="mo-pending-value">$7,200.00</span>
        </article>

        <article className="mo-card mo-perf-card">
          <div className="mo-perf-head">
            <span className="mo-label">Campaign Performance Over Time</span>
            <select className="mo-range-select" value={perfRange} onChange={(e) => setPerfRange(e.target.value)}>
              <option>Custom Date</option>
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>
          </div>
          <PerfChart months={PERF_MONTHS} values={PERF_VALUES} />
          <div className="mo-perf-stats">
            <div>
              <span className="mo-stat-label">Total Sales From Marketing</span>
              <span className="mo-stat-value">$1.1M</span>
            </div>
            <div>
              <span className="mo-stat-label">Ad Spend</span>
              <span className="mo-stat-value">$3.22k</span>
            </div>
          </div>
        </article>
      </section>

      {/* Main grid */}
      <div className="mo-main-grid">
        <div className="mo-left-col">
          <section className="mo-card mo-campaigns-panel">
            <nav className="mo-main-tabs">
              {TABS.map((tab) => (
                <button
                  key={tab}
                  className={`mo-main-tab${activeTab === tab ? " active" : ""}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </nav>

            <div className="mo-toolbar">
              <span className="mo-filter-pill">All Transactions</span>
              <div className="mo-search-box">
                <span className="mo-search-icon">&#128269;</span>
                <input
                  type="text"
                  placeholder="Search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>

            <div className="mo-table-scroll">
              <table className="mo-table">
                <thead>
                  <tr>
                    <th>Campaign ID</th>
                    <th>Name</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Total Spend</th>
                    <th>ROI</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((c, i) => (
                    <tr key={i}>
                      <td>{c.id}</td>
                      <td>{c.name}</td>
                      <td>{c.start}</td>
                      <td>{c.end}</td>
                      <td>{c.spend}</td>
                      <td>
                        <span className={`mo-roi ${c.up ? "mo-roi-up" : "mo-roi-down"}`}>{c.roi}</span>
                      </td>
                    </tr>
                  ))}
                  {filtered.length === 0 && (
                    <tr>
                      <td colSpan={6} className="mo-empty">No campaigns match your search.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="mo-footer-row">
              <div className="mo-search-box mo-search-bottom">
                <span className="mo-search-icon">&#128269;</span>
                <input type="text" placeholder="Search" />
              </div>
              <div className="mo-pagination">
                <button aria-label="First page">&#171;</button>
                <button aria-label="Previous page">&#8249;</button>
                <span>1 of 1</span>
                <button aria-label="Next page">&#8250;</button>
                <button aria-label="Last page">&#187;</button>
              </div>
            </div>
          </section>

          <section className="mo-card mo-quick-actions-card">
            <h3>Quick Actions</h3>
            <div className="mo-qa-list">
              <button className="mo-qa-btn mo-qa-green">Add Payout Method</button>
              <button className="mo-qa-btn mo-qa-green">Initiate Withdrawal</button>
              <button className="mo-qa-btn mo-qa-coral">Resolve Payment Dispute</button>
              <button className="mo-qa-btn mo-qa-green">View Tax Documents</button>
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <aside className="mo-sidebar">
          <section className="mo-card">
            <h3>Marketing Insights</h3>
            <ul className="mo-insight-list">
              {INSIGHTS.map((text, i) => (
                <li key={i}>{text}</li>
              ))}
            </ul>
          </section>

          <section className="mo-card">
            <h3>Campaign Performance Heatmap</h3>
            <div className="mo-heatgrid">
              {HEATMAP_CELLS.map((opacity, i) => (
                <span
                  key={i}
                  className={i === HEATMAP_AMBER_INDEX ? "mo-heat-amber" : "mo-heat-teal"}
                  style={{ opacity }}
                />
              ))}
            </div>
          </section>

          <section className="mo-card">
            <h3>Marketing Tools &amp; Integrations</h3>
            <ul className="mo-tools-list">
              {MARKETING_TOOLS.map((t, i) => (
                <li key={i}>
                  <span>{t}</span>
                  <button className="mo-download-btn" aria-label={`Download ${t}`}>&#8681;</button>
                </li>
              ))}
            </ul>
          </section>
        </aside>
      </div>

      <footer className="mo-footer">
        <span className="mo-brand">&#9632; ShopEase</span>
        <div className="mo-footer-right">
          <span className="mo-footer-links">
            <a href="#">Help Center</a>
            <a href="#">Contact</a>
          </span>
          <span className="mo-copyright">Copyright © 2022. ShopEase</span>
        </div>
      </footer>
    </div>
  );
}