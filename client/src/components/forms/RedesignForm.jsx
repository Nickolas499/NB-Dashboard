import { useEffect, useState } from "react";
import { Input } from "../Input";
import { useRedesigned } from "../../context/redesignedContext";
import Table3 from "../Table3";

export const RedesignForm = () => {
  const {
    CreateRedesigned,
    GetRedesigned,
    Redesigned,
    UpdateRedesigned,
    DeleteRedesigned,
  } = useRedesigned();

  const columns = [
    "DATE",
    "IBO_DESIGNED",
    "CROWN_REST",
    "CEMENTE_BRIDGE_REST",
    "FULL_ARCH_P",
    "FULL_ARCH_F",
    "IMPLANT_REST",
    "IMPLANT_BRIDGE_REST"
  ];
  const columns2 = [
    {"DATE":"DATE"},
    {"IBO_DESIGNED":"IBO"},
    {"CROWN_REST":"CROWN"},
    {"CEMENTE_BRIDGE_REST":"CBR"},
    {"FULL_ARCH_P":"FAP"},
    {"FULL_ARCH_F":"FAF"},
    {"IMPLANT_REST":"IR"},
    {"IMPLANT_BRIDGE_REST":"IBR"}
  ];



 

  


  const [IBO_DESIGNED, setIBO_DESIGNED] = useState(0);
  const [CROWN_REST, setCROWN_REST] = useState(0);
  const [CEMENTE_BRIDGE_REST, setCEMENTE_BRIDGE_REST] = useState(0);
  const [FULL_ARCH_P, setFULL_ARCH_P] = useState(0);
  const [FULL_ARCH_F, setFULL_ARCH_F] = useState(0);
  const [IMPLANT_REST, setIMPLANT_REST] = useState(0);
  const [IMPLANT_BRIDGE_REST, setIMPLANT_BRIDGE_REST] = useState(0);
  const [UPDATE, setUPDATE] = useState(0);


  useEffect(() => {
    GetRedesigned(); 
    // eslint-disable-next-line   
  }, [UPDATE]);


  const actualizar = () => {
    setTimeout(() => {
      setUPDATE(UPDATE + 1);
    }, 50); // Espera un segundo (50 ms) antes de ejecutar la función
  }

//======================================((DESIGNED HANDLE FUNCTION))==============================================//

const RedesignedHandleInputChange = (e) => {
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
    default:
      break;      
  }
};

const RedesignedSubmit = (e) => {
  e.preventDefault();
  const IBO_DESIGNED = document.getElementById("IBO_DESIGNED").value;
  const CROWN_REST = document.getElementById("CROWN_REST").value;
  const CEMENTE_BRIDGE_REST = document.getElementById("CEMENTE_BRIDGE_REST").value;
  const FULL_ARCH_P = document.getElementById("FULL_ARCH_P").value;
  const FULL_ARCH_F = document.getElementById("FULL_ARCH_F").value;
  const IMPLANT_REST = document.getElementById("IMPLANT_REST").value;
  const IMPLANT_BRIDGE_REST = document.getElementById("IMPLANT_BRIDGE_REST").value;
  if (
    IBO_DESIGNED === "" ||
    CROWN_REST === "" ||
    CEMENTE_BRIDGE_REST === "" ||
    FULL_ARCH_P === "" ||
    FULL_ARCH_F === "" ||
    IMPLANT_REST === "" ||
    IMPLANT_BRIDGE_REST === ""
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
  };
  setIBO_DESIGNED(0);
  setCROWN_REST(0);
  setCEMENTE_BRIDGE_REST(0);
  setFULL_ARCH_P(0);
  setFULL_ARCH_F(0);
  setIMPLANT_REST(0);
  setIMPLANT_BRIDGE_REST(0);
  CreateRedesigned(formData);
  actualizar();
};


  return(
    <div>
        <section className="data_input">
            <h2>Designed</h2>
            <div className="data">
                <Input type="text" placeholder="0" id="IBO_DESIGNED" value={IBO_DESIGNED} label="IBO DESIGNED"onChange={RedesignedHandleInputChange}/>
                <Input type="text" placeholder="0" id="CROWN_REST" value={CROWN_REST} label="CROWN REST"onChange={RedesignedHandleInputChange}/>
                <Input type="text" placeholder="0" id="CEMENTE_BRIDGE_REST" value={CEMENTE_BRIDGE_REST} label="CEMENTE BRIDGE REST"onChange={RedesignedHandleInputChange}/>
                <Input type="text" placeholder="0" id="FULL_ARCH_P" value={FULL_ARCH_P} label="FULL ARCH P"onChange={RedesignedHandleInputChange}/>
                <Input type="text" placeholder="0" id="FULL_ARCH_F" value={FULL_ARCH_F} label="FULL ARCH F"onChange={RedesignedHandleInputChange}/>
                <Input type="text" placeholder="0" id="IMPLANT_REST" value={IMPLANT_REST} label="IMPLANT REST"onChange={RedesignedHandleInputChange}/>
                <Input type="text" placeholder="0" id="IMPLANT_BRIDGE_REST" value={IMPLANT_BRIDGE_REST} label="IMPLANT BRIDGE REST"onChange={RedesignedHandleInputChange}/>

                </div>
                <div className='btn-container'>
                    <button className="btn" onClick={RedesignedSubmit}>Submit</button>
                </div>
        </section>
        <div className="table-container"><Table3 columns={columns} th={columns2} data={Redesigned} Get={GetRedesigned} update={UpdateRedesigned} delete={DeleteRedesigned}/></div>
    </div>
  );
};
