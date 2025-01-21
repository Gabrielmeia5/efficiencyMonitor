const socket = io();

let currentLogs = null; // Armazenar os logs mais recentes
let chart = null;
const ctx = document.getElementById("myChart");

async function fetchInitialLogs() {
  try {
    const response = await fetch("/logs");
    if (!response.ok) {
      throw new Error("Erro ao buscar logs iniciais.");
    }
    const logs = await response.json();
    currentLogs = logs;
    updateChart(getLastElements(currentLogs)); // Atualiza o gráfico segundo o escopo selecionado
    updateText(currentLogs); // Atualiza as informações da página

    console.log("Logs iniciais carregados.");
  } catch (error) {
    console.error("Erro ao carregar logs iniciais:", error.message);
  }
}

function updateText(arr) {
  const lastObj = arr[arr.length - 1];

  const temperature = lastObj.temperature.toString().replace(".", ",");
  const efficiency = lastObj.efficiency.toString().replace(".", ",");

  document.getElementById("data-time").textContent = formartDateTime(
    lastObj.data_time
  ).dateTime;
  document.getElementById("temperature").textContent = temperature;
  document.getElementById("efficiency").textContent = efficiency;
}

document.addEventListener("DOMContentLoaded", () => {
  console.log("Página carregada: inicializando gráfico.");
  fetchInitialLogs();
});

document.getElementById("scope_graphic").addEventListener("change", () => {
  if (currentLogs) {
    updateChart(getLastElements(currentLogs));
  }
});

socket.on("logsDB", (logs) => {
  currentLogs = logs;
  updateChart(getLastElements(logs));
});

socket.on("temperatureUpdate", (log) => {
  const temperature = log.temperature.toString().replace(".", ",");
  const efficiency = log.efficiency.toString().replace(".", ",");

  document.getElementById("data-time").textContent = log.data_time;
  document.getElementById("temperature").textContent = temperature;
  document.getElementById("efficiency").textContent = efficiency;
  document.getElementById("localization").textContent = log.localization;
});

function getLastElements(array) {
  let count = Number(document.getElementById("scope_graphic").value);
  return array.slice(-count);
}

function formartDateTime(dateString) {
  const date = new Date(dateString);

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear().toString().slice(-2);

  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  let resultDate;

  if (document.getElementById("scope_graphic").value === " ") {
    resultDate = `${day}/${month}/${year} ${hours}:${minutes}:${seconds} `;
  } else {
    resultDate = `${hours}:${minutes}:${seconds}`;
  }

  const result = {
    date: resultDate,
    dateTime: `${day}/${month}/${year} ${hours}:${minutes}:${seconds} `,
  };

  return result;
}

function calculateMediaEfficiency(logs) {
  const averageEfficiency =
    logs.reduce((sum, item) => sum + item.efficiency, 0) / logs.length;
  const result = (100 - averageEfficiency).toFixed(2);
  if (result > 0) {
    document.querySelector(`#mediaEfficiency`).textContent = result
      .toString()
      .replace(".", ",");
  } else {
    document.querySelector(`#mediaEfficiency`).textContent = 0;
  }
}

function updateChart(data) {
  calculateMediaEfficiency(data);

  if (chart) {
    chart.data.labels = data.map((row) => formartDateTime(row.data_time).date);
    chart.data.datasets[0].data = data.map((row) => row.efficiency);
    chart.data.datasets[1].data = data.map((row) => row.temperature);
    chart.update();
  } else {
    chart = new Chart(ctx, {
      type: "line",
      data: {
        labels: data.map((row) => formartDateTime(row.data_time).date),
        datasets: [
          {
            label: "Eficiência",
            data: data.map((row) => row.efficiency),
            borderWidth: 1,
            borderColor: "rgba(75, 192, 192, 1)",
            backgroundColor: "rgba(75, 192, 192, 0.2)",
          },
          {
            label: "Temperatura",
            data: data.map((row) => row.temperature),
            borderWidth: 1,
            borderColor: "rgba(255, 99, 132, 1)",
            backgroundColor: "rgba(255, 99, 132, 0.2)",
          },
        ],
      },
      options: {
        interaction: {
          mode: "index",
        },
        scales: {
          y: {
            title: {
              display: true,
              text: "(%)Eficiência / (°C)Temperatura",
            },
            beginAtZero: true,
          },
          x: {
            title: {
              display: true,
              text: "Tempo",
            },
          },
        },
      },
    });
  }
}
