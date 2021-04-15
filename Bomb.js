export class Bomb extends THREE.Group {
	constructor(bombRadius = 0.4, x = 0.0, y = 0.0, z = 0.0) {
		super();
		
		this.r = bombRadius;
		this.startingX = x;
		this.startingY = y;
		this.startingZ = z;
		this.path_curve = new Path(this.radius*20);
		
		//Bomb Material
		let bombMat = new THREE.MeshStandardMaterial({color: 0x050506 });
		let fuseMat = new THREE.MeshStandardMaterial({color: 'white'});
		let litFuse1Mat = new THREE.MeshStandardMaterial({color: '#FFD500' });
		let litFuse2Mat = new THREE.MeshStandardMaterial({color: 'red'});
		
		//Bomb Geometry
		let bomb_geo = new THREE.SphereGeometry(this.r, 50+this.r*50, 50+this.r*50);
		let fuse_geo = new THREE.CylinderGeometry(this.r/20, this.r/20, this.r/2, 50+this.r*50, 1, false);
		let litFuse1_geo = new THREE.CylinderGeometry(this.r/20, this.r/20, this.r/(100/3), 50+this.r*50, 1, false);
		let litFuse2_geo = new THREE.CylinderGeometry(this.r/20, this.r/20, this.r/20, (50+this.r*50)/10, 1, false);
		
		//Creat Assign Mesh
		this.bomb = new THREE.Mesh(bomb_geo, bombMat);
		this.fuse = new THREE.Mesh(fuse_geo, fuseMat);
		this.litFuse1 = new THREE.Mesh(litFuse1_geo, litFuse1Mat);
		this.litFuse2 = new THREE.Mesh(litFuse2_geo, litFuse2Mat);
		/* this.bomb.castShadow = true;
		this.bomb.receiveShadow = true;
		this.fuse.castShadow = true;
		this.fuse.receiveShadow = true;
		this.litFuse1.castShadow = true;
		this.litFuse1.receiveShadow = true;
		this.litFuse2.castShadow = true;
		this.litFuse2.receiveShadow = true; */
		
		//Positioning
		this.bomb.position.set(this.startingX, this.startingY, this.startingZ);
		this.fuse.position.set(this.startingX, this.startingY+this.r, this.startingZ);
		this.litFuse1.position.set(this.startingX, this.startingY+this.r*1.25, this.startingZ);
		this.litFuse2.position.set(this.startingX, this.startingY+this.r*1.25, this.startingZ);
		
		//Add Bomb
		this.add(this.bomb);
		this.add(this.fuse);
		this.add(this.litFuse1);
		this.add(this.litFuse2);
	}
	
	update(t){
		t = t;
		this.bomb.position.copy(this.path_curve.getPointAt(t));
		this.bomb.lookAt(this.path_curve.getTangentAt(t).add(this.bomb.position).add(this.position));
		
	}
}

class Path extends THREE.Curve {

    constructor(radius) {
        super();
        this.radius = radius;
    }

    getPoint(t, optionalTarget = new THREE.Vector3()) {
		t *= 1;
        let x = 0;
        let y = Math.sqrt(z*this.radius);
        let z = t;
        return optionalTarget.set(x, y, z);
    }
}