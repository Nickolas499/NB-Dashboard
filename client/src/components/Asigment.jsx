import { AsigmentInput } from "./AsigmentInput"

export const Asigment = (props) => {
  return (
    <div className='asigment'>
        <h2>{props.name}</h2>
        <div className="UserAsigment">
            <ul>
            {props.data.map((data, index) => {
              const key = Object.keys(data)[0];
              const value = data[key];
              return (
                <li className="li-card" key={index}>
                    <button className="btn" >-</button>
                  <span className="span-key">{key}</span>
                  <span className="span-value">{value}</span>
                </li>
              );
            })}                
            </ul>     

            
        </div>
        <AsigmentInput/> 
    </div>
  )
}
