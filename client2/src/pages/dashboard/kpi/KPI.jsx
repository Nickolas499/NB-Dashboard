import styles from "./kpi.module.css";

const KPI = () => {
  return (
    <div className={styles.container}>
      <div className={styles.tabContainer}>
        <div className={styles.kpiTap}>Tab</div>
        <div className={styles.kpiTap}>Tab</div>
        <div className={styles.kpiTap}>Tab</div>
      </div>
    </div>
  );
};
export default KPI;
