import React from 'react';
import ImageUploading from 'react-images-uploading';

const UploadImg = ({ images, setImages }) => {

    const maxNumber = 69;

    const onChange = (imageList, addUpdateIndex) => {
        setImages(imageList);
    };
    return (
        <div className="App">
            <ImageUploading
                multiple
                value={images}
                onChange={onChange}
                maxNumber={maxNumber}
                dataURLKey="data_url"
            >

                {({
                    imageList,
                    onImageUpload,
                    onImageRemoveAll,
                    onImageUpdate,
                    onImageRemove,
                    isDragging,
                    dragProps,
                }) => (
                    // write your building UI
                    <div className="upload__image-wrapper" >
                        {!imageList.length && <button
                            //   style={isDragging ? { color: 'red' } : undefined }
                            style={{
                                width: "100px",
                                height: "70px",
                                border: "none",
                                background: "#D3D3D3",
                                color: "white",
                                fontSize: "18px"
                            }}
                            onClick={onImageUpload}
                            {...dragProps}
                        >
                            Upload Photo
                        </button>}
                        &nbsp;

                        {/* {imageList.map((image, index) => (
                            <div key={index} className="image-item" onClick={()=>{
                                imageList.length ? onImageUpdate(index):undefined
                            }}>
                                <img src={image['data_url']} alt="" style={{
                                    width: "100px",
                                    height: '100px'
                                }} />
                              
                            </div>
                        ))} */}
                        {imageList.map((image, index) => (
                            <div key={index} className="image-item" onClick={
                                imageList.length ? () => onImageUpdate(index) : undefined
                            }>
                                <img src={image['data_url']} alt="" style={{
                                    width: "100px",
                                    height: '100px'
                                }} />

                            </div>
                        ))}
                    </div>
                )}
            </ImageUploading>
        </div>
    );
}
export default UploadImg