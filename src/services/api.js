import axios from 'axios';

function createApi() {
  const apiUrl = import.meta.env.DEV
    ? import.meta.env.PUBLIC_API_URL_LOCAL
    : import.meta.env.PUBLIC_API_URL_PRODUCTION;

  const instance = axios.create({
    baseURL: apiUrl || 'http://127.0.0.1:8000/api',
  });

  instance.interceptors.request.use(
    (config) => {
      config.headers = config.headers || {};
      config.headers['Content-Type'] = 'application/json';
      return config;
    },
    (error) => Promise.reject(error)
  );

  instance.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject(error)
  );

  return instance;
}

export async function requestNoToken({ method, url, data, params }) {
  const api = createApi();
  const config = { params };

  const response = await api.request({ method, url, data, ...config });
  return response.data;
}

export async function fetchTiendas() {
  const response = await requestNoToken({ method: 'GET', url: '/pnte-public/tiendas' });
  return response.data;
}

export async function fetchTiendaById(id) {
  const response = await requestNoToken({ method: 'GET', url: `/pnte-public/show-tienda/${id}` });
  return response.data;
}

export async function enviarContacto(data) {
  const response = await requestNoToken({ method: 'POST', url: '/pnte-public/new-contactanos', data });
  return response;
}
