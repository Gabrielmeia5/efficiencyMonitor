async function getTemperature() {
  try {
    const latitude = -18.63236;
    const longitude = -46.497957;
    const API_URL = "https://api.openweathermap.org/data/2.5/weather";
    const API_KEY = process.env.API_KEY;

    const response = await fetch(
      `${API_URL}?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
    );

    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status}`);
    }

    const data = await response.json();
    const localization = data.name;
    const temperature = data.main.temp;
    const efficiency = calculateEfficiency(temperature);
    const currentDate = getCurrentDate();
    const currentTime = getCurrentTime();

    // Retorna o objeto com os dados
    return {
      data_time: `${currentDate} ${currentTime}`,
      temperature: `${temperature}`,
      efficiency: `${efficiency.toFixed(2)}`,
      localization: localization,
    };
  } catch (error) {
    console.error("Erro ao obter temperatura:", error.message);
    return null;
  }
}

function calculateEfficiency(temp) {
  if (temp >= 28) return 100;
  if (temp <= 24) return 75;
  return 75 + ((temp - 24) / 4) * 25;
}

function getCurrentDate() {
  const now = new Date();
  const day = String(now.getDate()).padStart(2, "0");
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const year = now.getFullYear();
  return `${day}/${month}/${year}`;
}

function getCurrentTime() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");
  return `${hours}:${minutes}:${seconds}`;
}

module.exports = { getTemperature };
