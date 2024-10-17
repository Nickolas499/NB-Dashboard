import React, { useEffect, useState } from "react";
import kpi from "./kpi.module.css";
import { kpi_data } from "../../../data/kpi_data.ts";
import { Kpicards } from "../../../components/KPICards/KPIcards.tsx";
import { SquareBtn } from "../../../components/Butons/Buton";
import { useAuth } from "../../../context/AuthContext";
import Modal from "../../../components/Modal/Modal.tsx";
import { TextInput } from "../../../components/Inputs/Input.tsx";
import { useAssign } from "../../../context/assignContext";
// import Assing from "../../../components/assignTest/assing.jsx";
// import AssignJobs from "../../../components/assignTest/assignJob2.jsx";

interface Products {
  LS3?: number;
  ZEISS?: number;
  SHAPE?: number;
  PHIS_ABUT?: number;
  DIGI_ABUT?: number;
  FULL_ARCH?: number;
  IBO_DESIGN?: number;
}

const KPI: React.FC = () => {
  const { user } = useAuth();
  const { assign, GetAssign, CreateAssign } = useAssign();
  const { usuarios, GetUsers } = useAuth();

  useEffect(() => {
    GetAssign();
    GetUsers();
  }, []);  

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isOpen2, setIsOpen2] = useState<boolean>(false);
  const [products, setProducts] = useState<Products>({}); 

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  const openModal2 = () => setIsOpen2(true);
  const closeModal2 = () => setIsOpen2(false);

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

    await CreateAssign(newAssignData);
    GetAssign();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProducts((prevProducts) => ({
      ...prevProducts,
      [name]: parseInt(value), // Asegúrate de convertir el valor a entero si es necesario
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(products);
    handleCreateNewData();
    closeModal();
  };

  return (
    <>
      {/* =====================================(ASSIGMENT CARDS)=============================================== */}
      {/* <section className={kpi.Dashboard_Asigment}>
        <div className={kpi.container}>
          {Object.entries(assign).slice(0, 7).map(([key, value]) => (
            <h2 key={key}>
              {key}
              <span>{value}</span>
            </h2>
          ))}
        </div>
        {user.access === "admin" && (
          <>
            <SquareBtn onClick={openModal}>Assign</SquareBtn>
            <SquareBtn onClick={openModal2}>Job</SquareBtn>
          </>
        )}
      </section> */}
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
          <form onSubmit={handleSubmit} className={kpi.formAssigment}>
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
            <button type="submit" className={kpi.btnSubmit}>
              Submit
            </button>
          </form>
        </section>
      </Modal>
      {/* =========================================(JOB MODAL)============================================== */}
      {/* Aquí puedes agregar el contenido del modal de "Job" */}
    </>
  );
};

export default KPI;
