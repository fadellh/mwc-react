import React from 'react';
import { withRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Boundary } from '@/components/common';
import { useDocumentTitle, useScrollTop } from '@/hooks';
import { OrderList } from '@/components/order';

// Replace with your own components
import OrderTable from './OrderTable';

const Orders = () => {
  useDocumentTitle('Order List | MWC Admin');
  useScrollTop();

  const store = useSelector((state) => ({
    orders: state.orders,
    filteredOrders: state.orders,
    isLoading: state.app.loading,
    requestStatus: state.app.requestStatus
  }));

  return (
    <Boundary>
      {/* <OrdersNavbar
        ordersCount={store.orders.items?.length || 0}
        totalOrdersCount={store.orders.total || 0}
      /> */}
      <div className="order-admin-items">
        {/* Add filter or other components as needed */}
        {/* <OrderTable orders={store.orders || []} /> */}
        <OrderList {...store}>
          <OrderTable filteredOrders={[]} />
        </OrderList>
      </div>
    </Boundary>
  );
};

export default withRouter(Orders);