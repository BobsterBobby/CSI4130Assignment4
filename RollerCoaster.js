// Authors: Shize Li and Robert Zhang

import {OBJLoader} from "./node_modules/three/examples/jsm/loaders/OBJLoader.js";

class RollerCoaster extends THREE.Group {

    constructor(radius) {
        super();

        this.rail_curve = new Rail(radius);

        let rail_geo = new THREE.TubeGeometry(this.rail_curve, 1000, 0.02, 6, false);
        let rail = new THREE.Mesh(rail_geo, new THREE.MeshStandardMaterial({color: 0x999999}));
        this.add(rail);
        
        let cylinder_geo = new THREE.CylinderGeometry(0.02, 0.02, 1, 6, 1);
        cylinder_geo.applyMatrix4(new THREE.Matrix4().makeTranslation(0, -0.5, 0));
        let cylinder = new THREE.Mesh(cylinder_geo, new THREE.MeshStandardMaterial({color: 0x999999}));
        cylinder.scale.set(1, 5, 1);

        let support_locations = this.rail_curve.getPoints(20);

        for (let i = 0; i < support_locations.length; i++) {
            let x = support_locations[i].x;
            let y = support_locations[i].y;
            let z = support_locations[i].z;

            let support = cylinder.clone();
            support.position.set(x, y, z);
            this.add(support);
        }

        this.trains = new Array();
        
        let loader = new OBJLoader();
        loader.load("objects/RollerCoasterTrain.obj", (obj) => {

            obj.children[0].material = new THREE.MeshStandardMaterial({color: 0x0066aa, roughness: 0});
            obj.children[1].material = new THREE.MeshStandardMaterial({color: 0x888800});
            obj.children[2].material = new THREE.MeshStandardMaterial({color: 0x888800});
            
            for (let i = 0; i < 5; i++) {
                let train = obj.clone();
                this.trains.push(train);
                this.add(train);
            }
        });

        this.update(0);
    }

    update(t) {

        t = t % 1;

        for (let i = 0; i < this.trains.length; i++) {

            this.trains[i].position.copy(this.rail_curve.getPointAt(t));
            this.trains[i].lookAt(this.rail_curve.getTangentAt(t).add(this.trains[i].position).add(this.position));

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
