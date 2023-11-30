import kpi from "./kpi.module.css";
import { kpi_data } from "../../../data/kpi_data.js";
import {Kpicards} from "../../../components/KPICards/KPIcards";

const KPI = () => {
  return (
    <div className={kpi.Dashboard_KPI}>
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
    </div>
  );
};
export default KPI;
