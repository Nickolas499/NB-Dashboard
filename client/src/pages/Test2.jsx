import {ProfileCharts} from "../components/charts/Profile_Charts";
import Radarchart from '../components/charts/Radar';
import {radar_data} from '../data/radar-data';
import Tabs from '../components/tabs/Tabs';
import { RegistrationForm } from '../components/forms/RegistrationForm';
import { ScanFrom } from '../components/forms/ScanFrom';
import { DesignForm } from '../components/forms/DesignForm';
import { RedesignForm } from '../components/forms/RedesignForm';
import { useRegistration } from '../context/registrationContext';
import { useScaned } from "../context/scanedContext";
import { useEffect } from "react";
// =========((PROFILE))=============================================
export const Test2 = () => {  
  const { Registration } = useRegistration();
  const {AllscanedData,GetScaned, Scaned, Graph} = useScaned();

  const IBO_scaned =(data) => {
    // console.log(data);
    const DATA=[]
    
    data.map((item, index) => {
      const DATE = item.DATE
      const IBO_S = item.IBO_S
      const IBO_D = item.IBO_D
      const IBO_R = item.IBO_R
      DATA.push({DATE, IBO_S, IBO_D, IBO_R})
    })
     console.log(DATA);
    return DATA
    
  } 
  
useEffect(() => {
  GetScaned();
},[]) 
IBO_scaned(Graph)


      

  return(
  <div className="profile">   
    <article className="profile_input"> 
    <Tabs>
      {/*==================================(Registration)========================================================*/}
      <div label="Registration">
        <RegistrationForm />
      </div>
      {/*====================================(Scaned)======================================================*/}
        <div label="Scan">
          <ScanFrom />
        </div>
        {/*====================================(Scaned)======================================================*/}
        <div label="Design">
        {<DesignForm />}
        </div> 
        {/*====================================(Scaned)======================================================*/}
        <div label="Redesign">
        <RedesignForm />
        </div>            
      </Tabs> 
    </article>
    <article className="profile_chart_container">
    <section className="profile_chart">    
    <ProfileCharts
          data={IBO_scaned(Graph)}
          title="User Productivity"
          name="Safety"
          height={300}
          range={[0,20]}
          value1="IBO_S"
          value2="IBO_D"
          value3="IBO_R"
          value4="F_A_P"
                    
        />
     </section>
     <section className="profile_chart">
        {/* <Radarchart data={radar_data} />
        <Radarchart data={radar_data} /> */}
        <ProfileCharts
          data={IBO_scaned(Graph)}
          title="Golbal Productivity"
          name="Safety"
          height={300}
          range={[0,20]}
          value1="IBO_S"
          value2="IBO_D"
          value3="IBO_R"
          value4="F_A_P"
                    
        />
        
    </section>
    
    </article>
  </div>);
};

