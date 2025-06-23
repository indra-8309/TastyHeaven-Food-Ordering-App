import React from 'react';
import '../Styling/shimmer.css';

export default function ShimmerCard() {
  return (
    <div className="shimmer-card">
      <div className="shimmer-img shimmer-animate"></div>
      <div className="shimmer-text shimmer-animate"></div>
      <div className="shimmer-text shimmer-animate short"></div>
    </div>
  );
}
