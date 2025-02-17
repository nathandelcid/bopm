# Binomial Option Pricing Model (BOPM) Calculator & Visualizer

A React-based visualization tool for the Binomial Option Pricing Model, featuring an interactive lattice diagram and American option price calculations.

## 🌟 Features

- Interactive parameter inputs for stock price, time to expiration, volatility, and steps
- Visual binomial lattice representation
- American Put and Call option price calculations
- Responsive design with elegant UI animations
- Reset functionality to default parameters

## 🚀 Tech Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Lucide React

## 🛠 Installation

1. Clone the repository:

```bash
git clone https://github.com/nathandelcid/bopm.git
cd bopm
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

## 📦 Project Structure

```bash
bopm/
├── public/
├── src/
│ ├── components/
│ ├── utils/
│ └── App.tsx
│ └── index.css
│ └── main.tsx
│ └── types.ts
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
```


## 🤝 Contributing

### Adding New Components

1. Create your component in the `src/components` directory
2. Follow the existing TypeScript and styling patterns
3. Use Tailwind CSS for styling
4. Maintain the existing color scheme: `#B31942` and `#002868`

### Component Guidelines

- Use functional components with TypeScript
- Implement proper prop typing
- Follow the existing styling patterns using Tailwind CSS
- Maintain responsive design principles
- Use Menlo font family for consistency where applicable

### Example Component Structure

```typescript
import React from 'react';
interface Props {
// Define your props here
}
export const YourComponent: React.FC<Props> = ({ / props / }) => {
return (
// Your JSX here
);
};
``` 


## 📝 License

MIT

## 🙋‍♂️ Author

Nathan Delcid

[![Twitter](https://img.shields.io/badge/Twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://x.com/nathandelcid)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/nathan-delcid-56b04021a/)
