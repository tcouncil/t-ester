import logo from './logo.svg';
import './App.css';
import CameraCard from './CameraCard';
import NavBar from './NavBar';

function App() {
  return (
    <div className="App">
      <div className="container">
        <NavBar />
        <div className='row'>
          <div className='col card'>
            <div className='card-body'>
            Test Video Section
            </div>
          </div>
          <div className='col card'>
            <div className='card-body'>
            Test Microphone Section
            </div>
          </div>
          <div className='col card'>
            <div className='card-body'>
            Test Battery Section
            </div>
          </div>
          <CameraCard />
        </div>
      </div>




      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  );
}

export default App;
