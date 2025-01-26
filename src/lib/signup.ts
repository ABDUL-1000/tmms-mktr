import { ApiResponse, SignupFormData } from '@/auth/types/signUp';
import axios from 'axios';


const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://tms.sdssn.org/api';

export const signupMarketer = async (formData: SignupFormData): Promise<ApiResponse> => {
  try {
    const response = await axios.post<ApiResponse>(`${BASE_URL}/register/marketer`, formData, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });

    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || 'An unexpected error occurred. Please try again later.'
    );
  }
};
