<script setup>
import { ref, watch, computed } from "vue";
import { Line } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

import { fetchForecast } from "../../services/weatherApi";

// traduction
import { useI18n } from "vue-i18n";
const { t, locale } = useI18n();

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale
);

const props = defineProps({
  city: {
    type: String,
    required: true,
  },
  days: {
    type: Number,
    default: 5,
  },
});

const chartData = ref(null);
const forecastDays = ref(props.days);

const chartOptions = computed(() => ({
  responsive: true,
  plugins: {
    legend: { position: "top" },
    title: {
      display: true,
      text:
        t("WeatherChart.title") +
        ` ${forecastDays.value}` +
        t("WeatherChart.days"),
    },
  },
}));

async function updateChartData(city, days) {
  try {
    const data = await fetchForecast(city, days);

    const labels = data.forecast.forecastday.map((day) =>
      new Date(day.date).toLocaleDateString(locale.value, { weekday: "long" })
    );
    const tempMax = data.forecast.forecastday.map((day) => day.day.maxtemp_c);
    const tempMin = data.forecast.forecastday.map((day) => day.day.mintemp_c);

    chartData.value = {
      labels,
      datasets: [
        {
          label: t("WeatherChart.temp_max"),
          backgroundColor: "rgba(255,99,132,0.2)",
          borderColor: "rgba(255,99,132,1)",
          data: tempMax,
          tension: 0.4,
        },
        {
          label: t("WeatherChart.temp_min"),
          backgroundColor: "rgba(54,162,235,0.2)",
          borderColor: "rgba(54,162,235,1)",
          data: tempMin,
          tension: 0.4,
        },
      ],
    };
  } catch (error) {
    chartData.value = null;
    console.error("Erreur de récupération des prévisions : ", error.message);
  }
}

watch(
  () => [props.city, locale.value],
  ([newCity]) => {
    updateChartData(newCity, props.days);
  },
  { immediate: true }
);

watch(
  () => [forecastDays.value, locale.value],
  ([newDays]) => {
    updateChartData(props.city, newDays);
  },
  { immediate: true }
);
</script>

<template>
  <div class="chart-container">
    <div class="chart-toolbar">
      <label>
        {{ t("WeatherChart.forecast_days") }} :
        <input
          type="number"
          v-model.number="forecastDays"
          min="1"
          max="30"
          class="forecast-input"
        />
      </label>
    </div>

    <div v-if="chartData">
      <Line :data="chartData" :options="chartOptions" />
    </div>
    <p v-else>{{ $t("WeatherChart.load_data") }} {{ city }}...</p>
  </div>
</template>

<style scoped>
.chart-container {
  padding: 1rem;
  background: #181818;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.chart-toolbar {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 1rem;
  font-weight: 500;
  color: #333;
}

.forecast-input {
  margin-left: 8px;
  padding: 6px 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
  width: 60px;
  font-size: 14px;
}
</style>
