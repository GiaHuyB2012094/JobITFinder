import { memo, useEffect, useRef, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Modal, Upload } from "antd";
import axios from "axios";

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const ImageUpload = memo((props) => {

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState([]);
  // const [arrFileImg, setArrFileImg] = useState([]);
  let previousVal = useRef([])

  const upload_preset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
  const cloud_name = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const handleCancel = () => setPreviewOpen(false);
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };
  const handleChange = async({ fileList: newFileList }) => {
      setFileList(newFileList);
      if (props.ImageFileLocal) {
        if (newFileList) {
          props.ImageFileLocal(newFileList.map(item => item.response?.url));
        }
      }
  };
  
  useEffect(() => {
    (async function () {
        try {
          let arrResult = []
          const previousValTemp = previousVal.current
          if (props.isUpload && (previousValTemp.length !== fileList.length)) {
            for (let fileI of fileList) {
              if (!fileI.uploaded) {
                const formData = new FormData();
                formData.append("file", fileI.originFileObj);
                formData.append("upload_preset",upload_preset)
                formData.append("cloud_name", cloud_name)
                formData.append("folder", "Cloudinary-React")
                await axios
                  .post(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, formData)
                  .then((res) => {
                    if (res.status === 200) {
                      Object.assign(fileI,{
                        uploaded: true,
                      })
                      arrResult.push(res.data.url);
                    }
                  });
              }
            }
            previousVal.current = fileList;
            if (props.passCloudinaryFileImage) {
              props.passCloudinaryFileImage(arrResult);
            }
          }
          props.setIsUpload(false);
        } catch (error) {
          console.log(error)
        }
    })();
  },[props.isUpload])
 
  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );
  return (
    <div className="w-full">
      <Upload
        action="https://react-file-upload-server.vercel.app/upload"
        className="text-black w-80"
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
      >
        {
        props.quantity 
          ? (
            fileList?.length >= props.quantity  ? null : uploadButton
          ) : (
            fileList?.length >= 1 ? null : uploadButton
          )
        }
      </Upload>
      <Modal
        className="text-black w-80"
        open={previewOpen}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img alt="example" style={{ width: "100%" }} src={previewImage} />
      </Modal>
    </div>
  );
});
ImageUpload.displayName = "ImageUpload";
export default ImageUpload;