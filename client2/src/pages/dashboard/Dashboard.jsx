import Tabs from "../../components/tabs/Tabs"
import Assignmets from "./assiments/Assignmets"
import ActionPlan from "./actionPlan/ActionPlan"
import KPI from "./kpi/KPI"
import momemt from 'moment';

const today = momemt().format('MM/DD/YYYY');
const yesterday = momemt().subtract(1,'days').format('MM/DD/YYYY');




function Dashboard() {
  return (
    <Tabs title={today}>
      <div label="DASHBOARD KPI">
        <KPI />
      </div>
      <div label="ASSIGMENTS">
        <Assignmets />
      </div>
      <div label="ACTION PLAN">
        <ActionPlan />
      </div>
    </Tabs>
  )
}

export default Dashboard