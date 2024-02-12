import Taps from "../../components/tabs/Tabs";
import Modal from "../../components/Modal/Modal";
import { useEffect, useState } from "react";
import styles from "./test.module.css";
import { TextInput } from "../../components/inputs/Inputs";
import AssignmentApp from "../../components/assignForm/AssignmentApp";
import Assing from "../../components/assignTest/assing";
import {useAuth} from './../../context/AuthContext';
import { useAssign } from "../../context/assignContext";
import AssignJobs from "../../components/assignTest/assignJob2";

const Test = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const {usuarios,GetUsers} = useAuth();
  const {assign,GetAssign} = useAssign();

  useEffect(() => {
    GetUsers();
    GetAssign();
  },[])//eslint-disable-line



const workers = [
{_id: '64c3ec50c07c0f61078591f1', fname: 'Ezequiel', lname: 'Almonte', color: 'rgb(0, 255, 0)'}, 
{_id: '64c919266fb9f65786fb484e', fname: 'Monica', lname: 'Lopez', color: 'rgba(1,174,240)'}, 
{_id: '64c931185d3c908c306c2c3d', fname: 'Jose', lname: 'Rodriguez', color: '#eb9200'},
{_id: '64c94699e3211957e6fad38c', fname: 'Milka', lname: 'Cvetkovic', color: '#3578d3'},
{_id: '64c961078cd1a4cbe4d876b7', fname: 'Louren', lname: 'Legrand', color: '#a0293f'},
{_id: '653912381e00674780a4e048', fname: 'Roux', lname: 'Tadili', color: '#f5bc21'}]

const jobs =[
{DATE:"01/24/2024", LS3: 5, ZEISS: 3, SHAPE: 7, IBO_DESIGN: 8, DIGI_ABUT: 150, PHIS_ABUT:7, FULL_ARCH:3},
{DATE:"01/25/2024", LS3: 2, ZEISS: 5, SHAPE: 4, IBO_DESIGN: 7, DIGI_ABUT: 200, PHIS_ABUT:4, FULL_ARCH:1},
{DATE:"01/26/2024", LS3: 10, ZEISS: 5, SHAPE: 2, IBO_DESIGN: 15, DIGI_ABUT: 180, PHIS_ABUT:2, FULL_ARCH:0},
{DATE:"01/27/2024", LS3: 7, ZEISS: 1, SHAPE: 8, IBO_DESIGN: 8, DIGI_ABUT: 195, PHIS_ABUT:8, FULL_ARCH:2}]
 

  return (
    <Taps>
      <div label="MODAL TEST">
        <>
          <button onClick={openModal}>Abrir Ventana Modal</button>
          <Modal isOpen={isOpen} onClose={closeModal} title="Modal de prueba">
            <section className={styles.assigmentContainer}>              
              <form action="" className={styles.formAssigment}>
                <TextInput label="LS3" type="text" name="LS3" />
                <TextInput label="ZEISS" type="text"  name="ZEISS" />
                <TextInput label="3SHAPE" type="text"  name="3SHAPE"  />
                <TextInput label="Phisical Abutment" type="text" name="Phisical Abutment"  />
                <TextInput label="Digital Abutment"   type="text" name="Digital Abutment" />
                <TextInput label="Full Arch" type="text" name="Full Arch"  />
                <button className={styles.btnSubmit}>Submit</button>
              </form>
            </section>
          </Modal>
          <div>
            <h1>Usuarios</h1>
            {usuarios.map((user) => (
              <p key={user._id}>{user.fname}</p>
            ))}
          </div>
          <div>
            <h1>Assign</h1>
            {Object.entries(assign).slice(0, 7).map((key, value) => (
            <p key={key}>
              {key[0]}

              <span> : {key[1]}</span>
            </p>
          ))}
          </div>
        </>
      </div>
      <div label="ASSIGN TEST #1"><AssignmentApp/></div>
      <div label="ASSIGN TEST #2"><Assing workers={usuarios} jobs={assign}/></div>
      <div label="test4"><AssignJobs workers={usuarios} jobs={assign}/></div>


      
    </Taps>
  );
};

export default Test;
