import {ProfileCharts} from "../components/charts/Profile_Charts";
import Tabs from '../components/tabs/Tabs';
import { RegistrationForm } from '../components/forms/RegistrationForm';
import { ScanFrom } from '../components/forms/ScanFrom';
import { DesignForm } from '../components/forms/DesignForm';
import { RedesignForm } from '../components/forms/RedesignForm';
import { useGraph } from "../context/graphContext";
import { useEffect } from "react";
// import { useAuth } from "../context/authContext";

// =========((PROFILE))=============================================
export const Test2 = () => {
  const {GetGlobalData, GlobalData, GetUserData, UserData, GlobalDataApi, GlobalApi} = useGraph();
  // const { user } = useAuth(); 
  // console.log(user.id);
  const IBO_scaned = (data) => {
    const DATA = data.map((item) => {
      const { _id, LS3, ZEISS, SHAPE, COPY_MILL, FULL_ARCH } = item;
      return { _id, LS3, ZEISS, SHAPE, COPY_MILL, FULL_ARCH };
    });    
    return DATA;
  }
  
useEffect(() => {  
  GetGlobalData()
  GetUserData();
  GlobalApi();
// eslint-disable-next-line react-hooks/exhaustive-deps
},[]) 


      

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
          data={IBO_scaned(UserData)}
          title="User Productivity"
          name="Safety"
          height={300}
          range={[0,20]}
          value1="LS3"
          value2="ZEISS"
          value3="SHAPE"
          value4="FULL_ARCH"
          value5="COPY_MILL"
                    
        />
     </section>
     <section className="profile_chart">        
        <ProfileCharts
          data={IBO_scaned(GlobalDataApi)}
          title="Golbal Productivity"
          name="Safety"
          height={300}
          range={[0,20]}
          value1="LS3"
          value2="ZEISS"
          value3="SHAPE"
          value4="FULL_ARCH"
          value5="COPY_MILL"
                    
        />
        
    </section>
    
    </article>
  </div>);
};

