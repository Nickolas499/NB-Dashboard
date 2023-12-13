import Taps from "../../components/tabs/Tabs";
import Modal from "../../components/Modal/Modal";
import { useState } from "react";
import styles from "./test.module.css";
import { TextInput } from "../../components/inputs/Inputs";

const Test = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <Taps>
      <div label="test1">
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
        </>
      </div>
      <div label="test2">test2</div>
      <div label="test3">test3</div>
      <div label="test4">test4</div>
    </Taps>
  );
};

export default Test;
