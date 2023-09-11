import { useEffect, useState } from "react";
import { Input } from "../Input";
import { useScaned } from "../../context/scanedContext";
import Table3 from "../Table3";

export const ScanFrom = () => {
  const { CreateScaned, GetScaned, Scaned,UpdateScaned,DeleteScaned } = useScaned();

  const columns = ["DATE", "LS3", "ZEISS", "SHAPE", "COPY_MILL", "FULL_ARCH"];
  const columns2 = [{"DATE":"DATE"}, {"LS3":"LS3"}, {"ZEISS":"ZEISS"}, {"SHAPE":"3SHAPE"}, {"COPY_MILL":" COPY MILL"}, {"FULL_ARCH":" FULL ARCH"}];

  const [LS3, setLS3] = useState(0);
  const [ZEISS, setZEISS] = useState(0);
  const [SHAPE, setSHAPE] = useState(0);
  const [COPY_MILL, setCOPY_MILL] = useState(0);
  const [FULL_ARCH, setFULL_ARCH] = useState(0);
  const [UPDATE, setUPDATE] = useState(0);
  
  useEffect(() => {
    GetScaned();
  }, [UPDATE]);


  const actualizar = () => {
    setTimeout(() => {
      setUPDATE(UPDATE + 1);
    }, 50); // Espera un segundo (50 ms) antes de ejecutar la función
  };
  //======================================((SCANED HANDLE FUNCTION))==============================================//

  const ScanedHandleInputChange = (e) => { 
    const { id, value } = e.target;

    switch (id) {
      case "LS3":
        setLS3(value);
        break;
      case "ZEISS":
        setZEISS(value);
        break;
      case "SHAPE":
        setSHAPE(value);
        break;
      case "COPY_MILL":
        setCOPY_MILL(value);
        break;
      case "FULL_ARCH":
        setFULL_ARCH(value);
        break;
      default:
        break;
    }
  };
  const ScanedSubmit = (e) => {
    e.preventDefault();
    const LS3 = document.getElementById("LS3").value;
    const ZEISS = document.getElementById("ZEISS").value;
    const SHAPE = document.getElementById("SHAPE").value;
    const COPY_MILL = document.getElementById("COPY_MILL").value;
    const FULL_ARCH = document.getElementById("FULL_ARCH").value;
    if (LS3 === "" || ZEISS === "" || SHAPE === "" || COPY_MILL === "" || FULL_ARCH === "") {
      return alert("Please fill all the fields");
    }   
    const formData = {
      LS3: Number(LS3),
      ZEISS: Number(ZEISS),
      SHAPE: Number(SHAPE),
      COPY_MILL: Number(COPY_MILL),
      FULL_ARCH: Number(FULL_ARCH)
    };
    setLS3(0);
    setZEISS(0);
    setSHAPE(0);
    setCOPY_MILL(0);
    setFULL_ARCH(0);
    console.log(formData);
    CreateScaned(formData); //CreateScaned
    actualizar();
  };

  return (
  <div>
    <section className="data_input">
      <h2>Scaned</h2>
        <div className="data">
        <Input type="text" placeholder="0" id="LS3" value={LS3} label="LS3"onChange={ScanedHandleInputChange}/>
        <Input type="text" placeholder="0" id="ZEISS" value={ZEISS} label="Zeiss"onChange={ScanedHandleInputChange}/>
        <Input type="text" placeholder="0" id="SHAPE" value={SHAPE} label="3Shape"onChange={ScanedHandleInputChange}/>
        <Input type="text" placeholder="0" id="COPY_MILL" value={COPY_MILL} label="Copy Mill"onChange={ScanedHandleInputChange}/>
        <Input type="text" placeholder="0" id="FULL_ARCH" value={FULL_ARCH} label="Full Arch"onChange={ScanedHandleInputChange}/>
        </div>
        <div className='btn-container'>
          <button className='btn' onClick={ScanedSubmit}>Submit</button>
          </div>
      </section>
      <div className='table-container'>
        <Table3 columns={columns} th = {columns2} data={Scaned} Get={GetScaned} update={UpdateScaned} delete={DeleteScaned}/>
        </div>
  </div>
    );
};
