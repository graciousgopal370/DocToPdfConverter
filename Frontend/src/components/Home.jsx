import React, { useState } from 'react'
import { FaFileAlt } from "react-icons/fa";
import axios from 'axios';
function Home() {
    const [selectedFile,setSelectedFile]=useState(null);
    const [message,setMessage]=useState("");
    const [errormsg,setErrorMsg]=useState("");
    console.log(selectedFile);
    const handleFileChange=(e)=>{
        // console.log(e.target.files[0]);
        setSelectedFile(e.target.files[0]);
    }
    const handleSubmit= async (event)=>{
      event.preventDefault();
      if(!selectedFile){
        setMessage("No file is selected!!");
        return ;
      }
      const formData=new FormData();
      formData.append("file",selectedFile);
      try {
        const response= await axios.post("http://localhost:3000/convertFile",formData,{
          responseType:"blob",
        });
        const url=window.URL.createObjectURL(new Blob([response.data]));
        const link=document.createElement('a');
        link.href=url;
        link.setAttribute("download",selectedFile.name.replace(/\.[^/.]+$/,"")+".pdf");
        document.body.appendChild(link);
        link.click();
        setSelectedFile(null);
        setErrorMsg("");
        setMessage("File converted successfully!!");
        link.parentNode.removeChild(link);
      } catch (error) {
        setErrorMsg("Error during download..")
      }
    }
  return (
    <>
      <div className='max-w-screen-2xl mx-auto container px-6 py-3 md:px-40'>
        <div className='flex h-screen items-center justify-center'>
            <div className=' rounded-lg shadow-lg border-1 bg-slate-300 px-4 py-2 md:px-8 md:py-4'>
                <h1 className='text-3xl font-bold text-center mb-4'>Convert Word to PDF Online</h1>
                <p className='text-md text-center mb-4'>Easily convert Word documents to PDF format online</p>
                
                <div className='flex flex-col items-center mx-3 space-y-4'>
                    <input type="file" accept='.doc,.docx' 
                     onChange={handleFileChange} className='hidden' id="fileInput"/>
                    <label htmlFor="fileInput" className='w-full flex items-center justify-center px-4 py-4 bg-gray-500 text-gray-300 rounded-lg shadow-lg cursor-pointer border-blue-400 hover:bg-blue-600 duration-150'>
                         <FaFileAlt className='text-xl' /> <span className='text-3xl pl-2 font-bold'>{selectedFile?selectedFile.name:"Upload doc file"}</span>
                    </label>
                    <button onClick={handleSubmit} 
                            disabled={!selectedFile} 
                            className='text-white text-xl bg-blue-500 disabled:bg-gray-400 disabled:pointer-events-none px-4 py-2 mt-2 rounded-md hover:bg-blue-700 duration-150 hover:font-bold'
                            >Convert to Pdf
                    </button>
                    {message && (<div className='text-green-500 text-sm'>{message}</div>)}
                    {errormsg && (<div className='text-green-500 text-sm'>{errormsg}</div>)}

                </div>
            </div>
            
        </div>
      </div>
    </>
  )
}

export default Home