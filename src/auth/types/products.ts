export interface Product {
  id: number;
  name: string;
  pricePerLiter: any;
  refinery: {
    user: {
      name: string;
      email: string;
    };
    status: string;
    updated_at: number;
  };
  product_type: {
    name: string;
  };
  amountCostNGN: number;
  amountCostUSD: number;
  lastUpdated: string;
  status: string;
  price: string;
  updated_at: number;
}