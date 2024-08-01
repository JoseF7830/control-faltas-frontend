<script setup>
import { onMounted } from 'vue'
import axios from 'axios'
import { useConfirm } from 'primevue/useconfirm'
import { store } from '../store'
import { API_URL } from '../constants'

const confirm = useConfirm()

onMounted(() => {
  axios.get(`${API_URL}/api/grados`).then((response) => {
    store.setGrados(response.data.body)
  })
});

function eliminarGrado(idGrado) {
  const grado = store.getGrado(idGrado);
  confirm.require({
        message: `Estas seguro que quieres eliminar el grado: ${grado.grado} ${grado.carrera} "${grado.seccion}" ${grado.jornada}`,
        header: 'Eliminar grado',
        icon: 'bi bi-trash3-fill',
        rejectProps: {
            label: 'Cancelar',
            severity: 'secondary',
            outlined: true
        },
        acceptProps: {
            label: 'Aceptar'
        },
        accept: () => {
            axios.delete(`${API_URL}/api/grados/${idGrado}`).then(() => {
              axios.get(`${API_URL}/api/grados`).then((response) => {
                store.setGrados(response.data.body)
              });
            });
        },
        reject: () => {
          console.log('Cancelo');
        }
    });
}

</script>

<template>
  <div class="d-flex justify-content-between p-2 mt-2">
    <h1>Grados</h1>
    <router-link to="/crear-grado">
      <button type="button" class="btn btn-primary">Agregar</button>
    </router-link>
  </div>
  <div class="px-1">
      <table class="table table-dark table-striped">
        <thead>
            <tr>
                <td><b>Id_Grado</b></td>
                <td><b>Carrera</b></td>
                <td><b>Grado</b></td>
                <td><b>Seccion</b></td>
                <td><b>Plan</b></td>
                <td></td>
            </tr>
        </thead>
        <tbody>
            <tr  v-for="grado in store.state.grados">
                <td>{{ grado.id_grado }}</td>
                <td>{{ grado.carrera }}</td>
                <td> {{ grado.grado }}</td>
                <td>{{ grado.seccion }}</td>
                <td>{{ grado.plan }}</td>
                <td class="mx-auto">
                  <router-link :to="'/actualizar-grado/' + grado.id_grado">
                    <button type="button" class="btn btn-primary mx-3"><i class="bi bi-pencil-fill"></i></button> 
                  </router-link>
                 
                  <button type="button" class="btn btn-danger" @click="eliminarGrado(grado.id_grado)"><i class="bi bi-trash3-fill"></i></button>
                </td>
            </tr>
        </tbody>
      </table>
  </div>
</template>

<style scoped>

</style>
