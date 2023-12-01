import kpi from "./kpi.module.css";
import { kpi_data } from "../../../data/kpi_data.js";
import {Kpicards} from "../../../components/KPICards/KPIcards";

const KPI = () => {
  return (
    <>
    <section className={kpi.Dashboard_Asigment}>
        <h1>Asigment</h1>
        <div>
          <h2>
            IBO Design <span>7</span>
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
