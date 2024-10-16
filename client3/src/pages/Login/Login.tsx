import Logo from "../../assets/icons/logo.svg";
import { useForm, SubmitHandler } from "react-hook-form";
import style from "./Login.module.css";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

interface LoginFormInputs {
  username: string;
  password: string;
}

export const Login: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();
  const { Signin, errors: signinErrors } = useAuth();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<LoginFormInputs> = (data) => {
    Signin(data);
    navigate("/");
  };

  return (
    <div className={style.container}>
      <div className={style.login}>
        <div className={style.logo}>
          <img src={Logo} alt="Logo" />
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <h1>Login</h1>
          {signinErrors.map((error, index) => (
            <p className="error" key={index}>
              {error}
            </p>
          ))}
          <input
            {...register("username", { required: true })}
            className={style.input_text}
            type="text"
            placeholder="username"
            autoComplete="true"
          />
          {errors.username && <p className="error">This field is required</p>}
          <input
            {...register("password", { required: true })}
            className={style.input_text}
            type="password"
            placeholder="password"
          />
          {errors.password && <p className="error">This field is required</p>}
          <button className={style.btn}>Login</button>
        </form>
      </div>
    </div>
  );
};
