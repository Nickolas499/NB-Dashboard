import { user_data } from "../data/kpi_data";
import Tabs from "../components/tabs/Tabs";
import { Register } from "../components/Register";

export const Test = () => {
  return (
    <div className="Test_container">
      <ul className="Table_Asigment">
        <li className="li_header">
          <span className="span_name">Asigment</span>
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
          <div label="TAB2">
            <div className="container">tab2</div>
          </div>
          <div label="Registration">
            <div className="container">
              <Register />
            </div>
          </div>
        </Tabs>
      </div>
    </div>
  );
};
