import React, { useEffect, useState } from "react";
import styles from "./WorkForm.module.css";
import moment from "moment";
import { useWork } from "../../context/workContext";

const WorkForm = () => {
  const today = moment().format("MM/DD/YYYY");
  const { CreateWork, GetWork, Work, UpdateWork,} = useWork();
  

  

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

  useEffect(() => {
    GetWork();    
  }, []);

  useEffect(() => {
    if (Work && Work.DATE === today) {
      setWorkData((prevState) => ({
        ...prevState,
        LS3: Work.LS3,
        ZEISS: Work.ZEISS,
        SHAPE: Work.SHAPE,
        IBOS: Work.IBOS,
        DIGI_ABUT: Work.DIGI_ABUT,
        PHIS_ABUT: Work.PHIS_ABUT,
        FULL_ARCH: Work.FULL_ARCH,
      })); 
    }
  }, [Work, today]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setWorkData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

 
  const handleSubmit = (e) => {
    e.preventDefault();
    if (Work && Work.DATE === today) {
      UpdateWork(Work._id, workData);      
      GetWork();    
    } else {
      CreateWork(workData);
      GetWork();
    }
    GetWork();
  };





  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.frame}>
        <span className={styles.label}>Today Date</span>
        <h1>{Work.DATE}</h1>
      </div>
      <div className={styles.frame}>
        <label className={styles.label} htmlFor="LS3">LS3</label>
        <input
          id="LS3"
          type="number"
          name="LS3"
          value={workData.LS3}
          onChange={handleInputChange}
          className={styles.Input_field}
        />
      </div>
      <div className={styles.frame}>
        <label className={styles.label} htmlFor="ZEISS">ZEISS</label>
        <input
          id="ZEISS"
          type="number"
          name="ZEISS"
          value={workData.ZEISS}
          onChange={handleInputChange}
          className={styles.Input_field}
        />
      </div>
      <div className={styles.frame}>
        <label className={styles.label} htmlFor="SHAPE">3SHAPE</label>
        <input
          id="SHAPE"
          type="number"
          name="SHAPE"
          value={workData.SHAPE}
          onChange={handleInputChange}
          className={styles.Input_field}
        />
      </div>
      <div className={styles.frame}>
        <label className={styles.label} htmlFor="IBOS">IBO</label>
        <input
          id="IBOS"
          type="number"
          name="IBOS"
          value={workData.IBOS}
          onChange={handleInputChange}
          className={styles.Input_field}
        />
      </div>
      <div className={styles.frame}>
        <label className={styles.label} htmlFor="DIGI_ABUT">DIGITAL ABUT</label>
        <input
          id="DIGI_ABUT"
          type="number"
          name="DIGI_ABUT"
          value={workData.DIGI_ABUT}
          onChange={handleInputChange}
          className={styles.Input_field}
        />
      </div>
      <div className={styles.frame}>
        <label className={styles.label} htmlFor="PHIS_ABUT">PHISICAL ABUT</label>
        <input
          id="PHIS_ABUT"
          type="number"
          name="PHIS_ABUT"
          value={workData.PHIS_ABUT}
          onChange={handleInputChange}
          className={styles.Input_field}
        />
      </div>
      <div className={styles.frame}>
        <label className={styles.label} htmlFor="FULL_ARCH">FULL ARCH</label>
        <input
          id="FULL_ARCH"
          type="number"
          name="FULL_ARCH"
          value={workData.FULL_ARCH}
          onChange={handleInputChange}
          className={styles.Input_field}
        />
      </div>
      <div className={styles.frame}>
        <span className={styles.label} ></span>
        {Work && Work.DATE === today ? (
          <button type="submit" className={styles.submit}>
            Edit
          </button>
        ) : (
          <button type="submit" className={styles.submit}>
           Submit
          </button>
        )}
      </div>
    </form>
  );
};

export default WorkForm;