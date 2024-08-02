<script setup>
 import { onMounted } from 'vue'
import axios from 'axios'
import { store } from '../store'
import { useConfirm } from 'primevue/useconfirm';
import { API_URL } from '../constants';
import {useToast} from 'vue-toast-notification'

const confirm = useConfirm()
const toast = useToast()

 onMounted(() => {
  console.log('App lista para usarse')
  axios.get(`${API_URL}/api/faltas`).then((response) => {
    store.setFaltas(response.data.body)
  });
});

function eliminarFalta(idFalta) {
  const faltas = store.getFalta(idFalta);
  console.log(faltas);
  confirm.require({
        message: `Estas seguro que quieres eliminar la falta: "${faltas}"`,
        header: 'Eliminar falta',
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
            axios.delete(`${API_URL}/api/faltas/${idFalta}`).then(() => {
              axios.get(`${API_URL}/api/faltas`).then((response) => {
                store.setFaltas(response.data.body)
              });
              toast.success('Falta eliminada con exito!')
            });
        },
        reject: () => {
          console.log('Cancelo');
        }
    });
}

</script>

<template>
    <div class="d-flex justify-content-between p-2">
    <h1>Faltas</h1>
    <router-link to="/crear-falta">
      <button type="button" class="btn btn-primary">Agregar</button>
    </router-link>
  </div>
    <div class="px-1">
        <table class="table table-dark table-striped">
            <thead>
                <tr>
                    <td><b>Id_Faltas</b></td>
                    <td><b>Faltas</b></td>
                    <td></td>
                </tr>
            </thead>
            <tbody>
                <tr v-for="faltas in store.state.faltas">
                    <td>{{ faltas.id_falta }}</td>
                    <td> {{ faltas.falta }}</td>
                    <td class="mx-auto">
                      <router-link :to="'/actualizar-falta/' + faltas.id_falta">
                       <button type="button" class="btn btn-primary mx-3"><i class="bi bi-pencil-fill"></i></button> 
                      </router-link>
                 
                       <button type="button" class="btn btn-danger" @click="eliminarFalta(faltas.id_falta)"><i class="bi bi-trash3-fill"></i></button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<style scoped>

</style>