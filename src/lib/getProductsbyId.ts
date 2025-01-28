import axios from 'axios';

export interface Product {
  id: string;
  name: string;
  pricePerLiter:any;
  refinery: {
    status: string;
  };
  amountCostNGN: number;
  amountCostUSD: number;
  lastUpdated: string;
  status: string;
  price: string;
  query: string;
}

export const getProductById = async (id: string): Promise<Product | null> => {
  const options = {
    method: 'GET',
    url: `https://tms.sdssn.org/api/marketers/products/${id}`,
    headers: { Accept: 'application/json' },
  };

  try {
    const { data } = await axios.request(options);
    console.log('API Response by id:', data); // Verify response structure
    return data.data || null; // Adjust based on API response
  } catch (error) {
    console.error('Error fetching product by ID:', error);
    throw error;
  }
};
