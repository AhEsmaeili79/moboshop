import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { register } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
// import emailjs from 'emailjs-com';
// import { name } from 'ejs';

export default function RegisterScreen(props) {
  const [name, setName] = useState('');
  const [email,setEmail] = useState('');
  const [phonenumber, setPhonenumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const redirect = props.location.search
    ? props.location.search.split('=')[1]
    : '/';
// function sendemail(){
//     emailjs.sendForm(
//       'service_bf7q9pt',
//       'template_dgxke3y', 
//       email.value,
//       'user_ISdE296sCHUviZOFHGItt' )
//       .then(function(response) {
//        console.log('SUCCESS!', response.status, response.text);
//     }, function(err) {
//        console.log('FAILED...', err);
//     })
// }

  const userRegister = useSelector((state) => state.userRegister);
  const { userInfo, loading, error } = userRegister;
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('کلمه عبور و تایید کلمه عبور با هم برابر نیست  ');
    }
    else {
      dispatch(register(name, email, phonenumber, password));

     
    }
  };
;
    

  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
  }, [props.history, redirect, userInfo]);
  return (
    <div className="fixing-register">
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>ثبت نام</h1>
        </div>
        {loading && <LoadingBox></LoadingBox>}
        {error && <MessageBox variant="danger">{error}</MessageBox>}
        <div>
          <label htmlFor="name">نام</label>
          <input
            name="name"
            type="text"
            id="name"
            placeholder="نام را وارد کنید "
            oninvalid="this.setCustomValidity(' لطفا نام را وارد کنید ')"
            oninput="this.setCustomValidity('')"
            required
            onChange={(e) => setName(e.target.value)}
          ></input>
        </div>
        <div >
          <label htmlFor="phonenumber" > شماره تلفن همراه </label>
          <div>
                <input id="phonenumber" type="tel" name="phone" oninvalid="this.setCustomValidity(' لطفا تلفن همراه را وارد کنید ')"
                  oninput="this.setCustomValidity('')"
                  required
                  onChange={(e) => setPhonenumber(e.target.value)}/>
                {/* <input type="submit" className="btn" value="تایید" /> */}
          </div>
        </div>
        <div>
          <label htmlFor="email">ایمیل </label>
          <input
            name="email"
            type="email"
            id="email"
            placeholder="ایمیل را وارد کنید "
            oninvalid="this.setCustomValidity(' لطفا ایمیل را وارد کنید ')"
            oninput="this.setCustomValidity('')"
            required
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor="password">کلمه عبور </label>
          <input
            type="password"
            id="password"
            placeholder="کلمه عبور را وارد کنید "
            oninvalid="this.setCustomValidity(' لطفا کلمه عبور را وارد کنید ')"
            oninput="this.setCustomValidity('')"
            required
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor="confirmPassword">تایید کلمه عبور</label>
          <input
            type="password"
            id="confirmPassword"
            placeholder="لطفا کلمه عبور را دوباره وارد کنید"
            
            oninvalid="this.setCustomValidity(' لطفا کلمه عبور را دوباره وارد کنید ')"
            oninput="this.setCustomValidity('')"
            required
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></input>
        </div>
        <div>
          <label />
          <button className="primary" type="submit">
            ثبت نام 
          </button>
        </div>
        <div>
          <label />
          <div>
            {' '}از قبل ثبت نام کرده اید ؟
            <Link to={`/signin?redirect=${redirect}`}> ورود </Link>
          </div>
        </div>
      </form>
    </div>
  );
}
