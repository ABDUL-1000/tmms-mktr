
export interface ProgramTruck {
    id: number;
    name: string;
    refinery_name: string;
    liters: number;
    amount: number;
    atc_number:number;
    truck_id: number;
    program_id: number;
    customer_id: string;
   
    driver_status: string;
    location: {
      latitude: number;
      longitude: number;
    }[];

	
		
    refreshPrograms: () => void;
  
    
    comment:string;
    truck: {
      id: number;
      quantity: number;
      truck_number: string;
     
      name: string;
      driver_location: string;
  
      driver: {
        location: [
          {
            latitude: number;
            longitude: number;
          }
        ]
        first_name: string;
        last_name: string;
      };
    }
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
  driver_location: string;
  first_name: string;
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
