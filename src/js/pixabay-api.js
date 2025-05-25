import axios from 'axios';

const API_KEY = '50366360-a8ee66cb63e3deacadb68e28f';
const BASE_URL = 'https://pixabay.com/api/';

export async function getImagesByQuery(query, page) {
  const params = {
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 15,
    page,
  };
  try {
    const response = await axios.get(BASE_URL, { params, timeout: 5000 });
    return response.data;
  } catch (error) {
    console.error('Error fetching images:', error);
    throw new Error('Failed to fetch images from Pixabay');
  }
}
