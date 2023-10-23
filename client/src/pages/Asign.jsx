
import asigncss from '../css/asign.module.css';
import Tabs from "../components/tabs/Tabs";
import WorkForm from '../components/WorkForm/WorkForm';
import UserForm from '../components/UserForm/UserForm';
import Test from '../components/test/Test';

export const Asign = () => {

  const users = [
    {
      _id: 'eze',
      fname: 'ezequiel',
      lname: 'Almonte',
      color: '#01acf073',
    },
    {
      _id: 'mon',
      fname: 'Monica',
      lname: 'Lopez',
      color: '#6FC308',
    },
    {
      _id: 'noe',
      fname: 'Noemie',
      lname: 'Villajuan',
      color: '#F78E57',
    },
    {
      _id: 'mil',
      fname: 'Milka',
      lname: 'Cvetkovic',
      color: '#F78E57',
    },
    {
      _id: 'lau',
      fname: 'Lauren',
      lname: 'LeGrand',
      color: '#F78E57',
    },
    {
      _id: 'bun',
      fname: 'Bung',
      lname: 'Su Choi',
      color: '#F78E57',
    },
    {
      _id: 'Roux',
      fname: 'Roux',
      lname: 'Tadili',
      color: '#F78E57',
    },
    {
      _id: 'Lucia',
      fname: 'Lucia',
      lname: 'Coto',
      color: '#F78E57',
    },



    
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
          <h1>Workers</h1>
          <UserForm users={users}/>
          </div>
        </div>
      {/*==================================(Registration)========================================================*/}
        <div label="Test">
        <div className={asigncss.tab_container}>
          <h1>Test</h1>
          <Test/>
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
