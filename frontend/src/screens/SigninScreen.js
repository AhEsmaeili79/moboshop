import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { signin } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function SigninScreen(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const redirect = props.location.search
    ? props.location.search.split('=')[1]
    : '/';

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo, loading, error } = userSignin;

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(signin(email, password));
  };
  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
  }, [props.history, redirect, userInfo]);
  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>ورود</h1>
        </div>
        {loading && <LoadingBox></LoadingBox>}
        {error && <MessageBox variant="danger">{error}</MessageBox>}
        <div>
          <label htmlFor="email">ایمیل</label>
          <input
            type="email"
            id="email"
            placeholder="ایمیل را وارد کنید"
            required
            onChange={(e) => setEmail(e.target.value)}
            oninvalid="this.setCustomValidity('Username cannot be blank')"
          ></input>
         
        </div>
        <div>
          <label htmlFor="password">کلمه عبور </label>
          <input
            type="password"
            id="password"
            placeholder="کلمه عبور را وارد کنید"
            required
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </div>
        <div>
          <label />
          <button className="primary" type="submit">
           ورود
          </button>
        </div>
        <div>
          <label />
          <div>
            ثبت نام نکرده اید ؟{' '}
            <a href="/register">ثبت نام</a>
          </div>
        </div>
      </form>
    </div>
  );
}
