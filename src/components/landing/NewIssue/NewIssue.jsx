import React, { useState } from 'react';
import { BiImageAdd } from 'react-icons/bi';
import { MdOutlineCameraEnhance } from 'react-icons/md';
import Modal from '../../../common/components/common/Modal';
import WebcamCapture from '../../../common/components/common/WebCam';
const NewIssue = ({ ...props }) => {
  const [issueData, setIssueData] = useState({
    images: {
      value: [],
      errorMassage: '',
    },
    type: {
      value: '',
      errorMassage: '',
    },
    zone: {
      value: '',
      errorMassage: '',
    },
    priority: {
      value: '',
      errorMassage: '',
    },
  });
  const [isCameraOn, handleIsCameraOn] = useState(false);
  const handlePhoto = (e) => {
    setIssueData({ ...issueData, images: { value: e.target.files } });
  };
  return (
    <div className="section">
      <div className="section__header section__header--space-between">
        <div className="section__title">New Issue</div>
        <button className="button">Add</button>
      </div>
      <div className="section__body">
        <div className="new-issue">
          <div className="new-issue__images">
            <div className="new-issue__select-images">
              <label htmlFor="issue-image-upload">
                <div className="new-issue__image-label">Select images</div>
                <BiImageAdd className="new-issue__images-icon" />
              </label>
              <input id="issue-image-upload" multiple type="file" accept=".png, .jpg, .jpeg" name="photo" onChange={handlePhoto} />
            </div>

            <div className="new-issue__or">or</div>
            <div onClick={() => handleIsCameraOn(true)} className="new-issue__take-photo">
              <div className="new-issue__image-label">Take a photo</div>
              <MdOutlineCameraEnhance className="new-issue__images-icon" />
            </div>
          </div>

          {Array.from(issueData.images.value).map((image, index) => (
            <div key={image.name + index} className="new-issue__image-name">
              {index + 1}.{image.name}
            </div>
          ))}

          {isCameraOn && (
            <Modal isOpen={isCameraOn} handleModalStatus={(newStatus) => handleIsCameraOn(newStatus)}>
              <WebcamCapture
                imgSrc={issueData.images.value}
                onChange={(image) => {
                  handleIsCameraOn(false);
                  setIssueData({
                    ...issueData,
                    images: {
                      value: [
                        {
                          name: 'new-image.jpeg',
                          image,
                        },
                      ],
                    },
                  });
                }}
              />
            </Modal>
          )}
        </div>
      </div>
    </div>
  );
};
export default NewIssue;
