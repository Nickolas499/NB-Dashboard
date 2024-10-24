import Logo from "../../img/logo.svg";
import { useForm } from "react-hook-form";
import style from "./Login.module.css";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export const Login = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { Signin, errors: signinErrors } = useAuth();
  const navigate = useNavigate();

  const onSubmit = handleSubmit((data) => {
    // console.log(data);
    Signin(data);
    navigate("/");
  });
  return (
    <div className={style.container}>
        <div className={style.login}>
          <div className={style.logo}>
            <img src={Logo} alt="" />
          </div>

          <form onSubmit={onSubmit}>
            <h1>Login</h1>
            {signinErrors.map((error, index) => (
              <p className={style.error} key={index}>
                {error}
              </p>
            ))}
            <input
              name="username"
              className={`${style.input_text } ${errors.password && style.error2}`}
              type="text"
              {...register("username", { required: true })}
              placeholder= {errors.password ? "This field is required" : "Username" }
              autoComplete="true"
            />
            {/* {errors.username && <p className={style.error}>This field is required</p>} */}
            <input
              name="password"
              className={`${style.input_text } ${errors.password && style.error2}`}
              type="password"
              {...register("password", { required: true })}
              placeholder= {errors.password ? "This field is required" : "Password" }
            />
            {/* {errors.password && <p className={style.error}>This field is required</p>} */}
            <button className={style.btn}>Login</button>
          </form>
        </div>
      
    </div>
  );
};
