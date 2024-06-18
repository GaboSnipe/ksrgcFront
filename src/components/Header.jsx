import React, { useState } from "react";
import "../styles/Header.css";
import axios from "../axios";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import 'react-toastify/dist/ReactToastify.css';

const Header = () => {
  const dispatch = useDispatch();
  const loginState = useSelector((state) => state.auth.isLoggedIn);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [documentNumber, setDocumentNumber] = useState("");
  const [title, setTitle] = useState("");
  const [coment, setComent] = useState("");
  const [owner, setOwner] = useState("");
  const [haveToSign, setHaveToSign] = useState("");
  const [haveToVerifySearch, setHaveToVerifySearch] = useState("");
  const [haveToVerify, setHaveToVerify] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const options = [
    { id: 1, email: "user1@example.com" },
    { id: 2, email: "user2@example.com" },
    { id: 3, email: "user3@example.com" },
    // Add more values as needed
  ];

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const handleDocUpload = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
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
    docObj.append('have_to_sign_users', haveToSign);
    docObj.append('have_to_verify_users', haveToVerify);

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
        setHaveToSign('');
        setHaveToVerify([]);
        setSelectedFile(null);
        togglePopup();
        toast.success('დოკუმენტი ატვირთულია');
      } else {
        throw new Error(response.data.message || 'doc upload failed');
      }
    } catch (err) {
      console.error('შეცდომა ფაილის ატვირთვის დროს:', err);
      toast.error('შეცდომა: ' + err.message);
    }
  };

  const handleAddHaveToVerify = (email) => {
    if (email) {
      setHaveToVerify([...haveToVerify, email]);
      setHaveToVerifySearch("");
    }
  };

  const handleRemoveHaveToVerify = (index) => {
    const updatedSizes = [...haveToVerify];
    updatedSizes.splice(index, 1);
    setHaveToVerify(updatedSizes);
  };

  const filteredOptions = options.filter(option =>
    option.email.toLowerCase().includes(haveToVerifySearch.toLowerCase())
  );

  return (
    <>
      <div
        className="navbar-bottom-menu border-y border-gray-800 bg-base-200 rounded-b-lg"
        style={{ height: "10vh", width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <div className="container text-2xl navlinks-container" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <button onClick={togglePopup}>
            <div className="collapse-title text-xl font-medium text-accent-content">დოკუმენტის დამატება</div>
          </button>
        </div>
      </div>

      {isOpen && (
        <>
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="popup-backdrop" onClick={togglePopup}></div>
            <div className="popup w-full md:w-3/4 rounded-lg shadow-lg p-4">
              <h1 className="text-xl text-center text-accent-content mb-4">ახალი დოკუმენტის მომზადება</h1>
              <div className="divide-y divide-slate-700">
                <div className="flex items-center justify-center gap-2 py-2">
                  <label className="block w-1/2 text-xl font-medium text-white-700">
                    documentNumber:
                  </label>
                  <input
                    id="documentNumber"
                    type="number"
                    value={documentNumber}
                    onChange={handleDocumentNumberChange}
                    className="border rounded-lg px-3 py-2 mt-1 text-sm w-full"
                  />
                </div>

                <div className="flex items-center justify-center gap-2 py-2">
                  <label className="block w-1/2 text-xl font-medium text-white-700">
                    title:
                  </label>
                  <input
                    id="title"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="border rounded-lg px-3 py-2 mt-1 text-sm w-full"
                  />
                </div>

                <div className="flex items-center justify-center gap-2 py-2">
                  <label className="block w-1/2 text-xl font-medium text-white-700">
                    დოკუმენტი:
                  </label>
                  <input
                    id="docUpload"
                    type="file"
                    onChange={handleDocUpload}
                    className="hidden"
                  />
                  <label htmlFor="docUpload" className="block w-full font-medium text-white-700 border rounded-lg px-3 py-2 mt-1 text-sm cursor-pointer bg-gray-800 hover:bg-gray-700 text-white">
                    {selectedFile ? `${selectedFile.name}` : 'ფაილის ატვირთვა'}
                  </label>
                </div>

                <div className="flex items-center justify-center gap-2 py-2">
                  <label className="block w-1/2 text-xl font-medium text-white-700">
                    coment:
                  </label>
                  <textarea
                    id="coment"
                    value={coment}
                    onChange={(e) => setComent(e.target.value)}
                    className="border rounded-lg px-3 py-2 mt-1 text-sm w-full"
                    style={{ maxHeight: "40vh", minHeight: "15vh", overflowY: "auto" }}
                  />
                </div>
                <div className="flex items-center justify-center gap-2 py-2">
                  <label className="block w-1/2 text-xl font-medium text-white-700">
                    haveToSign:
                  </label>
                  <input
                    id="haveToSign"
                    type="text"
                    value={haveToSign}
                    onChange={(e) => setHaveToSign(e.target.value)}
                    className="border rounded-lg px-3 py-2 mt-1 text-sm w-full"
                  />
                </div>

                <div className="flex items-center gap-2 py-2">
                  <label className="block text-xl font-medium text-white-700" htmlFor="haveToSign">
                    haveToVerify:
                  </label>
                  <div className="relative flex-grow">
                    <div className="flex flex-wrap border rounded-lg px-3 py-2 mt-1 text-sm w-full">
                      {haveToVerify.map((email, index) => (
                        <div key={index} className="flex items-center rounded">
                          <span>{email}</span>
                          <button
                            type="button"
                            onClick={() => handleRemoveHaveToVerify(index)}
                            className="ml-1 text-red-600"
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
                        className="border-none flex-grow ml-2 focus:outline-none"
                      />
                      {isFocused && haveToVerifySearch && (
                        <div className="absolute z-10 border rounded-lg shadow-lg mt-1 w-full">
                          {filteredOptions.map((option) => (
                            <div
                              key={option.id}
                              onClick={() => handleAddHaveToVerify(option.email)}
                              className="px-4 py-2 cursor-pointer hover:bg-gray-200"
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
          </div>
        </>
      )}
    </>
  );
};

export default Header;
