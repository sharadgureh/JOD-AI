import { useEffect, useRef } from 'react';
import './Upload.css'
import { IKContext,IKUpload } from 'imagekitio-react';

const urlEndpoint = import.meta.env.VITE_IMAGE_KIT_ENDPOINT;
const publicKey = import.meta.env.VITE_IMAGE_KIT_PUBLIC_KEY; 
const authenticator =  async () => {
    try {
        const response = await fetch('http://localhost:8000/api/upload');

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Request failed with status ${response.status}: ${errorText}`);
        }

        const data = await response.json();
        const { signature, expire, token } = data;
        return { signature, expire, token };
    } catch (error) {
        throw new Error(`Authentication request failed: ${error.message}`);
    }
};
// eslint-disable-next-line react/prop-types
function Upload({setImg,img}) {
  const ikuploadRef=useRef(null)
const onError = err => {
        console.log("Error", err);
      };
      
      const onSuccess = (res) => {
        console.log("Success", res);
        setImg(pre=>({...pre,isLoading:false,dbdata:res}))
        console.log(img)
      };
      
      const onUploadProgress = progress => {
        console.log("Progress", progress);
      };
      
      const onUploadStart = (evt) => {
        const file=evt.target.files[0]
        const reader=new FileReader()
        reader.onload=()=>{
           setImg((pre)=>({
            ...pre,
            isLoading:true,
            aidata:{
              inlineData:{
                data:reader.result.split(",")[1],
                mimeType:file.type,
              },
            },
        }));
        };
        reader.readAsDataURL(file)
      };
      useEffect(()=>{},[img])
  return (
        <IKContext
        urlEndpoint={urlEndpoint}
        publicKey={publicKey}
        authenticator={authenticator}
      >
       <IKUpload
          fileName="test-upload.png"
          onError={onError}
          onSuccess={onSuccess}
          useUniqueFileName={true}
          onUploadProgress={onUploadProgress}
          onUploadStart={onUploadStart}
          style={{display:"none"}}
          ref={ikuploadRef}
        />

        <label onClick={()=> ikuploadRef.current.click()}>
          <img src="/attachment.png" alt="" />
        </label>
      </IKContext>)
}

export default Upload