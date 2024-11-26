import kpi from "./kpi.module.css";
import { kpi_data } from "../../../data/kpi_data.js";
import { Kpicards } from "../../../components/KPICards/KPIcards.jsx";
import { SquareBtn } from "../../../components/Butons/Buton.jsx";
import { useAuth } from "../../../context/AuthContext";
import Modal from "../../../components/Modal/Modal.jsx";
import { Input } from "../../../components/inputs/Inputs.jsx";
import { useEffect, useState } from "react";
import { useAssign } from "../../../context/assignContext";



const KPI = () => {
  const { user } = useAuth();
  const { queuevolume, GetQueue, CreateQueue, } = useAssign();
  const [isOpen, setIsOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    GetQueue();
  }, []);




  const openModal = (isEdit = false) => {
    setIsOpen(true);
    setIsEditing(isEdit);	
  };
  // const openModal = ( isEdit = false) => {	
	// 	setIsOpen(true);
	// 	setIsEditing(isEdit);	
	// };

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


  const handleSubmit = () => {
		// const id = currentId;

		if (isEditing) {
			// Actualizar asignación con el ID correspondiente
			// UpdateUserJobAssignment(id, assign);
		} else {
			// Crear nueva asignación
			handleCreateNewData();
		}

		// setNewAssign({});
		// GetUserJobAssignment();
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
              // Object.entries(queuevolume).some((value) => value[1] > 0) ? (
              //   <SquareBtn onClick={openModal( true)}>Edit</SquareBtn>
              // ) : (
              //   <SquareBtn onClick={openModal( true)}>Assign</SquareBtn>
              // )
              <SquareBtn onClick={openModal}>{isEditing ? 'Update' : 'Assign'}</SquareBtn>

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
            {/* <TextInput label="LS3" type="text" name="LS3" onChange={handleChange} /> */}
            <Input label="LS3" name="LS3" type="text" placeholder="0" value={products.LS3 || ''} onChange={handleChange} errors={""} />
            {/* <TextInput label="ZEISS" type="text" name="ZEISS" onChange={handleChange} /> */}
            <Input label="ZEISS" name="ZEISS" type="text" placeholder="0" value={products.ZEISS || ''} onChange={handleChange} errors={""} />
            {/* <TextInput label="SHAPE" type="text" name="SHAPE" onChange={handleChange} /> */}
            <Input label="3SHAPE" name="SHAPE" type="text" placeholder="0" value={products.SHAPE || ''} onChange={handleChange} errors={""} />
            {/* <TextInput label="PHIS_ABUT" type="text" name="PHIS_ABUT" onChange={handleChange} /> */}
            <Input label="PHIS ABUT" name="PHIS_ABUT" type="text" placeholder="0" value={products.PHIS_ABUT || ''} onChange={handleChange} errors={""} />
            {/* <TextInput label="DIGI_ABUT" type="text" name="DIGI_ABUT" onChange={handleChange} /> */}
            <Input label="DIGI ABUT" name="DIGI_ABUT" type="text" placeholder="0" value={products.DIGI_ABUT || ''} onChange={handleChange} errors={""} />
            {/* <TextInput label="IBO_DESIGN" type="text" name="IBO_DESIGN" onChange={handleChange} /> */}
            <Input label="IBO DESIGN" name="IBO_DESIGN" type="text" placeholder="0" value={products.IBO_DESIGN || ''} onChange={handleChange} errors={""} />
            {/* <TextInput label="FULL_ARCH" type="text" name="FULL_ARCH" onChange={handleChange} /> */}
            <Input label="FULL ARCH" name="FULL_ARCH" type="text" placeholder="0" value={products.FULL_ARCH || ''} onChange={handleChange} errors={""} />
            {/* <button onClick={handleSubmit} className={kpi.btnSubmit}>Submit</button> */}
            <button onClick={handleSubmit} className={kpi.btnSubmit}>{isEditing ? 'Update' : 'Assign'}</button>
          </form>
        </section>
      </Modal>
    </>
  );
};
export default KPI;
