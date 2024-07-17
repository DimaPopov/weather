
export const cashCities = [];

export const getCities = async (q) => {
  if (cashCities?.[q]) return cashCity?.[q];

  const response = await fetch("https://api.cloud-apps.ru/srw/getCity", {
    method: "POST",
    body: JSON.stringify({
      q: q
    })
  });

  const json = await response.json();
  const cities = json.response;

  cashCities[q] = cities;
  return cities;
};
