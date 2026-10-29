import {Component, Property} from '@wonderlandengine/api';

/**
 * lucesIntensidad
 */
export class LucesIntensidad extends Component {

    static TypeName = 'lucesIntensidad';

    static Properties = {
        param: Property.float(2.0)
    };

    start() {
        this.tiempo = 0;
        this.hora=2;
    }

    update(dt) {
        // Acumulamos el tiempo
        this.tiempo += dt;

        // Duración de cada fase
        const duracion = Math.max(0.01, this.param);

        // Ciclo completo: bajar y subir
        const ciclo = this.tiempo % (duracion * 2);

        let intensidad;

        if (ciclo < duracion) {
            // De 1 a 0
            intensidad = 1 - (ciclo / duracion);
        } else {
            // De 0 a 1
            intensidad = (ciclo - duracion) / duracion;
        }

        // Aplicar intensidad a la luz
        this.object.getComponent('light').intensity = intensidad;
    }
}