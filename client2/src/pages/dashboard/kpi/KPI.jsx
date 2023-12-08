import kpi from "./kpi.module.css";
import { kpi_data } from "../../../data/kpi_data.js";
import {Kpicards} from "../../../components/KPICards/KPIcards";
import { SquareBtn } from "../../../components/Butons/Buton.jsx";
import { useAuth } from "../../../context/AuthContext";
const KPI = () => {
  const { user } = useAuth();
  return (
    <>
    <section className={kpi.Dashboard_Asigment}>        
        <div className={kpi.container}> 
          
        <h2>
            LS3<span>0</span>
          </h2>
          <h2>
            ZEISS <span>2</span>
          </h2>
          <h2>
            3SHAPE <span>2</span>
          </h2>
          <h2>
            Design IBO <span>7</span>
          </h2>
          <h2>
            Digital Abutment <span>99</span>
          </h2>
          <h2>
            Phisical Abutment <span>4</span>
          </h2>
          <h2>
            Full Arch <span>2</span>
          </h2>
          </div>
          {user.access === "admin"?<SquareBtn onClick={() => {console.log("click")}}>Assign</SquareBtn>:""}
        
      </section>
    <section className={kpi.Dashboard_KPI}>
      {kpi_data.map((card, index) => (
          <Kpicards
            key={index}
            symbol={card.symbol}
            color={card.color}
            shadow={card.shadow}
            title={card.title}
            data={card.data}
          />
        ))}
    </section>
    </>
  );
};
export default KPI;
