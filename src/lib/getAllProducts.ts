import axios from 'axios';

export interface Product {
  id: string;
  name: string;
  refinery: string;
  amountCostNGN: number;
  amountCostUSD: number;
  lastUpdated: string;
  status: string;
  price: string;
}

export const getAllProducts = async (): Promise<Product[]> => {
    const options = {
      method: 'GET',
      url: 'https://tms.sdssn.org/api/marketers/products',
      headers: { Accept: 'application/json' },
    };
  
    try {
        const  { data } = await axios.request(options);
      console.log('API Response:', data); // Log the response to verify its structure
      return Array.isArray(data.data) ? data.data : []; // Ensure the return value is always an array
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  };
  