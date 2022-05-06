export const signIn = async (body: Record<string, string>, path: string) => {
  const response = await fetch(path, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(body),
  });

  return response.json();
};
