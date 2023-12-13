import kpi from "./kpi.module.css";
import { kpi_data } from "../../../data/kpi_data.js";
import { Kpicards } from "../../../components/KPICards/KPIcards";
import { SquareBtn } from "../../../components/Butons/Buton.jsx";
import { useAuth } from "../../../context/AuthContext";
import Modal from "../../../components/Modal/Modal";
import { TextInput } from "../../../components/inputs/Inputs.jsx";
import { useState } from "react";
const KPI = () => {
  const { user } = useAuth();


  const [isOpen, setIsOpen] = useState(false);
  const [products, setProducts] = useState([   
  
    {
      id: 1,
      name: "LS3",
      cuantity: 10,
    },
    {
      id: 2,
      name: "ZEISS",
      cuantity: 20,
    },
    {
      id: 3,
      name: "3SHAPE",
      cuantity: 30,
    },
    {
      id: 4,
      name: "Phisical Abutment",
      cuantity: 40,
    },
    {
      id: 5,
      name: "Digital Abutment",
      cuantity: 50,
    },
    {
      id: 6,
      name: "Full Arch",
      cuantity: 60,
    },
    {
      id: 7,
      name: "IBO Design",
      cuantity: 70,
    }
  ]);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

 

// funcion para actualizar los valores de la cantidad  de products usando los inputs del modal
  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedProducts = products.map((product) => {
      if (product.name === name) {
        return { ...product, cuantity: parseInt(value) };
      }
      return product;
    });
    setProducts(updatedProducts);
  } 

  const handleSubmit = (e) => {
    e.preventDefault();
    closeModal();
  };

  return (
    <>
      <section className={kpi.Dashboard_Asigment}>
        <div className={kpi.container}>
          {products.map((product) => (
            <h2>
              {product.name}
              <span>{product.cuantity}</span>
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
            <TextInput label="3SHAPE" type="text" name="3SHAPE" onChange={handleChange}/>
            <TextInput
              label="Phisical Abutment"
              type="text"
              name="Phisical Abutment"
              onChange={handleChange}
            />
            <TextInput
              label="Digital Abutment"
              type="text"
              name="Digital Abutment"
              onChange={handleChange}
            />
            <TextInput label="Full Arch" type="text" name="Full Arch"  onChange={handleChange}/>
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
