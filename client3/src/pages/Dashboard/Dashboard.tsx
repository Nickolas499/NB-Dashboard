import React from 'react';
import Tabs from "../../components/Tabs/Tabs";
import Assignmets from "./assiments/Assignmets";
import ActionPlan from "./actionPlan/ActionPlan";
import KPI from "./Kpi/Kpi";
import moment from 'moment';

const today = moment().format('MM/DD/YYYY');
const yesterday = moment().subtract(1, 'days').format('MM/DD/YYYY');

const Dashboard: React.FC = () => {
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
  );
}

export default Dashboard;
