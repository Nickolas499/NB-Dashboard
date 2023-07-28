import React, { useState } from "react";
import { user_data } from "../data/kpi_data";
import Tabs from "../components/tabs/Tabs";
import { Register } from "../components/Register";
import { Select } from "../components/selectComponent/Select";


const ColorOption = [
  { label: "red", value: "rgb(0, 255, 0)" },
  { label: "green", value: "rgb(255, 0, 0)" },
  { label: "blue", value: "rgb(255, 0, 0)" },
  { label: "yellow", value: "rgb(0, 255, 0)" },
  { label: "black", value: "rgb(0, 255, 0)" },
  { label: "white", value: "rgba(202,81,0)" },
  { label: "gray", value: "rgba(217,175,139)" },
  { label: "silver", value: "rgba(98,203,231)" },
  { label: "maroon", value: "rgb(245,198,82)" },
  { label: "olive", value: "rgba(1,174,240)" },
];
const AccessOption = [
  { label: "Admin", value: "admin" },
  { label: "User", value: "user" },
];
export const Test = () => {
  const [Colorvalue, setColorValue] = useState(ColorOption[0]);
  const [Accessvalue, setAccessValue] = useState(AccessOption[0]);

  return (
    <div className="Test_container">
      <ul className="Table_Asigment">
        <li className="li_header">
          <span className="span_name">Designers</span>
          <span className="span_value">LS3</span>
          <span className="span_value">Zeiss</span>
          <span className="span_value">3Shape</span>
          <span className="span_value">Dessign IBO</span>
          <span className="span_value">Digital Abut</span>
          <span className="span_value">Phisycal Abut</span>
          <span className="span_value">Full Arch</span>
          <span className="span_value"></span>
          <span className="span_value"></span>
        </li>
        {user_data.map((card, index) => (
          <li className="li_item" key={index}>
            <span className="span_name">{card.name}</span>
            <span className="span_value">
              <input type="checkbox" />
              <input className="input_value" type="text" />
            </span>
            <span className="span_value">
              <input type="checkbox" />
              <input className="input_value" type="text" />
            </span>
            <span className="span_value">
              <input type="checkbox" />
              <input className="input_value" type="text" />
            </span>
            <span className="span_value">
              <input type="checkbox" />
              <input className="input_value" type="text" />
            </span>
            <span className="span_value">
              <input type="checkbox" />
              <input className="input_value" type="text" />
            </span>
            <span className="span_value">
              <input type="checkbox" />
              <input className="input_value" type="text" />
            </span>
            <span className="span_value">
              <input type="checkbox" />
              <input className="input_value" type="text" />
            </span>
            <span className="span_value">
              <input type="checkbox" />
              <input className="input_value" type="text" />
            </span>
            <span className="span_btn">
              <button className="btn">Asign</button>
            </span>
          </li>
        ))}
      </ul>

      <div className="Tabs_container">
        <Tabs>
          <div label="Asigment">
            <div className="tab_asigment_container">
              <div className="control">
                <span>Creat New Asigment</span>
                <input type="text" />
                <button className="btn">Create</button>
              </div>
            </div>
          </div>
          <div label="SelectComponent">
            <div className="container">
              <div className="selectContainer">
                <Select options={AccessOption} value={Accessvalue} type={"Color"} onChange = {e =>setAccessValue(e)}/>
                <Select options={ColorOption} value={Colorvalue} type={"text"} onChange = {e =>setColorValue(e) }/>
              </div>
            </div>
          </div>
          <div label="Registration">
            <div className="container">
<<<<<<< HEAD
              <div className="registerContainer">
                <Register />
              </div>
=======
              <div className="registerFormContainer">
              <Register />
              </div>              
>>>>>>> aa62de001b008926d42f45a3154cdd47aad126f5
            </div>
          </div>
        </Tabs>
      </div>
    </div>
  );
};
