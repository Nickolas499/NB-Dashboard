import kpi from "./kpi.module.css";

export const Kpicards = (props) => {
    return (
      <div className={kpi.Kpicards} style={{borderColor:props.color,}} >
        <div className={kpi.CardContainer}>
          <div className={kpi.Symbol} style={{backgroundColor: props.color,boxShadow: props.shadow}}><div className={kpi.circle}>{props.symbol}</div></div>
          <div className={kpi.CardTitle}>{props.title}</div>
          <div className={kpi.CardInfo}>
            <ul>
              {props.data.map((data, index) => {
                const key = Object.keys(data)[0];
                const value = data[key];
                return (
                  <li className={kpi.li_card} key={index}>
                    <span className={kpi.span_key}>{key}</span>
                    <span className={kpi.span_value}>{value}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    );
  };
  