import "./App.css";
import ViewA from "./components/viewA";
import ViewB from "./components/viewB";

function App() {
  return (
    <div className="app">
      <h1>
        React App with two views with DI provider with different Injections
      </h1>
      <div className="containers">
        <div className="container">
          <ViewA />
        </div>
        <div className="container">
          <ViewB />
        </div>
      </div>
    </div>
  );
}

export default App;
