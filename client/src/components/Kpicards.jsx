export const Kpicards = (props) => {
  return (
    <div className="Kpicards" >
      <div className="CardContainer">
        <div className="Symbol" style={{backgroundColor: props.color,boxShadow: props.shadow}}><div className="circle">{props.symbol}</div></div>
        <div className="CardTitle">{props.title}</div>
        <div className="CardInfo">
          <ul>
            {props.data.map((data, index) => {
              const key = Object.keys(data)[0];
              const value = data[key];
              return (
                <li className="li-card" key={index}>
                  <span className="span-key">{key}</span>
                  <span className="span-value">{value}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};
