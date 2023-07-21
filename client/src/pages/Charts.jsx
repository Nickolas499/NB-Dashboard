import React, { useState } from "react";
// import BarCharts from "../components/charts/BarCharts";
import LineCharts from "../components/charts/LineChart";
// import { data_bar } from "../data/bar_data";
import { Modal } from "../components/modal";  
import { safely_data,redesign_rate, production_data, delivery_data, design_data,remake_data } from "../data/Line_data";

export const Charts = () => {
  const [show, setShow] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const showmodal = (content) => {
    setModalContent(content);
    setShow(true);
  };

  const hidemodal = () => {
    setShow(false);
  };

  const RL ={
    safely:0,
    remake:0,
    redesign:96.5,
    production:8,
    otd:99,
    p_low:24,
    p_high:28,

  }
  const heights=450
  return (
      
      
      <section className="charts_section">
        <Modal handleClose={hidemodal} show={show}>
      {modalContent}
      </Modal>
      <div className="charts" onClick={() => showmodal(safely_chart(RL, safely_data, heights))}>{safely_chart(RL, safely_data)}</div>
      <div className="charts" onClick={() => showmodal(remake_chart(RL, remake_data, heights))}>{remake_chart(RL, remake_data)}</div>
      <div className="charts" onClick={() => showmodal(redesign_chart(RL, redesign_rate, heights))}>{redesign_chart(RL, redesign_rate)}</div>
      <div className="charts" onClick={() => showmodal(production_chart(RL, production_data, heights))}>{production_chart(RL, production_data)}</div>
      <div className="charts" onClick={() => showmodal(delivery_chart(RL,  delivery_data, heights))}>{delivery_chart(RL, delivery_data)}</div>
      <div className="charts" onClick={() => showmodal(design_chart(RL, design_data, heights))}>{design_chart(RL, design_data)}</div>
      </section>     
      
   
  );
};


const safely_chart=(RL, safely_data,height)=>{
  return <LineCharts data={safely_data} threshold={RL.safely} range={[0,5]} title="Safety" height ={height} value1="insidents" value2="Kamishibai Misses" target="target" />
}

const remake_chart = (RL, remake_data,height)=>{
  return <LineCharts data={remake_data} threshold={RL.remake} range={[0,2]} title="Internal Remakes" height ={height}  value2="Internal Remakes" target="target"/>
}
const redesign_chart = (RL, redesign_rate,height)=>{
  return <LineCharts data={redesign_rate} threshold={RL.redesign} range={[50,110]} X={96} Y={99} title="FPY -- Redesign Rate" name="Safety" height ={height} value1="" value2="FPY(Redesign)" target="target" />
}
const production_chart = (RL, production_data,height)=>{
  return <LineCharts data={production_data} threshold={RL.production} range={[0,20]} title="Cases to Production Support"  name="Safety" height ={height} value1="" value2="Production Support" target="target"/>
}
const delivery_chart = (RL, delivery_data,height)=>{
  return <LineCharts data={delivery_data} threshold={RL.otd} range={[90,105]} title="OTD" name="Safety" height ={height}value1="insidents" value2="OTD" target="target"/>
}
const design_chart = (RL, design_data,height)=>{
  return <LineCharts data={design_data} threshold={RL.p_low} range={[5,35]} threshold2={RL.p_high} title="Productivity"name="Safety" height ={height} value1="Upper Target" value2="Productivity" target="Lower target"/>
}

 /* <section className="Bar_charts_section">
        <BarCharts data={data_bar} title="Bar Chart" />
        <BarCharts data={data_bar} title="Bar Chart" />
      </section> */