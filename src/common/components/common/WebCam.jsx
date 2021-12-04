import React from 'react';
import Webcam from 'react-webcam';
const FACING_MODE_USER = 'user';
const FACING_MODE_ENVIRONMENT = 'environment';

const WebcamCapture = ({ onChange, imgSrc, ...props }) => {
  const webcamRef = React.useRef(null);
  const [facingMode, setFacingMode] = React.useState(FACING_MODE_USER);
  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    onChange(imageSrc);
    // eslint-disable-next-line
  }, [webcamRef]);
  const handleClick = React.useCallback(() => {
    setFacingMode((prevState) => (prevState === FACING_MODE_USER ? FACING_MODE_ENVIRONMENT : FACING_MODE_USER));
  }, []);
  return (
    <>
      <div className={'web-camera'}>
        <Webcam audio={false} ref={webcamRef} videoConstraints={{ facingMode }} screenshotFormat="image/jpeg" />
        <button className="button button--m-top" onClick={capture}>
          Capture photo
        </button>
        <button className="button button--m-top" onClick={handleClick}>
          Switch camera
        </button>
      </div>
    </>
  );
};
export default WebcamCapture;
