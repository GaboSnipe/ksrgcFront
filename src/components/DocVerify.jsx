import React, { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import axios from "../axios";

const DocVerify = ({ selectedDoc }) => {
    const dispatch = useDispatch();
    const [doc, setDoc] = useState(selectedDoc || null);
    const [docSearch, setDocSearch] = useState("");
    const [haveToVerify, setHaveToVerify] = useState(null);
    const [haveToVerifySearch, setHaveToVerifySearch] = useState("");
    const [isFocused, setIsFocused] = useState(false);
    const [isFocusedDoc, setIsFocusedDoc] = useState(false);
    const fileInputRef = useRef(null);
    const [docList, setDocList] = useState([]);
    const [options, setOptions] = useState([]);
    const [optionsDoc, setOptionsDoc] = useState([]);

    useEffect(() => {
        const getUsersList = async () => {
            try {
                const response = await axios.get('/api/accounts/list/');
                setOptions(response.data);
            } catch (error) {
                console.error('Error:', error);
            }
        };
        getUsersList();
    }, []);

    useEffect(() => {
        axios.get('/api/eDocumentFlow/document/list/')
            .then(response => {
                setDocList(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    const uploadDoc = async () => {
        if (!doc || !haveToVerify) {
            toast.error('Please select both a document and a recipient');
            return;
        }

        let docObj = new FormData();
        docObj.append('document', doc.uuid);
        docObj.append('recipient', haveToVerify.id);

        try {
            const response = await axios.post('/api/eDocumentFlow/document/send-to-verify/', docObj, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.status === 200) {
                setDoc(null);
                setHaveToVerify(null);
                toast.success('Document sent for verification');
            } else {
                throw new Error(response.data.message || 'Error');
            }
        } catch (err) {
            console.error('Error sending document for verification:', err);
            toast.error('Error: ' + err.message);
        }
    };

    const handleAddHaveToVerify = (id) => {
        const selectedOption = options.find(option => option.id === id);
        if (selectedOption) {
            setHaveToVerify(selectedOption);
            setHaveToVerifySearch("");
        }
    };

    const handleAddDoc = (uuid) => {
        const selectedDoc = docList.find(option => option.uuid === uuid);
        if (selectedDoc) {
            setDoc(selectedDoc);
            setDocSearch("");
        }
    };

    const filteredOptions = options.filter(option =>
        option.email.toLowerCase().includes(haveToVerifySearch.toLowerCase())
    );

    const filteredDocList = docList.filter(option => {
        const titleMatch = option.title && option.title.toLowerCase().includes(docSearch.toLowerCase());
        const documentNumberMatch = option.documentNumber && String(option.documentNumber).toLowerCase().includes(docSearch.toLowerCase());
        return titleMatch || documentNumberMatch;
    });
    
    return (
        <div className="popup w-full md:w-3/4 rounded-lg shadow-lg p-4">
            <h1 className="text-xl text-center text-content mb-4">ვიზირებაზე გაგზავნა</h1>
            <div className="divide-y divide-slate-700">
                <div className="grid grid-cols-2 gap-4 py-2 items-center">
                    <label className="text-xl font-medium text-white-700 col-span-1 ml-5">დოკუმენტის &#8470;</label>
                    <div className="relative col-span-1">
                        <div className="flex flex-wrap border rounded-lg px-3 py-2 mt-1 text-sm w-full p-4" style={{ backgroundColor: "#121212" }}>
                            {doc && (
                                <div className="relative flex items-center rounded text-white hover:bg-gray-800 text-xs">
                                    <span className="flex ml-3 mr-1 text-xs">{doc.documentNumber}</span>
                                    <button
                                        type="button"
                                        onClick={() => setDoc(null)}
                                        className="flex right-0 top-0 transform -translate-y-1 text-red-600 ml-1 mr-2 text-xs"
                                    >
                                        &times;
                                    </button>
                                </div>
                            )}
                            <input
                                id="docList"
                                type="text"
                                value={docSearch}
                                onChange={(e) => setDocSearch(e.target.value)}
                                onFocus={() => setIsFocusedDoc(true)}
                                onBlur={() => setTimeout(() => setIsFocusedDoc(false), 200)}
                                className="border-none flex-grow ml-2 focus:outline-none text-white"
                            />
                            {isFocusedDoc && docSearch && (
                                <div className="absolute left-0 z-10 border rounded-lg shadow-lg mt-1 w-full bg-gray-900 transform translate-y-6">
                                    {filteredDocList.map((option) => (
                                        <div
                                            key={option.uuid}
                                            onClick={() => handleAddDoc(option.uuid)}
                                            className="px-4 py-2 cursor-pointer hover:bg-gray-800 rounded-lg"
                                        >
                                            title : {option.title} |||| docNum : {option.documentNumber}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4 py-2 items-center">
                    <label className="text-xl font-medium text-white-700 col-span-1 ml-5">მიმღები:</label>
                    <div className="relative col-span-1">
                        <div className="flex flex-wrap border rounded-lg px-3 py-2 mt-1 text-sm w-full p-4" style={{ backgroundColor: "#121212" }}>
                            {haveToVerify && (
                                <div className="relative flex items-center rounded text-white hover:bg-gray-800 text-xs">
                                    <span className="flex ml-3 mr-1 text-xs">{haveToVerify.email}</span>
                                    <button
                                        type="button"
                                        onClick={() => setHaveToVerify(null)}
                                        className="flex right-0 top-0 transform -translate-y-1 text-red-600 ml-1 mr-2 text-xs"
                                    >
                                        &times;
                                    </button>
                                </div>
                            )}
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
                                    {filteredOptions.map((option) => (
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
                        className="bg-transparent hover:bg-blue-500 text-gray-500 font-semibold hover:text-white py-2 px-4 border border-gray-500 hover:border-transparent rounded"
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DocVerify;
