import { Component, Property } from '@wonderlandengine/api';

export class RotacionLenta extends Component {
    static TypeName = 'rotacion-lenta';

    static Properties = {
        velocidad: Property.float(20.0) // grados por segundo
    };

    update(dt) {
        this.object.rotateAxisAngleDeg([0, 1, 0], this.velocidad * dt);
    }
}