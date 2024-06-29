import React from "react";
import "../styles/LeftB.css";
import { nanoid } from "nanoid";


const LeftB = ({setAllDocView, allDocView}) => {
  const viewAllDoc = () => {
    setAllDocView(false);
    setAllDocView(true);
  };
  return (
<div className="bg-base-200 " style={{ width: "20%", height: "90vh" }}>
  <div className="" style={{ marginLeft: '7%' }}>

    <div className="collapse collapse-plus bg-base-100" style={{ marginTop: '10px', width: '90%' }}>
      <input type="checkbox" />
      <div className="collapse-title text-sm font-medium text-accent-content">
        დოკუმენტი
      </div>
      <div className="collapse-content">
        <div className="overflow-x-auto">
          <table>
            <tbody>
              <tr className="text-accent-content" key={nanoid()}>
                <td>
                  <button className="text-accent-content text-xs">დამევალა</button>
                </td>
              </tr>
              <tr className="text-accent-content" key={nanoid()}>
                <td>
                  <button className="text-accent-content text-xs">დავავალე</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div className="collapse collapse-plus bg-base-100" style={{ marginTop: '10px', width: '90%' }}>
      <input type="checkbox" />
      <div className="collapse-title text-sm font-medium text-accent-content">
        ვიზირება
      </div>
      <div className="collapse-content">
        <div className="overflow-x-auto">
          <table>
            <tbody>
              <tr className="text-accent-content" key={nanoid()}>
                <td>
                  <button className="text-accent-content text-xs">დამევალა</button>
                </td>
              </tr>
              <tr className="text-accent-content" key={nanoid()}>
                <td>
                  <button className="text-accent-content text-xs">დავავალე</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div className="collapse collapse-plus bg-base-100" style={{ marginTop: '10px', width: '90%' }}>
      <input type="checkbox" />
      <div className="collapse-title text-sm font-medium text-accent-content">
        ხელმოწერა
      </div>
      <div className="collapse-content">
        <div className="overflow-x-auto">
          <table>
            <tbody>
              <tr className="text-accent-content" key={nanoid()}>
                <td>
                  <button className="text-accent-content text-xs">დამევალა</button>
                </td>
              </tr>
              <tr className="text-accent-content" key={nanoid()}>
                <td>
                  <button className="text-accent-content text-xs">დავავალე</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
        
    <div className="collapse collapse-plus " style={{ marginTop: '10px', width: '90%' }}>
    <button onClick={viewAllDoc}>
        <div className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">view all document</div>
      </button>
    </div>
  </div>
</div>


  );
};

export default LeftB;
