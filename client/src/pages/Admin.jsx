
import { Asigment } from "../components/Asigment"
import { user_data } from '../data/kpi_data';
import {useGraph  } from "../context/graphContext";
import { useEffect } from "react";


export const Admin = () => {
  const { GraphData, GetGraphData } = useGraph();

  useEffect(() => {
    GetGraphData();
  },[]);
  
  console.log(GraphData);
  return (
    <article className='adminContainer'>
      <section className='asigmentContainer'>
      {user_data.map((card, index) => (
          <Asigment key={index} name={card.name} data={card.data}/>
        ))}
            
      </section>
      <section className='asigmentContainer'>
      
      </section>
      
    </article>
  )
}
