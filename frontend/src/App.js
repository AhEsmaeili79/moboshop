import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import { signout } from './actions/userActions';
import AdminRoute from './components/AdminRoute';
import PrivateRoute from './components/PrivateRoute';
import CartScreen from './screens/CartScreen';
import HomeScreen from './screens/HomeScreen';
import OrderHistoryScreen from './screens/OrderHistoryScreen';
import OrderScreen from './screens/OrderScreen';
import PaymentMethodScreen from './screens/PaymentMethodScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import ProductListScreen from './screens/ProductListScreen';
import ProductScreen from './screens/ProductScreen';
import ProfileScreen from './screens/ProfileScreen';
import RegisterScreen from './screens/RegisterScreen';
import ShippingAddressScreen from './screens/ShippingAddressScreen';
import SigninScreen from './screens/SigninScreen';
import ProductEditScreen from './screens/ProductEditScreen';
import OrderListScreen from './screens/OrderListScreen';
import UserListScreen from './screens/UserListScreen';
import UserEditScreen from './screens/UserEditScreen';
import SellerRoute from './components/SellerRoute';
import SellerScreen from './screens/SellerScreen';
import SearchBox from './components/SearchBox';
import SearchScreen from './screens/SearchScreen';
import { listProductCategories } from './actions/productActions';
import LoadingBox from './components/LoadingBox';
import MessageBox from './components/MessageBox';
import MapScreen from './screens/MapScreen';
import DashboardScreen from './screens/DashboardScreen';
import SupportScreen from './screens/SupportScreen';
import ChatBox from './components/ChatBox';

function App() {
  const cart = useSelector((state) => state.cart);
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const { cartItems } = cart;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();
  const signoutHandler = () => {
    dispatch(signout());
  };

  const productCategoryList = useSelector((state) => state.productCategoryList);
  const {
    loading: loadingCategories,
    error: errorCategories,
    categories,
  } = productCategoryList;
  useEffect(() => {
    dispatch(listProductCategories());
  }, [dispatch]);
  return (
    <BrowserRouter>
      <div className="grid-container ">
        <header className="row ">
      
        <a className="brand" href="/">موبوشاپ</a>
        {userInfo ? (
         <h1 className="welcome"> {userInfo.name} خوش آمدید </h1>
         ) : (
              <b></b>
            )}
        </header>
         <div className="sidebar">
          <div className="logo-details">
          <i className='bx bx-mobile-alt icon'></i>
              <div className="logo_name"><a  href="/">موبوشاپ
            </a></div>
              <i className='bx bx-menu' id="btn" ></i>
          </div>
          <ul className="nav-list">
            <li>
            <Route
              render={({ history }) => (
                <SearchBox history={history}></SearchBox>
              )}
            ></Route>
            </li>
            <li>
              <a href="/cart">
              
                <i className='bx bx-cart-alt' >{cartItems.length > 0 && (<span className="ibadge"> {cartItems.length}  </span>)}</i>
               
               <span className="links_name"> سبد خرید {cartItems.length > 0 && (<span className="badge">{cartItems.length} </span>)}</span> 
            
              </a>
              <span className="tooltip">سبد خرید</span>
            </li>
            <li>
              <a href="/profile">
                <i className='bx bx-user' ></i>
                <span className="links_name">پروفایل</span>
              </a>
              <span className="tooltip">پروفایل</span>
            </li>

            {userInfo ? (
              <div>
                <li>
                  <a href="/orderhistory">
                  <i className='bx bx-history'></i>
                    <span className="links_name">سفارشات</span>
                  </a>
                  <span className="tooltip">سفارشات</span>
                </li> 
              </div>
              
            ) : (
              
              <b></b>
              
            )}
           
            <li>
              <div className="iocn-link">
                <a className="link-menu" href="#">
                  <i className='bx bx-collection' ></i>
                  <span className="links_name">برند ها </span>
                </a>
                <i className='bx bxs-chevron-down arrow' ></i>
                <span className="tooltip">برند ها </span>
              </div>
                <ul className="sub-menu">
                {loadingCategories ? (
                    <LoadingBox></LoadingBox>
                  ) : errorCategories ? (
                    <MessageBox variant="danger">{errorCategories}</MessageBox>
                  ) : (
                    categories.map((c) => (
                      <Link
                          to={`/search/category/${c}`}
                          onClick={() => setSidebarIsOpen(false)} >
                          <li key={c}><span className="submenu">{c}</span ></li> </Link>
                  ))
                  )}
                </ul>
                <ul className="hover-menu"> 

                {loadingCategories ? (
                    <LoadingBox></LoadingBox>
                  ) : errorCategories ? (
                    <MessageBox variant="danger">{errorCategories}</MessageBox>
                  ) : (
                    categories.map((c) => (
                      <Link
                          to={`/search/category/${c}`}
                          onClick={() => setSidebarIsOpen(false)} >
                          <li key={c}><span className="submenu">{c}</span ></li> </Link> 
                    ))
                  )}
                </ul>
              </li>
                {userInfo && userInfo.isSeller && (
                  <li>
                  <div className="iocn-link">
                    <a className="link-menu" href="#">
                    <i className='bx bxs-shopping-bags' ></i>
                      <span className="links_name">فروشنده</span>
                    </a>
                    <i className='bx bxs-chevron-down arrow' ></i>
                    <span className="tooltip">فروشنده</span>
                  </div>
                    <ul className="sub-menu">
                    <Link to="/productlist/seller"><li><span className="submenu">محصولات</span ></li></Link>
                    <Link to="/orderlist/seller"><li><span className="submenu">سفارشات</span ></li></Link>
                    </ul>
                    <ul className="hover-menu">
                    <Link to="/productlist/seller"><li><span className="submenu">محصولات</span ></li></Link>
                    <Link to="/orderlist/seller"><li><span className="submenu">سفارشات</span ></li></Link>
                    </ul>
                </li>
                )}

            {userInfo && userInfo.isAdmin && (
            <li>
              <div className="iocn-link">
                <a className="link-menu" href="#">
                <i className='bx bx-cog' ></i>
                  <span className="links_name">  مدیریت </span>
                </a>
                <i className='bx bxs-chevron-down arrow' ></i>
                <span className="tooltip">مدیریت </span>
              </div>
                <ul className="sub-menu">
                  <Link to="/dashboard"><li><span className="submenu"> داشبورد </span ></li></Link>
                  <Link to="/productlist"><li><span className="submenu">محصولات</span ></li></Link>
                  <Link to="/orderlist"><li><span className="submenu">سفارشات</span ></li> </Link>
                  <Link to="/userlist"><li><span className="submenu">کاربران</span ></li> </Link>
                  <Link to="/support"><li><span className="submenu">پشتیبانی</span ></li> </Link>
                </ul>
                <ul className="hover-menu">
                <Link to="/dashboard"><li><span className="submenu"> داشبورد </span ></li></Link>
                  <Link to="/productlist"><li><span className="submenu">محصولات</span ></li></Link>
                  <Link to="/orderlist"><li><span className="submenu">سفارشات</span ></li> </Link>
                  <Link to="/userlist"><li><span className="submenu">کاربران</span ></li> </Link>
                  <Link to="/support"><li><span className="submenu">پشتیبانی</span ></li> </Link>
                </ul>
            </li>
             )}
            <li className="profile">
            {userInfo ? (
                <div className="profile-details">
                  <img src={userInfo.profile}></img>
                  <div className="name_job">
                    <div className="name">{userInfo.name}</div>
                  </div>
                  <Link to="#signout" onClick={signoutHandler}>
                <i className='bx bx-log-out' id="log_out" ></i>
                </Link>
                </div>
               ) : (
                
                  <a className="log_out" to="/signin"><i className='bx bx-log-in' id="log_in" ></i></a>
                  )}
                  
            </li>
            
          </ul>
        </div>
        <main>
          <Route path="/seller/:id" component={SellerScreen}></Route>
          <Route path="/cart/:id?" component={CartScreen}></Route>
          <Route path="/product/:id" component={ProductScreen} exact></Route>
          <Route
            path="/product/:id/edit"
            component={ProductEditScreen}
            exact
          ></Route>
          <Route path="/signin" component={SigninScreen}></Route>
          <Route path="/register" component={RegisterScreen}></Route>
          <Route path="/shipping" component={ShippingAddressScreen}></Route>
          <Route path="/payment" component={PaymentMethodScreen}></Route>
          <Route path="/placeorder" component={PlaceOrderScreen}></Route>
          <Route path="/order/:id" component={OrderScreen}></Route>
          <Route path="/orderhistory" component={OrderHistoryScreen}></Route>
          <Route
            path="/search/name/:name?"
            component={SearchScreen}
            exact
          ></Route>
          <Route
            path="/search/category/:category"
            component={SearchScreen}
            exact
          ></Route>
          <Route
            path="/search/category/:category/name/:name"
            component={SearchScreen}
            exact
          ></Route>
          <Route
            path="/search/category/:category/name/:name/min/:min/max/:max/rating/:rating/order/:order/pageNumber/:pageNumber"
            component={SearchScreen}
            exact
          ></Route>
          <PrivateRoute
            path="/profile"
            component={ProfileScreen}
          ></PrivateRoute>
          <PrivateRoute path="/map" component={MapScreen}></PrivateRoute>
          <AdminRoute
            path="/productlist"
            component={ProductListScreen}
            exact
          ></AdminRoute>
          <AdminRoute
            path="/productlist/pageNumber/:pageNumber"
            component={ProductListScreen}
            exact
          ></AdminRoute>
          <AdminRoute
            path="/orderlist"
            component={OrderListScreen}
            exact
          ></AdminRoute>
          <AdminRoute path="/userlist" component={UserListScreen}></AdminRoute>
          <AdminRoute
            path="/user/:id/edit"
            component={UserEditScreen}
          ></AdminRoute>

          <AdminRoute
            path="/dashboard"
            component={DashboardScreen}
          ></AdminRoute>
          <AdminRoute path="/support" component={SupportScreen}></AdminRoute>

          <SellerRoute
            path="/productlist/seller"
            component={ProductListScreen}
          ></SellerRoute>
          <SellerRoute
            path="/orderlist/seller"
            component={OrderListScreen}
          ></SellerRoute>

          <Route path="/" component={HomeScreen} exact></Route>
        </main>
        <footer className="row center ">
          {userInfo && !userInfo.isAdmin && <ChatBox className="chatbox-button" userInfo={userInfo} />}
            <div className="footer-content">
              <Link  to="/">
              <h3>موبوشاپ</h3>
              </Link>
              <ul className="socials">
                <li><a href="https://www.facebook.com"><i className="fa fa-facebook"></i></a></li>
                <li><a href="https://www.twitter.com"><i className="fa fa-twitter "> </i></a></li>
                <li><a href="https://www.youtube.com"><i className="fab fa-youtube "></i></a></li>
                <li><a href="https://www.instagram.com"><i className="fa fa-instagram "></i></a></li>
                <li><a href="https://www.linkedin.com"><i className="fa fa-linkedin-square "></i></a></li>
              </ul>
          </div>
          <div className="footer-bottom"><p><a href="https://qom.tvu.ac.ir/fa/page/923" target="_blank"> University Of Qom</a> Project &copy;2021 Moboshop</p><p> Powered by <a  href="https://github.com/amirhosseine13579/" target="_blank">Amirhossein</a></p> </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
