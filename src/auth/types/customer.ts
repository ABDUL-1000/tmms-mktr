import axios from "axios";

export const createCustomer = async (customerData: {  phone_number: string; first_name: string; last_name: string; other_name: string; address: string; city: string; state: string; country: string; password: string; password_confirmation: string; }) => {
  const options = {
    method: "POST",
    url: "https://tms.sdssn.org/api/marketers/customers",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    data: customerData,
  };

  const { data } = await axios.request(options);
  return data;
};

