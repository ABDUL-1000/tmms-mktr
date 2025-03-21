import axios from "axios";
const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

export const createCustomer = async (customerData: {  phone_number: string; first_name: string; last_name: string;  address: string; city: string; state: string;  }) => {
  const options = {
    method: "POST",
    url: "https://tms.sdssn.org/api/marketers/customers",
    headers: { "Content-Type": "application/json", Accept: "application/json", Authorization: `Bearer ${token}` },
    data: customerData,
  };

  const { data } = await axios.request(options);
  return data;
};

