import { useForm } from "react-hook-form";
import { useState,} from "react";
import { Select } from "./selectComponent/Select";
import { useAuth } from "../context/authContext";


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

export const Register = () => {
  const [Colorvalue, setColorValue] = useState(ColorOption[0]);
  const [Accessvalue, setAccessValue] = useState(AccessOption[0]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { Signup,  errors: RegisterErrors } = useAuth();


  const onSubmit = async (data) => {
    data.color = Colorvalue.value;
    data.access = Accessvalue.value;
    await Signup(data);
  };

  return (
    <div className="registerForm">
      <h2>Register</h2>
      <span>
        {RegisterErrors.map((error, index) => (
          <p className="error" key={index}>
            {error}
          </p>
        ))}
      </span>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          id="username"
          type="text"
          {...register("username", { required: true })}
          placeholder="Username"
          className="input_value"
        />
        {errors.username && <p className="error">This field is required</p>}
        <input
          id="fname"
          type="text"
          {...register("fname", { required: true })}
          placeholder="First Name"
          className="input_value"
        />
        {errors.fname && <p className="error">This field is required</p>}
        <input
          id="lname"
          type="text"
          {...register("lname", { required: true })}
          placeholder="Last Name"
          className="input_value"
        />
        {errors.lname && <p className="error">This field is required</p>}
        <input
          id="email"
          type="email"
          {...register("email", { required: true })}
          placeholder="Email"
          className="input_value"
        />
        {errors.email && <p className="error">This field is required</p>}
        <input
          id="password"
          type="password"
          {...register("password", { required: true })}
          placeholder="Password"
          className="input_value"
        />
        {errors.password && <p className="error">This field is required</p>}
        <div className="selectbox">
          <Select
            {...register("access", { required: false })}
            name="access"
            options={AccessOption}
            value={Accessvalue || AccessOption[0]}
            type={"text"}
            onChange={(e) => setAccessValue(e)}
          />
          <Select
            {...register("color", { required: false })}
            name="color"
            options={ColorOption}
            value={Colorvalue || ColorOption[0]}
            type={"color"}
            onChange={(e) => setColorValue(e)}
          />
        </div>
        <button className="btn" type="submit">
          Register
        </button>
      </form>
    </div>
  );
};
