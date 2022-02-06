import axios from 'axios';
import env from '@config/env';

const BooruClient = axios.create({
  baseURL: env.BOORU_URL,
  timeout: 15000,
  params: {
    page: 'dapi',
    s: 'post',
    q: 'index',
    json: 1,
  },
});

export default BooruClient;
