import Taps from "../../components/tabs/Tabs";
import Modal from "../../components/Modal/Modal";
import { useEffect, useState } from "react";
import styles from "./test.module.css";
import { TextInput } from "../../components/inputs/Inputs";
import AssignmentApp from "../../components/assignForm/AssignmentApp";
import Assing from "../../components/assignTest/assing";
import {useAuth} from './../../context/AuthContext';
import { useAssign } from "../../context/assignContext";

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
  },[])

  console.log(assign);
  console.log(usuarios);

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
      <div label="test4">test4</div>
    </Taps>
  );
};

export default Test;
