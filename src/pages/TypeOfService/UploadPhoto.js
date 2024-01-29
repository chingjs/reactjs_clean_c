import { React, useState, useEffect } from 'react';
// import { useTranslation } from "react-i18next";
import { useNavigate, useLocation } from 'react-router-dom';
// import Resizer from "react-image-file-resizer";

import backArrow from '../../assets/images/back-arrow.png';
import upload from '../../assets/images/upload.png';
import remove from '../../assets/typeofService/upload-remove.png';

import tshirt from '../../assets/typeofService/top-tshirt.png';
import { Divider } from '@mui/material';
import './typeofservice.css';
import { resizeFile } from '../../utils/helperFunc';

const UploadPhoto = () => {
  const history = useNavigate();
  const location = useLocation();
  const [uri, setUri] = useState([]);
  const [files, setFiles] = useState([]);
  const itemData = location.state.itemList;
  const handleBack = () => {
    history(-1);
  };
  useEffect(() => {
    window.scrollTo(0, 0);
    if (!location.state) {
      history('/customer/washing/stepone');
    }
    // eslint-disable-next-line
  }, []);

  const handleImageChange = (e) => {
    uploadPhotoOnChange(e);
    const filesArray = Array.from(e.target.files).map((file) =>
      URL.createObjectURL(file)
    );
    setUri((prevImg) => prevImg.concat(filesArray));
  };

  localStorage.setItem('uploadedPhoto', uri);
  const onSubmitHandler = () => {
    const newData = {
      ...location.state,
      files,
    };
    // console.log('location',newData)
    history('/customer/pickupschedule', { state: newData });
  };
  // console.log('itemData', itemData);
  // console.log('files', uri);

  async function uploadPhotoOnChange(e) {
    const file = e.target.files[0];
    const resized = file && (await resizeFile(file));

    let newFile = [...files];
    if (file) {
      newFile = [...files, { uri: resized, fileType: file.type, index: files.length }];
      setFiles(newFile);
    }
  }
  const deleteImage = (image, index) => {
    setUri(uri.filter((e) => e !== image))
    setFiles(files.filter((idx) => idx.index !== index).map((ea, index) => { return { ...ea, index } }))
  }
  return (
    <div>
      <div className="support-arrow">
        <img src={backArrow} alt="backArrow" className='arrowbutton'  onClick={handleBack} />
      </div>
      <div className="upload-text">Upload Photo</div>
      <div className="upload-optional">(Optional)</div>
      <form>
        <div className="upload-mid-bg">
          <center>
            <p className="upload-mid-word1">
              Attach photos to your order
            </p>
            {/* <div className="upload-mid-flex1">
              <img src={green} alt="green" className="upload-icon" />
              <img src={red} alt="red" className="upload-icon" />
            </div>
            <div className="upload-mid-flex1">
              <img
                src={samplegreen}
                alt="sampegreen"
                className="upload-sample"
              />
              <img src={samplered} alt="samplered" className="upload-sample" />
            </div> */}
          </center>
          <br />
          <center>
            {itemData.length && itemData.map((item, idx) => (
              < div className="upload-details-bg" key={idx}>
                <div className="upload-mid-flex1">
                  <img
                    className='washing-itemtype-icon'
                    src={item.photo_url ? item.images : tshirt}
                    alt="shirt"
                  />
                  <div className="upload-mid-details">{item.name}</div>
                  <div className="upload-qty-flex">{item.qty}X</div>
                </div>
                <Divider />
              </div>
            )
            )}

          </center>
          <div className="upload-button">
            <label>
              Upload Photo{' '}
              <img
                src={upload}
                height="18"
                width="20"
                alt="upload"
                className="upload-button-icon"
              />
              <input
                className="upload-input"
                type="file"
                name="images"
                onChange={handleImageChange}
              />
            </label>
          </div>
          <br />
          {uri &&
            uri.map((image, index) => {
              return (
                <p key={image} className="upload-photo">
                  <img
                    src={image}
                    height="150"
                    width="230"
                    alt="upload"
                    className="upload-photo-img"
                  />
                  <img
                    src={remove}
                    alt=''
                    className="upload-photo-delete"
                    onClick={(e) => deleteImage(image, index)}
                  />
                </p>
              );
            })}
          <center>
            <button
              className="upload-bottom-button"
              onClick={() => onSubmitHandler()}
              type="submit"
            >
              Continue
            </button>
          </center>
        </div>
      </form >
    </div >
  );
};
export default UploadPhoto;
