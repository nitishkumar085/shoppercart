import { useState } from "react";
import "./orders.css";

/* ---------------- Data ---------------- */

const GROWTH_TREND = [20, 32, 24, 40, 30, 46, 36, 54, 44, 62];

const SEGMENTS = [
  { label: "Loyal", value: 147, color: "var(--teal)" },
  { label: "At-Risk", value: 103, color: "var(--amber)" },
  { label: "New", value: 36, color: "var(--grey)" },
  { label: "Inactive", value: 23, color: "var(--coral)" },
];

const CSAT = [
  { label: "Satisfied", value: 55, color: "var(--green)" },
  { label: "Neutral", value: 20, color: "var(--blue)" },
  { label: "Unsatisfied", value: 15, color: "var(--amber)" },
  { label: "Highly Unsatisfied", value: 10, color: "var(--coral)" },
];

const CUSTOMERS = [
  { name: "Sarah Chen", email: "sarahche@gmail.com", phone: "(31)223-5737", orders: 9, value: "$125.00", join: "07/01/2021", score: 85 },
  { name: "David Lee", email: "davidLee@gmail.com", phone: "(31)223-5806", orders: 39, value: "$125.00", join: "04/01/2021", score: 82 },
  { name: "Fatima Khan", email: "fatimakhan gmail.com", phone: "(31)223-5354", orders: 35, value: "$150.00", join: "05/01/2021", score: 78 },
  { name: "Aman Singh", email: "encnten@gmail.com", phone: "(31)123-5583", orders: 56, value: "$120.00", join: "06/01/2021", score: 70 },
  { name: "Anooha Rhtan", email: "boopett@gmail.com", phone: "(91)223-4587", orders: 3, value: "$55.00", join: "05/01/2022", score: 50 },
  { name: "David Chen", email: "cano22@gmail.com", phone: "(91)223-5539", orders: 24, value: "$100.00", join: "09/01/2022", score: 45 },
  { name: "Driva Kamas", email: "vilimenia@gmail.com", phone: "(91)223-5638", orders: 12, value: "$55.00", join: "08/01/2022", score: 38 },
  { name: "Aman Singh", email: "amixser@gmail.com", phone: "(51)223-5589", orders: 11, value: "$55.00", join: "09/07/2022", score: 25 },
  { name: "Karan Mehtar", email: "pracnecr@gmail.com", phone: "(71)223-5757", orders: 5, value: "$50.00", join: "06/07/2022", score: 60 },
  { name: "Arran Singh", email: "email2@gmail.com", phone: "(91)223-5539", orders: 11, value: "$55.00", join: "08/12/2023", score: 22 },
  { name: "Aman Singh", email: "chenna@gmail.com", phone: "(91)223-5669", orders: 11, value: "$55.00", join: "05/10/2023", score: 65 },
  { name: "David Chen", email: "neen@gmail.com", phone: "(91)223-5845", orders: 9, value: "$55.00", join: "09/10/2023", score: 72 },
  { name: "Fatima Khan", email: "carrebt@gmail.com", phone: "(91)223-5689", orders: 7, value: "$55.00", join: "07/11/2023", score: 68 },
];

const TOP_SPENDING = [
  "Sarah Chen - $105,250",
  "David Lee - $150,000",
  "Fatima Khan - $120,000",
];

const CHURN_ALERTS = [
  { text: "Aman Singh - 90 Days", tone: "coral" },
  { text: "medium i'han - 120 Days", tone: "amber" },
  { text: "Fatima Khan - 120 Days", tone: "amber" },
  { text: "Arman Singh - 100 Days", tone: "teal" },
];

function scoreColor(score) {
  if (score >= 65) return "var(--teal)";
  if (score >= 40) return "var(--amber)";
  return "var(--coral)";
}

/* ---------------- Chart pieces ---------------- */

function Sparkline({ points, width = 260, height = 56 }) {
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
  return (
    <svg viewBox={`0 0 ${width} ${height}`} width="100%" height="100%" preserveAspectRatio="none">
      <defs>
        <linearGradient id="cdSparkFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0f9d8e" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#0f9d8e" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill="url(#cdSparkFill)" stroke="none" />
      <path d={line} fill="none" stroke="#0f9d8e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SegmentBars({ data, height = 130 }) {
  const max = Math.max(...data.map((d) => d.value));
  return (
    <div className="cd-barchart" style={{ height }}>
      <div className="cd-barchart-plot">
        {data.map((d) => (
          <div className="cd-bar-col" key={d.label}>
            <span className="cd-bar-value">{d.value}</span>
            <div className="cd-bar-track">
              <div className="cd-bar-fill" style={{ height: `${(d.value / max) * 100}%`, background: d.color }} />
            </div>
          </div>
        ))}
      </div>
      <div className="cd-barchart-labels">
        {data.map((d) => (
          <span key={d.label}>{d.label}</span>
        ))}
      </div>
    </div>
  );
}

function Donut({ data, size = 116, r = 46, stroke = 16, center }) {
  const cx = size / 2;
  const cy = size / 2;
  const circumference = 2 * Math.PI * r;
  let acc = 0;
  return (
    <div className="cd-donut-holder" style={{ width: size, height: size }}>
      <svg viewBox={`0 0 ${size} ${size}`} className="cd-donut">
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
      {center && (
        <div className="cd-donut-center">
          <span className="cd-donut-center-value">{center.value}</span>
          <span className="cd-donut-center-label">{center.label}</span>
        </div>
      )}
    </div>
  );
}

/* ---------------- Main component ---------------- */

export default function Orders() {
  const [search, setSearch] = useState("");

  const filtered = CUSTOMERS.filter((c) => {
    const q = search.trim().toLowerCase();
    if (!q) return true;
    return c.name.toLowerCase().includes(q) || c.email.toLowerCase().includes(q);
  });

  return (
    <div className="cd-dashboard">
      {/* Header */}
      <header className="cd-header">
        <h1>Orders Overview &amp; Actions</h1>
        <span className="cd-welcome">Welcome back, Seller!</span>
      </header>

      {/* Top row */}
      <section className="cd-top-row">
        <article className="cd-card cd-growth-card">
          <div className="cd-card-head">
            <span className="cd-label">Total Customer Growth</span>
            <span className="cd-pill cd-pill-up">+8.5%</span>
          </div>
          <span className="cd-value">$105,250</span>
          <p className="cd-sub">+12.5% vs. prev 30 days</p>
          <div className="cd-spark"><Sparkline points={GROWTH_TREND} /></div>
          <div className="cd-axis">
            <span>$5K</span>
            <span>Last 30 days</span>
          </div>
        </article>

        <article className="cd-card cd-segments-card">
          <div className="cd-card-head">
            <span className="cd-label">Customer Segments</span>
            <span className="cd-pill cd-pill-up">+10.2%</span>
          </div>
          <span className="cd-value">2,300</span>
          <p className="cd-sub">Segment Breakdown: Last 30 Days</p>
          <SegmentBars data={SEGMENTS} />
        </article>

        <article className="cd-card cd-csat-card">
          <span className="cd-label">Customer Satisfaction (CSAT)</span>
          <p className="cd-sub">CSAT Scores (last 30 days)</p>
          <div className="cd-csat-body">
            <Donut data={CSAT} center={{ value: "88%", label: "CSAT" }} />
            <ul className="cd-legend">
              {CSAT.map((s) => (
                <li key={s.label}>
                  <span className="cd-swatch" style={{ background: s.color }} />
                  {s.label}
                </li>
              ))}
            </ul>
          </div>
        </article>
      </section>

      {/* Quick actions */}
      <section className="cd-quick-actions">
        <h2>Quick Action Buttons</h2>
        <div className="cd-action-row">
          <button className="cd-btn cd-btn-primary">+ Add New Customer</button>
          <button className="cd-btn">&#9776; Manage Groups</button>
          <button className="cd-btn">&#8659; Export Customers</button>
          <button className="cd-btn">&#8646; Engagement Tools</button>
        </div>
      </section>

      {/* Main grid */}
      <div className="cd-main-grid">
        <section className="cd-card cd-directory-panel">
          <nav className="cd-main-tabs">
            <button className="cd-main-tab active">Customer Directory</button>
          </nav>

          <div className="cd-toolbar">
            <h3>Customer Directory</h3>
            <div className="cd-search-box">
              <span className="cd-search-icon">&#128269;</span>
              <input
                type="text"
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          <div className="cd-table-scroll">
            <table className="cd-table">
              <thead>
                <tr>
                  <th className="cd-col-check"><input type="checkbox" /></th>
                  <th>Customer Image</th>
                  <th>Customer Name</th>
                  <th>Email Address</th>
                  <th>Phone</th>
                  <th>Total Lifetime Orders</th>
                  <th>Total Lifetime Value</th>
                  <th>Join Date</th>
                  <th>Engagement Score (0-100)</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((c, i) => (
                  <tr key={i}>
                    <td className="cd-col-check"><input type="checkbox" /></td>
                    <td><span className="cd-avatar" /></td>
                    <td className="cd-name">{c.name}</td>
                    <td>{c.email}</td>
                    <td>{c.phone}</td>
                    <td>{c.orders}</td>
                    <td>{c.value}</td>
                    <td>{c.join}</td>
                    <td>
                      <span className="cd-score-track">
                        <span
                          className="cd-score-fill"
                          style={{ width: `${c.score}%`, background: scoreColor(c.score) }}
                        />
                      </span>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={9} className="cd-empty">No customers match your search.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="cd-footer-row">
            <div className="cd-search-box cd-search-bottom">
              <span className="cd-search-icon">&#128269;</span>
              <input type="text" placeholder="Search" />
            </div>
            <div className="cd-pagination">
              <button aria-label="First page">&#171;</button>
              <button aria-label="Previous page">&#8249;</button>
              <span>1 of 1</span>
              <button aria-label="Next page">&#8250;</button>
              <button aria-label="Last page">&#187;</button>
            </div>
          </div>
        </section>

        {/* Sidebar */}
        <aside className="cd-sidebar">
          <h2 className="cd-sidebar-title">Insights &amp; Alerts</h2>

          <section className="cd-card">
            <h3>Top Customer Performance (re-named)</h3>
            <span className="cd-mini-label">Top 3 Highest Spending</span>
            <ol className="cd-num-list">
              {TOP_SPENDING.map((p, i) => (
                <li key={i}>{p}</li>
              ))}
            </ol>
          </section>

          <section className="cd-card">
            <h3>Churn Alerts</h3>
            <ul className="cd-alert-list">
              {CHURN_ALERTS.map((a, i) => (
                <li className={`cd-alert cd-alert-${a.tone}`} key={i}>{a.text}</li>
              ))}
            </ul>
          </section>
        </aside>
      </div>

      <footer className="cd-footer">
        <span className="cd-brand">&#9632; ShopEase</span>
        <div className="cd-footer-right">
          <span className="cd-footer-links">
            <a href="#">Help Center</a>
            <a href="#">Contact</a>
          </span>
          <span className="cd-copyright">Copyright © 2022. ShopEase</span>
        </div>
      </footer>
    </div>
  );
}