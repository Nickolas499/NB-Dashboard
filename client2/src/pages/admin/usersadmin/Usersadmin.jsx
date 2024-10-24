import style from './Usersadmin.module.css'
import { useState } from 'react';
import { useForm } from "react-hook-form";
import { useAuth } from '../../../context/AuthContext';


export const Usersadmin = () => {
    const { usuarios, GetUsers } = useAuth();
    const access = ["user", "admin"]


    const [Access, setSelectAccess] = useState()

    const { formState: { errors }, } = useForm();

    return (
        <div className={style.Container}>
            <div className={style.NewUserForm}>
                <form className={style.Form}>
                    <h1>Create New User</h1>

                    <div className={style.FormInput}>
                        <div className={style.Input}>
                            <p>First Name</p>
                            <input
                                name="username"
                                className={`${style.input_text} ${errors.password && style.error2}`}
                                type="text"
                                //   {...register("username", { required: true })}
                                placeholder={errors.fname ? "This field is required" : "First Name"}
                                autoComplete="true"
                            />
                        </div>
                        <div className={style.Input}>
                            <p>Last Name</p>
                            <input
                                name="password"
                                className={`${style.input_text} ${errors.password && style.error2}`}
                                type="password"
                                //   {...register("password", { required: true })}
                                placeholder={errors.lname ? "This field is required" : "Last Name"}
                            /></div>
                    </div>
                    <div className={style.Input}>
                        <p>Email</p>
                        <input
                            name="username"
                            className={`${style.input_text} ${errors.password && style.error2}`}
                            type="text"
                            //   {...register("username", { required: true })}
                            placeholder={errors.email ? "This field is required" : "Email"}
                            autoComplete="true"
                        />
                    </div>
                    <div className={style.FormInput}>
                        <div className={style.Input}>
                            <p>Username</p>
                            <input
                                name="username"
                                className={`${style.input_text} ${errors.password && style.error2}`}
                                type="text"
                                //   {...register("username", { required: true })}
                                placeholder={errors.username ? "This field is required" : "Username"}
                                autoComplete="true"
                            />
                        </div>
                        <div className={style.Input}>
                            <p>Password</p>
                            <input
                                name="Password"
                                className={`${style.input_text} ${errors.password && style.error2}`}
                                type="text"
                                //   {...register("username", { required: true })}
                                placeholder={errors.password ? "This field is required" : "Password"}
                                autoComplete="true"
                            />
                        </div>
                    </div>
                    <div className={style.FormInput}>
                        <div className={style.Input}>
                            <p>Access Type</p>
                            <select className={style.Select} value={Access} onChange={(e) => setSelectAccess(e.target.value)}>
                                {access.map((_access, index) => (

                                    <option key={index} value={_access}>{_access}</option>
                                ))}
                            </select>
                        </div>
                        <div className={style.Input}>
                            <p>Access Type</p>
                            <select className={style.Select} value={Access} onChange={(e) => setSelectAccess(e.target.value)}>
                                {access.map((_access, index) => (

                                    <option key={index} value={_access}>{_access}</option>
                                ))}
                            </select>
                        </div>
                    </div>




                    <div className={style.BtnInput}>
                        <button className={style.btn}>Create User</button>
                    </div>
                </form>

            </div>
            <div className={style.UsersList}>
                <h1>Usuarios</h1>
                {usuarios.map((user) => (
                    <p key={user._id}>{user.fname}</p>
                ))}
            </div>
        </div>
    )
}

