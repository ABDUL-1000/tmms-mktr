import axios from 'axios';

export interface LoginResponse {
  token: string;
  user?: {
    id: string;
    name: string;
    email: string;
  };
  message: string;
  success: boolean; // Optional if your backend includes a success flag
}

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://tms.sdssn.org/api';

export const loginUser = async (email: string, password: string): Promise<LoginResponse> => {
  try {
    const response = await axios.post(
      `${BASE_URL}/login`,
      { email, password },
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      }
    );

    console.log('Server Response:', response.data); // Debug server response
    return response.data;
  } catch (error: any) {
    console.error('Error Response:', error.response?.data); // Debug error response
    throw new Error(error.response?.data?.message || 'Login failed. Please try again.');
  }
};
