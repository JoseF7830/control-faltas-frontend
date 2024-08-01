<template>
    <div class="flex items-center gap-4 mb-4">
        <label for="username" class="form-label">Tipo de reporte</label>
        <!-- select de tipo de reporte -->
        <select class="form-select" aria-label="select filtro" v-model="reporte">
            <option value="general">En General</option>
            <option value="alumno">Por Alumno</option>
            <option value="grado">Por Grado</option>
            <option value="bimestre">Por Bimestre</option>
        </select>

    </div>

    <div class="flex items-center gap-4 mb-4" v-if="reporte == 'alumno'">
        <label for="email" class="form-label">Carnet</label>
        <!-- componente de fecha -->
        <select class="form-select" aria-label="select alumno" v-model="alumno">
            <option selected disabled>Seleccione un carnet</option>
            <option :value="alumno.carnet" v-for="alumno in store.state.alumnos">
                {{ alumno.carnet }} - {{ alumno.nombres }} {{ alumno.apellidos }}
            </option>
        </select>
    </div>

    <div class="flex items-center gap-4 mb-4" v-if="reporte == 'grado'">
        <label for="grado" class="form-label">Grado</label>
        
        <select class="form-select" aria-label="select grado" v-model="grado">
            <option selected disabled>Seleccione un grado</option>
            <option :value="grado.id_grado" v-for="grado in store.state.grados">
                {{ grado.grado }} {{ grado.carrera }} "{{ grado.seccion }}" {{ grado.plan }}
            </option>
        </select>
    </div>

    <div class="flex items-center gap-4 mb-4" v-if="reporte == 'bimestre'">
        <label for="bimestre" class="form-label">Bimestre</label>
        <select class="form-select" aria-label="select grado" v-model="bimestre">
            <option selected disabled>Seleccione un Bimestre</option>
            <option :value="1">I</option>
            <option :value="2">II</option>
            <option :value="3">III</option>
            <option :value="4">IV</option>
        </select>
    </div>

    <div class="flex items-center gap-4 mb-4">
        <label for="email" class="form-label">Fechas</label>
        <!-- componente de fecha -->
        <VueDatePicker v-model="fechas" inline auto-apply range />
    </div>
    <div class="d-flex justify-content-end gap-2">
        <Button type="button" label="Cancel" severity="secondary" @click="toggleModal(false)"></Button>
        <Button type="button" label="Generar reporte" @click="getReport"></Button>
    </div>
</template>

<script setup>
    import { defineProps, ref, onMounted } from 'vue';
    import Button from 'primevue/button';
    import { store } from '../store';
    import axios from 'axios';
    import { format } from 'date-fns';
    import { useRouter } from 'vue-router';
    import { API_URL } from '../constants';
   
    const props = defineProps(['toggleModal']);

    const router = useRouter()

    const reporte = ref("general");
    const alumno = ref("");
    const grado = ref("");
    const bimestre = ref("");
    const fechas = ref("");

    onMounted(() => {
        const startDate = new Date();
        const endDate = new Date(new Date().setDate(startDate.getDate() + 7));
        fechas.value = [startDate, endDate];
    });

    function getReport() {
        const fechaInicio = format(fechas.value[0], "yyyy-MM-dd");
        const fechaFinal = format(fechas.value[1], "yyyy-MM-dd");
        const fechaInicioReporte = format(fechas.value[0], "dd/MM/yyyy");
        const fechaFinalReporte = format(fechas.value[1], "dd/MM/yyyy");
        if (reporte.value == "alumno") {
            axios.get(`${API_URL}/api/registroFaltas/alumno/${alumno.value}?fechaInicio=${fechaInicio}&fechaFinal=${fechaFinal}`)
            .then((response) => {
                store.setReporte({
                    titulo: `Reporte por alumno (${alumno.value}) del ${fechaInicioReporte} al ${fechaFinalReporte}`,
                    registros: response.data.body
                });
                router.push('/reporte-descarga');
            })
        }

        if (reporte.value == "grado") {
            axios.get(`${API_URL}/api/registroFaltas/grados/${grado.value}?fechaInicio=${fechaInicio}&fechaFinal=${fechaFinal}`)
            .then((response) => {
                console.log(response);
                store.setReporte({
                    titulo: `Reporte por grado del ${fechaInicioReporte} al ${fechaFinalReporte}`,
                    registros: response.data.body
                })
                router.push('/reporte-descarga');
            })
        }

        if (reporte.value == "bimestre") {
            axios.get(`${API_URL}/api/registroFaltas/bimestre/${bimestre.value}?fechaInicio=${fechaInicio}&fechaFinal=${fechaFinal}`)
            .then((response) => {
                console.log(response);
                store.setReporte({
                    titulo: `Reporte por bimestre del ${fechaInicioReporte} al ${fechaFinalReporte}`,
                    registros: response.data.body
                })
                router.push('/reporte-descarga');
            })
        }

        if (reporte.value == 'general') {
            axios.get(`${API_URL}/api/registroFaltas/general/descarga?fechaInicio=${fechaInicio}&fechaFinal=${fechaFinal}`)
                .then((response) => {
                    store.setReporte({
                        titulo: `Reporte por general del ${fechaInicioReporte} al ${fechaFinalReporte}`,
                        registros: response.data.body
                    });
                    router.push('/reporte-descarga');
                })
        }
    }

</script>