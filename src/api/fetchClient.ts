
const BASE_URL = `https://api.nasa.gov`;


type RequestMethod = 'GET';

function request<T>(
  url = '',
  method: RequestMethod = 'GET',
  data: unknown = null,
): Promise<T> {
  const options: RequestInit = { method };

  if (data) {
    options.body = JSON.stringify(data);
    options.headers = {
      'Content-Type': 'application/json; charset=UTF-8',
    };
  }

  return fetch(BASE_URL + url, options)
    .then(response => {
      if (!response.ok) {
        throw new Error();
      }

      return response.json() as Promise<T>;
    });
}

export const client = {
  get: <T>(url: string) => request<T>(url),
};
