import React from "react";
import "../styles/LeftB.css";
import { nanoid } from "nanoid";


const LeftB = () => {
  return (
<div className="bg-base-200 " style={{ width: "20%", height: "90vh" }}>
  <div className="" style={{ marginLeft: '7%' }}>
    <div className="collapse collapse-plus bg-base-100" style={{ marginTop: '10px', width: '90%' }}>
      <input type="checkbox" />
      <div className="collapse-title text-xl font-medium text-accent-content">
        დოკუმენტი
      </div>
      <div className="collapse-content">
        <div className="overflow-x-auto">
          <table>
            <tbody>
              <tr className="text-accent-content" key={nanoid()}>
                <button className="text-accent-content"><p>დამევალა</p></button><br />
                <button className="text-accent-content"><p>დავავალე</p></button>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div className="collapse collapse-plus bg-base-100" style={{ marginTop: '10px', width: '90%' }}>
      <input type="checkbox" />
      <div className="collapse-title text-xl font-medium text-accent-content">
      ვიზირება
      </div>
      <div className="collapse-content">
        <div className="overflow-x-auto">
          <table>
            <tbody>
              <tr className="text-accent-content" key={nanoid()}>
                <button className="text-accent-content"><p>დამევალა</p></button><br />
                <button className="text-accent-content"><p>დავავალე</p></button>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div className="collapse collapse-plus bg-base-100" style={{ marginTop: '10px', width: '90%' }}>
      <input type="checkbox" />
      <div className="collapse-title text-xl font-medium text-accent-content">
      ხელმოწერა
      </div>
      <div className="collapse-content">
        <div className="overflow-x-auto">
          <table>
            <tbody>
              <tr className="text-accent-content" key={nanoid()}>
                <button className="text-accent-content"><p>დამევალა</p></button><br />
                <button className="text-accent-content"><p>დავავალე</p></button>
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

export default LeftB;
