import { useEffect, useState } from "react";
import { Input } from "../Input";
import { useDesigned } from "../../context/designedContext";
import Table3 from "../Table3";

export const DesignForm = () => {
  const {
    CreateDesigned,
    GetDesigned,
    Designed,
    UpdateDesigned,
    DeleteDesigned,
  } = useDesigned();

  const columns = [
    "DATE",
    "IBO_DESIGNED",
    "CROWN_REST",
    "CEMENTE_BRIDGE_REST",
    "FULL_ARCH_P",
    "FULL_ARCH_F",
    "IMPLANT_REST",
    "IMPLANT_BRIDGE_REST",
    "PRINTED_MODELS"
  ];
  const columns2 = [
    {"DATE":"DATE"},
    {"IBO_DESIGNED":"IBO"},
    {"CROWN_REST":"CROWN"},
    {"CEMENTE_BRIDGE_REST":"CBR"},
    {"FULL_ARCH_P":"FAP"},
    {"FULL_ARCH_F":"FAF"},
    {"IMPLANT_REST":"IR"},
    {"IMPLANT_BRIDGE_REST":"IBR"},
    {"PRINTED_MODELS":"PRINTED"}
  ];



 

  


  const [IBO_DESIGNED, setIBO_DESIGNED] = useState(0);
  const [CROWN_REST, setCROWN_REST] = useState(0);
  const [CEMENTE_BRIDGE_REST, setCEMENTE_BRIDGE_REST] = useState(0);
  const [FULL_ARCH_P, setFULL_ARCH_P] = useState(0);
  const [FULL_ARCH_F, setFULL_ARCH_F] = useState(0);
  const [IMPLANT_REST, setIMPLANT_REST] = useState(0);
  const [IMPLANT_BRIDGE_REST, setIMPLANT_BRIDGE_REST] = useState(0);
  const [PRINTED_MODELS, setPRINTED_MODELS] = useState(0);
  const [UPDATE, setUPDATE] = useState(0);


  useEffect(() => {
    GetDesigned();    
  }, [UPDATE]);


  const actualizar = () => {
    setTimeout(() => {
      setUPDATE(UPDATE + 1);
    }, 50); // Espera un segundo (50 ms) antes de ejecutar la función
  }

//======================================((DESIGNED HANDLE FUNCTION))==============================================//

const DesignedHandleInputChange = (e) => {
  const { id, value } = e.target;

  switch (id) {
    case "IBO_DESIGNED":
      setIBO_DESIGNED(value);
      break;
    case "CROWN_REST":
      setCROWN_REST(value);
      break;
    case "CEMENTE_BRIDGE_REST":
      setCEMENTE_BRIDGE_REST(value);
      break;
    case "FULL_ARCH_P":
      setFULL_ARCH_P(value);
      break;
    case "FULL_ARCH_F":
      setFULL_ARCH_F(value);
      break;
    case "IMPLANT_REST":
      setIMPLANT_REST(value);
      break;
    case "IMPLANT_BRIDGE_REST":
      setIMPLANT_BRIDGE_REST(value);
      break;
    case "PRINTED_MODELS":
      setPRINTED_MODELS(value);
      break;
    default:
      break;      
  }
};

const DesignedSubmit = (e) => {
  e.preventDefault();
  const IBO_DESIGNED = document.getElementById("IBO_DESIGNED").value;
  const CROWN_REST = document.getElementById("CROWN_REST").value;
  const CEMENTE_BRIDGE_REST = document.getElementById("CEMENTE_BRIDGE_REST").value;
  const FULL_ARCH_P = document.getElementById("FULL_ARCH_P").value;
  const FULL_ARCH_F = document.getElementById("FULL_ARCH_F").value;
  const IMPLANT_REST = document.getElementById("IMPLANT_REST").value;
  const IMPLANT_BRIDGE_REST = document.getElementById("IMPLANT_BRIDGE_REST").value;
  const PRINTED_MODELS = document.getElementById("PRINTED_MODELS").value;
  if (
    IBO_DESIGNED === "" ||
    CROWN_REST === "" ||
    CEMENTE_BRIDGE_REST === "" ||
    FULL_ARCH_P === "" ||
    FULL_ARCH_F === "" ||
    IMPLANT_REST === "" ||
    IMPLANT_BRIDGE_REST === "" ||
    PRINTED_MODELS === ""
  ) {
    return alert("Please fill all the fields");
}
  const formData = {
    IBO_DESIGNED: Number(IBO_DESIGNED),
    CROWN_REST: Number(CROWN_REST),
    CEMENTE_BRIDGE_REST: Number(CEMENTE_BRIDGE_REST),
    FULL_ARCH_P: Number(FULL_ARCH_P),
    FULL_ARCH_F: Number(FULL_ARCH_F),
    IMPLANT_REST: Number(IMPLANT_REST),
    IMPLANT_BRIDGE_REST: Number(IMPLANT_BRIDGE_REST),
    PRINTED_MODELS: Number(PRINTED_MODELS),
  };
  setIBO_DESIGNED(0);
  setCROWN_REST(0);
  setCEMENTE_BRIDGE_REST(0);
  setFULL_ARCH_P(0);
  setFULL_ARCH_F(0);
  setIMPLANT_REST(0);
  setIMPLANT_BRIDGE_REST(0);
  setPRINTED_MODELS(0);
  CreateDesigned(formData);
  actualizar();
};


  return(
    <div>
        <section className="data_input">
            <h2>Designed</h2>
            <div className="data">
                <Input type="text" placeholder="0" id="IBO_DESIGNED" value={IBO_DESIGNED} label="IBO DESIGNED"onChange={DesignedHandleInputChange}/>
                <Input type="text" placeholder="0" id="CROWN_REST" value={CROWN_REST} label="CROWN REST"onChange={DesignedHandleInputChange}/>
                <Input type="text" placeholder="0" id="CEMENTE_BRIDGE_REST" value={CEMENTE_BRIDGE_REST} label="CEMENTE BRIDGE REST"onChange={DesignedHandleInputChange}/>
                <Input type="text" placeholder="0" id="FULL_ARCH_P" value={FULL_ARCH_P} label="FULL ARCH P"onChange={DesignedHandleInputChange}/>
                <Input type="text" placeholder="0" id="FULL_ARCH_F" value={FULL_ARCH_F} label="FULL ARCH F"onChange={DesignedHandleInputChange}/>
                <Input type="text" placeholder="0" id="IMPLANT_REST" value={IMPLANT_REST} label="IMPLANT REST"onChange={DesignedHandleInputChange}/>
                <Input type="text" placeholder="0" id="IMPLANT_BRIDGE_REST" value={IMPLANT_BRIDGE_REST} label="IMPLANT BRIDGE REST"onChange={DesignedHandleInputChange}/>
                <Input type="text" placeholder="0" id="PRINTED_MODELS" value={PRINTED_MODELS} label="PRINTED MODELS"onChange={DesignedHandleInputChange}/>

                </div>
                <div className='btn-container'>
                    <button className="btn" onClick={DesignedSubmit}>Submit</button>
                </div>
        </section>
        <div className="table-container"><Table3 columns={columns} th={columns2} data={Designed} Get={GetDesigned} update={UpdateDesigned} delete={DeleteDesigned}/></div>
    </div>
  );
};
