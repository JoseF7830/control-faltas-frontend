<script setup>
import { onMounted } from 'vue'
import axios from 'axios'
import { useConfirm } from 'primevue/useconfirm';
import { store } from '../store'
import { format } from 'date-fns'
import { ref } from "vue";
import Dialog from 'primevue/dialog';
import Filtro from './Filtro.vue';
import { API_URL } from '../constants';
import {useToast} from 'vue-toast-notification'

const visible = ref(false);
const toast = useToast()
const confirm = useConfirm()

onMounted(() => {
  console.log('App lista para usarse')
  axios.get(`${API_URL}/api/registroFaltas`).then((response) => {
    store.setRegistroFaltas(response.data.body)
  })
});

function eliminarRegistro(idRegistro) {
  const registro = store.getRegistroFaltas(idRegistro);
  confirm.require({
    message: `Estas seguro que quieres eliminar el registro: ${registro.carnet} ${store.getFalta(registro.id_falta).falta}`,
    header: 'Eliminar registro',
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
      axios.delete(`${API_URL}/api/registroFaltas/${idRegistro}`).then(() => {
        axios.get(`${API_URL}/api/registroFaltas`).then((response) => {
          store.setRegistroFaltas(response.data.body)
        });
        toast.success('Registro eliminado con exito!')
      });
    },
    reject: () => {
      console.log('Cancelo');
    }
  });
}

function formatTime(time) {
  const t = time.split(':');
  return `${t[0]}:${t[1]}`;
}

function toggleModal(value) {
  visible.value = value;
}

</script>



<template>
  <div class="d-flex justify-content-between p-2">

    <Dialog v-model:visible="visible" modal header="Reporte de faltas" :style="{ width: '35rem' }">
      <Filtro :toggleModal="toggleModal"/>
    </Dialog>

    <h1>Registro Faltas</h1>

    <div>
      <button type="button" class="btn btn-primary mx-2" @click="visible = true">Guardar Registro</button>
      <router-link to="/crear-registro-falta">
        <button type="button" class="btn btn-primary">Agregar</button>
      </router-link>
    </div>

  </div>

  <div class="px-1">
    <table class="table table-dark table-striped">
      <thead>
        <tr>
          <td><b>Id_Registro</b></td>
          <td><b>Comentario</b></td>
          <td><b>Carnet</b></td>
          <td><b>Hora</b></td>
          <td><b>Fecha</b></td>
          <td><b>Falta</b></td>
          <td></td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="registroFaltas in store.state.registroFaltas">
          <td> {{ registroFaltas.id_registro }}</td>
          <td> {{ registroFaltas.comentario }}</td>
          <td> {{ registroFaltas.carnet }}</td>
          <td> {{ formatTime(registroFaltas.hora) }}</td>
          <td> {{ format(registroFaltas.fecha, 'dd/MM/yyyy') }}</td>
          <td> {{ store.getFalta(registroFaltas.id_falta).falta }}</td>
          <td class="mx-auto">
            <router-link :to="'/actualizar-registro-falta/' + registroFaltas.id_registro">
              <button type="button" class="btn btn-primary mx-3"><i class="bi bi-pencil-fill"></i></button>
            </router-link>

            <button type="button" class="btn btn-danger" @click="eliminarRegistro(registroFaltas.id_registro)"><i
                class="bi bi-trash3-fill"></i></button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped></style>