import React from 'react';
import Webcam from 'react-webcam';

const WebcamCapture = ({ onChange, imgSrc, ...props }) => {
  const webcamRef = React.useRef(null);

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    onChange(imageSrc);
  }, [webcamRef]);

  return (
    <>
      <div className={'web-camera'}>
        <Webcam audio={false} ref={webcamRef} videoConstraints={{ facingMode: 'user' }} screenshotFormat="image/jpeg" />
        <button className="button" onClick={capture}>
          Capture photo
        </button>
      </div>
    </>
  );
};
export default WebcamCapture;
