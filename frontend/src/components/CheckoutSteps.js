import React from 'react';

export default function CheckoutSteps(props) {
  return (
    <div className="row checkout-steps">
      <div className={props.step1 ? 'active' : ''}>ورود</div>
      <div className={props.step2 ? 'active' : ''}>حمل</div>
      <div className={props.step3 ? 'active' : ''}>پرداخت</div>
      <div className={props.step4 ? 'active' : ''}>ثبت سفارش</div>
    </div>
  );
}
