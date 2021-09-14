import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Axios from 'axios';
import { detailsUser, updateUserProfile } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants';

export default function ProfileScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phonenumber, setPhonenumber] = useState('');
  const [profile, setProfile] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [sellerName, setSellerName] = useState('');
  const [sellerLogo, setSellerLogo] = useState('');
  const [sellerDescription, setSellerDescription] = useState('');

  const [loadingUpload, setLoadingUpload] = useState(false);
  const [errorUpload, setErrorUpload] = useState('');
  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append('image', file);
    setLoadingUpload(true);
    try {
      const { data } = await Axios.post('/api/uploads', bodyFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${userInfo.token}`,
        },
      });
      setProfile(data);
      setLoadingUpload(false);
    } catch (error) {
      setErrorUpload(error.message);
      setLoadingUpload(false);
    }
  };

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;
  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const {
    success: successUpdate,
    error: errorUpdate,
    loading: loadingUpdate,
  } = userUpdateProfile;
  const dispatch = useDispatch();
  useEffect(() => {
    if (!user) {
      dispatch({ type: USER_UPDATE_PROFILE_RESET });
      dispatch(detailsUser(userInfo._id));
    } else {
      setName(user.name);
      setEmail(user.email);
      setPhonenumber(user.phonenumber);
      setProfile(user.profile);
      if (user.seller) {
        setSellerName(user.seller.name);
        setSellerLogo(user.seller.logo);
        setSellerDescription(user.seller.description);
      }
    }
  }, [dispatch, userInfo._id, user]);
  const submitHandler = (e) => {
    e.preventDefault();
    // dispatch update profile
    if (password !== confirmPassword) {
      alert('رمز عبور و تایید رمز عبور شباهت ندارد');
    } else {
      dispatch(
        updateUserProfile({
          userId: user._id,
          name,
          email,
          profile,
          phonenumber,
          password,
          sellerName,
          sellerLogo,
          sellerDescription,
        })
      );
    }
  };
  return (
    <div className="fixing">
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>مشخصات کاربر</h1>
        </div>
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <>
            {loadingUpdate && <LoadingBox></LoadingBox>}
            {errorUpdate && (
              <MessageBox variant="danger">{errorUpdate}</MessageBox>
            )}
            {successUpdate && (
              <MessageBox variant="success">
               مشخصات تغییر یافت
              </MessageBox>
            )}
            <div>
              <div className="profile-image">
                <img src={userInfo.profile}></img>
              </div>
            </div>
            <div>
              <label htmlFor="name">نام</label>
              <input
                id="name"
                type="text"
                placeholder="نام را وارد کنید"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="phonenumber"> شماره تلفن همراه </label>
              <input
                id="tel"
                placeholder="شماره تلفن همراه را وارد کنید "
                value={phonenumber}
                required
                onChange={(e) => setPhonenumber(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="email">ایمیل</label>
              <input
                id="email"
                type="email"
                placeholder="ایمیل را وارد کنید "
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="imageFile">تصویر پروفایل</label>
              <input
                type="file"
                id="profile"
                label="تصویر پروفایل "
                onChange={uploadFileHandler}
              ></input>
              {loadingUpload && <LoadingBox></LoadingBox>}
              {errorUpload && (
                <MessageBox variant="danger">{errorUpload}</MessageBox>
              )}
            </div>
            <div>
              <label htmlFor="password">کلمه عبور </label>
              <input
                id="password"
                type="password"
                placeholder="کلمه عبور را وارد کنید "
                onChange={(e) => setPassword(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="confirmPassword">تایید کلمه عبور </label>
              <input
                id="confirmPassword"
                type="password"
                placeholder="لطفا کلمه عبور را دوباره وارد کنید "
                onChange={(e) => setConfirmPassword(e.target.value)}
              ></input>
            </div>
            {user.isSeller && (
              <>
                <h2>فروشنده</h2>
                <div>
                  <label htmlFor="sellerName">نام فروشنده </label>
                  <input
                    id="sellerName"
                    type="text"
                    placeholder="نام فروشنده را وارد کنید"
                    value={sellerName}
                    onChange={(e) => setSellerName(e.target.value)}
                  ></input>
                </div>
                <div>
                  <label htmlFor="sellerLogo">لوگوی فروشنده را وارد کنید </label>
                  <input
                    id="sellerLogo"
                    type="text"
                    placeholder="لطفا لوگوی فروشنده را با لینک وارد کنید "
                    value={sellerLogo}
                    onChange={(e) => setSellerLogo(e.target.value)}
                  ></input>
                </div>
                <div>
                  <label htmlFor="sellerDescription">معرفی  فروشنده </label>
                  <input
                    id="sellerDescription"
                    type="text"
                    placeholder="معرفی فروشنده"
                    value={sellerDescription}
                    onChange={(e) => setSellerDescription(e.target.value)}
                  ></input>
                </div>
              </>
            )}
            <div>
              <label />
              <button className="primary" type="submit">
                ثبت
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
}
