import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export default function GlassCard({ children, className = '', style = {} }: GlassCardProps) {
  return (
    <div className={`glass ${className}`} style={style}>
      {children}
    </div>
  );
}
