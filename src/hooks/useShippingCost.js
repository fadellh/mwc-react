import { useState, useEffect, useCallback } from 'react';
import apiService from '@/services/mwcApi';
import { displayActionMessage } from '@/helpers/utils';


const useShippingCost = (initialPayload = null) => {
  const [shippingCostData, setShippingCostData] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchShippingCost = useCallback(async (payload) => {
    try {
      setLoading(true);
      setError('');
      const data = await apiService.previewShippingCost(payload);
      setShippingCostData(data);
      setLoading(false);
      displayActionMessage('Calculate shipping cost', 'success');
    } catch (err) {
      console.error("Error fetching shipping cost:", err);
      setError("Failed to fetch shipping cost");
      setLoading(false);
    }
  }, []);

  // If an initial payload is provided, fetch the shipping cost when the hook mounts.
  useEffect(() => {
    if (initialPayload) {
      fetchShippingCost(initialPayload);
    }
  }, [initialPayload]);

  return {
    shippingCostData,
    fetchShippingCost,
    isLoading,
    error,
  };
};

export default useShippingCost;
