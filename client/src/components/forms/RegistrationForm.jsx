import { useEffect, useState } from "react";
import { Input } from "../Input";
import { useRegistration } from "../../context/registrationContext";
import Table2 from "../Tablet2";
export const RegistrationForm = () => {
  const { CreateRegistration, GetRegistration, Registration } = useRegistration();
  

  const columns = ["DATE", "IBO", "ABUT", "FULL_ARCH_P", "FULL_ARCH_F"];

  const [IBO, setIBO] = useState(0);
  const [ABUT, setABUT] = useState(0);
  const [FULL_ARCH_P, setFULL_ARCH_P] = useState(0);
  const [FULL_ARCH_F, setFULL_ARCH_F] = useState(0);

  const [UPDATE, setUPDATE] = useState(0);
  useEffect(() => {
    GetRegistration();
  }, [UPDATE]);

  const actualizar = () => {
    setTimeout(() => {
      setUPDATE(UPDATE + 1);
    }, 50); // Espera un segundo (1000 ms) antes de ejecutar la función
  };
  const RegistrationHandleInputChange = (e) => {
    const { id, value } = e.target;

    switch (id) {
      case "IBO":
        setIBO(value);
        break;
      case "ABUT":
        setABUT(value);
        break;
      case "FULL_ARCH_P":
        setFULL_ARCH_P(value);
        break;
      case "FULL_ARCH_F":
        setFULL_ARCH_F(value);
        break;
      default:
        break;
    }
  };
  const registrationSubmit = (e) => {
    e.preventDefault();
    const IBO = document.getElementById("IBO").value;
    const ABUT = document.getElementById("ABUT").value;
    const FULL_ARCH_P = document.getElementById("FULL_ARCH_P").value;
    const FULL_ARCH_F = document.getElementById("FULL_ARCH_F").value;
    if (IBO === "" || ABUT === "" || FULL_ARCH_P === "" || FULL_ARCH_F === "") {
      return alert("Please fill all the fields");
    }
    const formData = {
      IBO: Number(IBO),
      ABUT: Number(ABUT),
      FULL_ARCH_P: Number(FULL_ARCH_P),
      FULL_ARCH_F: Number(FULL_ARCH_F),
    };
    setIBO(0);
    setABUT(0);
    setFULL_ARCH_P(0);
    setFULL_ARCH_F(0);
    CreateRegistration(formData); //CreateRegistration
    actualizar();
  };

  return (
    <div>
      <section className="data_input">
        <h2>Registration</h2>
        <div className="data">
          <Input
            type="text"
            placeholder="0"
            id="IBO"
            value={IBO}
            label="IBO Received"
            onChange={RegistrationHandleInputChange}
          />
          <Input
            type="text"
            placeholder="0"
            id="ABUT"
            value={ABUT}
            label="Phisical Abutment"
            onChange={RegistrationHandleInputChange}
          />
          <Input
            type="text"
            placeholder="0"
            id="FULL_ARCH_P"
            value={FULL_ARCH_P}
            label="Full Arch Provicional"
            onChange={RegistrationHandleInputChange}
          />
          <Input
            type="text"
            placeholder="0"
            id="FULL_ARCH_F"
            value={FULL_ARCH_F}
            label="Full Arch Final"
            onChange={RegistrationHandleInputChange}
          />
        </div>
        <div className="btn-container">
          <button className="btn" onClick={registrationSubmit}>
            Submit
          </button>
        </div>
      </section>
      <div className="table-container">
        <Table2 columns={columns} data={Registration} />
      </div>
    </div>
  );
};
