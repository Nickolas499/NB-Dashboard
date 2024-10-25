import style from './Usersadmin.module.css'
import { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { useAuth } from '../../../context/AuthContext';
import { Select } from '../../../components/SelectComponet/Select';

const ColorOption = [
    { label: "Cherry Red", value: "#de2939" },
    { label: "Blood Red", value: "#a0293f" },
    { label: "Cyclamen", value: "#d04870" },
    { label: "Sun Yellow", value: "#f5bc21" },
    { label: "Ochre", value: "#eb9200" },
    { label: "Gold", value: "#bf681c" },
    { label: "Olive Green", value: "#979227" },
    { label: "Pastel Green", value: "#7d9935" },
    { label: "Pea Green", value: "#8bc948" },
    { label: "Steel Blue", value: "#426798" },
    { label: "Sky Blue", value: "#3578d3" },
    { label: "Navy Blue", value: "#2c469a" },
    { label: "Orange", value: "#e76e00" },
    { label: "B Orange", value: "#e74500" },
    { label: "Ivory", value: "#c3aa7f" },
    { label: "Brown", value: "#473735" },
    { label: "Flesh", value: "#be815e" },
    { label: "Violet", value: "#583ac6" },
    { label: "Magenta", value: "#b53d9a" },
    { label: "Gray", value: "#575d6e" },
];

const AccessOption = [
    { label: "Admin", value: "admin" },
    { label: "User", value: "user" },
];

export const Usersadmin = () => {
    const { usuarios, GetUsers } = useAuth();
    const [Accessvalue, setAccessValue] = useState(AccessOption[0]);
    const [Colorvalue, setColorValue] = useState(ColorOption[0]);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const { Signup, errors: RegisterErrors } = useAuth();

    const onSubmit = async (data) => {
        data.color = Colorvalue.value;
        data.access = Accessvalue.value;
        await Signup(data);
    };

    useEffect(() => {
        GetUsers();
    }, [])




    return (
        <div className={style.Container}>
            <div className={style.NewUserForm}>
                <form className={style.Form} onSubmit={handleSubmit(onSubmit)}>
                    <h1>Create New User</h1>
                    <span>
                        {RegisterErrors.map((error, index) => (
                            <p className="error" key={index}>
                                {error}
                            </p>
                        ))}
                    </span>
                    <div className={style.FormInput}>
                        <div className={style.Input}>
                            <p>First Name</p>
                            <input
                                name="fname"
                                className={`${style.input_text} ${errors.fname && style.error2}`}
                                type="text"
                                placeholder={errors.fname ? "This field is required" : "First Name"}
                                autoComplete="true"
                            />
                        </div>
                        <div className={style.Input}>
                            <p>Last Name</p>
                            <input
                                name="lname"
                                className={`${style.input_text} ${errors.lname && style.error2}`}
                                type="text"
                                placeholder={errors.lname ? "This field is required" : "Last Name"}
                            /></div>
                    </div>
                    <div className={style.Input}>
                        <p>Email</p>
                        <input
                            name="email"
                            className={`${style.input_text} ${errors.email && style.error2}`}
                            type="email"
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
                                placeholder={errors.username ? "This field is required" : "Username"}
                                autoComplete="true"
                            />
                        </div>
                        <div className={style.Input}>
                            <p>Password</p>
                            <input
                                name="Password"
                                className={`${style.input_text} ${errors.password && style.error2}`}
                                type="password"
                                placeholder={errors.password ? "This field is required" : "Password"}
                                autoComplete="true"
                            />
                        </div>
                    </div>
                    <div className={style.FormInput}>
                        <div className={style.Input}>
                            <p>Access Type</p>

                            <Select
                                {...register("access", { required: false })}
                                name="access"
                                options={AccessOption}
                                value={Accessvalue || AccessOption[0]}
                                type={"text"}
                                onChange={(e) => setAccessValue(e)}
                            />
                        </div>
                        <div className={style.Input}>
                            <p>Color</p>

                            <Select
                                {...register("color", { required: false })}
                                name="color"
                                options={ColorOption}
                                value={Colorvalue || ColorOption[0]}
                                type={"color"}
                                onChange={(e) => setColorValue(e)}
                            />
                        </div>
                    </div>




                    <div className={style.BtnInput}>
                        <button className={style.btn} >Create User</button>
                    </div>
                </form>

            </div>
            <div className={style.UsersList}>
                <h1>Usuarios</h1>
                <ul>
                    <li className={style.UserListHeader}>
                        <span>Name</span>
                        <span>Username</span>
                        <span>Email</span>
                        <span>Edit</span>
                    </li>
                    {usuarios.map((user) => (
                        <li className={style.UserList} key={user._id}>
                            <span>{user.fname}  {user.lname}</span>
                            <span>{user.username}</span>
                            <span>{user.email}</span>
                            <span>Edit</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

