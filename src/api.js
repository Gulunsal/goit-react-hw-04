import axios from 'axios';

// Buraya API doğrudan yerleştirildi
const API_KEY = 'YOUR_UNSPLASH_API_KEY';
const BASE_URL = 'https://api.unsplash.com';

export const fetchImages = async (query, page = 1) => {
  const response = await axios.get(`${BASE_URL}/search/photos`, {
    params: {
      query,
      page,
      per_page: 12,
      client_id: API_KEY, // API anahtarı doğrudan burada kullanılıyor
    },
  });
  return response.data;
};
