
import { PayPalButton } from 'react-paypal-button-v2';
import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { deliverOrder, detailsOrder, payOrder } from '../actions/orderActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import ZarinPalCheckout from 'zarinpal-checkout';

import {
  ORDER_DELIVER_RESET,
  ORDER_PAY_RESET,
} from '../constants/orderConstants';

export default function OrderScreen(props) {
  const orderId = props.match.params.id;
  const [sdkReady, setSdkReady] = useState(false);
  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;


  
  const orderPay = useSelector((state) => state.orderPay);
  const {
    loading: loadingPay,
    error: errorPay,
    success: successPay,
  } = orderPay;
  const orderDeliver = useSelector((state) => state.orderDeliver);
  const {
    loading: loadingDeliver,
    error: errorDeliver,
    success: successDeliver,
  } = orderDeliver;
  const dispatch = useDispatch();
  useEffect(() => {
    const addPayPalScript = async () => {
      const { data } = await Axios.get('/api/config/paypal');
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = `https://www.zarinpal.com/sdk/js?client-id=${data}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };
    if (
      !order ||
      successPay ||
      successDeliver ||
      (order && order._id !== orderId)
    ) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch({ type: ORDER_DELIVER_RESET });
      dispatch(detailsOrder(orderId));
    } else {
      if (!order.isPaid) {
        if (!window.paypal) {
          addPayPalScript();
        } else {
          setSdkReady(true);
        }
      }
    }
  }, [dispatch, orderId, sdkReady, successPay, successDeliver, order]);

  
  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(order, paymentResult));
  };
  const deliverHandler = () => {
    dispatch(deliverOrder(order._id));
  };

  const payment = async (t) => {
/**
 * Create ZarinPal
 * @param {String} `1aaccd0b-9c1b-405c-8952-f21f8bd277bc` [Merchant ID]
 * @param {Boolean} false [toggle `Sandbox` mode]
 */
 const zarinpal = ZarinPalCheckout.create('1aaccd0b-9c1b-405c-8952-f21f8bd277bc', false);
  
 /**
 * PaymentRequest [module]
 * @return {String} 
 */
zarinpal.PaymentRequest({
  Amount: t.totalPrice , // In Tomans
  CallbackURL: 'https://your-safe-api/example/zarinpal/validate',
  Description: 'A Payment from Node.JS',
  Email: 'test@test.work',
  Mobile: '09120000000'
}).then(response => {
  if (response.status === 100) {
    console.log(response.url);
    window.location = response.url;
    return response.url;
  }
}).catch(err => {
  console.error(err);
});

}


  return loading ? (
    <LoadingBox></LoadingBox>
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
   
    <div className="fixing-order">
      <h1>سفارش :  {order._id}</h1>
      <div className="row top">
        <div className="col-2">
          <ul>
            <li>
              <div className="card card-body">
                <h2>حمل و انتقال</h2>
                <p>
                  <strong>نام :</strong> {order.shippingAddress.fullName} <br />
                  <strong>آدرس : </strong> {order.shippingAddress.address},
                  {order.shippingAddress.city},{' '}
                  {order.shippingAddress.postalCode},
                  {order.shippingAddress.country}
                </p>
                {order.isDelivered ? (
                  <MessageBox variant="success">
                       تحویل داده شده در  : {order.deliveredAt.substring(0, 10)}
                  </MessageBox>
                ) : (
                  <MessageBox variant="danger">تحویل داده نشده</MessageBox>
                )}
              </div>
            </li>
            <li>
              <div className="card card-body">
                <h2>پرداخت</h2>
                <p>
                  <strong>روش :</strong>   {order.paymentMethod}
                </p>
                {order.isPaid ? (
                  <MessageBox variant="success">
                    پرداخت در : {order.paidAt.substring(0, 10)}
                  </MessageBox>
                ) : (
                  <MessageBox variant="danger">پرداخت نشده</MessageBox>
                )}
              </div>
            </li>
            <li>
              <div className="card card-body">
                <h2>موارد سفارش</h2>
                <ul>
                  {order.orderItems.map((item) => (
                    <li key={item.product}>
                      <div className="row">
                        <div>
                          <img
                            src={item.image}
                            alt={item.name}
                            className="small"
                          ></img>
                        </div>
                        <div className="min-30">
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </div>

                        <div>
                          {item.qty} عدد  در {item.price}    تومان     = {item.qty * item.price}  تومان 
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          </ul>
        </div>
        <div className="col-1">
          <div className="card card-body">
            <ul>
              <li>
                <h2>خلاصه سفارش</h2>
              </li>
              <li>
                <div className="row">
                  <div>موارد</div>
                  <div>{order.itemsPrice} تومان </div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>حمل و انتقال</div>
                  <div>{order.shippingPrice} تومان </div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>مالیت</div>
                  <div>{order.taxPrice} تومان </div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>
                    <strong>کل سفارشات</strong>
                  </div>
                  <div>
                    <strong>{order.totalPrice} تومان </strong>
                  </div>
                </div>
              </li>
              {!order.isPaid && (
                <li>
                  {!sdkReady ? (
                    <LoadingBox></LoadingBox>
                  ) : (
                    <>
                      {errorPay && (
                        <MessageBox variant="danger">{errorPay}</MessageBox>
                      )}
                      {loadingPay && <LoadingBox></LoadingBox>}


                      <from  method="POST" >
                        <button
                          type="submit"
                          onClick={payment(order)}
                          className="primary block payment"

                        >
                          پرداخت
                        </button>
                      </from>
                      <PayPalButton
                        amount={order.totalPrice}
                        onSuccess={successPaymentHandler}
                      ></PayPalButton>
                   </> 
                  )}
                </li>
              )}
              {userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                <li>
                  {loadingDeliver && <LoadingBox></LoadingBox>}
                  {errorDeliver && (
                    <MessageBox variant="danger">{errorDeliver}</MessageBox>
                  )}
                  <button
                    type="button"
                    className="primary block"
                    onClick={deliverHandler}
                  >
                    تحویل سفارش
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
