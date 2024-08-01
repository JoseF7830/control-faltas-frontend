<script setup>
import { onMounted } from 'vue'
import axios from 'axios'
import Cookies from 'js-cookie'
import { useRoute, useRouter } from 'vue-router'
import { store } from './store'
import { API_URL } from './config'

import Menu from './components/Menu.vue'

const route = useRoute();
const router = useRouter();

onMounted(() => {
  const token = Cookies.get('token')
  if (route.path !== '/login' && token === undefined) {
    router.push('/login')
    return
  }
  axios.defaults.headers.common.Authorization = token;
  axios.get(`${API_URL}/api/login/me`).then((response) => {
    console.log(response.data.body)
    store.setUser(response.data.body)
  });
  axios.get(`${API_URL}/api/grados`).then((response) => {
    store.setGrados(response.data.body)
  });
  axios.get(`${API_URL}/api/alumno`).then((response) => {
    store.setAlumnos(response.data.body)
  });
  axios.get(`${API_URL}/api/faltas`).then((response) => {
    store.setFaltas(response.data.body)
  });
  axios.get(`${API_URL}/api/usuarios`).then((response) => {
    store.setUsuarios(response.data.body)
  });
  axios.get(`${API_URL}/api/citas`).then((response) => {
    store.setCitas(response.data.body)
  });
});
</script>

<template>
  <Menu />
  <div class="contenedor">
    <router-view></router-view>
  </div>

  <ConfirmDialog></ConfirmDialog>
</template>

<style scoped>

</style>
