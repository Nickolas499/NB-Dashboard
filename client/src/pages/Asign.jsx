
import asigncss from '../css/asign.module.css';
import Tabs from "../components/tabs/Tabs";


export const Asign = () => {
  return (
    <div className={asigncss.AsingContainer}> 
    <div className={asigncss.Container}>
      <Tabs>
      {/*==================================(Registration)========================================================*/}
      <div label="ASIGNMENT">
        <div className={asigncss.tab_container}>
          <h1>#1</h1>
          </div>
        </div>
      {/*==================================(Registration)========================================================*/}
        <div label="#2">
        <div className={asigncss.tab_container}>
          <h1>#2</h1>
          </div>
        </div>
      {/*==================================(Registration)========================================================*/}
      <div label="#3">
        <div className={asigncss.tab_container}>
          <h1>#3</h1>
          </div>
        </div>
      {/*==================================(Registration)========================================================*/}
      <div label="#4">
        <div className={asigncss.tab_container}>
          <h1>#4</h1>
          </div>
        </div>
      {/*==================================(Registration)========================================================*/}
      <div label="#5">
        <div className={asigncss.tab_container}>
          <h1>#5</h1>
          </div>
        </div>
      </Tabs>
      </div>
      </div>    
  )
}
