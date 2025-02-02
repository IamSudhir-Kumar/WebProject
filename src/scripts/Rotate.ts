import { Behaviour, serializable } from "@needle-tools/engine";

export class Rotate extends Behaviour {
    @serializable()
    speed: number = 1;

    update() {
        this.gameObject.rotateY(this.context.time.deltaTime * this.speed);
    }
}
