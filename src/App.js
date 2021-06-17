import "./App.css";
import Header from "./components/Header";
import Sketch from "./components/Sketch";
import Todolist from "./components/Todolist";
import Note from "./components/Note";

function App() {
  return (
    <div className="App">
      <Header />
      <Todolist />
      <Note />
      <Sketch />
    </div>
  );
}

export default App;
