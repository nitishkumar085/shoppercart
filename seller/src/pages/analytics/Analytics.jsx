import { useState } from "react";
import "./analytics.css";

/* ---------------- Data ---------------- */

const REVENUE_TREND = [20, 34, 26, 40, 30, 46, 38, 52];
const CONV_TREND = [30, 22, 36, 28, 42, 34, 48, 40];
const AOV_TREND = [15, 24, 18, 30, 22, 36, 28, 42];

const FUNNEL_STAGES = [
  { label: "Product Views", color: "var(--teal)" },
  { label: "Add to Cart", color: "var(--amber)" },
  { label: "Checkout", color: "var(--grey)" },
  { label: "Purchase", color: "var(--green)" },
];
const FUNNEL_DROPS = ["-15.6%", "-75.6%", ""];
const FUNNEL_GAINS = ["Drop off", "+ Conversion", "+ Conversion"];

const SALES_LABELS = ["3/1", "6/3", "11/21", "15/21", "21/21", "27/21", "30/30"];
const SALES_A = [60, 130, 90, 150, 100, 210, 120];
const SALES_B = [40, 70, 55, 90, 65, 110, 80];

const TRAFFIC_SOURCES = [
  { label: "Email", pct: 65, color: "var(--teal)" },
  { label: "Social Ads", pct: 35, color: "var(--amber)" },
  { label: "Checkout", pct: 60, color: "var(--grey)" },
];

const TOP_PRODUCTS = [
  { name: "AuraSmart Speaker", rev: "$12k", cr: "5.2%", rating: 4 },
  { name: "AuraSmart Speaker", rev: "$12k", cr: "5.2%", rating: 5 },
  { name: "AuraSmart Speaker", rev: "$12k", cr: "5.2%", rating: 4 },
  { name: "AuraSmart Speaker", rev: "$12k", cr: "5.2%", rating: 3 },
];

const REPORT_TABS = ["Detailed Report", "Sales Report", "Customer Insights"];

const PRODUCTS_TABLE = [
  { name: "Smart Home Kit", category: "Random", revenue: "$485,250", units: 147, cr: "5.2%", returns: 9, up: true },
  { name: "Fitness Tracker", category: "Fitness", revenue: "$33,500", units: 41, cr: "4.2%", returns: 5, up: true },
  { name: "Gamer Mouse", category: "Fitness Tracker", revenue: "$15,000", units: 136, cr: "6.2%", returns: 2, up: true },
  { name: "Smart Mouse", category: "Category", revenue: "$16,000", units: 24, cr: "11.2%", returns: 3, up: true },
  { name: "AnraBast Stackr", category: "Product", revenue: "$25,000", units: 53, cr: "5.2%", returns: 7, up: true },
  { name: "Smart Mouse", category: "Product", revenue: "$37,500", units: 25, cr: "2.1%", returns: 2, up: false },
  { name: "Gamer Mouse", category: "Category", revenue: "$20,000", units: 37, cr: "6.2%", returns: 3, up: true },
  { name: "Smart Home Kit", category: "Category", revenue: "$15,500", units: 130, cr: "5.5%", returns: 3, up: true },
  { name: "Light Tracker", category: "Fitness Tracker", revenue: "$16,000", units: 60, cr: "1.7%", returns: 10, up: false },
  { name: "Gamer Mouse", category: "Fitness", revenue: "$25,000", units: 17, cr: "8.2%", returns: 6, up: true },
  { name: "Gamer Mouse", category: "Fitness Tracker", revenue: "$23,000", units: 36, cr: "11.0%", returns: 1, up: true },
  { name: "Smart Home Kit", category: "Category", revenue: "$35,000", units: 3, cr: "10.5%", returns: 4, up: true },
  { name: "Gamer Mouse", category: "Product", revenue: "$12,000", units: 11, cr: "5.3%", returns: 12, up: false },
];

const ACTIONABLE_INSIGHTS = [
  "Low-stock alert on high-performing product",
  "Email campaign with 50% discount to high-intent abandoners",
  "Low-stock alert, with on top products",
  "Email campaign with 50% discount to co-planners",
  "Email campaign with 50% discount to high-intent abandoners",
];

const FORECAST = [
  { label: "Top Categories", value: "$35,000" },
  { label: "Top Categor 2", value: "$17,000" },
  { label: "Top Categor 4", value: "$12,500" },
];

/* ---------------- Chart pieces ---------------- */

function Sparkline({ points, width = 220, height = 46, color = "#0f9d8e" }) {
  const max = Math.max(...points);
  const min = Math.min(...points);
  const step = width / (points.length - 1);
  const coords = points.map((p, i) => {
    const x = i * step;
    const y = height - ((p - min) / (max - min || 1)) * (height - 6) - 3;
    return [x, y];
  });
  const line = coords.map((c, i) => (i === 0 ? "M" : "L") + c[0] + "," + c[1]).join(" ");
  return (
    <svg viewBox={`0 0 ${width} ${height}`} width="100%" height="100%" preserveAspectRatio="none">
      <path d={line} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function MiniTrend({ up = true, width = 64, height = 26 }) {
  const points = up ? [10, 6, 14, 8, 18, 12, 22] : [20, 16, 18, 10, 12, 6, 8];
  return <Sparkline points={points} width={width} height={height} color={up ? "#0f9d8e" : "#e0725a"} />;
}

function SalesAreaChart({ labels, seriesA, seriesB, width = 600, height = 180 }) {
  const max = Math.max(...seriesA, ...seriesB);
  const step = width / (labels.length - 1);
  const toPath = (vals) => {
    const coords = vals.map((v, i) => {
      const x = i * step;
      const y = height - (v / max) * (height - 14) - 6;
      return [x, y];
    });
    const line = coords.map((c, i) => (i === 0 ? "M" : "L") + c[0] + "," + c[1]).join(" ");
    return { line, area: `${line} L${width},${height} L0,${height} Z` };
  };
  const a = toPath(seriesA);
  const b = toPath(seriesB);
  return (
    <div className="perf-sales-chart">
      <svg viewBox={`0 0 ${width} ${height}`} width="100%" height={height} preserveAspectRatio="none">
        <defs>
          <linearGradient id="salesFillA" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0f9d8e" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#0f9d8e" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="salesFillB" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f2994a" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#f2994a" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={a.area} fill="url(#salesFillA)" stroke="none" />
        <path d={b.area} fill="url(#salesFillB)" stroke="none" />
        <path d={a.line} fill="none" stroke="#0f9d8e" strokeWidth="2" />
        <path d={b.line} fill="none" stroke="#f2994a" strokeWidth="2" />
      </svg>
      <div className="perf-sales-labels">
        {labels.map((l) => (
          <span key={l}>{l}</span>
        ))}
      </div>
    </div>
  );
}

function Stars({ count = 4 }) {
  return (
    <span className="perf-stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={i < count ? "on" : ""}>&#9733;</span>
      ))}
    </span>
  );
}

/* ---------------- Main component ---------------- */

export default function Analytics() {
  const [activeTab, setActiveTab] = useState("Detailed Report");
  const [search, setSearch] = useState("");
  const [salesRange, setSalesRange] = useState("Last 30 Days");

  const filteredProducts = PRODUCTS_TABLE.filter((p) => {
    const q = search.trim().toLowerCase();
    if (!q) return true;
    return p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q);
  });

  return (
    <div className="perf-dashboard">
      {/* Header */}
      <header className="perf-header">
        <h1>Performance Overview</h1>
        <span className="perf-welcome">Welcome back, Seller!</span>
      </header>

      {/* Top row */}
      <section className="perf-top-row">
        <div className="perf-stat-col">
          <article className="perf-card perf-stat-card">
            <div className="perf-stat-head">
              <span className="perf-label">Total Revenue</span>
              <span className="perf-pill perf-pill-up">+12.5%</span>
            </div>
            <span className="perf-value">$485,250</span>
            <div className="perf-spark"><Sparkline points={REVENUE_TREND} /></div>
          </article>

          <article className="perf-card perf-stat-card">
            <div className="perf-stat-head">
              <span className="perf-label">Conversion Rate</span>
              <span className="perf-pill perf-pill-up">+14.8%</span>
            </div>
            <span className="perf-value">12.5%</span>
            <div className="perf-spark"><Sparkline points={CONV_TREND} color="#f2994a" /></div>
          </article>

          <article className="perf-card perf-stat-card">
            <div className="perf-stat-head">
              <span className="perf-label">Average Order Value</span>
            </div>
            <span className="perf-value">$10.2M</span>
            <div className="perf-spark"><Sparkline points={AOV_TREND} /></div>
          </article>
        </div>

        <article className="perf-card perf-funnel-card">
          <h2>Conversion Funnel</h2>
          <div className="perf-funnel">
            {FUNNEL_STAGES.map((stage, i) => (
              <div className="perf-funnel-stage" key={stage.label}>
                <div
                  className="perf-funnel-block"
                  style={{
                    background: stage.color,
                    width: `${100 - i * 16}%`,
                  }}
                >
                  {stage.label}
                </div>
                {i < FUNNEL_STAGES.length - 1 && (
                  <div className="perf-funnel-meta">
                    <span className="perf-funnel-arrow">&#9660;</span>
                    <span className={`perf-funnel-drop${FUNNEL_DROPS[i] ? "" : " hidden"}`}>
                      {FUNNEL_DROPS[i]}
                    </span>
                    <span className="perf-funnel-gain">{FUNNEL_GAINS[i]}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </article>

        <article className="perf-card perf-sales-card">
          <div className="perf-sales-head">
            <span className="perf-label">Sales Trends</span>
            <select
              className="perf-range-select"
              value={salesRange}
              onChange={(e) => setSalesRange(e.target.value)}
            >
              <option>Last 30 Days</option>
              <option>Last 7 Days</option>
              <option>This Month</option>
            </select>
          </div>
          <SalesAreaChart labels={SALES_LABELS} seriesA={SALES_A} seriesB={SALES_B} />
        </article>
      </section>

      {/* Customer & Product Analysis */}
      <h2 className="perf-section-title">Customer &amp; Product Analysis</h2>

      <div className="perf-main-grid">
        {/* Left narrow column */}
        <div className="perf-left-col">
          <article className="perf-card">
            <h3>Customer Demographics &amp; Behavior</h3>
            <div className="perf-map">
              <span className="perf-map-hint perf-map-hint-tl">High</span>
              <span className="perf-map-hint perf-map-hint-tr">High</span>
              <span className="perf-map-hint perf-map-hint-bl">Low</span>
              <span className="perf-map-hint perf-map-hint-br">Low</span>
              <div className="perf-map-blob perf-map-blob-1" />
              <div className="perf-map-blob perf-map-blob-2" />
              <div className="perf-map-blob perf-map-blob-3" />
            </div>

            <div className="perf-heat-row">
              <div>
                <span className="perf-mini-label">Customer Location</span>
                <div className="perf-heatgrid">
                  {Array.from({ length: 25 }).map((_, i) => (
                    <span key={i} style={{ opacity: 0.2 + ((i * 37) % 80) / 100 }} />
                  ))}
                </div>
              </div>
              <div>
                <span className="perf-mini-label">Repeat Purchase</span>
                <div className="perf-scatter">
                  {Array.from({ length: 14 }).map((_, i) => (
                    <span
                      key={i}
                      style={{
                        left: `${(i * 13) % 100}%`,
                        bottom: `${(i * 27) % 100}%`,
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </article>

          <article className="perf-card">
            <h3>Traffic Sources</h3>
            <div className="perf-traffic">
              {TRAFFIC_SOURCES.map((t) => (
                <div className="perf-traffic-row" key={t.label}>
                  <span className="perf-traffic-label">{t.label}</span>
                  <span className="perf-traffic-track">
                    <span
                      className="perf-traffic-fill"
                      style={{ width: `${t.pct}%`, background: t.color }}
                    />
                  </span>
                  <span className="perf-traffic-pct">{t.pct}%</span>
                </div>
              ))}
              <div className="perf-traffic-row">
                <span className="perf-traffic-label">Purchase</span>
                <span className="perf-traffic-track">
                  <span className="perf-traffic-fill" style={{ width: "40%", background: "var(--teal-soft)" }} />
                </span>
                <span className="perf-traffic-pct">40%</span>
              </div>
            </div>
          </article>

          <article className="perf-card">
            <h3>Top Products Performance</h3>
            <ul className="perf-top-products">
              {TOP_PRODUCTS.map((p, i) => (
                <li key={i}>
                  <span className="perf-product-thumb" />
                  <div className="perf-product-info">
                    <span className="perf-product-name">{p.name}</span>
                    <span className="perf-product-meta">Rev: {p.rev}, CR: {p.cr}</span>
                    <Stars count={p.rating} />
                    <span className="perf-avg-label">Avg. Rating</span>
                  </div>
                </li>
              ))}
            </ul>
          </article>
        </div>

        {/* Center: report table */}
        <section className="perf-card perf-report-panel">
          <nav className="perf-report-tabs">
            {REPORT_TABS.map((tab) => (
              <button
                key={tab}
                className={`perf-report-tab${activeTab === tab ? " active" : ""}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </nav>

          <div className="perf-toolbar">
            <span className="perf-filter-pill">Product Performance</span>
            <div className="perf-search-box">
              <span className="perf-search-icon">&#128269;</span>
              <input
                type="text"
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          <div className="perf-table-scroll">
            <table className="perf-table">
              <thead>
                <tr>
                  <th>Product Name</th>
                  <th>Category</th>
                  <th>Revenue</th>
                  <th>Units Sold</th>
                  <th>Conversion Rate</th>
                  <th>Returns</th>
                  <th>Trend</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((p, i) => (
                  <tr key={i}>
                    <td>{p.name}</td>
                    <td>{p.category}</td>
                    <td>{p.revenue}</td>
                    <td>{p.units}</td>
                    <td>{p.cr}</td>
                    <td>{p.returns}</td>
                    <td><MiniTrend up={p.up} /></td>
                  </tr>
                ))}
                {filteredProducts.length === 0 && (
                  <tr>
                    <td colSpan={7} className="perf-empty">No products match your search.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="perf-footer-row">
            <div className="perf-search-box perf-search-bottom">
              <span className="perf-search-icon">&#128269;</span>
              <input type="text" placeholder="Search" />
            </div>
            <div className="perf-pagination">
              <button aria-label="First page">&#171;</button>
              <button aria-label="Previous page">&#8249;</button>
              <span>1 of 1</span>
              <button aria-label="Next page">&#8250;</button>
              <button aria-label="Last page">&#187;</button>
            </div>
          </div>
        </section>

        {/* Right sidebar */}
        <aside className="perf-sidebar">
          <section className="perf-card">
            <h3>Actionable Insights</h3>
            <ul className="perf-insight-list">
              {ACTIONABLE_INSIGHTS.map((text, i) => (
                <li key={i}>{text}</li>
              ))}
            </ul>
          </section>

          <section className="perf-card">
            <h3>Predictive Analysis</h3>
            <span className="perf-mini-label">Projected Next Month Revenue</span>
            <ul className="perf-bound-list">
              <li><span>Upper Bound</span><strong className="up">$485,000</strong></li>
              <li><span>Lower Bound</span><strong className="down">-$330,000</strong></li>
            </ul>
            <span className="perf-mini-label perf-mt">Trend Forecast</span>
            <ul className="perf-forecast-list">
              {FORECAST.map((f) => (
                <li key={f.label}><span>{f.label}</span><strong>{f.value}</strong></li>
              ))}
            </ul>
          </section>

          <section className="perf-card">
            <h3>A/B Test Results Summary</h3>
            <div className="perf-ab-list">
              <div className="perf-ab-item perf-ab-coral">Product Page Layout A vs. B</div>
              <div className="perf-ab-item perf-ab-teal">Product Page Layout A vs. B</div>
            </div>
          </section>
        </aside>
      </div>

      <footer className="perf-footer">
        <span className="perf-brand">&#9632; ShopEase</span>
        <div className="perf-footer-right">
          <span className="perf-footer-links">
            <a href="#">Help Center</a>
            <a href="#">Contact</a>
          </span>
          <span className="perf-copyright">Copyright © 2022. ShopEase</span>
        </div>
      </footer>
    </div>
  );
}