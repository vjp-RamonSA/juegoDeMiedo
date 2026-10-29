import {Component, Property} from '@wonderlandengine/api';

/**
 * Cada elemento de la lista contiene un objeto de destino.
 */
class TargetRef {
    static Properties = {
        target: Property.object(),
    };
}

export class MovimientoLuz extends Component {
    static TypeName = 'movimientoluz';

    static Properties = {
        velocidad: Property.float(1.0),
        targets: Property.array(Property.record(TargetRef)),
    };

    start() {
        this.posicionInicial = this.object.getTranslationWorld(
            new Float32Array(3)
        );

        this.indiceTarget = 0;
    }

    update(dt) {
        // No hay destinos asignados
        if (!this.targets || this.targets.length === 0) return;

        // Tras visitar todos los targets, volver al origen
        const volviendoAlOrigen =
            this.indiceTarget === this.targets.length;

        let destino;

        if (volviendoAlOrigen) {
            destino = this.posicionInicial;
        } else {
            const target = this.targets[this.indiceTarget].target;

            // Evitar errores si un destino está vacío
            if (!target) return;

            destino = target.getTranslationWorld(
                new Float32Array(3)
            );
        }

        const actual = this.object.getTranslationWorld(
            new Float32Array(3)
        );

        const dx = destino[0] - actual[0];
        const dy = destino[1] - actual[1];
        const dz = destino[2] - actual[2];

        const distancia = Math.sqrt(dx * dx + dy * dy + dz * dz);
        const avance = Math.max(0, this.velocidad) * dt;

        if (distancia <= avance || distancia < 0.001) {
            this.object.setTranslationWorld(destino);

            this.indiceTarget++;

            // Reiniciar el recorrido al completar el regreso
            if (this.indiceTarget > this.targets.length) {
                this.indiceTarget = 0;
            }
        } else {
            this.object.setTranslationWorld([
                actual[0] + dx / distancia * avance,
                actual[1] + dy / distancia * avance,
                actual[2] + dz / distancia * avance,
            ]);
        }
    }
}