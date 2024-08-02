<template>
    <div>
        <div id="area-impresion" style="background: #081b29;">
            <p>Estimado padre de familia</p>
            <p>El motivo de la presente, es para comunicarle que ha sido citado al colegio por motivo de que su hijo(a): {{ alumno.nombres }} {{ alumno.apellidos }} a acumulado varias faltas.</p>
            <p>La ultima falta se debe al motivo <b>{{ falta.falta }}</b>:</p>
            <p>{{descripcion}}</p>
            <p>Se le cita el dia: {{ format(fecha, 'dd/MM/yyyy') }} a las {{ format(fecha, 'HH:mm') }} para ser atendido por {{ store.getUsuario(usuario) ? store.getUsuario(usuario).nombre : '' }}</p>
            <p class="firma">____________________________________________<br>Firma del encargado</p>
        </div>
        <div class="container mt-4">
            <div class="mb-3">
                <label for="fecha" class="from-label">Fecha y hora</label>
                <VueDatePicker v-model="fecha" auto-apply></VueDatePicker>
            </div>
        </div>
        <div class="container mt-4">
            <div class="mb-3">
                <label for="fecha" class="from-label">Descripcion</label>
                <textarea class="form-control" v-model="descripcion" />
            </div>
        </div>
        <div class="container mt-4">
            <div class="mb-3">
                <label for="fecha" class="from-label">Usuario</label>
                <select class="form-select" aria-label="select de rol" v-model="usuario">
                    <option selected disabled>Seleccione el usuario</option>
                    <option :value="user.id_usuario" v-for="user in store.state.usuarios">
                        {{ user.nombre }}
                    </option>
                </select>
            </div>
        </div>
        <div class="d-flex justify-content-end container mt-4 mb-4">
            <button @click="imprimir"  class="btn btn-primary mx-4">Imprimir cita</button>
            <button @click="crearCita"  class="btn btn-primary">Crear cita</button>
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
import {useToast} from 'vue-toast-notification'

const route = useRoute();
const router = useRouter();
const toast = useToast()

const alumno = ref({});
const grado = ref({});
const falta = ref({});
const registroFalta = ref({});
const fecha = ref(new Date());
const usuario = ref('');
const descripcion = ref('');

onMounted(()=> {
    axios.get(`${API_URL}/api/registroFaltas/${route.params.id_registro}`).then((response) => {
        const res = response.data.body[0];
        registroFalta.value = res;
        alumno.value = store.getAlumno(res.carnet);
        grado.value = store.getGrado(res.id_grado);
        falta.value = store.getFalta(res.id_falta);
    })
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

function crearCita() {
    const body = {
        fecha: format(fecha.value, "yyyy-MM-dd HH:mm:ss"),
        hora: format(fecha.value, "HH:mm"),
        id_usuario: usuario.value,
        id_registro_falta: parseInt(route.params.id_registro),
        atendida: false,
        carnet: alumno.value.carnet,
        descripcion: descripcion.value
    };

    axios.post(`${API_URL}/api/citas`, body).then((response) => {
        router.push('/citas');
        toast.success('Cita creada con exito!')
    });
    // console.log(body);
}
</script>

<style scoped>
#area-impresion {
    width: 80%;
    border: 1px solid;
    padding: 10px;
    margin: 0 auto;
    margin-top: 20px;
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
</style>