export const checkStatus = (response) => {
  if (response.ok) {
    return response;
  }
  throw new Error(`HTTP Error: ${response.status}`);
};

export const json = (response) => response.json();
