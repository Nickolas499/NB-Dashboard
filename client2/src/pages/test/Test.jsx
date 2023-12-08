import Taps from "../../components/tabs/Tabs";
import Modal from "../../components/Modal/Modal";
import { useState } from "react";
import styles from "./test.module.css";

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
          <Modal isOpen={isOpen} onClose={closeModal}>
            <section className={styles.assigmentContainer}>
              <h1>Assigment</h1>
              <form action="">
                <label htmlFor="">LS3</label>
                <input type="text" name="LS3" />
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
