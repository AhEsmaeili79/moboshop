import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import data from '../data.js';
import User from '../models/userModel.js';
import { generateToken, isAdmin, isAuth } from '../utils.js';
// import emailjs from 'emailjs-com';
// import { name } from 'ejs';


const userRouter = express.Router();

userRouter.get(
  '/top-sellers',
  expressAsyncHandler(async (req, res) => {
    const topSellers = await User.find({ isSeller: true })
      .sort({ 'seller.rating': -1 })
      .limit(2);
    res.send(topSellers);
  })
);

userRouter.get(
  '/seed',
  expressAsyncHandler(async (req, res) => {
   
    const createdUsers = await User.insertMany(data.users);
    res.send({ createdUsers });
  })
);

userRouter.post(
  '/signin',
  expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        res.send({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          isSeller: user.isSeller,
          token: generateToken(user),
        });
        return;
      }
    }
    res.status(401).send({ message: 'ایمیل یا کلمه عبور شما نادرست است .' });
  })
);


userRouter.post(
  '/register',
  expressAsyncHandler(async (req, res) => {
    const userdefind = await User.findOne({ email: req.body.email });
    const phonenumberdefind = await User.findOne({ phonenumber: req.body.phonenumber });
    const phonenumberlength = req.body.phonenumber.toString().length;
    if (!userdefind) {
      if(!phonenumberdefind){
        if(phonenumberlength == 10){
          const user = new User({
            name: req.body.name,
            email: req.body.email,
            phonenumber: req.body.phonenumber,
            password: bcrypt.hashSync(req.body.password, 8),
          });
          const createdUser = await user.save();
          res.send({
            _id: createdUser._id,
            name: createdUser.name,
            phonenumber: createdUser.phonenumber,
            email: createdUser.email,
            isAdmin: createdUser.isAdmin,
            isSeller: user.isSeller,
            token: generateToken(createdUser),
          });
          return;

          // emailjs.sendForm('service_bf7q9pt','template_dgxke3y', req.body.email,'user_ISdE296sCHUviZOFHGItt' )
          // .then(function(response) {
          //   console.log('SUCCESS!', response.status, response.text);
          // }, function(err) {
          //   console.log('FAILED...', err);
          // });
        }
        else{
          res.status(401).send({ message: 'شماره تلفن باید ده رقم باشد (بدون صفر)' });
        }
      }
      else{
        res.status(401).send({ message: 'شماره تلفن همراه قبلا استفاده شده است' });
      }
    }
    else{
      res.status(401).send({ message: 'ایمیل قبلا استفاده شده است' });
    }
  })
);

userRouter.get(
  '/:id',
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
      res.send(user);
    } else {
      res.status(404).send({ message: 'کاربر پیدا نشد' });
    }
  })
);
userRouter.put(
  '/profile',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    const phonenumberlength = req.body.phonenumber.toString().length;
    if(phonenumberlength == 10){
      if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.phonenumber = req.body.phonenumber || user.phonenumber;
        user.profile = req.body.profile || user.profile;
        if (user.isSeller) {
          user.seller.name = req.body.sellerName || user.seller.name;
          user.seller.logo = req.body.sellerLogo || user.seller.logo;
          user.seller.description =
            req.body.sellerDescription || user.seller.description;
        }
        if (req.body.password) {
          user.password = bcrypt.hashSync(req.body.password, 8);
        }
        const updatedUser = await user.save();
        res.send({
          _id: updatedUser._id,
          name: updatedUser.name,
          email: updatedUser.email,
          profile: updatedUser.profile,
          phonenumber: updatedUser.phonenumber,
          isAdmin: updatedUser.isAdmin,
          isSeller: user.isSeller,
          token: generateToken(updatedUser),
        });
      }
    }
    else{
      res.status(401).send({ message: 'شماره تلفن باید ده رقم باشد  (بدون صفر)' });
    }
  })
);

userRouter.get(
  '/',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const users = await User.find({});
    res.send(users);
  })
);

userRouter.delete(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
      if (user.email === 'admin@example.com') {
        res.status(400).send({ message: 'نمیتوان مدیر سایت را حذف کرد ' });
        return;
      }
      const deleteUser = await user.remove();
      res.send({ message: 'کاربر حذف شد', user: deleteUser });
    } else {
      res.status(404).send({ message: 'کاربر پیدا نشد' });
    }
  })
);

userRouter.put(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.phonenumber = req.body.phonenumber || user.phonenumber;
      user.isSeller = Boolean(req.body.isSeller);
      user.isAdmin = Boolean(req.body.isAdmin);
      const updatedUser = await user.save();
      res.send({ message: 'کاربر تغییر یافت', user: updatedUser });
    } else {
      res.status(404).send({ message: 'کاربر پیدا نشد ' });
    }
  })
);

export default userRouter;
