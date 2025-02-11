import React from 'react';
import { Node, Position } from '../types';

interface Props {
  nodes: Node[];
  edges: [string, string][];
  positions: Record<string, Position>;
}

export const LatticeVisualization: React.FC<Props> = ({ nodes, edges, positions }) => {
  const svgWidth = 800;
  const svgHeight = 500;
  const nodeWidth = 70;
  const nodeHeight = 35;
  
  // Calculate the bounds for centering
  const minX = Math.min(...Object.values(positions).map(p => p.x));
  const maxX = Math.max(...Object.values(positions).map(p => p.x));
  const minY = Math.min(...Object.values(positions).map(p => p.y));
  const maxY = Math.max(...Object.values(positions).map(p => p.y));
  
  // Calculate translation to center the visualization
  const translateX = (svgWidth - (maxX - minX)) / 3 - minX;
  const translateY = (svgHeight - (maxY - minY)) / 2 - minY;
  
  return (
    <div className="relative p-[3px] bg-gradient-to-r from-[#B31942] via-[#002868] to-[#B31942] rounded-lg animate-gradient-x">
      <div className="bg-white rounded-lg p-4">
        <svg width={svgWidth} height={svgHeight}>
          <g transform={`translate(${translateX},${translateY})`}>
            {/* Draw edges first so they appear behind nodes */}
            {edges.map(([from, to], index) => (
              <line
                key={index}
                x1={positions[from].x + nodeWidth/2}
                y1={positions[from].y + nodeHeight/2}
                x2={positions[to].x + nodeWidth/2}
                y2={positions[to].y + nodeHeight/2}
                stroke="#000000"
                strokeWidth={1.5}
              />
            ))}
            
            {/* Draw nodes */}
            {nodes.map((node) => {
              const pos = positions[node.id];
              return (
                <g key={node.id} transform={`translate(${pos.x},${pos.y})`}>
                  <rect
                    x={0}
                    y={0}
                    width={nodeWidth}
                    height={nodeHeight}
                    rx={6}
                    className="fill-white"
                    stroke="#000000"
                    strokeWidth={1.5}
                  />
                  <text
                    x={nodeWidth/2}
                    y={nodeHeight/2}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    style={{ fontFamily: 'Menlo', fontWeight: 'bold' }}
                    className="text-sm fill-slate-700"
                  >
                    ${node.price.toFixed(2)}
                  </text>
                </g>
              );
            })}
          </g>
        </svg>
      </div>
    </div>
  );
};