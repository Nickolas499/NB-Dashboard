import React, { useState } from "react";
import style from "./assign.module.css";


const Input = (props) => {
  return (
    <div className="Input">
      
      <input
        id={props.id}
        name={props.name}
        className={style.input}
        type={props.type}
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
      />
    </div>
  );
};



function Assing({ workers, jobs, assing, createAssign }) {
  // const [date, setDate] = useState(new Date());
  console.log(workers)
  console.log(jobs)
  const [assignments, setAssignments] = useState([
    {
      LS3: 0,
      ZEISS: 0,
      SHAPE: 0,
      IBO_DESIGN:0,
      DIGI_ABUT:0,
      PHIS_ABUT:0,
      FULL_ARCH:0
    }
  ]);

  const [LS3, setLS3] = useState(0);
  const [ZEISS, setZEISS] = useState(0);
  const [SHAPE, setSHAPE] = useState(0);
  const [IBO_DESIGN, setIBO_DESIGN] = useState(0);
  const [DIGI_ABUT, setDIGI_ABUT] = useState(0);
  const [PHIS_ABUT, setPHIS_ABUT] = useState(0);
  const [FULL_ARCH, setFULL_ARCH] = useState(0);
  const[woker , setWoker] = useState([]);

  const [pending, setPending] = useState(false);

  function handleSubmit() {
    // setPending(true); // Disable the button while submitting
  
    // // Fetch current assignments from the database (assuming a function to retrieve them)
    // assing().then((currentAssignments) => {
    //   const hasAssignmentsForToday = currentAssignments.some(
    //     (assignment) => assignment.date === date
    //   );
  
    //   if (!hasAssignmentsForToday) {
    //     // Create new assignments with the current date
    //     createAssign(date, assignments).then(() => {
    //       setPending(false);
    //       // Handle success (e.g., display a success message)
    //     }).catch((error) => {
    //       setPending(false);
    //       // Handle error (e.g., display an error message)
    //     });
    //   } else {
    //     setPending(false);
    //     // Handle already existing assignments for today (e.g., display a message)
    //   }
    // });
    console.log(assignments);
  }

  // Actualizar cantidades de trabajo asignadas
  const updateQuantities = (e) => {        
    const { name, value } = e.target;

    switch (name) {
      case "LS3":
        console.log(name, value);
        setLS3(value);
        break;
      case "ZEISS":
        console.log(name, value);
        setZEISS(value);
        break;
      case "SHAPE":
        console.log(name, value);
        setSHAPE(value);
        break;
      case "IBO_DESIGN":
        console.log(name, value);
        setIBO_DESIGN(value);
        break;
      case "DIGI_ABUT":
        console.log(name, value);
        setDIGI_ABUT(value);
        break;
      case "PHIS_ABUT":
        console.log(name, value);
        setPHIS_ABUT(value);
        break;
      case "FULL_ARCH":
        console.log(name, value);
        setFULL_ARCH(value);
        break;
      default:
        break;
    }
  };
  

  const ScanedSubmit = (e) => {
   
    const formData = {
      LS3: Number(LS3),
      ZEISS: Number(ZEISS),
      SHAPE: Number(SHAPE),
      IBO_DESIGN: Number(IBO_DESIGN),
      DIGI_ABUT: Number(DIGI_ABUT),
      PHIS_ABUT: Number(PHIS_ABUT),
      FULL_ARCH: Number(FULL_ARCH)
        };
    console.log(formData);
    
  };

  return (
    <div className="assignments-container">
      <section className={style.workertable}>
        <div className={style.head}>
        <div className={style.th1}>Workers</div>
            {Object.keys(jobs)
              .slice(0, 7)
              .map((job, index) => (
                <div className={style.th} key={index}>{job}</div>
              ))}
        </div>
        <div className={style.body}>
        {workers.map((worker, index) => (
            <div className={style.tr} key={index}>
              <div className={style.td1}>
                {worker.fname} {worker.lname}
              </div>
              {Object.keys(jobs)
                .slice(0, 7)
                .map((job, jobIndex) => (
                  <div className={style.td} key={jobIndex}>
                    
                    {/* <input className={style.input}
                      id={`${job}`}
                      type="number"
                      name={`${worker.fname}_${job}`}
                      value={assignments}
                      onChange={(e) =>
                        updateQuantities(e.target.value)
                      }
                    /> */}
                    <Input type="text" placeholder="0" id={`${job}_${jobIndex}`} name={`${job}`}  value={assignments[job]} label="IBO Received" onChange={updateQuantities}/>
                  </div>                  
                ))}
                
            </div>                        
          ))}
        </div>
        <button className={style.btn} onClick={ScanedSubmit} disabled={pending}>Submit </button>
      </section>
    </div>
  );
}

export default Assing;
