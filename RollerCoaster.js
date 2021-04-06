// Authors: Shize Li and Robert Zhang

import {OBJLoader} from "./node_modules/three/examples/jsm/loaders/OBJLoader.js";

class RollerCoaster extends THREE.Group {

    constructor(radius) {
        super();

        this.rail = new Rail(radius);

        let rail_geo = new THREE.TubeGeometry(this.rail, 1000, 0.02, 6, false);
        this.add(new THREE.Mesh(rail_geo, new THREE.MeshStandardMaterial({color: 0x999999})));
        
        this.trains = new Array();
        
        let loader = new OBJLoader();
        loader.load("objects/RollerCoasterTrain.obj", (obj) => {

            obj = obj.children[0];
            obj.material.color = new THREE.Color(0x998022);

            for (let i = 0; i < 5; i++) {
                let train = obj.clone();
                this.trains.push(train);
                this.add(train);
            }
        });
        
        this.trains.forEach(() => this.add(t));
    }

    update(t) {

        t = t % 1;

        for (let i = 0; i < this.trains.length; i++) {

            this.trains[i].position.copy(this.rail.getPointAt(t));
            this.trains[i].lookAt(this.rail.getTangentAt(t).add(this.trains[i].position).add(this.position));

            t = t - 0.011;
            if (t < 0) t += 1;
        }
    }
}

class Rail extends THREE.Curve {

    constructor(radius) {
        super();
        this.radius = radius;
    }

    getPoint(t, optionalTarget = new THREE.Vector3()) {
        t *= 2*Math.PI;
        let x = Math.cos(t)*this.radius;
        let y = (Math.sin(4*t) + Math.sin(6*t) + Math.sin(9*t))/3.5;
        let z = Math.sin(t)*this.radius;
        return optionalTarget.set(x, y, z);
    }
}

export {RollerCoaster};
