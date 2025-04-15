import axios from 'axios';

export const logout = async (token: string): Promise<any> => {
  const Token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  
  try {
    const response = await axios.post(
      'https://tms.sdssn.org/api/logout',
      {}, 
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${Token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
