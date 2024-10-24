import Tabs from "../../components/tabs/Tabs"
import { Usersadmin } from "./usersadmin/Usersadmin";
import momemt from 'moment';

const today = momemt().format('MM/DD/YYYY');
const yesterday = momemt().subtract(1,'days').format('MM/DD/YYYY');

const Admin = () => {
  return (
    <Tabs title={today}>
    <div label="ADMIN USERS">
      <Usersadmin/>
    </div>
    <div label="ADMIN JOBS">
    <h1>Admin</h1>
    </div>
    <div label="ACTION PLAN">
    <h1>Admin</h1>
    </div>
    <div label="ASSIGMENTS">
    <h1>Admin</h1>
    </div>
    <div label="ADMIN">
    <h1>Admin</h1>
    </div>
    <div label="ADMIN2">
    <h1>Admin</h1>
    </div>
    <div label="ADMIN3">
    <h1>Admin</h1>
    </div>
  </Tabs>
  )
}

export default Admin