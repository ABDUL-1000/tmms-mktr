// types.ts
export interface Purchase {
  id: number;
  name: string;
  refinery_name: string;
  liters: number;
  amount: number;
  status: string;
  created_at: string;
  data: { liters: number;
    pfi_number: string;
    status: string;
    created_at: string;
    amount: number;
    product: {
      product_type: {
        name: string;
      }
    }
  }
}
  