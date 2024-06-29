import React from "react";
import { format } from 'date-fns';

const DocInfo = ({ docInfo, onClick }) => {
  const { documentNumber, owner, title, created_at } = docInfo;

  const formatDate = (date) => {
    return date ? format(new Date(date), 'dd MMM yyyy, HH:mm') : '';
  }
  return (
<tr onClick={onClick} className="border-b border-gray-600 rounded dark:bg-base-200 dark:bg-base-200 hover:bg-base-100 dark:hover:bg-base-100 cursor-pointer">
  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-xs">
    {title}
  </th>
  <td className="px-6 py-4 text-xs">
    {documentNumber}
  </td>
  <td className="px-6 py-4 text-xs">
    {owner}
  </td>
  <td className="px-6 py-4 text-xs">
    {formatDate(created_at)}
  </td>
</tr>
  );
};

export default DocInfo;
