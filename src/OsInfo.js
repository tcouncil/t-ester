// Create a file named OsInfoComponent.js

const React = require('react');
const os = require('os');

const OsInfo = () => {
  const [osInfo, setOsInfo] = React.useState({});

  React.useEffect(() => {
    const info = {
      platform: os.platform(),
      type: os.type(),
      release: os.release(),
      arch: os.arch(),
      hostname: os.hostname(),
      totalMemory: os.totalmem(),
      freeMemory: os.freemem(),
      cpus: os.cpus().map(cpu => cpu.model).join(', '),
    };
    setOsInfo(info);
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Operating System Information</h1>
      <ul>
        <li><strong>Platform:</strong> {osInfo.platform}</li>
        <li><strong>Type:</strong> {osInfo.type}</li>
        <li><strong>Release:</strong> {osInfo.release}</li>
        <li><strong>Architecture:</strong> {osInfo.arch}</li>
        <li><strong>Hostname:</strong> {osInfo.hostname}</li>
        <li><strong>Total Memory:</strong> {(osInfo.totalMemory / (1024 ** 3)).toFixed(2)} GB</li>
        <li><strong>Free Memory:</strong> {(osInfo.freeMemory / (1024 ** 3)).toFixed(2)} GB</li>
        <li><strong>CPU Model:</strong> {osInfo.cpus}</li>
      </ul>
    </div>
  );
};

export default OsInfo;
