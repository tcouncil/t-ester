import logo from "./logo.svg";
import "./App.css";
import CameraCard from "./CameraCard";
import NavBar from "./NavBar";
import Video from "./Video";
import BatteryStatus from "./BatteryStatus";
import KeyboardTest from "./KeyboardTest";
import TouchscreenTest from "./TouchscreenTest";
import VolumeIcon from "./VolumeIcon";
import OrientationTracker from "./OrientationTracker";

function App() {
  return (
    <div className="App">
      <div className="container">
        <NavBar />
        <div className="row main-tests">
          <div className="col">
            <div className="card-body">
              <Video />
            </div>
          </div>
          <div className="col">
            <div className="card-body">
              <BatteryStatus />
            </div>
          </div>
          <div className="col">
            <VolumeIcon />
          </div>
          <CameraCard />
        </div>
        <div className="row">
          <KeyboardTest />
        </div>
        <div className="row">
          <OrientationTracker />
        </div>
        <div className="row">
          <TouchscreenTest />
        </div>
      </div>
    </div>
  );
}

export default App;