import { useEffect, useState } from 'react'
import style from '../production.module.css'
import { Input } from '../../../components/inputs/Inputs'
import { useForm } from "react-hook-form";


const Redesign = () => {

    const [newUser, setNewUser] = useState([])
    const { formState: { errors }, } = useForm();

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(e.target.value)
        setNewUser((prev) => ({
            ...prev,
            [name]: value,

        }));
    };
    return (
        <div className={style.Container}>
            {/* =============================================[USERS FORM]======================================= */}
            <div className={style.NewUserForm}>
                <form className={style.Form} >
                    <h1>REDESIGN</h1>
                    <span>
                        {/* {RegisterErrors.map((error, index) => (
                            <p className="error" key={index}>
                                {error}
                            </p>
                        ))} */}
                    </span>
                    <div className={style.FormInput}>
                        <Input label="PHISICAL IBO" name="PHIS_IBO" type="number" placeholder="" onChange={handleChange} errors={errors} />
                        <Input label="DIGITAL IBO" name="DIGI_IBO" type="number" placeholder="" onChange={handleChange} errors={errors} />
                        <Input label="PHISICAL ABUTMENT" name="PHIS_ABUT" type="number" placeholder="" onChange={handleChange} errors={errors} />
                    </div>
                    <div className={style.FormInput}>
                        <Input label="FULL ARCH PROTOTYPE" name="FULL_ARCH_PRO" type="number" placeholder="" onChange={handleChange} errors={errors} />
                        <Input label="FULL ARCH FINAL" name="FULL_ARCH_FINAL" type="number" placeholder="" onChange={handleChange} errors={errors} />
                    </div>
                    <div className={style.BtnInput}>
                        <button className={style.btn}  >SUBMIT</button>
                    </div>
                </form>

            </div>
            {/* =============================================[USERS LISTS]======================================= */}
            <div className={style.UsersList}>
                <h1>Redesign Submited</h1>
                <ul>
                    <li className={style.UserListHeader}>
                        <span>DATE</span>
                        <span>PHIS IBO</span>
                        <span>DIGI IBO</span>
                        <span>PHIS ABUT</span>
                        <span>FULL ARCH PRO</span>
                        <span>FULL ARCH FINAL</span>
                        <span>Actions</span>
                    </li>
                    {/* {usuarios.map((user) => (
                        <li className={style.UserList} key={user._id} style={{ backgroundColor:user.color+"66"}}>
                            <span>{user.fname}  {user.lname}</span>
                            <span>{user.username}</span>
                            <span>{user._id}</span>
                            <span><button className={style.trash_btn} onClick={() => DeleteUser(user._id)} >{trash_icon}</button></span>
                        </li>
                        
                    ))} */}
                </ul>
            </div>
        </div>
    )
}

export default Redesign