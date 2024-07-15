
import axios from '../axios';
import React, { useRef, useState } from 'react';
import { toast } from 'react-toastify';


const FileAddPage = ({fileAddShow, setSeeFileAdd, choosedFileUuid}) => {
    const [selectedFiles, setSelectedFiles] = useState([]);
    const fileInputRef = useRef(null);

    const folderCreate = async () => {
        try {
            for (let item of selectedFiles) {
                let reqBody = new FormData();
                reqBody.append('file', item);
                reqBody.append('folder', choosedFileUuid);

                const response = await axios.post('/api/expertise/file/', reqBody);
            }
            toast.success('Ok')
            setSelectedFiles([]);
            setSeeFileAdd(false);

        } catch (err) {
            console.error('Error sending document for signature:', err);
            toast.error('Error: ' + err.message);
        }
    };

      const handleDocsUpload = (event) => {
        const files = Array.from(event.target.files);
        setSelectedFiles([...selectedFiles, ...files]);
    };
    const triggerFileInputClick = () => {
        fileInputRef.current.click();
    };
    const handleRemoveFile = (fileToRemove) => {
        const filteredFiles = selectedFiles.filter(file => file !== fileToRemove);
        setSelectedFiles(filteredFiles);
    };
      
  return (
    <>
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="popup-backdrop" onClick={fileAddShow}></div>
            <div className="popup w-full md:w-3/4 rounded-lg shadow-lg p-4">
                <h1 className="text-xl text-center text-content mb-4">folder create</h1>
                <div className="divide-y divide-slate-700">
                <div className="grid grid-cols-2 gap-4 py-2 items-center">
                    <label className="text-xl font-medium text-white-700 col-span-1 ml-5">დანართის ატვირთვა:</label>
                    <div className="relative col-span-1">
                        <input
                            id="docsUpload"
                            type="file"
                            onChange={handleDocsUpload}
                            className="hidden"
                            multiple
                            ref={fileInputRef}
                        />
                        {selectedFiles.length === 0 ? (
                            <label
                                htmlFor="docsUpload"
                                className="block font-medium text-gray-500 text-opacity-50 border rounded-lg px-3 py-2 mt-1 text-sm cursor-pointer bg-gray-800 hover:bg-gray-700 text-center w-full"
                            >
                                ატვირთეთ ფაილები
                            </label>
                        ) : (
                            <div className="block font-medium text-white border rounded-lg px-3 py-2 mt-1 text-sm bg-gray-800 hover:bg-gray-700 text-center w-full">
                                <div className="flex flex-wrap gap-2">
                                    {selectedFiles.map((file, index) => (
                                        <div
                                            key={index}
                                            className="bg-gray-800 rounded-lg p-2 flex items-center"
                                        >
                                            <span className="mr-2">{file.name}</span>
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveFile(file)}
                                                className="text-red-600 hover:text-red-700 focus:outline-none text-lg"
                                            >
                                                X
                                            </button>
                                        </div>
                                    ))}
                                    <div
                                        className="bg-green-600 hover:bg-green-800 rounded-lg p-2 flex items-center cursor-pointer"
                                        onClick={triggerFileInputClick}
                                    >
                                        <span className="mr-2">docAdd</span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                    
                    <div className="flex justify-center py-2">
                        <button
                            type="button"
                            onClick={folderCreate}
                            className="bg-transparent hover:bg-blue-500 text-gray-500 font-semibold hover:text-white py-2 px-4 border border-gray-500 hover:border-transparent rounded"
                        >
                            Send
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </>
   ) };

export default FileAddPage;
