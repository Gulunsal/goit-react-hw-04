import axios from 'axios';

// Buraya API anahtarını doğrudan ekliyoruz
const API_KEY = 'UrJVkgWhoSglLMc8nUliyDtyz2qZfJYa4FW8WuwHwig';
const BASE_URL = 'https://api.unsplash.com';

export const fetchImages = async (query, page = 1) => {
  const response = await axios.get(`${BASE_URL}/search/photos`, {
    params: {
      query,
      page,
      per_page: 12,
      client_id: API_KEY, // API anahtarı buradan gönderiliyor
    },
  });
  return response.data;
};

