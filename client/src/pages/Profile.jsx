import { useEffect, useState } from 'react';
import {profile_data } from "../data/Line_data";
import {ProfileCharts} from "../components/charts/Profile_Charts";
import { Input } from '../components/Input';
import Radarchart from '../components/charts/Radar';
import {radar_data} from '../data/radar-data';
import Tabs from '../components/tabs/Tabs';
import Table from '../components/Table';
import {  scaned_data, design_data, redesign_data } from '../data/table_data';
import { useRegistration } from '../context/registrationContext';

// =========((PROFILE))=============================================
export const Profile = () => {
  const {CreateRegistration, GetRegistration, Registration} = useRegistration();
 

  
  const columns = ['DATE','IBO', 'ABUT', 'FULL_ARCH_P', 'FULL_ARCH_F'];
  const columns2 = ['DATE','LS3', 'ZEISS', '3SHAPE',"COPY MILL", 'FULL ARCH'];
  const columns3 = ['DATE','IBO DESIGN', 'DIGITAL ABUTMENT',  'PHISICAL ABUTMENT', 'FULL ARCH PROVICIONAL', 'FULL ARCH FINAL'];

  const [IBO,setIBO] = useState(0);
  const [ABUT,setABUT] = useState(0);
  const [FULL_ARCH_P,setFULL_ARCH_P] = useState(0);
  const [FULL_ARCH_F,setFULL_ARCH_F] = useState(0);
  const [LS3, setLS3] = useState(0);
  const [ZEISS, setZEISS] = useState(0);
  const [SHAPE, setSHAPE] = useState(0);
  const [COPY_MILL, setCOPY_MILL] = useState(0);
  const [FULL_ARCH, setFULL_ARCH] = useState(0);


  useEffect(() => {
    
    GetRegistration();     
// eslint-disable-next-line  
  }, []);
  
 
  //======================================((REGISTRATION HANDLE FUNCTION))==============================================//
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
      FULL_ARCH_F: Number(FULL_ARCH_F)
    };
    setIBO(12);
    setABUT(0);
    setFULL_ARCH_P(0);
    setFULL_ARCH_F(0);
    CreateRegistration(formData);//CreateRegistration
    GetRegistration();
  };
//=

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
    //createScaned(formData);//CreateRegistration
  };


  //======================================((DESIGN HANDLE FUNCTION))==================================================//

  const DesignedHandleInputChange = (e) => { 
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
  const DesignedSubmit = (e) => {
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
      FULL_ARCH_F: Number(FULL_ARCH_F)
    };
    setIBO(0);
    setABUT(0);
    setFULL_ARCH_P(0);
    setFULL_ARCH_F(0);
    CreateRegistration(formData);//CreateRegistration
  };

  //========================================((REDESIGN HANDLE FUNCTION))==============================================//
  const RedesinghandleInputChange = (e) => { 
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
  const RedesignSubmit = (e) => {
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
      FULL_ARCH_F: Number(FULL_ARCH_F)
    };
    setIBO(0);
    setABUT(0);
    setFULL_ARCH_P(0);
    setFULL_ARCH_F(0);
    CreateRegistration(formData);//CreateRegistration
  };

      

  return(
  <div className="profile">   
    <article className="profile_input"> 
    <Tabs>
      {/*==================================(Registration)========================================================*/}
        <div label="Registration">
        <section className="data_input">
        <h2>Registration</h2>
        <div className="data">
        <Input type="text" placeholder="0" id="IBO" value={IBO} label="IBO Received" onChange={RegistrationHandleInputChange}/>
        <Input type="text" placeholder="0" id="ABUT" value={ABUT} label="Phisical Abutment" onChange={RegistrationHandleInputChange}/>
        <Input type="text" placeholder="0" id="FULL_ARCH_P" value={FULL_ARCH_P} label="Full Arch Provicional"onChange={RegistrationHandleInputChange}/>
        <Input type="text" placeholder="0" id="FULL_ARCH_F" value={FULL_ARCH_F} label="Full Arch Final"onChange={RegistrationHandleInputChange}/>
        </div>
        <div className='btn-container'>
          <button className='btn' onClick={registrationSubmit}>Submit</button>
          </div>
      </section>
        <div className='table-container'>
          <Table columns={columns} data={Registration} />
        </div>
        </div>
      {/*====================================(Scaned)======================================================*/}
        <div label="Scaned">
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
        <Table columns={columns2} data={scaned_data} />
        </div>
        </div>
        {/*=======================================(Design)===================================================*/}
        <div label="Design">
        <section className="data_input">
        <h2>Design</h2>
        <div className="data">
        <Input type="text" placeholder="0" id="username" value="0" label="IBO Designed"onChange={DesignedHandleInputChange}/>
        <Input type="text" placeholder="0" id="username" value="0" label="Implant Restorations "onChange={DesignedHandleInputChange}/>
        <Input type="text" placeholder="0" id="username" value="0" label="Crown Restorations"onChange={DesignedHandleInputChange}/>
        <Input type="text" placeholder="0" id="username" value="0" label="Implant Bridge Restorations"onChange={DesignedHandleInputChange}/>
        <Input type="text" placeholder="0" id="username" value="0" label="Cemented Bridge Restorations"onChange={DesignedHandleInputChange}/>
        <Input type="text" placeholder="0" id="username" value="0" label="Printed Models"onChange={DesignedHandleInputChange}/>
        <Input type="text" placeholder="0" id="username" value="0" label="Full Arch Provicional"onChange={DesignedHandleInputChange}/>
        <Input type="text" placeholder="0" id="username" value="0" label="Full Arch Final"onChange={DesignedHandleInputChange}/>
        </div>
        <div className='btn-container'>
          <button className='btn' onClick={DesignedSubmit}>Submit</button>
          </div>
        </section>
      <div className='table-container'>
        <Table columns={columns3} data={design_data} />
        </div>
        </div>
        {/*============================================(Redesign)=====================================*/}
        <div label="Redesign">
          <section className="data_input">
          <h2>Redesign</h2>
          <div className="data">
          <Input type="text" placeholder="0" id="username" value="0" label="IBO Designed"onChange={RedesinghandleInputChange}/>
          <Input type="text" placeholder="0" id="username" value="0" label="Implant Restorations "onChange={RedesinghandleInputChange}/>
          <Input type="text" placeholder="0" id="username" value="0" label="Crown Restorations"onChange={RedesinghandleInputChange}/>
          <Input type="text" placeholder="0" id="username" value="0" label="Implant Bridge Restorations"onChange={RedesinghandleInputChange}/>
          <Input type="text" placeholder="0" id="username" value="0" label="Cemented Bridge Restorations"onChange={RedesinghandleInputChange}/>
          <Input type="text" placeholder="0" id="username" value="0" label="Full Arch Provicional"onChange={RedesinghandleInputChange}/>
          <Input type="text" placeholder="0" id="username" value="0" label="Full Arch Final"onChange={RedesinghandleInputChange}/>
          </div>
          <div className='btn-container'>
          <button className='btn' onClick={RedesignSubmit}>Submit</button>
          </div>
         
          </section>
          <div className='table-container'>
          <Table columns={columns3} data={redesign_data} />          
          </div>          
        </div>  
        {/*==========================================================================================*/}      
      </Tabs> 
    </article>
    <article className="profile_chart_container">
    <section className="profile_chart">    
    <ProfileCharts
          data={profile_data}
          title="Productivity"
          name="Safety"
          height={300}
          range={[0,20]}
          value1="IBO SCANED"
          value2="IBO DESIGNED"
          value3="ABUT SCANED"
          value4="ABUT DESIGNED"
          value5="FULL ARCH"          
        />
     </section>
     <section className="profile_Radar">
        <Radarchart data={radar_data} />
        <Radarchart data={radar_data} />
        
    </section>
    
    </article>
  </div>);
};

