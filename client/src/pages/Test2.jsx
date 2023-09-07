import { useState } from 'react';
import {profile_data } from "../data/Line_data";
import {ProfileCharts} from "../components/charts/Profile_Charts";
import { Input } from '../components/Input';
import Radarchart from '../components/charts/Radar';
import {radar_data} from '../data/radar-data';
import Tabs from '../components/tabs/Tabs';
import Table from '../components/Table';
import { scaned_data,  } from '../data/table_data';
import { RegistrationForm } from '../components/forms/RegistrationForm';
import { useRegistration } from '../context/registrationContext';
// =========((PROFILE))=============================================
export const Test2 = () => {  
  const { Registration } = useRegistration();
  
  
  const columns2 = ['DATE','LS3', 'ZEISS', '3SHAPE',"COPY MILL", 'FULL ARCH'];
  

 
  const [LS3, setLS3] = useState(0);
  const [ZEISS, setZEISS] = useState(0);
  const [SHAPE, setSHAPE] = useState(0);
  const [COPY_MILL, setCOPY_MILL] = useState(0);
  const [FULL_ARCH, setFULL_ARCH] = useState(0);



 
  
 
  //======================================((REGISTRATION HANDLE FUNCTION))==============================================//
 


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



  //========================================((REDESIGN HANDLE FUNCTION))==============================================//
 

      

  return(
  <div className="profile">   
    <article className="profile_input"> 
    <Tabs>
      {/*==================================(Registration)========================================================*/}
      <div label="Registration">
        <RegistrationForm />
      </div>
      {/*====================================(Scaned)======================================================*/}
        <div label="Scaned">
        <section className="data_input">
      <h2>Scaned</h2>
        <div className="data">
        <Input type="text" placeholder="0" id="LS3" value="0" label="LS3"onChange={ScanedHandleInputChange}/>
        <Input type="text" placeholder="0" id="ZEISS" value="0" label="Zeiss"onChange={ScanedHandleInputChange}/>
        <Input type="text" placeholder="0" id="SHAPE" value="0" label="3Shape"onChange={ScanedHandleInputChange}/>
        <Input type="text" placeholder="0" id="COPY_MILL" value="0" label="Copy Mill"onChange={ScanedHandleInputChange}/>
        <Input type="text" placeholder="0" id="FULL_ARCH" value="0" label="Full Arch"onChange={ScanedHandleInputChange}/>
        </div>
        <div className='btn-container'>
          <button className='btn' onClick={ScanedSubmit}>Submit</button>
          </div>
      </section>
      <div className='table-container'>
        <Table columns={columns2} data={scaned_data} />
        </div>
        </div>
       
            
      </Tabs> 
    </article>
    <article className="profile_chart_container">
    <section className="profile_chart">    
    <ProfileCharts
          data={Registration}
          title="Productivity"
          name="Safety"
          height={300}
          range={[0,20]}
          value1="IBO"
          value2="ABUT"
          value3="FULL_ARCH_F"
          value4="FULL_ARCH_P"
                    
        />
     </section>
     <section className="profile_Radar">
        <Radarchart data={radar_data} />
        <Radarchart data={radar_data} />
        
    </section>
    
    </article>
  </div>);
};

