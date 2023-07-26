import {useForm} from 'react-hook-form';
import {useState} from 'react';
import {Select} from './selectComponent/Select';



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
  const { register, handleSubmit} = useForm();

  const onSubmit = data => {
    data.color = Colorvalue.value;
    data.access = Accessvalue.value;
    console.log(data );
  }

  return (
    <div className="registerForm">
        <h2>Register</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
            <input type="text" {...register('username', {required: true})} placeholder='Username' className="input_value"/>
            <input type="text" {...register('fname', {required: true})} placeholder='First Name' className="input_value"/>
            <input type="text" {...register('lname', {required: true})} placeholder='Last Name'className="input_value"/>
            <input type="email" {...register('email', {required: true})} placeholder='Email'className="input_value"/>
            <input type="password" {...register('password', {required: true})} placeholder='Password' className="input_value"/>
            <div className="selectbox">           
            <Select {...register('access', {required: true})} name="access" options={AccessOption} value={Accessvalue || AccessOption[0]} type={"text"} onChange = {e =>setAccessValue(e)}/>
            <Select {...register('color', {required: true})} name="color" options={ColorOption} value={Colorvalue || ColorOption[0]} type={"color"} onChange = {e =>setColorValue(e) }/>
            </div>
            <button className='btn' type='submit'>Register</button>           
        </form>
    </div>
  )
}
