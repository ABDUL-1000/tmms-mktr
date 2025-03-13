import axios, { AxiosInstance } from "axios";
const API_BASE_URL = "https://tms.sdssn.org/api/marketers";

const api: AxiosInstance = axios.create({
    baseURL: "https://tms.sdssn.org/api",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  api.interceptors.response.use((config)=> {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
  },(error)=> Promise.reject(error));    

   export const fetchData = async <T>(programs: string): Promise<T> => {
    try {
      const response = await api.get(`${programs}`);
      return response.data as T;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
    
  }
  export const postData = async <T>(programs: string, id: string, data: any): Promise<T> => {
    try {
      const response = await api.post<T>(`/${programs}/${id}`, data);;
      return response.data as T;
    } catch (error) {
      console.error(`error updating `, error);
      throw error;
    }
    
  }
  
  export const putData = async <T>(programs: string, id: string, data: any): Promise<T> => {
    try {
      const response = await api.put<T>(`/${programs}/${id}`, data);;
      return response.data as T;
    } catch (error) {
      console.error(`error updating `, error);
      throw error;
    }
    
  }
  
  export const deleteData = async <T>(programs: string, id: string, data: any): Promise<T> => {
    try {
      const response = await api.delete<T>(`/${programs}/${id}`, data);;
      return response.data as T;
    } catch (error) {
      console.error(`error updating `, error);
      throw error;
    }
    
  }
  