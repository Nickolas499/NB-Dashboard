import kpi from "./kpi.module.css";
import { kpi_data } from "../../../data/kpi_data.js";
import { Kpicards } from "../../../components/KPICards/KPIcards.jsx";
import { SquareBtn } from "../../../components/Butons/Buton.jsx";
import { useAuth } from "../../../context/AuthContext";
import Modal from "../../../components/Modal/Modal.jsx";
import { TextInput } from "../../../components/inputs/Inputs.jsx";
import { useEffect, useState } from "react";
import { useAssign } from "../../../context/assignContext";



const KPI = () => {
  const { user } = useAuth();
  const { queuevolume, GetQueue, CreateQueue } = useAssign();


  useEffect(() => {
    GetQueue();

  }, []);


  const [isOpen, setIsOpen] = useState(false);
  const [products, setProducts] = useState([]);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };




  const handleCreateNewData = async () => {
    const newAssignData = {
      LS3: products.LS3,
      ZEISS: products.ZEISS,
      SHAPE: products.SHAPE,
      PHIS_ABUT: products.PHIS_ABUT,
      DIGI_ABUT: products.DIGI_ABUT,
      FULL_ARCH: products.FULL_ARCH,
      IBO_DESIGN: products.IBO_DESIGN
    };

    await CreateQueue(newAssignData);
    GetQueue();
  };



  // Dentro de la función KPI
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProducts((prevProducts) => ({
      ...prevProducts,
      [name]: parseInt(value), // Asegúrate de convertir el valor a entero si es necesario
    }));
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(products);
    handleCreateNewData();
    closeModal();
  };


  return (
    <>
      {/* =====================================(ASSIGMENT CARDS)=============================================== */}


      <section className={kpi.Queue}>
        <div className={kpi.Queue_title}>QUEUE VOLUME</div>
        <div className={kpi.container}>
          <div className={kpi.Queue_data}>
            {Object.entries(queuevolume).slice(0, 7).map((value, key) => (
              <div className={kpi.Queue_label} key={key}>
                <span className={kpi.Queue_key}>{value[0]}</span> 
                <span className={kpi.Queue_value}>{value[1]}</span>
              </div>
            ))}
          </div>
          <div className={kpi.Queue_btn}>
          {user.access === "admin" ? (
            <SquareBtn onClick={openModal}>Assign</SquareBtn>

          ) : (
            ""
          )}
          </div>
        </div>
      </section>
      {/* =====================================(KPI CARDS)=============================================== */}
      <section className={kpi.Dashboard_KPI}>
        {kpi_data.map((card, index) => (
          <Kpicards
            key={index}
            symbol={card.symbol}
            color={card.color}
            shadow={card.shadow}
            title={card.title}
            data={card.data}
          />
        ))}
      </section>
      {/* ====================================(ASSIGMENT MODAL)================================================ */}
      <Modal isOpen={isOpen} onClose={closeModal} title="Assign">
        <section className={kpi.assigmentContainer}>
          <form action="" className={kpi.formAssigment}>
            <TextInput label="LS3" type="text" name="LS3" onChange={handleChange} />
            <TextInput label="ZEISS" type="text" name="ZEISS" onChange={handleChange} />
            <TextInput label="SHAPE" type="text" name="SHAPE" onChange={handleChange} />
            <TextInput
              label="PHIS_ABUT"
              type="text"
              name="PHIS_ABUT"
              onChange={handleChange}
            />
            <TextInput
              label="DIGI_ABUT"
              type="text"
              name="DIGI_ABUT"
              onChange={handleChange}
            />
            <TextInput label="IBO_DESIGN" type="text" name="IBO_DESIGN" onChange={handleChange} />
            <TextInput label="FULL_ARCH" type="text" name="FULL_ARCH" onChange={handleChange} />
            <button onClick={handleSubmit} className={kpi.btnSubmit}>
              Submit
            </button>
          </form>
        </section>
      </Modal>
    </>
  );
};
export default KPI;
