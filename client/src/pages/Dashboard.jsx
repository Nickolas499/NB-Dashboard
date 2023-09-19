import { Kpicards } from "../components/Kpicards";
import { UserCards } from "../components/UserCards";
import { kpi_data, user_data } from "../data/kpi_data";



export const Dashboard = () => { 
 
  return (
    <article className="DashboardContainer">
      <section className="Dashboard_KPI">
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
      <section className="Dashboard_Asigment">
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
      <section className="UsersAsigment">
        {user_data.map((card, index) => (
          <UserCards
            key={index}
            initials={card.initials}
            name={card.name}
            color={card.color}
            shadow={card.shadow}
            data={card.data}
          />
        ))}
      </section>
    </article>
  );
};
