import { useState, useEffect } from 'react';
import { useDidMount } from '@/hooks';
import { useSelector } from 'react-redux';
import api from '@/services/mwcApi';

const useOrderList = (limit) => {
  const { profile } = useSelector((state) => ({ profile: state.profile }));

  const [orders, setOrders] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const didMount = useDidMount(true);

  const fetchOrderList = async () => {
    try {
      setLoading(true);
      setError('');
      const docs = await api.getOrders(limit, profile.customerId);

      if (docs.length === 0) {
        if (didMount) {
          setError('No orders found.');
          setLoading(false);
        }
      } else {
        const items = docs.map((snap) => ({
          id: snap.orderNumber,
          orderNumber: snap.orderNumber,  
          orderStatus: snap.orderStatus,
          totalPrice: snap.totalPrice,
        }));

        if (didMount) {
          setOrders(items); // Update orders state
          setLoading(false);
        }
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
      if (didMount) {
        setError('Failed to fetch orders');
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    if (orders.length === 0 && didMount) {
      fetchOrderList();
    }
  }, [limit, didMount]);

  return {
    orders,
    fetchOrderList,
    isLoading,
    error,
  };
};

export default useOrderList;
