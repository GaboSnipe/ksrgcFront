import React, { useEffect, useState } from 'react';
import axios from '../axios';
import ReactPaginate from 'react-paginate';
import '../styles/pagination.css';
import { IoIosRefresh } from "react-icons/io";
import { CiImport } from "react-icons/ci";
import { toast } from 'react-toastify';
import { FaFolder } from 'react-icons/fa6';


const Inbox = ({ }) => {
    const [inboxList, setInboxList] = useState([]);
    const [processed, setProcessed] = useState("-processed");
    const [choosedMail, setChoosedMail] = useState([]);
    const [limit, setLimit] = useState(20);
    const [offset, setOffset] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalItems, setTotalItems] = useState(0);
    const [choosedFolder, setChoosedFolder] = useState("");
    const [showImport, setShowImport] = useState(false);
    const [fileList, setFileList] = useState([]);

    useEffect(() => {
        const getInboxList = async () => {
            try {
                const response = await axios.get(`/api/email/test/messages/list/?ordering=${processed}&offset=${offset}&limit=${limit}`);
                setInboxList(response?.data?.results);
                setTotalItems(response?.data?.count);
            } catch (error) {
                console.error('Error fetching inbox list:', error);
            }
        };
        getInboxList();
    }, [processed, offset, limit, currentPage]);

    const handleCheckboxChange = (item) => {
        setChoosedMail((prevChoosedMail) => {
            if (prevChoosedMail.includes(item.id)) {
                return prevChoosedMail.filter((mailId) => mailId !== item.id);
            } else {
                return [...prevChoosedMail, item.id];
            }
        });
    };
    console.log(choosedMail);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`/api/expertise/folder/list/`);
                setFileList(response.data);
            } catch (error) {
                console.error('Error:', error);
            }
        };
        fetchData();
    }, [showImport]);


    const handlePageClick = (event) => {
        const newOffset = event.selected * limit;
        setCurrentPage(event.selected);
        setOffset(newOffset);
    };
    const fetchMail = () => {
        axios.get('/api/email/test/fetch/')
            .then(response => {
                setCurrentPage(0);
                toast.success('Ok');
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    };

    const handleShowImport = () => {
        setShowImport(!showImport);
    }

    const importTOWorckSpace = async () => {
        try {
            for (let item of choosedMail) {
                let reqBody = new FormData();
                reqBody.append('email_id', item);
                reqBody.append('copy_to_folder_id', choosedFolder);

                const response = await axios.post('/api/email/messages/import-files/', reqBody);
            }
            toast.success('Ok')

        } catch (err) {
            console.error('Error sending document for signature:', err);
            toast.error('Error: ' + err.message);
        }
    };
    const chooseFile = (id) => {
        setChoosedFolder(id);
    };
    return (
        <>
            <div className="relative shadow-md">
                <div className="px-6 py-4 bg-base-200 text-gray-900 whitespace-nowrap dark:text-white text-xl space-x-4">
                    <button onClick={fetchMail}><IoIosRefresh /></button>
                    <button onClick={handleShowImport}><CiImport /></button>
                    <button></button>
                </div>
                <table className="w-full text-xs text-left rtl:text-right text-gray-500 dark:text-gray-400 border-t border-b border-gray-600">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-base-200 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">&#10003;</th>
                            <th scope="col" className="px-6 py-3">From Header</th>
                            <th scope="col" className="px-6 py-3">Subject</th>
                            <th scope="col" className="px-6 py-3">Attachments</th>
                        </tr>
                    </thead>
                </table>
                <div className="overflow-y-auto max-h-72">
                    <table className="w-full text-xs text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <tbody>
                            {inboxList?.map((item) => (
                                <tr key={item.id} className="border-b border-gray-600 rounded dark:bg-base-200 hover:bg-base-100 dark:hover:bg-base-100 cursor-pointer">
                                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-xs max-w-1">
                                        <input
                                            type="checkbox"
                                            checked={choosedMail.includes(item.id)}
                                            onChange={() => handleCheckboxChange(item)}
                                        />
                                    </td>
                                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-xs overflow-hidden overflow-ellipsis  max-w-40">
                                        {item?.from_header}
                                    </td>
                                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-xs overflow-hidden overflow-ellipsis  max-w-40">
                                        {item?.subject}
                                    </td>
                                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-xs overflow-hidden overflow-ellipsis max-w-40">
                                        {item?.attachments?.map((attachment, index) => (
                                            <p key={index}>{attachment?.filename}</p>
                                        ))}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="px-6 py-4 bg-base-200 font-medium text-gray-900 whitespace-nowrap dark:text-white text-xs">
                    <ReactPaginate
                        previousLabel={'previous'}
                        nextLabel={'next'}
                        breakLabel={'...'}
                        breakClassName={'break-me'}
                        pageCount={Math.ceil(totalItems / limit)}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={5}
                        onPageChange={handlePageClick}
                        containerClassName={'pagination'}
                        activeClassName={'active'}
                    />
                </div>
            </div>
            {showImport &&
                <div className="fixed inset-0 flex items-center justify-center z-50">
                <div className="popup-backdrop" onClick={handleShowImport}></div>
                <div className="popup w-full md:w-3/4 rounded-lg shadow-lg p-4">
                    <h1 className="text-xl text-center text-content mb-4">choose folder</h1>
                    <div className="divide-y divide-slate-700">
                        <div className="w-full rounded-lg p-4 container">
                            <div className="flex flex-wrap gap-8 justify-center">
                                {fileList?.map((file) => (
                                    <div
                                        key={file.id} // Assuming each file has a unique id property
                                        className={`flex flex-col items-center ${choosedFolder === file.uuid ? "bg-blue-500 rounded" : ""}`}
                                    >
                                        <button onClick={() => chooseFile(file.uuid)}>
                                            <FaFolder className="text-yellow-500 text-6xl" />
                                        </button>
                                        <span className="mt-2 text-sm text-content max-w-[5rem] truncate">{file.title}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="flex justify-center mt-4">
                                <button onClick={importTOWorckSpace} className="btn bg-blue-600 text-white">adas</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            }
        </>
    );
};

export default Inbox;
