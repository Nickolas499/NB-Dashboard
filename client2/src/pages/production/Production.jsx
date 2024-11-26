import Tabs from "../../components/tabs/Tabs"
import Registration from './registration/Registration';
import Scan from "./scan/Scan";
import Design from "./design/Design";
import Redesign from "./redesign/Redesign";
import Pareto from "./pareto/Pareto";
import momemt from 'moment';

const today = momemt().format('MM/DD/YYYY');
const Production = () => {
  return (
    <Tabs title={today}>
      <div label="REGISTRATION">
        <Registration />
      </div>
      <div label="SCANS">
        <Scan />
      </div>
      <div label="DESIGNS">
        <Design />
      </div>
      <div label="REDESIGNS">
        <Redesign />
      </div>
      <div label="PARETO">
        <Pareto />
      </div>
    </Tabs>
  )
}

export default Production