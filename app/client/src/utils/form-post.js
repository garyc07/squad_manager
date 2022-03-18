
const doPost = (endpoint, data) => {
  return fetch('http://localhost:3001' + endpoint, {
    method: 'POST',
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data)
  })
}

export const newPlayer = (data) => {
  return doPost('/player', data)
};