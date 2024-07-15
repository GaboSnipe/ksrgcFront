import React, { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import axios from "../axios";

const Taskcreate = ({ setIsOpenAddDoc }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [documentNumber, setDocumentNumber] = useState("");
    const [title, setTitle] = useState("");
    const [coment, setComent] = useState("");
    const [haveToVerifySearch, setHaveToVerifySearch] = useState("");
    const [haveToVerify, setHaveToVerify] = useState([]);
    const [haveToSignSearch, setHaveToSignSearch] = useState("");
    const [haveToSign, setHaveToSign] = useState(null);
    const [isFocused, setIsFocused] = useState(false);
    const [usersList, setUsersList] = useState([]);
    const [stat, setStat] = useState("TODO");
    const [dueDate, setDueDate] = useState(""); // Новое состояние для хранения даты
    const fileInputRef = useRef(null);

    useEffect(() => {
        const getUsersList = async () => {
            try {
                const response = await axios.get('/api/accounts/list/');
                setUsersList(response?.data);
            } catch (error) {
                console.error('Error:', error);
            }
        };
        getUsersList();
    }, []);

    const ToList = {
        TODO: "todo",
        ARVICIMETIRA: "ar vici meti ra",
        MARTOTODOMUSHAOBS: "marto todo mushaobs"
    };

    const uploadDoc = async () => {
        let docObj = new FormData();
        docObj.append('title', title);
        docObj.append('status', stat);
        docObj.append('comment', coment);
        docObj.append('assign_to', haveToSign);
        docObj.append('deadline', dueDate);
        try {
            const response = await axios.post('/api/tasks/create/', docObj);

            if (response.status === 201) {
                setTitle('');
                setComent('');
                setHaveToSign('');
                setDueDate(''); // Очистка поля даты после успешной загрузки
                toast.success('Ok');
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
        setHaveToSign(id);
        setHaveToSignSearch("");
    };

    const handleRemoveHaveToSign = () => {
        setHaveToSign(null);
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

    const filteredVerifyOptions = usersList.filter(option =>
        option.email.toLowerCase().includes(haveToVerifySearch.toLowerCase())
    );

    return (
        <div className="popup w-full md:w-3/4 rounded-lg shadow-lg p-4 bg-base-200">
            <h1 className="text-xl text-center text-content mb-10">ახალი დოკუმენტის მომზადება</h1>
            <div className="divide-y divide-slate-700">
                <div className="grid grid-cols-2 gap-4 py-2 items-center">
                    <label className="text-xl font-medium text-white-700 col-span-1 ml-5">title</label>
                    <input
                        id="title"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="border rounded-lg px-3 py-2 mt-1 text-sm col-span-1 placeholder-gray-500 placeholder-opacity-50"
                    />
                </div>
                <div className="grid grid-cols-2 gap-4 py-2 items-center">
                    <label className="text-xl font-medium text-white-700 ml-5">comment</label>
                    <textarea
                        id="coment"
                        value={coment}
                        onChange={(e) => setComent(e.target.value)}
                        className="border rounded-lg px-3 py-2 mt-1 text-sm col-span-1"
                        style={{ maxHeight: '40vh', minHeight: '15vh', overflowY: 'auto' }}
                    />
                </div>
                <div className="grid grid-cols-2 gap-4 py-2 items-center">
                    <label className="text-xl font-medium text-white-700 col-span-1 ml-5">assign_to</label>
                    <div className="relative col-span-1">
                        <div className="flex flex-wrap border rounded-lg px-3 py-2 mt-1 text-sm w-full p-4" style={{ backgroundColor: "#121212" }}>
                            {haveToSign && (
                                <div className="relative flex items-center rounded text-white hover:bg-gray-800 text-xs">
                                    <span className="flex ml-3 mr-1 text-xs">{usersList.find(option => option.id === haveToSign)?.email}</span>
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveHaveToSign()}
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
                                className="border-none flex-grow ml-2 focus:outline-none text-white placeholder-gray-500 placeholder-opacity-50"
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
                <div className="grid grid-cols-2 gap-4 py-2 items-center">
                    <label className="text-xl font-medium text-white-700 col-span-1 ml-5">deadline</label>
                    <input
                        id="dueDate"
                        type="date"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                        className="border rounded-lg px-3 py-2 mt-1 text-sm col-span-1 custom-date-input"
                    />
                </div>


                <div className="flex justify-center py-2 pt-10">
                    <button
                        type="button"
                        onClick={uploadDoc}
                        className="bg-transparent hover:bg-blue-500 text-gray-500 font-semibold hover:text-white py-2 px-4 border border-gray-500 hover:border-transparent rounded"
                    >
                        create task
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Taskcreate;
