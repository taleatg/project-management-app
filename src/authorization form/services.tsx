const baseUrl = 'https://project-management-app.herokuapp.com';

export const signIn = async (body: Record<string, string>, path: string, method: string) => {
  const response = await fetch(`${baseUrl}/${path}`, {
    method: method,
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(body),
  });

  return response.json();
};

export const deleteUser = async (path: string, token: string) => {
  await fetch(`${baseUrl}/${path}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const updateUser = async (
  body: Record<string, string>,
  path: string,
  method: string,
  token: string
) => {
  const response = await fetch(`${baseUrl}/${path}`, {
    method: method,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(body),
  });

  return response.json();
};
