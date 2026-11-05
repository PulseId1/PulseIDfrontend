import React from "react";

interface CardCurvedBorderProps {
  readonly color: string;
  readonly width?: number;
}

/**
 * CardCurvedBorder
 *
 * Renders a crisp colored accent border that hugs the left side and curves smoothly
 * around the top-left and bottom-left rounded-2xl corners (radius = 16px).
 *
 * Terminating constraint:
 * The accent stroke stops strictly at the corner tangent points (x = 16px) at both
 * the top and bottom edges, without spilling horizontally onto the flat edges.
 */
export function CardCurvedBorder({ color, width = 3.5 }: CardCurvedBorderProps) {
  const halfWidth = width / 2;
  const arcRadius = 16 - halfWidth;
  const bottomCenterY = 4; // in a 20x20 box, center is 16px from bottom (20 - 16 = 4)
  const bottomArcEndY = bottomCenterY + arcRadius;

  return (
    <div
      className="absolute -inset-px pointer-events-none rounded-2xl overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* Top-Left Curve: arcs from top tangent (x=16, y=halfWidth) to left tangent (x=halfWidth, y=16) */}
      <svg
        className="absolute top-0 left-0 pointer-events-none"
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
      >
        <path
          d={`M 16 ${halfWidth} A ${arcRadius} ${arcRadius} 0 0 0 ${halfWidth} 16`}
          stroke={color}
          strokeWidth={width}
          strokeLinecap="butt"
        />
      </svg>

      {/* Straight Left Vertical Edge */}
      <span
        className="absolute left-0 top-[16px] bottom-[16px] pointer-events-none"
        style={{
          width: `${width}px`,
          backgroundColor: color,
        }}
      />

      {/* Bottom-Left Curve: arcs from left tangent (x=halfWidth, y=4) to bottom tangent (x=16, y=bottomArcEndY) */}
      <svg
        className="absolute bottom-0 left-0 pointer-events-none"
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
      >
        <path
          d={`M ${halfWidth} ${bottomCenterY} A ${arcRadius} ${arcRadius} 0 0 0 16 ${bottomArcEndY}`}
          stroke={color}
          strokeWidth={width}
          strokeLinecap="butt"
        />
      </svg>
    </div>
  );
}

