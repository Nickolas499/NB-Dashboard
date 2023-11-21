import Tabs from "../../components/tabs/Tabs"
import Assignmets from "./assiments/Assignmets"
import ActionPlan from "./actionPlan/ActionPlan"
import KPI from "./kpi/KPI"


const Dashboard = () => {
  return (
    <Tabs>
    <div label="DASHBOARD KPI">
        <KPI/>
      </div>
      <div label="ASSIGMENTS">
        <Assignmets/>
      </div>
      <div label="ACTION PLAN">
        <ActionPlan/>
      </div>
      <div label="ACTION PLAN">
        <ActionPlan/>
      </div>
      
    </Tabs>
  )
}

export default Dashboard