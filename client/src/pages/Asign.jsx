
import asigncss from '../css/asign.module.css';
import Tabs from "../components/tabs/Tabs";
import WorkForm from '../components/WorkForm/WorkForm';
import UserForm from '../components/UserForm/UserForm';


export const Asign = () => {

  const users = [
    {
      _id: '1',
      fname: 'John',
      lname: 'Doe',
    },
    {
      _id: '2',
      fname: 'Jane',
      lname: 'Doe',
    },
    {
      _id: '3',
      fname: 'John',
      lname: 'Doe',
    }


    
  ]
  return (
    <div className={asigncss.AsingContainer}> 
    <div className={asigncss.Container}>
      <Tabs>
      {/*==================================(Registration)========================================================*/}
      <div label="ASIGNMENT">
        <div className={asigncss.tab_container}>
          <h1>Work Asignment</h1>
          <WorkForm/>
          <UserForm users={users}/>
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
