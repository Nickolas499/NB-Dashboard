
import asigncss from '../css/asign.module.css';
import Tabs from "../components/tabs/Tabs";
import WorkForm from '../components/WorkForm/WorkForm';
import UserForm from '../components/UserForm/UserForm';
//import Test from '../components/test/Test';
import Asigment2 from '../components/test/asigment2';


export const Asign = () => {

  
  return (
    <div className={asigncss.AsingContainer}> 
    <div className={asigncss.Container}>
      <Tabs>
      {/*==================================(Registration)========================================================*/}
      <div label="ASIGNMENT">
        <div className={asigncss.tab_container}>
          <h1>Work Asignment</h1>
          <WorkForm/>
          <h1>Workers</h1>
          <UserForm />
          </div>
        </div>
      {/*==================================(Registration)========================================================*/}
        <div label="TEST_ASIGMENT #1">
        <div className={asigncss.tab_container}>
          <h1>Test</h1>
          {/* <Test/> */}
          </div>
        </div>
      {/*==================================(Registration)========================================================*/}
      <div label="TEST_ASIGMENT #2">
        <div className={asigncss.tab_container}>
          <Asigment2/>
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
