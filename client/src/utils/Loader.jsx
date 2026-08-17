import React, { useState } from 'react'
import "./loader.css"

function Loader({height,width}) {
    
  
  return (
    < div style={{height:height,width:width,display:"flex",justifyContent:"center",alignItems:"center"}}>
        <div className="loader-wrap">
     

      <div className="stage">
        <div className="glow"></div>

        <svg viewBox="0 0 160 120">
          {/* Motion dust */}
          <g
            className="dust"
            stroke="var(--muted)"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <line x1="14" y1="60" x2="30" y2="60" />
            <line x1="10" y1="72" x2="24" y2="72" />
            <line x1="16" y1="84" x2="28" y2="84" />
          </g>

          {/* Cart */}
          <g className="cart">
            {/* Items */}
            <rect
              className="item item1"
              x="52"
              y="30"
              width="14"
              height="14"
              rx="2"
              fill="var(--coral)"
            />

            <circle
              className="item item2"
              cx="76"
              cy="34"
              r="7"
              fill="var(--gold)"
            />

            <rect
              className="item item3"
              x="90"
              y="28"
              width="12"
              height="16"
              rx="2"
              fill="var(--cream)"
            />

            {/* Cart basket */}
            <path
              d="M40,52 L118,52 L108,86 L54,86 Z"
              fill="var(--panel)"
              stroke="var(--gold)"
              strokeWidth="2"
              strokeLinejoin="round"
            />

            {/* Basket lattice */}
            <line
              x1="58"
              y1="52"
              x2="62"
              y2="86"
              stroke="var(--gold)"
              strokeWidth="1"
              opacity="0.5"
            />

            <line
              x1="79"
              y1="52"
              x2="81"
              y2="86"
              stroke="var(--gold)"
              strokeWidth="1"
              opacity="0.5"
            />

            <line
              x1="100"
              y1="52"
              x2="100"
              y2="86"
              stroke="var(--gold)"
              strokeWidth="1"
              opacity="0.5"
            />

            {/* Handle */}
            <path
              d="M40,52 L30,52 L22,42"
              fill="none"
              stroke="var(--gold)"
              strokeWidth="2.5"
              strokeLinecap="round"
            />

            {/* Left wheel */}
            <g className="wheel" transform="translate(62,96)">
              <circle
                r="7"
                fill="var(--ink)"
                stroke="var(--cream)"
                strokeWidth="2"
              />

              <line
                x1="0"
                y1="-4"
                x2="0"
                y2="4"
                stroke="var(--coral)"
                strokeWidth="1.5"
              />

              <line
                x1="-4"
                y1="0"
                x2="4"
                y2="0"
                stroke="var(--coral)"
                strokeWidth="1.5"
              />
            </g>

            {/* Right wheel */}
            <g className="wheel" transform="translate(98,96)">
              <circle
                r="7"
                fill="var(--ink)"
                stroke="var(--cream)"
                strokeWidth="2"
              />

              <line
                x1="0"
                y1="-4"
                x2="0"
                y2="4"
                stroke="var(--coral)"
                strokeWidth="1.5"
              />

              <line
                x1="-4"
                y1="0"
                x2="4"
                y2="0"
                stroke="var(--coral)"
                strokeWidth="1.5"
              />
            </g>
          </g>
        </svg>
      </div>

      
    </div>

    </div>
  )
}

export default Loader