import { Link } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Link to="/home">Home</Link>
      <button>Data</button>
    </div>
  );
}

export default App;
