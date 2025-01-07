import React, { useEffect, useRef } from 'react';
import { useFormikContext } from 'formik';
import { Upload } from 'antd';
import { InboxOutlined } from '@ant-design/icons';

const { Dragger } = Upload;

const UploadPayment = (props) => {
  const { values, setValues, setFieldValue } = useFormikContext();
  const {
    imageFile,
    isFileLoading,
    onFileChange,
    removeImage
  } = props;

  const containerRef = useRef(null);
  const checkboxContainerRef = useRef(null);
  const collapseContainerRef = useRef(null);

 
  const toggleCollapse = () => {
    if (checkboxContainerRef.current && containerRef.current && collapseContainerRef.current) {
      if (values.type === 'upload') {
        containerRef.current.style.height = `${
          checkboxContainerRef.current.offsetHeight + collapseContainerRef.current.offsetHeight
        }px`;
      } else {
        containerRef.current.style.height = `${checkboxContainerRef.current.offsetHeight}px`;
      }
    }
  };

  useEffect(() => {
    toggleCollapse();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values.type]);

  
  const onUploadModeChange = (e) => {
    if (e.target.checked) {
      setValues({ ...values, type: 'upload' });
    }
  };

 
  const dummyRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess('ok', file);
    }, 100);
  };

 
  const handleAntdUploadChange = (info) => {
    const newFileList = info.fileList.map((f) => {
      if (!f.status || f.status === 'uploading') {
        f.status = 'done';
      }
      return f;
    });

    if (!newFileList.length) {
      setFieldValue('paymentProof', null);
      return;
    }

    const fileObj = newFileList[0]?.originFileObj;
    if (!fileObj) return;

    const mockEvent = {
      target: {
        value: fileObj.name,
        files: [fileObj]
      }
    };
    onFileChange(mockEvent, { name: 'paymentProof', type: 'single' });

    setFieldValue('paymentProof', fileObj);
  };


  const draggerProps = {
    name: 'file',
    multiple: false,
    showUploadList: true,        
    action: '',                  
    customRequest: dummyRequest, 
    beforeUpload: (file) => {
      if (file.size / 1024 / 1024 > 2) {
        alert('File size exceeded 2MB, consider optimizing your image');
        return Upload.LIST_IGNORE; 
      }
      return true;
    },
    onChange: handleAntdUploadChange
  };

  return (
    <div
      ref={containerRef}
      className={`checkout-fieldset-collapse ${values.type === 'upload' ? 'is-selected-payment' : ''}`}
    >
      <div className="checkout-field margin-0">
        {/* RADIO CHECKBOX */}
        <div className="checkout-checkbox-field" ref={checkboxContainerRef}>
          <input
            checked={values.type === 'upload'}
            id="modeUpload"
            name="type"
            type="radio"
            onChange={onUploadModeChange}
          />
          <label className="d-flex w-100" htmlFor="modeUpload">
            <div className="d-flex-grow-1 margin-left-s">
              <h4 className="margin-0">Upload Payment Proof</h4>
              <span className="text-subtle d-block margin-top-s">
                Upload your payment transfer proof here
              </span>
            </div>
          </label>
        </div>

        {/* COLLAPSIBLE CONTENT */}
        <div className="checkout-collapse-sub" ref={collapseContainerRef}>
          {values.type === 'upload' && (
            <>
              <br />
              <Dragger {...draggerProps}>
                <p className="ant-upload-drag-icon">
                  <InboxOutlined style={{ fontSize: '2rem' }} />
                </p>
                <p className="ant-upload-text">
                  Click or drag file to this area to upload
                </p>
                <p className="ant-upload-hint">
                  Supported formats: JPG, PNG, PDF <br />
                  (File size limit: 2MB)
                </p>
              </Dragger>

              {isFileLoading && (
                <p style={{ marginTop: '1rem', color: '#888' }}>
                  Processing file preview...
                </p>
              )}

              {Array.isArray(imageFile.paymentProof) && imageFile.paymentProof.map(({ id, url, file }) => (
                <div key={id} style={{ marginTop: '1rem' }}>
                  {file.type.includes('image') ? (
                    <img
                      src={url}
                      alt="Payment Proof"
                      style={{ maxWidth: 200 }}
                    />
                  ) : (
                    <p>{file.name}</p>
                  )}
                  <button
                    type="button"
                    onClick={() => removeImage({ id, name: 'paymentProof' })}
                    style={{ marginLeft: '1rem' }}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default UploadPayment;
