<script setup>
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import "flag-icons/css/flag-icons.min.css";

const { t, locale } = useI18n();

const languages = [
  { code: "fr", flag: "fi fi-fr" },
  { code: "en", flag: "fi fi-um" },
  { code: "es", flag: "fi fi-es" },
];

const selectedLang = ref(locale.value);

function changeLanguage(code) {
  locale.value = code;
  selectedLang.value = code;
}
</script>

<template>
  <div class="card">
    <ul
      class="list"
      style="--color: #5353ff; --hover-storke: #fff; --hover-color: #fff"
    >
      <li class="element" v-for="lang in languages" :key="lang.code">
        <label>
          <input
            type="radio"
            :value="lang.code"
            v-model="selectedLang"
            @change="changeLanguage(lang.code)"
          />
          <span :class="lang.flag"></span>
          {{ t(`Locale.${lang.code}`) }}
        </label>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.card {
  width: 200px;
  background-color: rgba(36, 40, 50, 1);
  background-image: linear-gradient(
    139deg,
    rgba(36, 40, 50, 1) 0%,
    rgba(36, 40, 50, 1) 0%,
    rgba(37, 28, 40, 1) 100%
  );

  user-select: none;
  border-radius: 10px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.card .list .element label input[type="radio"] {
  display: none;
}

.card .separator {
  border-top: 1.5px solid #42434a;
}

.card .list {
  list-style-type: none;
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 0px;
}

.card .list .element > label {
  display: flex;
  align-items: center;
  color: #7e8590;
  gap: 10px;
  transition: all 0.3s ease-out;
  padding: 6px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
}

.card .list .element label svg {
  width: 19px;
  height: 19px;
  transition: all 0.3s ease-out;
}

.card .list .element label:has(input[type="radio"]:checked),
.card .list .element label:hover {
  background-color: var(--color);
  color: var(--hover-color);
}

.card .list .element label:active {
  transform: scale(0.96);
}

.card .list .element label:has(input[type="radio"]:checked) svg,
.card .list .element label:hover svg {
  stroke: var(--hover-storke);
}
</style>
