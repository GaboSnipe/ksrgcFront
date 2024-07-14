import React, { useEffect, useState } from 'react';
import axios from '../axios';
import ReactPaginate from 'react-paginate';
import '../styles/pagination.css'; // Импорт стилей Tailwind CSS
import { IoIosRefresh } from "react-icons/io";
import { CiImport } from "react-icons/ci";

const Inbox = () => {
    const [inboxList, setInboxList] = useState([]);
    const [processed, setProcessed] = useState("-processed");
    const [choosedMail, setChoosedMail] = useState([]);
    const [limit, setLimit] = useState(20);
    const [offset, setOffset] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalItems, setTotalItems] = useState(0);
    const [choosedFolder, setChoosedFolder] = useState("9ad35fde-2072-4734-bd29-eb5112469efb");

    useEffect(() => {
        const getInboxList = async () => {
            try {
                const response = await axios.get(`/api/email/test/messages/list/?ordering=${processed}&offset=${offset}&limit=${limit}`);
                setInboxList(response?.data?.results);
                setTotalItems(response?.data?.count); // Предполагается, что API возвращает общее количество элементов
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


    const handlePageClick = (event) => {
        const newOffset = event.selected * limit;
        setCurrentPage(event.selected);
        setOffset(newOffset);
    };

    const fetchMail = () => {

    }
    const importTOWorckSpace = async () => {
        try {
            for (let item of choosedMail) {
                let reqBody = new FormData();
                reqBody.append('email_id', item);
                reqBody.append('copy_to_folder_id', choosedFolder);
                
                const response = await axios.post('/api/email/messages/import-files/', reqBody);
                console.log('Document sent for signature:', response.data);
            }
        } catch (err) {
            console.error('Error sending document for signature:', err);
            toast.error('Error: ' + err.message);
        }
    };
    return (
        <>
            <div className="relative shadow-md">
                <div className="px-6 py-4 bg-base-200 text-gray-900 whitespace-nowrap dark:text-white text-xl space-x-4">
                    <button onClick={fetchMail}><IoIosRefresh/></button>
                    <button onClick={importTOWorckSpace}><CiImport /></button>
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
        </>
    );
};

export default Inbox;
