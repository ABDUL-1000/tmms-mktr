
export interface ProgramTruck {
    id: number;
    name: string;
    refinery_name: string;
    liters: number;
    amount: number;
    atc_number:number;
  
    
    comment:string;
    status: string;
    product_type: string;
    created_at: string;
    data: { liters: number;
      pfi_number: string;
      status: string;
      created_at: string;
      amount: number;
    
      
      id:number
      product: {
        product_type: {
          name: string;
        }
      }
    }
}
export interface ProgramData {
  amount: number;
  pfi_number: string;
  status: string;
  liters: number;
  created_at: string;
  data:string;
  purchase: {
    pfi_number: string;
    amount: number;
    product: {
      price: number;
      
      product_type: {
        name: string;
      };
    }
  };
}
