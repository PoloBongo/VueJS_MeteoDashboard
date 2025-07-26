const apiKey = "f70f37ac64f04dbaa44115634252607";

// Permet de récupérer la météo actuelle d'une ville
export async function fetchWeather(city) {
  const response = await fetch(
    `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`
  );

  if (!response.ok) throw new Error("Ville introuvable");

  return await response.json();
}

// Permet de récupérer la météo actuelle d'une ville sur plusieurs jours
export async function fetchForecast(city, days) {
  const response = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=${days}&aqi=no&alerts=no`
  );
  if (!response.ok) throw new Error("Prévision introuvable");
  return await response.json();
}