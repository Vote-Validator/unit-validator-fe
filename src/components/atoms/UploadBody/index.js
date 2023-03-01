import React, { useState,useEffect } from 'react'
import styled from 'styled-components';
const UploadBody = () => {
   const [selectFile, setSelectedFile] = useState(null);
   const [img, setImg] = useState(null);
 
   

   useEffect(() => {
     if (selectFile) {
       const reader = new FileReader();
       reader.onload = (event) => {
         setImg(event.target.result);
       };
       reader.readAsDataURL(selectFile);
     } else {
       setImg(null);
     }
   }, [selectFile]);
 
   function handleImageUpload(event) {
     setSelectedFile(event.target.files[0]);
   } return (
      <Container>
        <input type="file" onChange={handleImageUpload} />
        {img&& <Img src={img} class='img' alt="Uploaded Image" />}
      </Container>
    );
}

const Container =  styled.div`
height:100%;
width:100%

`
const  Img = styled.img`
height:100%;
width:100%;

`

export default UploadBody