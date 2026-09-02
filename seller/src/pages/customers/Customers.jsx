import { useState } from "react";
import "./customers.css";

/* ---------------- Data ---------------- */

const ACTIVE_TREND = [10, 22, 14, 28, 18, 30, 22, 34];
const BALANCE_TREND = [8, 18, 12, 26, 16, 30];

const CHANNEL_BARS = [
  { label: "Channel", value: 70 },
  { label: "DE", value: 40 },
  { label: "Viet", value: 55 },
  { label: "WIR", value: 45 },
  { label: "Other", value: 25 },
];

const CSAT_MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const CSAT_BARS = [60, 70, 65, 80, 75, 90, 85, 100, 95, 110, 130, 120];

const SEGMENTS = [
  { value: 30, color: "var(--teal)" },
  { value: 22, color: "var(--teal-soft)" },
  { value: 18, color: "var(--teal-mid)" },
  { value: 15, color: "var(--amber)" },
  { value: 15, color: "var(--teal-pale)" },
];

const TICKETS_TABS = ["Customer Support Tickets", "Feedback & Reviews", "Returns & Refunds", "Activity Log"];

const TICKETS = [
  { id: "33400000200", name: "Diaan Matres", status: "Open", topic: "Order Status", updated: "Oct 17, 2022", assignee: "Assign" },
  { id: "33400000223", name: "Customer Namers", status: "Resolved", topic: "Defective Item", updated: "Oct 10, 2022", assignee: "Assignee" },
  { id: "33400000026", name: "Daan Maihes", status: "Resolved", topic: "Order Status", updated: "Apr 29, 2022", assignee: "Assignr" },
  { id: "33400000844", name: "Daan Maihes", status: "Awaiting Customer", topic: "Order Status", updated: "Apr 29, 2022", assignee: "Assignee" },
  { id: "33400000055", name: "Dann Marhes", status: "Awaiting Customer", topic: "Order Status", updated: "Apr 29, 2022", assignee: "Assignee" },
  { id: "33400000917", name: "Dann Mathes", status: "Resolved", topic: "Order Status", updated: "Apr 29, 2022", assignee: "Assignee" },
];

const CRITICAL_ALERTS = [
  "High ticket volume from new region detected",
  "Review recurring complaints for 'Product X'",
  "Schedule customer appreciation email",
];

const TOP_RETURNING = [
  "Top Returning Customers",
  "Top Routing Customers",
  "Top Returning Customers",
];

const ISSUE_MONTHS = ["Jan", "Feb", "Mar", "Jun", "Jul", "Aug", "Oct", "Nov", "Dec"];
const ISSUE_VALUES = [95, 65, 70, 55, 50, 45, 35, 30, 25];

const HANDLING_TOOLS = [
  "Support Knowledge Base",
  "Conflict Resolution Guide",
  "FAQ Template for Customer Use",
];

function statusClass(status) {
  switch (status) {
    case "Open": return "cho-status-open";
    case "Resolved": return "cho-status-resolved";
    case "Awaiting Customer": return "cho-status-awaiting";
    default: return "cho-status-default";
  }
}

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
  const gradId = `choSparkFill-${color.replace("#", "")}`;
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

function MiniBars({ data, height = 90 }) {
  const max = Math.max(...data.map((d) => d.value));
  return (
    <div className="cho-minibars" style={{ height }}>
      <div className="cho-minibars-plot">
        {data.map((d) => (
          <div className="cho-minibar-col" key={d.label}>
            <div className="cho-minibar-fill" style={{ height: `${(d.value / max) * 100}%` }} />
          </div>
        ))}
      </div>
      <div className="cho-minibars-labels">
        {data.map((d) => (
          <span key={d.label}>{d.label}</span>
        ))}
      </div>
    </div>
  );
}

function CsatChart({ months, values, width = 640, height = 170 }) {
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
    <div className="cho-csat-chart">
      <svg viewBox={`0 0 ${width} ${height}`} width="100%" height={height} preserveAspectRatio="none">
        <defs>
          <linearGradient id="choCsatArea" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0f9d8e" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#0f9d8e" stopOpacity="0" />
          </linearGradient>
        </defs>
        {values.map((v, i) => {
          const h = (v / max) * (height - 14);
          const x = i * barW + barW * 0.24;
          const w = barW * 0.52;
          return <rect key={i} x={x} y={height - h} width={w} height={h} rx="2.5" className="cho-csat-bar" />;
        })}
        <path d={area} fill="url(#choCsatArea)" stroke="none" />
        <path d={line} fill="none" stroke="#0f9d8e" strokeWidth="2" />
      </svg>
      <div className="cho-csat-labels">
        {months.map((m) => (
          <span key={m}>{m}</span>
        ))}
      </div>
    </div>
  );
}

function IssueBars({ months, values, width = 480, height = 160 }) {
  const max = Math.max(...values);
  const barW = width / values.length;
  return (
    <div className="cho-issue-chart">
      <svg viewBox={`0 0 ${width} ${height}`} width="100%" height={height} preserveAspectRatio="none">
        {values.map((v, i) => {
          const h = (v / max) * (height - 10);
          const x = i * barW + barW * 0.22;
          const w = barW * 0.56;
          return <rect key={i} x={x} y={height - h} width={w} height={h} rx="3" className="cho-issue-bar" />;
        })}
      </svg>
      <div className="cho-issue-labels">
        {months.map((m) => (
          <span key={m}>{m}</span>
        ))}
      </div>
    </div>
  );
}

function Donut({ data, size = 150, r = 62, stroke = 24 }) {
  const cx = size / 2;
  const cy = size / 2;
  const circumference = 2 * Math.PI * r;
  let acc = 0;
  return (
    <svg viewBox={`0 0 ${size} ${size}`} className="cho-donut">
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

export default function Customers() {
  const [activeTicketTab, setActiveTicketTab] = useState(TICKETS_TABS[0]);
  const [search, setSearch] = useState("");
  const [csatRange, setCsatRange] = useState("Custom Date");

  const filteredTickets = TICKETS.filter((t) => {
    const q = search.trim().toLowerCase();
    if (!q) return true;
    return (
      t.id.toLowerCase().includes(q) ||
      t.name.toLowerCase().includes(q) ||
      t.status.toLowerCase().includes(q)
    );
  });

  return (
    <div className="cho-dashboard">
      {/* Top bar */}
      <header className="cho-topbar">
        <h1>Customer Handling Overview</h1>
        
      </header>

     

      {/* Top row */}
      <section className="cho-top-row">
        <div className="cho-col-narrow">
          <article className="cho-card cho-interactions-card">
            <span className="cho-label">Active Interactions</span>
            <div className="cho-interactions-value">
              <strong>7 Pending</strong> <span className="cho-arrow">&#8594;</span>
            </div>
            <div className="cho-spark"><Sparkline points={ACTIVE_TREND} /></div>
          </article>

          <article className="cho-card cho-balance-card">
            <div className="cho-card-head">
              <span className="cho-label">Balance Rate</span>
              <span className="cho-chip">Last 30 Days</span>
            </div>
            <span className="cho-value">$10.2M</span>
            <div className="cho-spark cho-spark-sm"><Sparkline points={BALANCE_TREND} color="#f2994a" /></div>
          </article>
        </div>

        <article className="cho-card cho-support-card">
          <span className="cho-label">Support Performance</span>
          <div className="cho-metric-box cho-metric-green">
            <span>Average Response Time</span>
            <strong>14 mins</strong>
          </div>
          <div className="cho-metric-box cho-metric-amber">
            <span>First Contact Resolution</span>
            <strong>78%</strong>
          </div>
          <MiniBars data={CHANNEL_BARS} />
        </article>

        <article className="cho-card cho-csat-trend-card">
          <div className="cho-csat-head">
            <span className="cho-label">Customer Satisfaction Trend (CSAT)</span>
            <select className="cho-range-select" value={csatRange} onChange={(e) => setCsatRange(e.target.value)}>
              <option>Custom Date</option>
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>
          </div>
          <CsatChart months={CSAT_MONTHS} values={CSAT_BARS} />
          <div className="cho-csat-stats">
            <div>
              <span className="cho-stat-label">Total Sales From Marketing</span>
              <span className="cho-stat-value">$2.1M</span>
            </div>
            <div>
              <span className="cho-stat-label">Average CSAT</span>
              <span className="cho-stat-value">92%</span>
            </div>
          </div>
        </article>
      </section>

      {/* Main grid: tickets + segments */}
      <div className="cho-mid-grid">
        <section className="cho-card cho-tickets-panel">
          <nav className="cho-main-tabs">
            {TICKETS_TABS.map((tab) => (
              <button
                key={tab}
                className={`cho-main-tab${activeTicketTab === tab ? " active" : ""}`}
                onClick={() => setActiveTicketTab(tab)}
              >
                {tab}
              </button>
            ))}
          </nav>

          <div className="cho-toolbar">
            <span className="cho-filter-pill">All Transactions</span>
            <div className="cho-search-box">
              <span className="cho-search-icon">&#128269;</span>
              <input
                type="text"
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          <div className="cho-table-scroll">
            <table className="cho-table">
              <thead>
                <tr>
                  <th>Ticket ID</th>
                  <th>Customer Name</th>
                  <th>Status</th>
                  <th>Topic</th>
                  <th>Last Update</th>
                  <th>Assignee</th>
                </tr>
              </thead>
              <tbody>
                {filteredTickets.map((t, i) => (
                  <tr key={i}>
                    <td>{t.id}</td>
                    <td>{t.name}</td>
                    <td><span className={`cho-status ${statusClass(t.status)}`}>{t.status}</span></td>
                    <td>{t.topic}</td>
                    <td>{t.updated}</td>
                    <td className="cho-assignee">{t.assignee}</td>
                  </tr>
                ))}
                {filteredTickets.length === 0 && (
                  <tr>
                    <td colSpan={6} className="cho-empty">No tickets match your search.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="cho-critical-row">
            <div className="cho-critical-box">
              <h3>Critical Alerts</h3>
              <ul>
                {CRITICAL_ALERTS.map((a, i) => (
                  <li key={i}>{a}</li>
                ))}
              </ul>
            </div>
            <div className="cho-critical-box">
              <h3>Critical Alerts</h3>
              <ul>
                {CRITICAL_ALERTS.map((a, i) => (
                  <li key={i}>{a}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Segments + top returning */}
        <aside className="cho-side-col">
          <section className="cho-card cho-segments-card">
            <h3>Customer Segments</h3>
            <div className="cho-donut-wrap">
              <Donut data={SEGMENTS} />
            </div>
          </section>

          <section className="cho-card">
            <h3>Top Returning Customers</h3>
            <ul className="cho-returning-list">
              {TOP_RETURNING.map((label, i) => (
                <li key={i}>
                  <span>{label}</span>
                  <button className="cho-resolve-btn">Resolve</button>
                </li>
              ))}
            </ul>
          </section>
        </aside>
      </div>

      {/* Bottom row */}
      <section className="cho-bottom-grid">
        <article className="cho-card cho-quick-actions-card">
          <h3>Quick Actions</h3>
          <div className="cho-qa-list">
            <button className="cho-qa-btn cho-qa-green">Create New Support Ticket</button>
            <button className="cho-qa-btn cho-qa-green">Initiate Return/Refund</button>
            <button className="cho-qa-btn cho-qa-coral">Send Customer Broadcast Email</button>
            <button className="cho-qa-btn cho-qa-green">Assign Tickets</button>
          </div>
        </article>

        <article className="cho-card cho-issues-card">
          <h3>Top Support Issue Topics</h3>
          <IssueBars months={ISSUE_MONTHS} values={ISSUE_VALUES} />
        </article>

        <article className="cho-card cho-tools-card">
          <h3>Handling Tools &amp; Resources</h3>
          <ul className="cho-tools-list">
            {HANDLING_TOOLS.map((t, i) => (
              <li key={i}>
                <span>{t}</span>
                <button className="cho-download-btn" aria-label={`Download ${t}`}>&#8681;</button>
              </li>
            ))}
          </ul>
        </article>
      </section>

      <footer className="cho-footer">
        <span className="cho-brand">&#9632; ShopEase</span>
        <div className="cho-footer-right">
          <span className="cho-footer-links">
            <a href="#">Help Center</a>
            <a href="#">Contact</a>
          </span>
          <span className="cho-copyright">Copyright © 2022. ShopEase</span>
        </div>
      </footer>
    </div>
  );
}