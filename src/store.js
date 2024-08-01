import { reactive } from 'vue'
import Usuarios from './components/Usuarios.vue';

export const store = {
    state: reactive({
        grados: [],
        alumnos: [],
        faltas: [],
        registroFaltas: [],
        user: {},
        usuarios: [],
        citas: [],
        reporte: {
            titulo: '',
            registros: [],
        }
    }),
    setGrados(newGrados) {
        this.state.grados = newGrados;
    },
    setAlumnos(newAlumnos){
        this.state.alumnos = newAlumnos;
    },
    setFaltas(newFaltas){
        this.state.faltas = newFaltas;
    },
    setRegistroFaltas(newRegistroFaltas){
        this.state.registroFaltas = newRegistroFaltas;
    },
    setAlumnos(newAlumnos){
        this.state.alumnos = newAlumnos;
    },
    setUser(newUser) {
        this.state.user = newUser;
    },
    setReporte(newReporte) {
        this.state.reporte = newReporte;
    },
    setUsuarios(newUsuarios) {
        this.state.usuarios = newUsuarios;
    },
    setCitas(newCitas) {
        this.state.citas = newCitas;
    },
    getFalta(idFalta) {
        const resultado = this.state.faltas.find((f) => f.id_falta === idFalta)
        return resultado;
    },
    getGrado(idGrado) {
        const resultado = this.state.grados.find((grado) => grado.id_grado === idGrado);
        return resultado;
    },
    getAlumno(carnet) {
        const resultado = this.state.alumnos.find((alumnos) => alumnos.carnet === carnet);
        return resultado;
    },
    getRegistroFaltas(idRegistro) {
        const resultado = this.state.registroFaltas.find((registroFaltas) => registroFaltas.id_registro === idRegistro);
        return resultado;
    },
    getUsuario(idUsuario) {
        const resultado = this.state.usuarios.find((usuario) => usuario.id_usuario === idUsuario);
        return resultado;
    },
    getCurrentUser() {
        return this.state.user;
    }
    
};