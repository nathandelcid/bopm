import React, { useState } from 'react';
import { FormData } from './types';
import { ParameterForm } from './components/ParameterForm';
import { LatticeVisualization } from './components/LatticeVisualization';
import { generateLatticeData } from './utils/binomialLattice';

const initialParams = { S: 18, T: 1, sigma: 0.2, n: 4 };

function App() {
  const [latticeData, setLatticeData] = useState(() => {
    return generateLatticeData(
      initialParams.S,
      initialParams.T,
      initialParams.sigma,
      initialParams.n
    );
  });

  const handleSubmit = (data: FormData) => {
    try {
      const newLatticeData = generateLatticeData(data.S, data.T, data.sigma, data.n);
      setLatticeData(newLatticeData);
    } catch (error) {
      alert(error instanceof Error ? error.message : 'An error occurred');
    }
  };

  const handleReset = () => {
    const newLatticeData = generateLatticeData(
      initialParams.S,
      initialParams.T,
      initialParams.sigma,
      initialParams.n
    );
    setLatticeData(newLatticeData);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 relative">
      <a
        href="https://en.wikipedia.org/wiki/Binomial_options_pricing_model"
        target="_blank"
        rel="noopener noreferrer"
        className="absolute top-8 left-8 text-base hover:underline"
        style={{ 
          fontFamily: 'Menlo',
          color: '#B31942',
          transition: 'color 0.2s'
        }}
        onMouseOver={(e) => e.currentTarget.style.color = '#002868'}
        onMouseOut={(e) => e.currentTarget.style.color = '#B31942'}
      >
        About
      </a>
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="text-center">
          <div className="flex items-center justify-center gap-3 mb-2">
            <span className="text-2xl">🇺🇸</span>
            <h1 
              className="text-3xl font-bold bg-gradient-to-r from-[#B31942] via-[#002868] to-[#B31942] text-transparent bg-clip-text animate-gradient-x"
              style={{ fontFamily: 'Menlo' }}
            >
              Binomial Price Lattice Calculator
            </h1>
            <span className="text-2xl">🇺🇸</span>
          </div>
          <div className="mb-4" style={{ fontFamily: 'Menlo' }}>
            <span className="text-sm text-black">by </span>
            <a 
              href="https://x.com/nathandelcid" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-sm hover:underline"
              style={{ color: '#B31942', transition: 'color 0.2s' }}
              onMouseOver={(e) => e.currentTarget.style.color = '#002868'}
              onMouseOut={(e) => e.currentTarget.style.color = '#B31942'}
            >
              Nathan Delcid
            </a>
          </div>
          <p className="text-lg text-black mb-8" style={{ fontFamily: 'Menlo' }}>
            Visualize stock price movements using the binomial model
          </p>
          <ParameterForm onSubmit={handleSubmit} onReset={handleReset} defaultValues={initialParams} />
        </div>
        
        <div className="flex flex-col items-center gap-4 mt-16">
          <div className="relative p-[3px] bg-gradient-to-r from-[#B31942] via-[#002868] to-[#B31942] rounded-lg animate-gradient-x w-[800px]">
            <div className="bg-white rounded-lg p-4">
              <div className="flex justify-between px-8 mb-4" style={{ fontFamily: 'Menlo' }}>
                <div className="text-lg font-bold bg-gradient-to-r from-[#B31942] via-[#002868] to-[#B31942] text-transparent bg-clip-text animate-gradient-x">
                  American Put: ${latticeData.putOptionPrice.toFixed(2)}
                </div>
                <div className="text-lg font-bold bg-gradient-to-r from-[#B31942] via-[#002868] to-[#B31942] text-transparent bg-clip-text animate-gradient-x">
                  American Call: ${latticeData.callOptionPrice.toFixed(2)}
                </div>
              </div>
              <LatticeVisualization
                nodes={latticeData.nodes}
                edges={latticeData.edges}
                positions={latticeData.positions}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;