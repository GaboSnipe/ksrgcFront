import React from "react";
import { format } from 'date-fns';
import { nanoid } from "nanoid";

const RightB = ({ selectedDoc }) => {

  const formatDate = (date) => {
    return date ? format(new Date(date), 'dd MMM yyyy, HH:mm') : '';
  }

  return (
    <div className="bg-base-200" style={{ width: "20%", height: "90vh" }}>
      <div style={{ marginLeft: '7%' }}>
        <div className="collapse collapse-plus bg-base-100" style={{ marginTop: '10px', width: '90%' }}>
          <input type="checkbox" />
          <div className="collapse-title text-sm font-medium text-accent-content">
            დოკუმენტი
          </div>
          <div className="collapse-content">
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <tbody>
                  <tr className="text-accent-content text-xs" key={nanoid()}>
                    <td>comment: {selectedDoc?.comment}</td>
                  </tr>
                  <tr className="text-accent-content text-xs" key={nanoid()}>
                    <td>created_at: {formatDate(selectedDoc?.created_at)}</td>
                  </tr>
                  <tr className="text-accent-content text-xs" key={nanoid()}>
                    <td>documentNumber: {selectedDoc?.documentNumber}</td>
                  </tr>
                  <tr className="text-accent-content text-xs" key={nanoid()}>
                    <td>have_to_sign_users: {selectedDoc?.have_to_sign_users}</td>
                  </tr>
                  <tr className="text-accent-content text-xs" key={nanoid()}>
                    <td>have_to_verify_users: {selectedDoc?.have_to_verify_users}</td>
                  </tr>
                  <tr className="text-accent-content text-xs" key={nanoid()}>
                    <td>is_signed: {selectedDoc?.is_signed ? <span className="text-green-500">&#x2713;</span> : <span className="text-red-500">&#x2717;</span>}</td>
                  </tr>
                  <tr className="text-accent-content text-xs" key={nanoid()}>
                    <td>is_verified: {selectedDoc?.is_verified ? <span className="text-green-500">&#x2713;</span> : <span className="text-red-500">&#x2717;</span>}</td>
                  </tr>
                  <tr className="text-accent-content text-xs" key={nanoid()}>
                    <td>owner: {selectedDoc?.owner}</td>
                  </tr>
                  <tr className="text-accent-content text-xs" key={nanoid()}>
                    <td>signed_by_users: {selectedDoc?.signed_by_users}</td>
                  </tr>
                  <tr className="text-accent-content text-xs" key={nanoid()}>
                    <td>title: {selectedDoc?.title}</td>
                  </tr>
                  <tr className="text-accent-content text-xs" key={nanoid()}>
                    <td>updated_at: {formatDate(selectedDoc?.updated_at)}</td>
                  </tr>
                  <tr className="text-accent-content text-xs" key={nanoid()}>
                    <td>uuid: {selectedDoc?.uuid}</td>
                  </tr>
                  <tr className="text-accent-content text-xs" key={nanoid()}>
                    <td>verified_by_users: {selectedDoc?.verified_by_users}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="collapse collapse-plus bg-base-100 mt-2 w-11/12">
          <input type="checkbox" />
          <div className="collapse-title text-sm font-medium text-accent-content">
            ხელმოწერა
          </div>
          <div className="collapse-content">
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-400 uppercase">
                  <tr>
                    <th scope="col" className="px-3 py-2">user</th>
                    <th scope="col" className="px-3 py-2">is?</th>
                    <th scope="col" className="px-3 py-2">created_at</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="cursor-pointer">
                    <th scope="row" className="border-r border-gray-600 rounded px-3 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white text-xs">
                      {selectedDoc?.have_to_sign_users}
                    </th>
                    <td className="px-3 py-2 text-xs text-center">
                      {selectedDoc ? (
                        selectedDoc.is_signed ? (
                          <span className="text-green-500">&#x2713;</span>
                        ) : (
                          <span className="text-red-500">&#x2717;</span>
                        )
                      ) : (
                        ""
                      )}

                    </td>
                    <td className="border-l border-gray-600 px-3 py-2 text-xs">
                      {formatDate(selectedDoc?.created_at)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="collapse collapse-plus bg-base-100 mt-2 w-11/12">
          <input type="checkbox" />
          <div className="collapse-title text-sm font-medium text-accent-content">
            ვიზირება
          </div>
          <div className="collapse-content">
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-400 uppercase">
                  <tr>
                    <th scope="col" className="px-3 py-2">user</th>
                    <th scope="col" className="px-3 py-2">is?</th>
                    <th scope="col" className="px-3 py-2">created_at</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="cursor-pointer">
                    <th scope="row" className="border-r border-gray-600 rounded px-3 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white text-xs">
                      {selectedDoc?.have_to_verify_users}
                    </th>
                    <td className="px-3 py-2 text-xs text-center">
                    {selectedDoc ? (
                        selectedDoc.is_verified ? (
                          <span className="text-green-500">&#x2713;</span>
                        ) : (
                          <span className="text-red-500">&#x2717;</span>
                        )
                      ) : (
                        ""
                      )}

                    </td>
                    <td className="border-l border-gray-600 px-3 py-2 text-xs">
                      {formatDate(selectedDoc?.created_at)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default RightB;
