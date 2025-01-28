import axios from 'axios';

export interface Product {
  id: number;
  name: string;
  pricePerLiter: any;
  refinery: {
    user:{
      name:string,
      email:string,
      
    }
   
    status: string;
    updated_at: number;
  };
  product_type:{
    name:string,
   
  }
  amountCostNGN: number;
  amountCostUSD: number;
  lastUpdated: string;
  status: string;
  price: string;
  updated_at: string;
  
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
  