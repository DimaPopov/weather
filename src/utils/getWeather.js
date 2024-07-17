
export const getLocalKeyWeather = (point, year, month) => `t:${point}:${year}:${month}`;

export const getWeather = async (city, year, month) => {
  const localKey = getLocalKeyWeather(city, year, month);
  if (localStorage.getItem(localKey)) return JSON.parse(localStorage.getItem(localKey));

  const response = await fetch("https://api.cloud-apps.ru/srw/getWeather", {
    method: "POST",
    body: JSON.stringify({
      city: city,
      year: year,
      month: month
    })
  });

  const json = await response.json();
  const temperatures = json.response;

  localStorage.setItem(localKey, JSON.stringify(temperatures));
  return temperatures;
};
