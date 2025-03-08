export interface SignupFormData {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
    phone_number: string;
    address: string;
    city: string;
    state: string;
    
    country: string;
    license_number: string;
    license_details: string;
   
  
    description: string;
  }
  
  export interface ApiResponse {
    success: boolean;
    message: string;
    token: string;
   
 
  }
