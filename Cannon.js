export class Cannon extends THREE.Group {
	constructor(cannonRadius = 0.5, x = 0.0, y = 0.0, z = 0.0) {
		super();
		
		this.r = cannonRadius;
		this.positionX = x;
		this.positionY = y;
		this.positionZ = z;
		this.angle = Math.PI/4;
		this.barrelPosX = this.positionX;
		this.barrelPosY = 3/2*this.r+this.positionY;
		this.barrelPosZ = this.positionZ;
		
		//Cannon Material
		let cannonMat = new THREE.MeshStandardMaterial({color: 'red'});
		
		//Barrel
		let connonBarrel_geo = new THREE.CylinderGeometry(this.r, this.r, this.r*4, 50+this.r*50, 1, false);
		this.connonBarrel = new THREE.Mesh(connonBarrel_geo, cannonMat);
		this.connonBarrel.position.set(this.barrelPosX,this.barrelPosY,this.barrelPosZ);
		this.connonBarrel.rotateX(this.angle);
		this.add(this.connonBarrel);
		let barrelBack_geo = new THREE.SphereGeometry(this.r, 50+this.r*50, 50+this.r*50);
		this.barrelBack = new THREE.Mesh(barrelBack_geo, cannonMat);
		this.barrelBack.position.set(0+this.positionX,this.r/2+this.positionY,-this.r+this.positionZ);
		this.add(this.barrelBack);
		
		// Wheels
		let connonWheel_geo = new THREE.CylinderGeometry(this.r, this.r, this.r/10, 50+this.r*50, 1, false);
		this.connonLeftWheel = new THREE.Mesh(connonWheel_geo, cannonMat);
		this.connonRightWheel = new THREE.Mesh(connonWheel_geo, cannonMat);
		this.connonLeftWheel.position.set(this.r+this.positionX,0+this.positionY,0+this.positionZ);
		this.connonRightWheel.position.set(-this.r+this.positionX,0+this.positionY,0+this.positionZ);
		this.connonLeftWheel.rotateZ(Math.PI/2);
		this.connonRightWheel.rotateZ(-Math.PI/2);
		this.add(this.connonLeftWheel);
		this.add(this.connonRightWheel);
		
		//Cannon opening and dir
		this.opening = new THREE.Vector3();
		this.opening.set(this.barrelPosX,
						this.barrelPosY+Math.sin(this.angle)*this.r,
						this.barrelPosZ+Math.cos(this.angle)*this.r);
		this.dir = new THREE.Vector3();
		this.dir.subVectors(this.opening,(this.barrelPosX,this.barrelPosY,this.barrelPosZ)).normalize();
		
		//alert(this.opening.x);
	}
	
	getBarrelOpening(){//opening = new THREE.Vector3()){
		/* opening = this.opening;
		alert("" + opening.x + "" + opening.y + "" + opening.z); */
        return this.opening;
	}
	
	getBarrelDirection(){
		return this.dir;
	}
	
	update(){
	}
}