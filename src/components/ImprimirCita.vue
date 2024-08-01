<template>
    <div>
        <div id="area-impresion">
            <div class="header  mb-4">
                <img src="data:image/png;base64,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" alt="Cetach2 logo" />
                <h3 class="titulo mx-4"> <b>CETACH 2</b></h3>
            </div>
            <p class="texto">Estimado padre de familia</p>
            <p class="texto">El motivo de la presente, es para comunicarle que ha sido citado al colegio por motivo de que su hijo(a): {{ alumno.nombres }} {{ alumno.apellidos }} a acumulado varias faltas.</p>
            <p class="texto">La ultima falta se debe al motivo <b>{{ falta.falta }}</b>:</p>
            <p class="texto">{{descripcion}}</p>
            <p class="texto">Se le cita el dia: {{ format(fecha, 'dd/MM/yyyy') }} a las {{ format(fecha, 'HH:mm') }} para ser atendido por {{ store.getUsuario(usuario) ? store.getUsuario(usuario).nombre : '' }}</p>
            <p class="firma">____________________________________________<br>Firma del encargado</p>
        </div>
        <div class="container mt-4">
            <div class="mb-3">
                <label for="fecha" class="from-label">Fecha y hora</label>
                <VueDatePicker v-model="fecha" auto-apply disabled></VueDatePicker>
            </div>
        </div>
        <div class="container mt-4">
            <div class="mb-3">
                <label for="fecha" class="from-label">Descripcion</label>
                <textarea class="form-control" v-model="descripcion" disabled/>
            </div>
        </div>
        <div class="container mt-4">
            <div class="mb-3">
                <label for="fecha" class="from-label">Usuario</label>
                <select class="form-select" aria-label="select de rol" v-model="usuario" disabled>
                    <option selected disabled>Seleccione el usuario</option>
                    <option :value="user.id_usuario" v-for="user in store.state.usuarios">
                        {{ user.nombre }}
                    </option>
                </select>
            </div>
        </div>
        <div class="d-flex justify-content-end container mt-4 mb-4 d-flex justify-content-between">
            <router-link :to="'/citas'"> 
                <button class="btn btn-primary">
                    <i class="bi bi-arrow-left-circle mx-1"></i>Volver
                </button>
            </router-link>
            <button @click="imprimir"  class="btn btn-primary mx-4">Imprimir cita</button>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
import { store } from '../store';
import { format } from 'date-fns';
import html2pdf from 'html2pdf.js';
import { API_URL } from '../constants';

const route = useRoute();
const router = useRouter();

const alumno = ref({});
const grado = ref({});
const falta = ref({});
const fecha = ref(new Date());
const usuario = ref('');
const descripcion = ref('');

onMounted(()=> {
    axios.get(`${API_URL}/api/citas/${route.params.id_cita}`).then((response) => {
        const res = response.data.body[0];
        alumno.value = store.getAlumno(res.carnet);
        grado.value = store.getGrado(res.id_grado);
        fecha.value = res.fecha;
        usuario.value = res.id_usuario;
        descripcion.value = res.descripcion;
        axios.get(`${API_URL}/api/registroFaltas/${res.id_registro_falta}`).then((rFalta) => {
            const falta = rFalta.data.body[0];
            falta.value = store.getFalta(falta.id_falta);
        });
    });
})

function imprimir() {
    const element = document.getElementById('area-impresion');
    const opt = {
        margin: 0.5,
        filename: `Cita ${alumno.value.nombres} ${alumno.value.nombres} ${format(fecha.value, 'dd/MM/yyyy')}`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 3 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'landscape' }
    };
    html2pdf().from(element).set(opt).save();
}


</script>

<style scoped>
#area-impresion {
    width: 80%;
    border: 1px solid;
    padding-bottom: 10px;
    margin: 0 auto;
    margin-top: 20px;
    background: #fff;
    color: #000;
}

.firma {
    margin-top: 45px;
    text-align: center;
    background-color: #fff;
    color: #000;
    width: 50%;
    margin: 0 auto;
    padding-top: 30px;
    border-radius: 10px;
}

.texto {
    padding-left: 10px;
    padding-right: 10px;
}

.header {
    display: flex;
    justify-content: start;
    padding: 10px;
    background: #000046;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #1CB5E0, #000046);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #1CB5E0, #000046); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    height: 50px;
}
.header img {
    width: 35px;
  

}

.header .titulo{
    color: #000;
    align-self: center;
}

</style>