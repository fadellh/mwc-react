import React from 'react';
import PropTypes from 'prop-types';
import OrderFeatured from './OrderFeatured';

const OrderListItem = ({ order }) => (
  <div className="order-display">
    {order.id ? (
      <div>Order #{order.id}</div>
    ) : (
      <div className="order-list-skeleton">Loading order...</div>
    )}
  </div>
);

OrderListItem.propTypes = {
  order: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  })
};

OrderListItem.defaultProps = {
  order: {}
};

const OrderList = ({ orders, skeletonCount }) => (
  <div className="order-display-grid">
    {orders.length === 0
      ? Array.from({ length: skeletonCount }).map((_, index) => (
          <OrderFeatured key={`skeleton-${index}`} order={{}} />
        ))
      : orders.map((order) => (
          <OrderFeatured key={order.id} order={order} />
        ))}
  </div>
);

OrderList.propTypes = {
  orders: PropTypes.array.isRequired,
  skeletonCount: PropTypes.number
};

OrderList.defaultProps = {
  skeletonCount: 4
};

export default OrderList;