import React from 'react';
import { FormData } from '../types';

interface Props {
  onSubmit: (data: FormData) => void;
  onReset: () => void;
  defaultValues?: FormData;
}

export const ParameterForm: React.FC<Props> = ({ onSubmit, onReset, defaultValues }) => {
  const [formData, setFormData] = React.useState<FormData>(defaultValues || {
    S: 18,
    T: 1,
    sigma: 0.2,
    n: 4
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const parsedValue = value === '' ? 0 : parseFloat(value);
    setFormData(prev => ({
      ...prev,
      [name]: parsedValue
    }));
  };

  const labelStyle = {
    fontFamily: 'Menlo'
  };

  const inputStyle = {
    fontFamily: 'Menlo'
  };

  return (
    <form onSubmit={handleSubmit} className="inline-flex gap-4 items-end">
      <button
        type="button"
        onClick={onReset}
        className="inline-flex justify-center rounded-md border border-transparent bg-[#B31942] py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-[#8a132f] focus:outline-none focus:ring-2 focus:ring-[#B31942] focus:ring-offset-2"
        style={{ fontFamily: 'Menlo' }}
      >
        Reset
      </button>
      
      <div>
        <label htmlFor="S" className="block text-sm font-medium text-black" style={labelStyle}>
          Initial Stock Price (S)
        </label>
        <input
          type="number"
          id="S"
          name="S"
          step="0.01"
          value={formData.S || ''}
          onChange={handleChange}
          className="mt-1 block w-24 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          style={inputStyle}
          required
        />
      </div>
      
      <div>
        <label htmlFor="T" className="block text-sm font-medium text-black" style={labelStyle}>
          Time to Expiration (T)
        </label>
        <input
          type="number"
          id="T"
          name="T"
          step="0.1"
          value={formData.T || ''}
          onChange={handleChange}
          className="mt-1 block w-24 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          style={inputStyle}
          required
        />
      </div>
      
      <div>
        <label htmlFor="sigma" className="block text-sm font-medium text-black" style={labelStyle}>
          Volatility (σ)
        </label>
        <input
          type="number"
          id="sigma"
          name="sigma"
          step="0.01"
          value={formData.sigma || ''}
          onChange={handleChange}
          className="mt-1 block w-24 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          style={inputStyle}
          required
        />
      </div>
      
      <div>
        <label htmlFor="n" className="block text-sm font-medium text-black" style={labelStyle}>
          Number of Steps (n)
        </label>
        <input
          type="number"
          id="n"
          name="n"
          min="1"
          max="12"
          value={formData.n || ''}
          onChange={handleChange}
          className="mt-1 block w-24 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          style={inputStyle}
          required
        />
      </div>
      
      <button
        type="submit"
        className="inline-flex justify-center rounded-md border border-transparent bg-[#002868] py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-[#001f4f] focus:outline-none focus:ring-2 focus:ring-[#002868] focus:ring-offset-2"
        style={{ fontFamily: 'Menlo' }}
      >
        Calculate
      </button>
    </form>
  );
};