import React, { useEffect, useState } from "react";
import styles from "./WorkForm.module.css";
import moment from "moment";
import { useWork } from "../../context/workContext";


const WorkForm = () => {
  const today = moment().format("MM/DD/YYYY");
  const { CreateWork, GetWork,  Work} = useWork();

  const [workDate, setWorkDate] = useState(false);
  
  useEffect(() => {
    GetWork();   
    if(Work.DATE === today ? setWorkDate(true) : setWorkDate(false));    
  },[])
  
  

  const [workData, setWorkData] = useState({
    LS3: 0,
    ZEISS: 0,
    SHAPE: 0,
    IBOS: 0,
    DIGI_ABUT: 0,
    PHIS_ABUT: 0,
    FULL_ARCH: 0,
    DATE: today
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setWorkData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();    
    CreateWork(workData);
    GetWork();    
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.frame}>
        <label className={styles.label}>Today Date</label>
        <h1>{today}</h1>
      </div>
      <div className={styles.frame}>
        <label className={styles.label}>LS3</label>
        <input
          type="number"
          name="LS3"
          value={workData.LS3}
          onChange={handleInputChange}
          className={styles.Input_field}
        />
      </div>
      <div className={styles.frame}>
        <label className={styles.label}>ZEISS</label>
        <input
          type="number"
          name="ZEISS"
          value={workData.ZEISS}
          onChange={handleInputChange}
          className={styles.Input_field}
        />
      </div>
      <div className={styles.frame}>
        <label className={styles.label}>3SHAPE</label>
        <input
          type="number"
          name="SHAPE"
          value={workData.SHAPE}
          onChange={handleInputChange}
          className={styles.Input_field}
        />
      </div>
      <div className={styles.frame}>
        <label className={styles.label}>IBO</label>
        <input
          type="number"
          name="IBOS"
          value={workData.IBOS}
          onChange={handleInputChange}
          className={styles.Input_field}
        />
      </div>
      <div className={styles.frame}>
        <label className={styles.label}>DIGITAL ABUT</label>
        <input
          type="number"
          name="DIGI_ABUT"
          value={workData.DIGI_ABUT}
          onChange={handleInputChange}
          className={styles.Input_field}
        />
      </div>
      <div className={styles.frame}>
        <label className={styles.label}>PHISICAL ABUT</label>
        <input
          type="number"
          name="PHIS_ABUT"
          value={workData.PHIS_ABUT}
          onChange={handleInputChange}
          className={styles.Input_field}
        />
      </div>
      <div className={styles.frame}>
        <label className={styles.label}>FULL ARCH</label>
        <input
          type="number"
          name="FULL_ARCH"
          value={workData.FULL_ARCH}
          onChange={handleInputChange}
          className={styles.Input_field}
        />
      </div>
      <div className={styles.frame}>
      <label className={styles.label}></label>
      {
  workDate ? (
    <button type="submit" className={styles.submit}>Edit</button>
  ) : (
    <button type="submit" className={styles.submit}>Submit</button>
  )
}
      </div>
    </form>
  );
};

export default WorkForm;
