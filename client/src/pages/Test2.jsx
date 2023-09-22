import {ProfileCharts} from "../components/charts/Profile_Charts";
import Tabs from '../components/tabs/Tabs';
import { RegistrationForm } from '../components/forms/RegistrationForm';
import { ScanFrom } from '../components/forms/ScanFrom';
import { DesignForm } from '../components/forms/DesignForm';
import { RedesignForm } from '../components/forms/RedesignForm';
import { useGraph } from "../context/graphContext";
import { useEffect } from "react";
import { useAuth } from "../context/authContext";

// =========((PROFILE))=============================================
export const Test2 = () => {
  const {GlobalDataApi, GlobalApi, User, UserApi} = useGraph();
  const { user } = useAuth(); 
  console.log(user.id);
  
  
  const productivityGraph = (data) => {
    const DATA = data.map((item) => {
      const { _id, LS3, ZEISS, SHAPE, COPY_MILL, FULL_ARCH,IBO_DESIGNED, CROWN_REST, CEMENTE_BRIDGE_REST, FULL_ARCH_P, FULL_ARCH_F, IMPLANT_REST, IMPLANT_BRIDGE_REST, PRINTED_MODELS } = item;
      return { _id, LS3, ZEISS, SHAPE, COPY_MILL, FULL_ARCH, IBO_DESIGNED, CROWN_REST, CEMENTE_BRIDGE_REST, FULL_ARCH_P, FULL_ARCH_F, IMPLANT_REST, IMPLANT_BRIDGE_REST, PRINTED_MODELS };
    });    
    return DATA;
  }
  
useEffect(() => { 
  GlobalApi();
  UserApi(user.id);
// eslint-disable-next-line react-hooks/exhaustive-deps
},[]) 

console.log(productivityGraph(GlobalDataApi));
      

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
          data={productivityGraph(User)}
          title="User Productivity"
          name="Safety"
          height={300}
          range={[0,20]}
          value1="LS3"
          value2="ZEISS"
          value3="SHAPE"
          value4="FULL_ARCH"
          value5="COPY_MILL"
          value6="IBO_DESIGNED"
          value7="CROWN_REST"
          value8="CEMENTE_BRIDGE_REST"
          value9="FULL_ARCH_P"
          value10="FULL_ARCH_F"
          value11="IMPLANT_REST"
          value12="IMPLANT_BRIDGE_REST"
          value13="PRINTED_MODELS"
                    
        />
     </section>
     <section className="profile_chart">        
        <ProfileCharts
          data={productivityGraph(GlobalDataApi)}
          title="Golbal Productivity"
          name="Safety"
          height={300}
          range={[0,20]}
          value1="LS3"
          value2="ZEISS"
          value3="SHAPE"
          value4="FULL_ARCH"
          value5="COPY_MILL"
          value6="IBO_DESIGNED"
          value7="CROWN_REST"
          value8="CEMENTE_BRIDGE_REST"
          value9="FULL_ARCH_P"
          value10="FULL_ARCH_F"
          value11="IMPLANT_REST"
          value12="IMPLANT_BRIDGE_REST"
          value13="PRINTED_MODELS"
                    
        />
        
    </section>
    
    </article>
  </div>);
};

