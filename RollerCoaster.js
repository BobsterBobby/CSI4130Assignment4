
class RollerCoaster extends THREE.Group {

    constructor() {
        super();

        this.rail = new Rail(4);

        let rail_geo = new THREE.TubeGeometry(this.rail, 1000, 0.02, 6, false);
        this.add(new THREE.Mesh(rail_geo, new THREE.MeshStandardMaterial({color: 0x1e1e1e})));
        
        let train_geo = new THREE.CylinderGeometry(0.1, 0.1, 0.5, 4, 1, false);
        train_geo.applyMatrix4(new THREE.Matrix4().makeRotationY(Math.PI/4));
        train_geo.applyMatrix4(new THREE.Matrix4().makeRotationX(Math.PI/2));

        let train_mat = new THREE.MeshStandardMaterial({color: 0x998022});

        this.train_front = new THREE.Mesh(train_geo, train_mat);
        this.train_back = new THREE.Mesh(train_geo, train_mat);
        this.add(this.train_front);
        this.add(this.train_back);

        this.tangent = new THREE.ArrowHelper();
        this.add(this.tangent);
    }

    update(t) {
        t = t % 1;

        this.train_front.position.copy(this.rail.getPoint(t));
        this.train_front.lookAt(this.rail.getTangent(t).add(this.train_front.position));

        let tm = t - 0.02;
        if (tm < 0) tm += 1;

        this.train_back.position.copy(this.rail.getPoint(tm));
        this.train_back.lookAt(this.rail.getTangent(tm).add(this.train_front.position));

        this.tangent.position.copy(this.rail.getPoint(t));
        this.tangent.setDirection(this.rail.getTangent(t));
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
        let y = (Math.sin(4*t) + Math.sin(6*t) + Math.sin(9*t))/3;
        let z = Math.sin(t)*this.radius;
        return optionalTarget.set(x, y, z);
    }
}

export {RollerCoaster};
