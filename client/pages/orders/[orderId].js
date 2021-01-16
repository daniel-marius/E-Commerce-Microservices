import { useEffect, useState } from 'react';
import Router from 'next/router';
import StripeCheckout from 'react-stripe-checkout';

import useRequest from '../../hooks/use-request';

const OrderShow = ({ order, currentUser }) => {
  const [timeLeft, setTimeLeft] = useState(0);
  const { doRequest, errors } = useRequest({
    url: '/api/payments',
    method: 'post',
    body: {
      orderId: order.id
    },
    onSuccess: () => Router.push('/orders')
  });

  useEffect(() => {
    const findTimeLeft = () => {
      const msLeft = new Date(order.expiresAt) - new Date();
      setTimeLeft(Math.round(msLeft / 1000));
    };

    findTimeLeft();
    const timerId = setInterval(findTimeLeft, 1000);

    // this function is invoked if we navigate away or
    // if the component is re-rendered
    return () => {
      clearInterval(timerId);
    };
  }, [order]);

  if (timerId < 0) {
    return <div>Order expired!<div>;
  }

  return (
    <div>Time left to pay: { timeLeft } seconds</div>
    <StripeCheckout
      token={({ id }) => doRequest(token: id)}
      stripeKey=process.env.STRIPE_API_PK
      amount={order.ticket.price * 100}
      email={currentUser.email}
    />
    { errors }
  );
};

OrderShow.getInitialProps = async (context, client) => {
  const { orderId } = context.query;
  const { data } = await client.get(`/api/orders/${orderId}`);

  return { order: data };
};

export default OrderShow;
