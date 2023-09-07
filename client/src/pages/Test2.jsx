import { useState } from 'react';
import {ProfileCharts} from "../components/charts/Profile_Charts";
import Radarchart from '../components/charts/Radar';
import {radar_data} from '../data/radar-data';
import Tabs from '../components/tabs/Tabs';
import { RegistrationForm } from '../components/forms/RegistrationForm';
import { ScanFrom } from '../components/forms/ScanFrom';
import { useRegistration } from '../context/registrationContext';
// =========((PROFILE))=============================================
export const Test2 = () => {  
  const { Registration } = useRegistration();
  
  



      

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
        
        </div> 
        {/*====================================(Scaned)======================================================*/}
        <div label="Redesign">
        
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

