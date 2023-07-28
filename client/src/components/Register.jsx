import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { Select } from "./selectComponent/Select";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";

const ColorOption = [
  { label: "red", value: "rgb(0, 255, 0)" },
  { label: "green", value: "rgb(255, 0, 0)" },
  { label: "blue", value: "rgb(255, 0, 0)" },
  { label: "yellow", value: "rgb(0, 255, 0)" },
  { label: "black", value: "rgb(0, 255, 0)" },
  { label: "white", value: "rgba(202,81,0)" },
  { label: "gray", value: "rgba(217,175,139)" },
  { label: "silver", value: "rgba(98,203,231)" },
  { label: "maroon", value: "rgb(245,198,82)" },
  { label: "olive", value: "rgba(1,174,240)" },
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
  const { Signup, isAuthenticated, errors: RegisterErrors } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

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
          type="text"
          {...register("username", { required: true })}
          placeholder="Username"
          className="input_value"
        />
        {errors.username && <p className="error">This field is required</p>}
        <input
          type="text"
          {...register("fname", { required: true })}
          placeholder="First Name"
          className="input_value"
        />
        {errors.fname && <p className="error">This field is required</p>}
        <input
          type="text"
          {...register("lname", { required: true })}
          placeholder="Last Name"
          className="input_value"
        />
        {errors.lname && <p className="error">This field is required</p>}
        <input
          type="email"
          {...register("email", { required: true })}
          placeholder="Email"
          className="input_value"
        />
        {errors.email && <p className="error">This field is required</p>}
        <input
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
