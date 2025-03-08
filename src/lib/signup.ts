import axios from 'axios';
import { ApiResponse, SignupFormData } from '@/auth/types/signUp';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://tms.sdssn.org/api';

export const signupMarketer = async (formData: SignupFormData): Promise<ApiResponse> => {
  try {
    const response = await axios.post<ApiResponse>(`${BASE_URL}/register/marketer`, formData, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });

    // Extract the token from response data (adjust this based on API response format)
    const token = response.data?.token;  

    if (token) {
      localStorage.setItem('authToken', token); // Store token in localStorage
    }

    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || 'An unexpected error occurred. Please try again later.'
    );
  }
};
