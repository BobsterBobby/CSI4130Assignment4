
class RollerCoaster extends THREE.Group {
    constructor() {
        super();

        this.rail = new Rail();

        let rail_geo = new THREE.TubeGeometry(this.rail, 1000, 0.02, 6, false);
        this.add(new THREE.Mesh(rail_geo, new THREE.MeshBasicMaterial()));
        
        let train_geo = new THREE.CylinderGeometry(0.1, 0.1, 0.5, 5, 1, false);
        train_geo.applyMatrix4(new THREE.Matrix4().makeRotationX(Math.PI/2));
        this.train_front = new THREE.Mesh(train_geo, new THREE.MeshStandardMaterial({color: 0x551111}));
        this.train_back = new THREE.Mesh(train_geo, new THREE.MeshStandardMaterial({color: 0x332525}));
        this.add(this.train_front);
        this.add(this.train_back);

        this.tangent = new THREE.ArrowHelper();
        this.add(this.tangent);
    }

    update(t) {
        this.train_front.position.copy(this.rail.getPoint(t));
        this.train_front.lookAt(this.rail.getPoint(t + 0.00001));

        let tm = t - 0.04;
        if (tm < 0) tm += 1;

        this.train_back.position.copy(this.rail.getPoint(tm));
        this.train_back.lookAt(this.rail.getPoint(tm + 0.00001));

        this.tangent.position.copy(this.rail.getPoint(t));
        this.tangent.setDirection(this.rail.getTangent(t));
    }
}

class Rail extends THREE.Curve {
    getPoint(t, optionalTarget = new THREE.Vector3()) {
        t *= 2*Math.PI;
        let x = Math.cos(t)*2;
        let y = Math.sin(4*t)/3;
        let z = Math.sin(t)*2;
        return optionalTarget.set(x, y, z);
    }
}

export {RollerCoaster};
