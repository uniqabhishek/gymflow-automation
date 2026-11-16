import React from 'react';

export default function GymLogo({ className = "w-8 h-8" }) {
  return (
    <div className={`relative flex items-center justify-center shrink-0 ${className}`}>
      <svg 
        viewBox="0 0 100 100" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full filter drop-shadow-[0_2px_8px_rgba(16,185,129,0.35)]"
      >
        <defs>
          <linearGradient id="zymistGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10B981" />
            <stop offset="50%" stopColor="#059669" />
            <stop offset="100%" stopColor="#0284C7" />
          </linearGradient>
          <linearGradient id="zymistPlateGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#34D399" />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>
          <linearGradient id="zymistCoreGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#A7F3D0" />
          </linearGradient>
          <radialGradient id="zymistGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#10B981" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Ambient Glow */}
        <circle cx="50" cy="50" r="46" fill="url(#zymistGlow)" />

        {/* Shield / Hexagon Outer Badge */}
        <polygon 
          points="50,4 90,26 90,74 50,96 10,74 10,26" 
          fill="url(#zymistGrad)" 
          rx="12"
        />

        {/* Inner Dark Crest Frame */}
        <polygon 
          points="50,9 85,29 85,71 50,91 15,71 15,29" 
          fill="#0B131E" 
        />

        {/* Zymist Power Dumbbell & 'Z' Bolt Fusion */}
        <g transform="translate(0, 0)">
          {/* Left Weight Plates */}
          <rect x="22" y="32" width="7" height="36" rx="3.5" fill="url(#zymistPlateGrad)" />
          <rect x="31" y="37" width="6" height="26" rx="3" fill="#34D399" />

          {/* Right Weight Plates */}
          <rect x="71" y="32" width="7" height="36" rx="3.5" fill="url(#zymistPlateGrad)" />
          <rect x="63" y="37" width="6" height="26" rx="3" fill="#34D399" />

          {/* Central Grip Bar */}
          <rect x="34" y="47" width="32" height="6" rx="3" fill="#64748B" />

          {/* Stylized Powerful 'Z' Bolt Cutting Across Center */}
          <path 
            d="M38 34 H64 L48 50 H62 L36 68 L42 54 H28 L38 34 Z" 
            fill="url(#zymistCoreGrad)" 
            className="filter drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)]"
          />

          {/* Core Accent Spark Dot */}
          <circle cx="64" cy="34" r="2.5" fill="#FDE047" />
        </g>
      </svg>
    </div>
  );
}
