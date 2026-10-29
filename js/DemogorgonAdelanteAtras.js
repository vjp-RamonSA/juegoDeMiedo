import { Component, Property } from '@wonderlandengine/api';
    
    export class DemogorgonMover extends Component {
        static TypeName = 'demogorgon-mover';
    
        static Properties = {
            speed: Property.float(2.0),
            distance: Property.float(5.0)
        };
    
        start() {
            this.startPos = this.object.getPositionLocal();
            this.direction = 1;
        }
    
        update(dt) {
            let pos = this.object.getPositionLocal();
    
            pos[2] += this.speed * this.direction * dt;
    
            if (pos[2] >= this.startPos[2] + this.distance) {
                this.direction = -1;
            }
    
            if (pos[2] <= this.startPos[2] - this.distance) {
                this.direction = 1;
            }
    
            this.object.setPositionLocal(pos);
        }
    }
