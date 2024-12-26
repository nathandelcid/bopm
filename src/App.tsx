import ListGroup from "./components/ListGroup";
import './App.css';
import Button from "./components/Button";  // Make sure this path matches your file structure
import VarInput from "./components/VarInput";

function App() {
  const handleClick = () => {
    console.log("Button clicked!");
  };

  return (
    <>
      <ListGroup />
      <div className="var-input-container" style={{ 
        display: 'flex',
        justifyContent: 'center',  // Centers the container
        position: 'relative'       // For absolute positioning of "about"
      }}>{}
      <VarInput label="Initial Stock Price" />
      <VarInput label="Time To Maturity" />
      <VarInput label="Volatility" />
      <VarInput label="Time Steps" />
      </div>
      <Button onClick={handleClick}>
        Click Me
      </Button>
    </>
  );
}

export default App;