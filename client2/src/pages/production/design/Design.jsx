import { useEffect, useState } from 'react'
import style from '../production.module.css'
import { Input } from '../../../components/inputs/Inputs'
import { useForm } from "react-hook-form";


const Design = () => {

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
                    <h1>DESIGN</h1>
                    <span>
                        {/* {RegisterErrors.map((error, index) => (
                            <p className="error" key={index}>
                                {error}
                            </p>
                        ))} */}
                    </span>
                    <div className={style.FormInput}>
                        <Input label="IBO DESIGN" name="PHIS_IBO" type="number" placeholder="" onChange={handleChange} errors={errors} />
                        <Input label="Crown Restoration" name="DIGI_IBO" type="number" placeholder="" onChange={handleChange} errors={errors} />
                        <Input label="Cemented Bridge Rest" name="PHIS_ABUT" type="number" placeholder="" onChange={handleChange} errors={errors} />
                    </div>
                    <div className={style.FormInput}>
                        <Input label="Implant Restoration" name="DIGI_ABUT" type="number" placeholder="" onChange={handleChange} errors={errors} />
                        <Input label="Implant Bridge Rest" name="PHIS_CROWN" type="number" placeholder="" onChange={handleChange} errors={errors} />
                        <Input label="Printed Models" name="DIGI_CROWN" type="number" placeholder="" onChange={handleChange} errors={errors} />

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
                <h1>Designs Submited</h1>
                <ul>
                    <li className={style.UserListHeader}>
                        <span>IBO DESIGN</span>
                        <span>Crown Restoration</span>
                        <span>Cemented Bridge Rest</span>
                        <span>Implant Restoration</span>
                        <span>Implant Bridge Rest</span>
                        <span>Printed Models</span>
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

export default Design