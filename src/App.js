import logo from "./logo.svg";
import "./App.css";
import CameraCard from "./CameraCard";
import NavBar from "./NavBar";
import Video from "./Video";
import BatteryStatus from "./BatteryStatus";
import KeyboardTest from "./KeyboardTest";
import TouchscreenTest from "./TouchscreenTest";
import OsInfo from "./OsInfo";

function App() {
  return (
    <div className="App">
      <div className="container">
        <NavBar />
        <div className="row">
          <div className="col card">
            <div className="card-body">
              <Video />
            </div>
          </div>
          <div className="col card">
            <div className="card-body">
              <BatteryStatus />
            </div>
          </div>
          <CameraCard />
        </div>
        <div className="row">
          <KeyboardTest />
        </div>
        <div className="row">
          <TouchscreenTest />
        </div>
      </div>
    </div>
  );
}

export default App;