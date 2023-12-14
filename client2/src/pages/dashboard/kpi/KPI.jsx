import kpi from "./kpi.module.css";
import { kpi_data } from "../../../data/kpi_data.js";
import { Kpicards } from "../../../components/KPICards/KPIcards";
import { SquareBtn } from "../../../components/Butons/Buton.jsx";
import { useAuth } from "../../../context/AuthContext";
import Modal from "../../../components/Modal/Modal";
import { TextInput } from "../../../components/inputs/Inputs.jsx";
import { useEffect, useState } from "react";
import { useAssign } from "../../../context/assignContext";



const KPI = () => {
  const { user } = useAuth();
  const { assign, GetAssign, CreateAssign  } = useAssign();

  useEffect(() => {
    GetAssign();
    
  },[]);  


  const [isOpen, setIsOpen] = useState(false);
  const [products, setProducts] = useState([]);

  console.log(products);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  

// funcion para guardas en la base de datos los valores del los inputs usando la funcion CreateAssign

const handleCreateNewData = async () => {
  const newAssignData = {
    LS3: products.LS3, // Reemplaza 0 con el valor deseado
    ZEISS: products.ZEISS, // Reemplaza 0 con el valor deseado
    SHAPE: products.SHAPE, // Reemplaza 0 con el valor deseado
    PHIS_ABUT: products.PHIS_ABUT, // Reemplaza 0 con el valor deseado
    DIGI_ABUT:  products.DIGI_ABUT, // Reemplaza 0 con el valor deseado
    FULL_ARCH: products.FULL_ARCH, // Reemplaza 0 con el valor deseado DATE: "12/14/2023",
    IBO_DESIGN: products.IBO_DESIGN // Reemplaza "12/14/2023" con la fecha deseada
  };

  await CreateAssign(newAssignData);
  GetAssign();
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
      <section className={kpi.Dashboard_Asigment}>
        <div className={kpi.container}>
        {Object.entries(assign).slice(0, 7).map((key, value) => (
            <h2 key={key}>
              {key[0]}

              <span>{key[1]}</span>
            </h2>
          ))}
        </div>
        {user.access === "admin" ? (
          <SquareBtn onClick={openModal}>Assign</SquareBtn>
        ) : (
          ""
        )}
      </section>
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
      <Modal isOpen={isOpen} onClose={closeModal} title="Assign">
        <section className={kpi.assigmentContainer}>
          <form action="" className={kpi.formAssigment}>
            <TextInput label="LS3" type="text" name="LS3" onChange={handleChange}/>
            <TextInput label="ZEISS" type="text" name="ZEISS" onChange={handleChange}/>
            <TextInput label="SHAPE" type="text" name="SHAPE" onChange={handleChange}/>
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
            <TextInput label="IBO_DESIGN" type="text" name="IBO_DESIGN"  onChange={handleChange}/>
            <TextInput label="FULL_ARCH" type="text" name="FULL_ARCH"  onChange={handleChange}/>
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
