import "./styles/App.css";
import PictureOfTheDay from "./components/PictureOfTheDay";
import ObservingConditions from "./components/ObservingConditions";
import News from "./components/News";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="App">
      <Navbar />
      <PictureOfTheDay />
      <ObservingConditions />
      <News />
    </div>
  );
}

export default App;
