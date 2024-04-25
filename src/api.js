import { balance_scale_endpoint } from "./utils/api-endpoint";
export const postToApi = async (payload) => {
    const response = await fetch(balance_scale_endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
  
    if (!response.ok) {
      throw new Error('API request failed');
    }
  
    const data = await response.json();
    return data;
  };
  