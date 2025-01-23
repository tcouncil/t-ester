import "./App.css";
import { useParams } from 'react-router-dom';
import CameraCard from "./CameraCard";
import NavBar from "./NavBar";
import Video from "./Video";
import BatteryStatus from "./BatteryStatus";
import KeyboardTest from "./KeyboardTest";
import TouchscreenTest from "./TouchscreenTest";
import VolumeIcon from "./VolumeIcon";
import MouseClicker from './MouseClicker';
import Footer from './Footer';

function App(props) {
  const bId = props.custom === "true" ? true : false;
  let { id } = useParams();
  let vId = null;
  if(bId){
    vId = id;
  }
  return (
    <div className="App">
      <div className="container">
        <NavBar />
        <div className="row main-tests">
          <div className="col">
            <div className="card-body">
              <Video videoId={vId}/>
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
          <MouseClicker />
        </div>
        <div className="row">
          <Footer />
        </div>
        <div className="row">
          <TouchscreenTest />
        </div>
      </div>
    </div>
  );
}

export default App;