import React from "react";
import PropTypes from 'prop-types';
import { displayDate, displayMoney } from '@/helpers/utils';

export default function OrderItem({ order, onUpdate, onDelete }) {
  const handleStatusChange = (e) => {
    onUpdate({ ...order, status: e.target.value });
  };

  return (
    <div className="order-item">
      <h3>Order ID: {order.id}</h3>
      <p>Customer: {order.customerName}</p>
      <p>Email: {order.customerEmail}</p>
      <p>Order Date: {displayDate(order.date)}</p>
      <p>Total Amount: {displayMoney(order.total)}</p>
      <p>Status: 
        <select value={order.status} onChange={handleStatusChange}>
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="delivered">Delivered</option>
        </select>
      </p>
      <p>Total Items: {order.items?.length || 0}</p>
      <button className="button button-danger" onClick={() => onDelete(order.id)}>Delete Order</button>
    </div>
  );
}

OrderItem.propTypes = {
  order: PropTypes.shape({
    id: PropTypes.string.isRequired,
    customerName: PropTypes.string.isRequired,
    customerEmail: PropTypes.string.isRequired,
    date: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
    status: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(PropTypes.object).isRequired
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
};