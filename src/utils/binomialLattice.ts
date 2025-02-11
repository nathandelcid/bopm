import { Node, Position } from '../types';

const calculateAmericanPut = (S: number, K: number, T: number, r: number, sigma: number, n: number): number => {
  const deltaT = T / n;
  const up = Math.exp(sigma * Math.sqrt(deltaT));
  const p0 = (up * Math.exp(-0 * deltaT) - Math.exp(-r * deltaT)) / (up * up - 1);
  const p1 = Math.exp(-r * deltaT) - p0;
  
  // Initial values at time T
  const p: number[] = new Array(n + 1);
  for (let i = 0; i <= n; i++) {
    p[i] = Math.max(K - S * Math.pow(up, 2 * i - n), 0);
  }
  
  // Move to earlier times
  for (let j = n - 1; j >= 0; j--) {
    for (let i = 0; i <= j; i++) {
      // Binomial value
      p[i] = p0 * p[i + 1] + p1 * p[i];
      // Exercise value
      const exercise = K - S * Math.pow(up, 2 * i - j);
      if (p[i] < exercise) p[i] = exercise;
    }
  }
  
  return p[0];
};

const calculateAmericanCall = (S: number, K: number, T: number, r: number, sigma: number, n: number): number => {
  const deltaT = T / n;
  const up = Math.exp(sigma * Math.sqrt(deltaT));
  const p0 = (up * Math.exp(-0 * deltaT) - Math.exp(-r * deltaT)) / (up * up - 1);
  const p1 = Math.exp(-r * deltaT) - p0;
  
  // Initial values at time T
  const p: number[] = new Array(n + 1);
  for (let i = 0; i <= n; i++) {
    p[i] = Math.max(S * Math.pow(up, 2 * i - n) - K, 0);
  }
  
  // Move to earlier times
  for (let j = n - 1; j >= 0; j--) {
    for (let i = 0; i <= j; i++) {
      // Binomial value
      p[i] = p0 * p[i + 1] + p1 * p[i];
      // Exercise value
      const exercise = S * Math.pow(up, 2 * i - j) - K;
      if (p[i] < exercise) p[i] = exercise;
    }
  }
  
  return p[0];
};

export const generateLatticeData = (S: number, T: number, sigma: number, n: number): {
  nodes: Node[];
  edges: [string, string][];
  positions: Record<string, Position>;
  putOptionPrice: number;
  callOptionPrice: number;
} => {
  const prices = calculateStockPrices(S, T, sigma, n);
  const nodes: Node[] = [];
  const edges: [string, string][] = [];
  const positions: Record<string, Position> = {};
  
  const horizontalSpacing = 100;
  const verticalSpacing = 70;
  
  for (let step = 0; step <= n; step++) {
    for (let j = 0; j < prices[step].length; j++) {
      const nodeId = `${step},${j}`;
      nodes.push({
        id: nodeId,
        price: prices[step][j]
      });
      
      const x = step * horizontalSpacing;
      const y = (j - (prices[step].length - 1) / 2) * verticalSpacing;
      positions[nodeId] = { x, y };
      
      if (step < n) {
        edges.push([nodeId, `${step+1},${j}`]);
        edges.push([nodeId, `${step+1},${j+1}`]);
      }
    }
  }

  const r = 0.05; // risk-free rate (5% as example)
  const K = S; // strike price equal to initial stock price
  const putOptionPrice = calculateAmericanPut(S, K, T, r, sigma, n);
  const callOptionPrice = calculateAmericanCall(S, K, T, r, sigma, n);
  
  return { nodes, edges, positions, putOptionPrice, callOptionPrice };
};

const calculateStockPrices = (S: number, T: number, sigma: number, n: number): number[][] => {
  if (n > 12) {
    throw new Error("n is too large, please choose a smaller number");
  }

  const deltaT = T / n;
  const u = Math.exp(sigma * Math.sqrt(deltaT));
  const d = 1/u;
  
  const pricesByStep: number[][] = [];
  
  for (let step = 0; step <= n; step++) {
    const pricesAtStep: number[] = [];
    
    for (let downMoves = 0; downMoves <= step; downMoves++) {
      const upMoves = step - downMoves;
      const price = S * Math.pow(u, upMoves) * Math.pow(d, downMoves);
      pricesAtStep.push(price);
    }
    
    pricesByStep.push(pricesAtStep);
  }
  
  return pricesByStep;
};