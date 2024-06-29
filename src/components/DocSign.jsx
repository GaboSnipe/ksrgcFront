import React, { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import axios from "../axios";

const DocSign = (selectedDoc) => {
    const dispatch = useDispatch();
    const [documentNumber, setDocumentNumber] = useState(selectedDoc?.selectedDoc?.documentNumber);
    const [docId, setDocId] = useState(selectedDoc?.selectedDoc?.uuid);
    const [haveToSign, setHaveToSign] = useState("");
    const [haveToSignSearch, setHaveToSignSearch] = useState("");
    const [isFocused, setIsFocused] = useState(false);
    const fileInputRef = useRef(null);
    const [docList, setDocList] = useState(null);
    const [options, setOptions] = useState([]);
    useEffect(() => {
        const getUsersList = async () => {
            try {
                const response = await axios.get('/api/accounts/list/');
                setOptions(response?.data);
                console.log(user)
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

    const handleDocumentNumberChange = (e) => {
        const value = e.target.value;
        const regex = /^\d*\.?\d*$/;
        if (regex.test(value)) {
            setDocumentNumber(value);
        }
    };

    const uploadDoc = async () => {
        let docObj = new FormData();
        docObj.append('document', docId);
        docObj.append('recipient', haveToSign.id);

        try {
            const response = await axios.post('/api/eDocumentFlow/document/send-to-sign/', docObj, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.status === 201) {
                setDocumentNumber('');
                setHaveToSign('');
                toast.success('ვიზირებაზე გაგზავნილია');
            } else {
                throw new Error(response.data.message || 'შეცდომა');
            }
        } catch (err) {
            console.error('შეცდომა ვიზირებაზე გაგზავნისას:', err);
            toast.error('შეცდომა: ' + err.message);
        }
    };

    const handleAddHaveToSign = (id) => {
        const selectedOption = options.find(option => option.id === id);
        if (selectedOption) {
            setHaveToSign(selectedOption.email);
            setHaveToSignSearch("");
        }
    };

    const filteredOptions = options.filter(option =>
        option.email.toLowerCase().includes(haveToSignSearch.toLowerCase())
    );

    return (
        <div className="popup w-full md:w-3/4 rounded-lg shadow-lg p-4">
            <h1 className="text-xl text-center text-accent-content mb-4">ხელმოწერაზე გაგზავნა</h1>
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
                    <label className="text-xl font-medium text-white-700 col-span-1">haveToSign:</label>
                    <div className="relative col-span-4">
                        <div className="flex flex-wrap border rounded-lg px-3 py-2 mt-1 text-sm w-full p-4" style={{ backgroundColor: "#121212" }}>
                            {haveToSign && (
                                <div className="relative flex items-center rounded text-white hover:bg-gray-800 text-xs">
                                    <span className="flex ml-3 mr-1 text-xs">{haveToSign}</span>
                                    <button
                                        type="button"
                                        onClick={() => setHaveToSign('')}
                                        className="flex right-0 top-0 transform -translate-y-1 text-red-600 ml-1 mr-2 text-xs"
                                    >
                                        &times;
                                    </button>
                                </div>
                            )}
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
                                    {filteredOptions.map((option) => (
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

                <div className="flex justify-center py-2">
                    <button
                        type="button"
                        onClick={uploadDoc}
                        className="btn bg-blue-600 hover:bg-green-600 text-white btn-sm mx-2"
                    >
                        გაგზავნა
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DocSign;
