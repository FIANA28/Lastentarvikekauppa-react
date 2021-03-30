import React from 'react';

export default function CheckoutSteps(props) {
  return (
    <div className="row checkout-steps">
        <div className={props.step1 ? 'active': ''}>Kirjaudu sisään</div>
        <div className={props.step2 ? 'active': ''}>Toimitusosoite</div>
        <div className={props.step3 ? 'active': ''}>Maksu</div>
        <div className={props.step4 ? 'active': ''}>Vahvistus</div>
    </div>
  );
}
