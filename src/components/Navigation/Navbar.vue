<template>
    <nav>
        <ul>
        <li><router-link to="/">{{ $t("home") }}</router-link></li>
        <li><router-link to="/weather">{{ $t("weather") }}</router-link></li>
        <li><router-link to="/locale">{{ $t("locale") }}</router-link></li>
        </ul>
    </nav>
</template>