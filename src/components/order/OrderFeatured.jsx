import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

const OrderFeatured = ({ order }) => {
  const history = useHistory();

  const onClickItem = () => {
    if (!order.id) return;
    history.push(`/order/${order.id}`);
  };

  return (
    <SkeletonTheme color="#e1e1e1" highlightColor="#f2f2f2">
      <div className="order-card" onClick={onClickItem} role="presentation">
        <div className="order-info">
          <h4>Order #{order.id ||<Skeleton width={80}/>}</h4>
          <span className={`status ${order.orderStatus?.toLowerCase()}`}>
            {order.orderStatus ||<Skeleton width={80} />}
          </span>
          <div className="price">${order.totalPrice?.toLocaleString() || <Skeleton width={80}/>}</div>
        </div>
      </div>
      </SkeletonTheme>
    
  );
};

OrderFeatured.propTypes = {
  order: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    orderStatus: PropTypes.string,
    totalPrice: PropTypes.number,
  }).isRequired,
};

export default OrderFeatured;
