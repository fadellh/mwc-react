import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { Boundary, MessageDisplay } from '@/components/common';
import { setLoading } from '@/redux/actions/miscActions';
import { getOrders } from '@/redux/actions/orderActions';

const OrderList = (props) => {
  const {
    orders, filteredOrders, isLoading, requestStatus, children 
  } = props;
  
  const [isFetching, setFetching] = useState(false);
  const dispatch = useDispatch();

  const fetchOrders = () => {
    setFetching(true);
    dispatch(getOrders(orders.lastRefKey));
  };

  useEffect(() => {
    if (orders.length === 0 || !orders.lastRefKey) {
      fetchOrders();
    }
    window.scrollTo(0, 0);
    return () => dispatch(setLoading(false));
  }, []);

  useEffect(() => {
    setFetching(false);
  }, [orders.lastRefKey]);

  if (filteredOrders.length === 0 && !isLoading) {
    return <MessageDisplay message={requestStatus?.message || 'No orders found.'} />;
  } if (filteredOrders.length === 0 && requestStatus) {
    return (
      <MessageDisplay
        message={requestStatus?.message || 'Something went wrong :('}
        action={fetchOrders}
        buttonLabel="Try Again"
      />
    );
  }

  return (
    <Boundary>
      {children}
      {orders.length < orders.total && (
        <div className="d-flex-center padding-l">
          <button
            className="button button-small"
            disabled={isFetching}
            onClick={fetchOrders}
            type="button"
          >
            {isFetching ? 'Fetching Orders...' : 'Show More Orders'}
          </button>
        </div>
      )}
    </Boundary>
  );
};

OrderList.defaultProps = {
  requestStatus: null
};

OrderList.propTypes = {
  // orders: PropTypes.object.isRequired,
  filteredOrders: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
  requestStatus: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};

export default OrderList;