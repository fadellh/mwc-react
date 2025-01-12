/* eslint-disable react/forbid-prop-types */
import PropTypes from 'prop-types';
import React from 'react';
import OrderItem from './OrderItem';

function OrderTable({ filteredOrders }) {
  return (
    <div>
      {filteredOrders.length > 0 && (
        <div className="grid grid-order grid-count-6">
          <div className="grid-col"><h5>Order ID</h5></div>
          <div className="grid-col"><h5>Date</h5></div>
          <div className="grid-col"><h5>Customer</h5></div>
          <div className="grid-col"><h5>Total</h5></div>
          <div className="grid-col"><h5>Status</h5></div>
          <div className="grid-col"><h5>Actions</h5></div>
        </div>
      )}
      {filteredOrders.length === 0
        ? new Array(10).fill({}).map((order, index) => (
            <div
              key={`order-skeleton-${index}`}
              className="grid grid-order grid-count-6 skeleton"
            >
              <div className="grid-col" />
              <div className="grid-col" />
              <div className="grid-col" />
              <div className="grid-col" />
              <div className="grid-col" />
              <div className="grid-col" />
            </div>
          ))
        : filteredOrders.map((order) => (
            <OrderItem
              key={order.id}
              order={order}
              onUpdate={onUpdate}
              onDelete={onDelete}
            />
          ))}
    </div>
  );
}

OrderTable.propTypes = {
  filteredOrders: PropTypes.array.isRequired,
  onUpdate: PropTypes.func,
  onDelete: PropTypes.func,
};

OrderTable.defaultProps = {
  onUpdate: () => {},
  onDelete: () => {},
};

export default OrderTable;