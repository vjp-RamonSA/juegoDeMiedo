import { Component, Property } from '@wonderlandengine/api';

export class CambiarUpsideDown extends Component {
    static TypeName = 'CambiarUpsideDown';

    static Properties = {
        jugador: Property.object(),
        tiempo: Property.float(5.0),
        tiempoRegreso: Property.float(5.0),
        desplazamientoZ: Property.float(9.0)
    };

    start() {
        this.estado = 0; // 0 = ida, 1 = vuelta
        this.tiempoTranscurrido = 0;

        this.posicionOriginal = this.jugador.getPositionWorld(
            new Float32Array(3)
        );
    }

    update(dt) {
        if (!this.jugador) return;

        this.tiempoTranscurrido += dt;

        // Ir al destino
        if (this.estado === 0 && this.tiempoTranscurrido >= this.tiempo) {
            const posicion = this.jugador.getPositionWorld(
                new Float32Array(3)
            );

            posicion[2] += this.desplazamientoZ;
            this.jugador.setPositionWorld(posicion);

            console.log('Jugador desplazado');

            this.estado = 1;
            this.tiempoTranscurrido = 0;
        }

        // Volver al origen
        if (this.estado === 1 && this.tiempoTranscurrido >= this.tiempoRegreso) {
            this.jugador.setPositionWorld(this.posicionOriginal);

            console.log('Jugador devuelto al origen');

            this.estado = 0; // reinicia el ciclo
            this.tiempoTranscurrido = 0;
        }
    }
}