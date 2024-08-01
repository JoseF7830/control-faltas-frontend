import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import ConfirmDialog from 'primevue/confirmdialog';
import ConfirmationService from 'primevue/confirmationservice';
import ToastPlugin from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-bootstrap.css';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

import Grados from './components/Grados.vue'
import Alumnos from './components/Alumnos.vue'
import Faltas from './components/Faltas.vue'
import RegistroFaltas from './components/RegistroFaltas.vue'
import CrearGrado from './components/CrearGrado.vue'
import CrearFalta from './components/CrearFalta.vue'
import CrearAlumno from './components/CrearAlumno.vue'
import CrearRegistroFalta from './components/CrearRegistroFalta.vue'
import CrearUsuario from './components/CrearUsuario.vue'
import ActualizarGrado from './components/ActualizarGrado.vue'
import ActualizarFalta from './components/ActualizarFalta.vue'
import Login from './components/Login.vue'
import ActualizarAlumno from './components/ActualizarAlumno.vue';
import ActualizarRegistroFalta from './components/ActualizarRegistroFalta.vue';
import ReporteDescarga from './components/ReporteDescarga.vue';
import Usuarios from './components/Usuarios.vue';
import ActualizarUsuario from './components/ActualizarUsuario.vue';
import CrearCita from './components/CrearCita.vue';
import Citas from './components/Citas.vue';
import ImprimirCita from './components/ImprimirCita.vue';
import Suspensiones from './components/Suspensiones.vue';


const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: Alumnos },
        { path: '/login', component: Login },
        { path: '/alumnos', component: Alumnos },
        { path: '/grados', component: Grados },
        { path: '/faltas', component: Faltas },
        { path: '/registro-faltas', component: RegistroFaltas },
        { path: '/crear-grado', component: CrearGrado },
        { path: '/crear-falta', component: CrearFalta },
        { path: '/crear-alumno', component: CrearAlumno },
        { path: '/crear-registro-falta', component: CrearRegistroFalta },
        { path: '/crear-usuario', component: CrearUsuario },
        { path: '/actualizar-grado/:idGrado', component: ActualizarGrado },
        { path: '/actualizar-falta/:idFalta', component: ActualizarFalta },
        { path: '/actualizar-alumno/:carnet', component: ActualizarAlumno },
        { path: '/actualizar-registro-falta/:idRegistro', component: ActualizarRegistroFalta },
        { path: '/reporte-descarga', component: ReporteDescarga },
        { path: '/usuarios', component: Usuarios },
        { path: '/actualizar-usuario/:id_usuario', component: ActualizarUsuario},
        { path: '/crear-cita/:id_registro', component: CrearCita },
        { path: '/imprimir-cita/:id_cita', component: ImprimirCita },
        { path: '/citas', component: Citas },
        { path: '/suspensiones', component: Suspensiones }
    ]
});

const app = createApp(App);

app.use(router);
app.use(PrimeVue, {
    theme: {
        preset: Aura
    }
});
app.use(ConfirmationService);
app.use(ToastPlugin);
app.component('ConfirmDialog', ConfirmDialog);
app.component('VueDatePicker', VueDatePicker);
app.mount('#app');
