import React from 'react';
import Webcam from 'react-webcam';

const WebcamCapture = ({ onChange, imgSrc, ...props }) => {
  const webcamRef = React.useRef(null);

  const [deviceId, setDeviceId] = React.useState({});
  const [devices, setDevices] = React.useState([]);

  const handleDevices = React.useCallback(
    (mediaDevices) => setDevices(mediaDevices.filter(({ kind }) => kind === 'videoinput')),
    [setDevices]
  );

  React.useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then(handleDevices);
  }, [handleDevices]);
  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    onChange(imageSrc);
  }, [webcamRef]);

  return (
    <>
      {devices.map((device, key) => (
        <div className={'web-camera'} key={key}>
          <Webcam audio={false} ref={webcamRef} videoConstraints={{ deviceId: device.deviceId }} screenshotFormat="image/jpeg" />
          <button className="button" onClick={capture}>
            Capture photo
          </button>
        </div>
      ))}
    </>
  );
};
export default WebcamCapture;
