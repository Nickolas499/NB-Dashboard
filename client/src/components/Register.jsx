import {useForm} from 'react-hook-form';
import {SelectComponet} from './SelectComponet';
export const Register = () => {
    const { register, handleSubmit} = useForm();
  return (
    <div className="registerForm">
        <h2>Register</h2>
        <form onSubmit={handleSubmit(values => console.log(values))}>
            <input type="text" {...register('username', {required: true})} placeholder='Username' className="input_value"/>
            <input type="text" {...register('fname', {required: true})} placeholder='First Name' className="input_value"/>
            <input type="text" {...register('lname', {required: true})} placeholder='Last Name'className="input_value"/>
            <input type="email" {...register('email', {required: true})} placeholder='Email'className="input_value"/>
            <input type="password" {...register('password', {required: true})} placeholder='Password' className="input_value"/>
            <div className="selectbox">
            <SelectComponet default="Access" items={['Admin', 'User']}/>
            <SelectComponet default="Color" items={['#FF0000', '#00FF00', '#0000FF', '#FFFF00']} /></div>
            
            <button className='btn' type='submit'>Register</button>           
        </form>
    </div>
  )
}
