import React, { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import axios from "../axios";

const DocAdd = ({ setIsOpenAddDoc }) => {
    const dispatch = useDispatch();
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [documentNumber, setDocumentNumber] = useState("");
    const [title, setTitle] = useState("");
    const [coment, setComent] = useState("");
    const [owner, setOwner] = useState("");
    const [haveToVerifySearch, setHaveToVerifySearch] = useState("");
    const [haveToVerify, setHaveToVerify] = useState([]);
    const [haveToSignSearch, setHaveToSignSearch] = useState("");
    const [haveToSign, setHaveToSign] = useState([]);
    const [isFocused, setIsFocused] = useState(false);
    const [usersList, setUsersList] = useState([]);
    const fileInputRef = useRef(null);

    useEffect(() => {
        const getUsersList = async () => {
          try {
            const response = await axios.get('/api/accounts/list/');
            setUsersList(response?.data);
            console.log(user)
          } catch (error) {
            console.error('Error:', error);
          }
        };
        getUsersList();
      }, []);


      

    const handleDocUpload = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
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

    const handleDocumentNumberChange = (e) => {
        const value = e.target.value;
        const regex = /^\d*\.?\d*$/;
        if (regex.test(value)) {
            setDocumentNumber(value);
        }
    };

    const uploadDoc = async () => {
        let docObj = new FormData();
        docObj.append('documentNumber', documentNumber);
        docObj.append('title', title);
        docObj.append('file', selectedFile);
        docObj.append('comment', coment);
        docObj.append('owner', owner);
        {
            haveToSign?.map((item) => (
                docObj.append('have_to_sign_users', item)
            ))
        }
        {
            haveToVerify?.map((item) => (
                docObj.append('have_to_verify_users', item)
            ))
        }


        try {
            const response = await axios.post('/api/eDocumentFlow/document/upload/', docObj, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.status === 201) {
                setDocumentNumber('');
                setTitle('');
                setComent('');
                setOwner('');
                setHaveToSign([]);
                setHaveToVerify([]);
                setSelectedFile(null);
                setSelectedFiles([]);
                toast.success('დოკუმენტი ატვირთულია');
                setIsOpenAddDoc(false);
            } else {
                throw new Error(response.data.message || 'doc upload failed');
            }
        } catch (err) {
            console.error('შეცდომა ფაილის ატვირთვის დროს:', err);
            toast.error('შეცდომა: ' + err.message);
        }
    };

    const handleAddHaveToSign = (id) => {
        if (id && !haveToSign.includes(id)) {
            setHaveToSign([...haveToSign, id]);
            setHaveToSignSearch("");
        }
    };

    const handleRemoveHaveToSign = (id) => {
        const updatedSizes = haveToSign.filter(signId => signId !== id);
        setHaveToSign(updatedSizes);
    };

    const filteredSignOptions = usersList.filter(option =>
        option.email.toLowerCase().includes(haveToSignSearch.toLowerCase())
    );
    const handleAddHaveToVerify = (id) => {
        if (id && !haveToVerify.includes(id)) {
            setHaveToVerify([...haveToVerify, id]);
            setHaveToVerifySearch("");
        }
    };

    const handleRemoveHaveToVerify = (id) => {
        const updatedSizes = haveToVerify.filter(verifyId => verifyId !== id);
        setHaveToVerify(updatedSizes);
    };

    const filteredVerifyOptions = usersList.filter(option =>
        option.email.toLowerCase().includes(haveToVerifySearch.toLowerCase())
    );

    return (
        <div className="popup w-full md:w-3/4 rounded-lg shadow-lg p-4 bg-base-200">
            <h1 className="text-xl text-center text-accent-content mb-4">ახალი დოკუმენტის მომზადება</h1>
            <div className="divide-y divide-slate-700">
                <div className="grid grid-cols-5 gap-4 py-2 items-center">
                    <label className="text-xl font-medium text-white-700 col-span-1">documentNumber:</label>
                    <input
                        id="documentNumber"
                        type="number"
                        value={documentNumber}
                        onChange={handleDocumentNumberChange}
                        className="border rounded-lg px-3 py-2 mt-1 text-sm col-span-4"
                    />
                </div>

                <div className="grid grid-cols-5 gap-4 py-2 items-center">
                    <label className="text-xl font-medium text-white-700 col-span-1">title:</label>
                    <input
                        id="title"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="border rounded-lg px-3 py-2 mt-1 text-sm col-span-4"
                    />
                </div>

                <div className="grid grid-cols-5 gap-4 py-2 items-center">
                    <label className="text-xl font-medium text-white-700 col-span-1">დოკუმენტი:</label>
                    <div className="relative col-span-4">
                        <input
                            id="docUpload"
                            type="file"
                            onChange={handleDocUpload}
                            className="hidden"
                        />
                        <label
                            htmlFor="docUpload"
                            className="block font-medium text-white-700 border rounded-lg px-3 py-2 mt-1 text-sm cursor-pointer bg-gray-800 hover:bg-gray-700 text-white text-center"
                        >
                            {selectedFile ? `${selectedFile.name}` : 'ფაილის ატვირთვა'}
                        </label>
                    </div>
                </div>

                <div className="grid grid-cols-5 gap-4 py-2 items-center">
                    <label className="text-xl font-medium text-white-700 col-span-1">დოკუმენტები:</label>
                    <div className="relative col-span-4">
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
                                className="block font-medium text-white border rounded-lg px-3 py-2 mt-1 text-sm cursor-pointer bg-gray-800 hover:bg-gray-700 text-center w-full"
                            >
                                ფაილის ატვირთვა
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

                <div className="grid grid-cols-5 gap-4 py-2 items-center">
                    <label className="text-xl font-medium text-white-700 col-span-1">coment:</label>
                    <textarea
                        id="coment"
                        value={coment}
                        onChange={(e) => setComent(e.target.value)}
                        className="border rounded-lg px-3 py-2 mt-1 text-sm col-span-4"
                        style={{ maxHeight: '40vh', minHeight: '15vh', overflowY: 'auto' }}
                    />
                </div>

                <div className="grid grid-cols-5 gap-4 py-2 items-center">
                    <label className="text-xl font-medium text-white-700 col-span-1">haveToSign:</label>
                    <div className="relative col-span-4">
                        <div className="flex flex-wrap border rounded-lg px-3 py-2 mt-1 text-sm w-full p-4" style={{ backgroundColor: "#121212" }}>
                            {haveToSign.map((id) => (
                                <div key={id} className="relative flex items-center rounded text-white hover:bg-gray-800 text-xs">
                                    <span className="flex ml-3 mr-1 text-xs">{usersList.find(option => option.id === id)?.email}</span>
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveHaveToSign(id)}
                                        className="flex right-0 top-0 transform -translate-y-1 text-red-600 ml-1 mr-2 text-xs"
                                    >
                                        &times;
                                    </button>
                                </div>
                            ))}
                            <input
                                id="haveToSign"
                                type="text"
                                value={haveToSignSearch}
                                onChange={(e) => setHaveToSignSearch(e.target.value)}
                                onFocus={() => setIsFocused(true)}
                                onBlur={() => setTimeout(() => setIsFocused(false), 200)}
                                className="border-none flex-grow ml-2 focus:outline-none text-white"
                            />
                            {isFocused && haveToSignSearch && (
                                <div className="absolute left-0 z-10 border rounded-lg shadow-lg mt-1 w-full bg-gray-900 transform translate-y-6">
                                    {filteredSignOptions.map((option) => (
                                        <div
                                            key={option.id}
                                            onClick={() => handleAddHaveToSign(option.id)}
                                            className="px-4 py-2 cursor-pointer hover:bg-gray-800 rounded-lg"
                                        >
                                            {option.email}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-5 gap-4 py-2 items-center">
                    <label className="text-xl font-medium text-white-700 col-span-1">haveToVerify:</label>
                    <div className="relative col-span-4">
                        <div className="flex flex-wrap border rounded-lg px-3 py-2 mt-1 text-sm w-full p-4" style={{ backgroundColor: "#121212" }}>
                            {haveToVerify.map((id) => (
                                <div key={id} className="relative flex items-center rounded text-white hover:bg-gray-800 text-xs">
                                    <span className="flex ml-3 mr-1 text-xs">{usersList.find(option => option.id === id)?.email}</span>
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveHaveToVerify(id)}
                                        className="flex right-0 top-0 transform -translate-y-1 text-red-600 ml-1 mr-2 text-xs"
                                    >
                                        &times;
                                    </button>
                                </div>
                            ))}
                            <input
                                id="haveToVerify"
                                type="text"
                                value={haveToVerifySearch}
                                onChange={(e) => setHaveToVerifySearch(e.target.value)}
                                onFocus={() => setIsFocused(true)}
                                onBlur={() => setTimeout(() => setIsFocused(false), 200)}
                                className="border-none flex-grow ml-2 focus:outline-none text-white"
                            />
                            {isFocused && haveToVerifySearch && (
                                <div className="absolute left-0 z-10 border rounded-lg shadow-lg mt-1 w-full bg-gray-900 transform translate-y-6">
                                    {filteredVerifyOptions.map((option) => (
                                        <div
                                            key={option.id}
                                            onClick={() => handleAddHaveToVerify(option.id)}
                                            className="px-4 py-2 cursor-pointer hover:bg-gray-800 rounded-lg"
                                        >
                                            {option.email}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="flex justify-center py-2">
                    <button
                        type="button"
                        onClick={uploadDoc}
                        className="btn bg-blue-600 hover:bg-green-600 text-white btn-sm mx-2"
                    >
                        დოკუმენტის შექმნა
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DocAdd;
