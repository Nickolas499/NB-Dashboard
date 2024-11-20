import style from './Usersadmin.module.css'
import { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { useAuth } from '../../../context/AuthContext';
import { Select } from '../../../components/SelectComponet/Select';
import { Input } from '../../../components/inputs/Inputs';
import { edit_icon, password_icon, trash_icon } from '../../../img/icons';

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
    const { usuarios, GetUsers, Signup, Delete_User, errors: RegisterErrors } = useAuth();
    const [Accessvalue, setAccessValue] = useState(AccessOption[0]);
    const [Colorvalue, setColorValue] = useState(ColorOption[0]);
    const { register, formState: { errors }, } = useForm();
    const [newUser, setNewUser] = useState([])

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(e.target.value)
        setNewUser((prev) => ({
            ...prev,
            [name]: value,

        }));
    };


    const handleCreateNewData = async () => {
        const newuser = {
            username: newUser.USERNAME,
            fname: newUser.FNAME,
            lname: newUser.LNAME,
            email: newUser.EMAIL,
            password: newUser.PASSWORD,
            access: Accessvalue.value,
            color: Colorvalue.value

        };
        await Signup(newuser);
    };
    const DeleteUser = (id) => {
        Delete_User(id)
    }

    const handleSignUp = (e) => {
        e.preventDefault();
        handleCreateNewData();

    };

    useEffect(() => {
        GetUsers();
    }, [])

    return (
        <div className={style.Container}>
            {/* =============================================[USERS FORM]======================================= */}
            <div className={style.NewUserForm}>
                <form className={style.Form} >
                    <h1>Create New User</h1>
                    <span>
                        {RegisterErrors.map((error, index) => (
                            <p className="error" key={index}>
                                {error}
                            </p>
                        ))}
                    </span>
                    <div className={style.FormInput}>
                        <Input label="First Name" name="FNAME" type="text" placeholder="First Name" onChange={handleChange} errors={errors} />
                        <Input label="Last Name" name="LNAME" type="text" placeholder="Last Name" onChange={handleChange} errors={errors} />
                    </div>
                    <Input label="Email" name="EMAIL" type="text" placeholder="Email" onChange={handleChange} errors={errors} />
                    <div className={style.FormInput}>
                        <Input label="Userame" name="USERNAME" type="text" placeholder="Username" onChange={handleChange} errors={errors} />
                        <Input label="Password" name="PASSWORD" type="password" placeholder="Password" onChange={handleChange} errors={errors} />
                    </div>
                    <div className={style.FormInput}>
                        <div className={style.Input}>
                            <p>Access Type</p>
                            <Select
                                {...register("access", { required: false })}
                                name="ACCESS"
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
                                name="COLOR"
                                options={ColorOption}
                                value={Colorvalue || ColorOption[0]}
                                type={"color"}
                                onChange={(e) => setColorValue(e)}
                            />
                        </div>
                    </div>




                    <div className={style.BtnInput}>
                        <button className={style.btn} onClick={handleSignUp} >Create User</button>
                    </div>
                </form>

            </div>
            {/* =============================================[USERS LISTS]======================================= */}
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
                        <li className={style.UserList} key={user._id} style={{ backgroundColor: user.color + "66" }}>
                            <span>{user.fname}  {user.lname}</span>
                            <span>{user.username}</span>
                            <span>{user._id}</span>
                            <span className={style.action}>
                                <button className={style.trash_btn} onClick={() => DeleteUser(user._id)} >{edit_icon}</button>
                                <button className={style.trash_btn} onClick={() => DeleteUser(user._id)} >{trash_icon}</button>
                            </span>
                        </li>

                    ))}
                </ul>
            </div>
        </div>
    )
}

