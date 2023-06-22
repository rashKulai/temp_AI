import "./App.css";
import DropFile from "./DropFile";

function App() {
  return (
    <div class="grid-container">
      <div class="grid-child purple">
        <DropFile />
      </div>
      <div class="grid-child green">
        <DropFile />
      </div>
    </div>
  );
}

export default App;
