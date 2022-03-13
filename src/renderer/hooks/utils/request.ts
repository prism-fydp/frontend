export default async function request(input: string, options: object = {}) {
  let response;

  try {
    response = await fetch(input, options);
  } catch (error) {
    console.error(error);
  }

  let body;
  const contentType = response?.headers.get('content-type');
  if (response && contentType && contentType.includes('application/json')) {
    body = await response.json();
  }

  if (response && !response.ok) {
    let errorMessage = 'API response was not ok';

    if (body) {
      errorMessage = body.message || body.error;
    }

    console.error(errorMessage, body);

    return null;
  }

  return body;
}
