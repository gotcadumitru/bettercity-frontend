import React, { useEffect, useState } from 'react';
import { BiImageAdd } from 'react-icons/bi';
import { MdOutlineCameraEnhance } from 'react-icons/md';
import Input from '../../../common/components/common/Input';
import Modal from '../../../common/components/common/Modal';
import TextArea from '../../../common/components/common/TextArea';
import WebcamCapture from '../../../common/components/common/WebCam';
import { timisoaraZones, timisoareRegions } from '../../../common/defaults/defaults.map';
import { isPoinInside } from '../../../common/helpers/checkIsPointInside';
import { toBase64 } from '../../../common/helpers/toBase64';
import GoogleMap from '../maps/GoogleMap';
import Geocode from 'react-geocode';
import { ISSUE_PRIORITY } from '../../../common/defaults/defaults.issue';
import { useDispatch } from 'react-redux';
import { addNewIssueThunk } from '../../../common/state/thunk/issue.thunk';
import { useSelector } from 'react-redux';
import { FetchStatus } from '../../../common/state/reducer/user.reducer';
import { handleIsNotificationShowAC } from '../../../common/state/action/notification.action';
import { useHistory } from 'react-router';
import { resetNewIssueStatusAC } from '../../../common/state/action/issue.action';
import EXIF from 'exif-js';
Geocode.setApiKey('AIzaSyDRvC6Q5uvEzTFo_CB0RiegSYQ-PxNNUEc');
Geocode.setLanguage('en');
Geocode.setRegion('ro');
const NewIssue = ({ ...props }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const addIssueStatus = useSelector((state) => state.issue.addIssueStatus);
  const [issueData, setIssueData] = useState({
    images: {
      value: [],
      errorMessage: '',
    },
    type: {
      value: '',
      errorMessage: '',
    },
    title: {
      value: '',
      errorMessage: '',
    },
    description: {
      value: '',
      errorMessage: '',
    },
    zone: {
      value: {
        lat: null,
        lng: null,
        adress: '',
      },
      errorMessage: '',
    },
    priority: {
      value: ISSUE_PRIORITY[0],
      errorMessage: '',
    },
  });
  const [isCameraOn, handleIsCameraOn] = useState(false);
  const [isMapOpen, handleIsMapOpen] = useState(false);
  useEffect(() => {
    if (addIssueStatus === FetchStatus.SUCCESS) {
      dispatch(handleIsNotificationShowAC(true, false, 'Issue added successfully'));
      dispatch(resetNewIssueStatusAC());
      history.push('/issues');
    }
    // eslint-disable-next-line
  }, [addIssueStatus]);
  const handlePhoto = async (e) => {
    const images = await Promise.all(
      Array.from(e.target.files).map(async (file) => {
        let lat, lng;

        let exifData = await new Promise((resolve) =>
          EXIF.getData(file, function () {
            resolve(EXIF.getAllTags(this));
          })
        );

        if (exifData?.GPSLatitude?.length && exifData?.GPSLongitude?.length) {
          lat = ConvertDMSToDD(exifData.GPSLatitude[0], exifData.GPSLatitude[1], exifData.GPSLatitude[2], exifData.GPSLatitudeRef);
          lng = ConvertDMSToDD(exifData.GPSLongitude[0], exifData.GPSLongitude[1], exifData.GPSLongitude[2], exifData.GPSLongitudeRef);
          handleMapCoord([lat, lng]);
        }
        return {
          name: file.name,
          image: await toBase64(file),
        };
      })
    );
    setIssueData({
      ...issueData,
      images: {
        value: [...issueData.images.value, ...images],
      },
    });
  };
  const removeImage = (index) => {
    setIssueData({
      ...issueData,
      images: {
        value: issueData.images.value.filter((_, i) => i !== index),
      },
    });
  };
  function ConvertDMSToDD(degrees, minutes, seconds, direction) {
    var dd = degrees + minutes / 60 + seconds / (60 * 60);
    if (direction == 'S' || direction == 'W') {
      dd = dd * -1;
    } // Don't do anything for N or E
    return dd;
  }
  const handleChangeInput = (e) => {
    setIssueData({
      ...issueData,
      [e.target.name]: {
        value: e.target.value,
      },
    });
  };

  const handleMapCoord = async ([lat, lng]) => {
    const zone = timisoaraZones.find((zon) =>
      isPoinInside(
        [lat, lng],
        zon.coo.map((no) => {
          const co = timisoareRegions.find((m) => m.text === no);
          return [co.lat, co.lng];
        })
      )
    );
    if (!zone)
      return setIssueData((issueCopy) => ({
        ...issueCopy,
        zone: {
          value: {
            lat: null,
            lng: null,
            adress: '',
          },
          errorMessage: 'There is no area in Timisoara with these coordinates',
        },
      }));
    const response = await Geocode.fromLatLng(lat, lng);
    const adress = zone.name + ', ' + response.results[0].formatted_address;

    setIssueData((issueCopy) => ({
      ...issueCopy,
      zone: {
        value: {
          lat,
          lng,
          adress,
        },
      },
    }));
  };

  const checkIfExistErrors = () => {
    let isErrors = false;
    let issueDataCopy = { ...issueData };
    if (!issueDataCopy.description.value.length) {
      issueDataCopy.description.errorMessage = 'This field is required';
      isErrors = true;
    }
    if (!issueDataCopy.title.value.length) {
      issueDataCopy.title.errorMessage = 'This field is required';
      isErrors = true;
    }
    if (!issueDataCopy.zone.value.adress.length) {
      issueDataCopy.zone.errorMessage = 'This field is required';
      isErrors = true;
    }
    if (isErrors) {
      setIssueData(issueDataCopy);
    }
    return isErrors;
  };
  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        handleMapCoord([position.coords.latitude, position.coords.longitude]);
      });
    }
  }
  const handleSubmit = () => {
    if (checkIfExistErrors()) return;
    dispatch(
      addNewIssueThunk({
        title: issueData.title.value,
        description: issueData.description.value,
        zone: issueData.zone.value.adress.split(',')[0],
        address: issueData.zone.value.adress,
        type: issueData.type.value,
        priority: issueData.priority.value,
        lat: issueData.zone.value.lat,
        lng: issueData.zone.value.lng,
        pictures: issueData.images.value.map((img) => img.image.split('base64,')[1]),
      })
    );
  };
  return (
    <div className="section">
      <div className="section__header section__header--space-between">
        <div className="section__title">New Issue</div>
        <div />
      </div>
      <div className="section__body">
        <div className="new-issue">
          <div className="new-issue__images">
            <div className="new-issue__select-images">
              <label htmlFor="issue-image-upload" className="new-issue__label">
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
            <div key={image.name + index}>
              <div className="new-issue__image-name">
                <span className="new-issue__image-name-text">
                  {index + 1}.{image.name}
                </span>
                <span
                  onClick={() => {
                    removeImage(index);
                  }}
                  className="new-issue__remove-img"
                >
                  X
                </span>
              </div>
              <img className="new-issue__photo" src={image.image} alt={image.name} />
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
                        ...issueData.images.value,
                        {
                          name: new Date().getTime() + '-image.jpeg',
                          image,
                        },
                      ],
                    },
                  });
                  getLocation();
                }}
              />
            </Modal>
          )}
          <Input
            name="title"
            inputLabel="Title:"
            placeholder="New issue title..."
            errorMessage={issueData.title.errorMessage}
            value={issueData.title.value}
            onChange={handleChangeInput}
          />
          <TextArea
            name="description"
            inputLabel="Description:"
            placeholder="Issue description..."
            value={issueData.description.value}
            onChange={handleChangeInput}
            errorMessage={issueData.description.errorMessage}
          />

          <div className="input__label">Type:</div>
          <select className="input" onChange={handleChangeInput} name="type" value={issueData.type.value}>
            {[
              { id: 0, name: 0 },
              { id: 1, name: 1 },
              { id: 2, name: 2 },
            ].map((option) => (
              <option key={option.id} value={option.id}>
                {option.name}
              </option>
            ))}
          </select>

          <Input
            inputLabel="Select zone"
            placeholder="Click here to select on map"
            onFocus={(e) => {
              e.target.blur();
              handleIsMapOpen(true);
            }}
            onChange={() => {}}
            value={issueData.zone.value.adress}
            className="input"
            errorMessage={issueData.zone.errorMessage}
          />
          {isMapOpen && (
            <Modal
              isOpen={isMapOpen}
              containerClassName="c-modal__container--map"
              handleModalStatus={(newStatus) => handleIsMapOpen(newStatus)}
            >
              <GoogleMap
                onChange={handleMapCoord}
                height="500px"
                markers={
                  issueData.zone.value.lat !== null ? [{ lat: issueData.zone.value.lat, lng: issueData.zone.value.lng, text: '+' }] : []
                }
              />
              <button className="button button--m-top" onClick={getLocation}>
                Use my geolocation
              </button>
              {issueData.zone.errorMessage && <div className="input__error input__error--center">{issueData.zone.errorMessage}</div>}
              <div className="input__label">{issueData.zone.value.adress}</div>
            </Modal>
          )}
          <button onClick={handleSubmit} className="button button--m-top">
            Add
          </button>
        </div>
      </div>
    </div>
  );
};
export default NewIssue;
