import style from './assignment.module.css'
import { useAuth } from '../../../context/AuthContext';

const Assignmets = () => {
  const { usuarios, GetUsers } = useAuth();



  return (
    <div className={style.container}>
      <h1>ASSIGMENTS</h1>

      <div className={style.userscards}>
        {usuarios.map((user) => (
          <div className={style.UserCard} key={user._id} style={{ backgroundColor: user.color + "66" }}>
            <div className={style.CardTitle}>
              <span className={style.initials} style={{ backgroundColor: user.color }}>{`${user.fname[0]}${user.lname[0]}`}</span>
              <span className={style.UserName}>{user.fname}  {user.lname}</span>
            </div>

            <span>{user.username}</span>
            <span>{user._id}</span>
          </div>



        ))}
      </div>

    </div>

  )
}

export default Assignmets