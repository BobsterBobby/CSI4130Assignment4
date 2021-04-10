// Authors: Shize Li and Robert Zhang
// Island

export class Island extends THREE.Group {
	constructor(islandRadius = 4, islandHeight = 0.1, x = 0, y = 0, z = 0,
				NumOfWall = 20, heightOfWall = 1, portLength = 3,
				openingAngle = 2*Math.PI / NumOfWall) {
		super();
		
		this.radius = islandRadius;
		this.islandHeight = islandHeight;
		this.islandPositionX = x;
		this.islandPositionY = y;
		this.islandPositionZ = z;
		this.NumOfWall = NumOfWall;
		this.heightOfWall = heightOfWall;
		this.portLength = portLength;
		this.startingAngle = openingAngle;
		this.islandBaseRatio = 19/16;
		
		//Bottom platform
		let island_Base_Geo = new THREE.CylinderGeometry(this.radius, this.radius*this.islandBaseRatio, this.islandHeight,1000, 1, false);
		this.islandBase = new THREE.Mesh(island_Base_Geo, new THREE.MeshStandardMaterial({color: 0xf5b942}));
		this.islandBase.position.set(this.islandPositionX,this.islandPositionY,this.islandPositionZ);
		this.add(this.islandBase);
		
		//Rollercoaster Platform
		let island_Base_Geo2 = new THREE.CylinderGeometry(this.radius/4, this.radius/4*3/2, this.islandHeight,1000, 1, false);
		this.islandBase2 = new THREE.Mesh(island_Base_Geo2, new THREE.MeshStandardMaterial({color: 0xee4444}));
		this.islandBase2.position.set(this.islandPositionX,this.islandPositionY+this.islandHeight,this.islandPositionZ-this.radius/2);
		this.add(this.islandBase2);
		
		//Park platform
		var parkFloorPosX,parkFloorPosY,parkFloorPosZ;
		parkFloorPosX = this.islandPositionX
		parkFloorPosY = this.islandPositionY+this.islandHeight*0.55
		parkFloorPosZ = this.islandPositionZ
		let island_Base_Geo3 = new THREE.CylinderGeometry(this.radius, this.radius, this.islandHeight/10,1000, 1, false);
		this.islandBase3 = new THREE.Mesh(island_Base_Geo3, new THREE.MeshStandardMaterial({color: 'grey'}));
		this.islandBase3.position.set(parkFloorPosX,parkFloorPosY,parkFloorPosZ);
		this.add(this.islandBase3);
		
		//Base variables
		var width, depth, angle, i, tangAngle;
		
		//Park walls
		this.islandWall = new Array();
		if (this.NumOfWall < 4) this.NumOfWall = 4;
		if (this.NumOfWall > 40) this.NumOfWall = 40;
		var positionX, positionY, positionZ;
		depth = 0.01; angle = 2*Math.PI / this.NumOfWall;
		var a = this.radius*(Math.cos(angle/2).toFixed(3));
		positionY = parkFloorPosY+this.heightOfWall/2;
		width = 2*this.radius*(Math.sin(angle/2)).toFixed(3);
		for (i = 0, tangAngle = 0;
				i < this.NumOfWall-1;
				i++, tangAngle += angle){
			positionX = a*Math.sin(tangAngle+this.startingAngle).toFixed(3)+parkFloorPosX;
			positionZ = a*Math.cos(tangAngle+this.startingAngle).toFixed(3)+parkFloorPosZ;
			let wall_Geo = new THREE.BoxGeometry(width, this.heightOfWall, depth);
			this.islandWall.push(new THREE.Mesh(wall_Geo, new THREE.MeshStandardMaterial({color: 'brown'})));
			this.islandWall[i].position.set(positionX,positionY,positionZ);
			this.islandWall[i].rotateY(this.startingAngle+tangAngle);
			this.add(this.islandWall[i]);
		}
		
		//Wall poles spikes
		this.wallPolls = new Array();
		this.wallSpikes = new Array();
		var pollRadius,pollHeight, spikeRadius, spikeHeight;
		var pollPositionX,pollPositionY,pollPositionZ, spikePositionY;
		pollRadius = width/10;
		pollHeight = this.heightOfWall+this.islandHeight;
		spikeRadius = pollRadius*1.4;
		spikeHeight = pollHeight/4;
		pollPositionY = positionY+this.islandHeight/2;
		spikePositionY = pollPositionY+pollHeight/2+spikeHeight/2;
		for(i = 0, tangAngle = 0; i < this.NumOfWall; i++, tangAngle += angle){
			pollPositionX = this.radius*Math.sin(tangAngle+this.startingAngle/2).toFixed(3)+parkFloorPosX;
			pollPositionZ = this.radius*Math.cos(tangAngle+this.startingAngle/2).toFixed(3)+parkFloorPosZ;
			let poll_Geo = new THREE.CylinderGeometry(pollRadius, pollRadius, pollHeight, 100, 1, false);
			let spike_Geo = new THREE.ConeGeometry(spikeRadius, spikeHeight, 100, 1, false);
			this.wallPolls.push(new THREE.Mesh(poll_Geo, new THREE.MeshStandardMaterial({color: 'grey'})));
			this.wallSpikes.push(new THREE.Mesh(spike_Geo, new THREE.MeshStandardMaterial({color: 'grey'})));
			this.wallPolls[i].position.set(pollPositionX, pollPositionY, pollPositionZ);
			this.wallSpikes[i].position.set(pollPositionX, spikePositionY, pollPositionZ);
			this.add(this.wallPolls[i]);
			this.add(this.wallSpikes[i]);
		}
		
		//Island Port and Supports
		this.planks = new Array();
		this.supports = new Array();
		var plankDepth = this.radius/8;
		var plankNumber = this.portLength/plankDepth;
		var plankwidth = width/2;
		var plankPositionX, plankPositionY, plankPositionZ;
		var supportPositionX, supportPositionY, supportPositionZ;
		plankPositionY = this.islandPositionY;
		var supportRadius = width/20;
		var supportHeight = 2*this.islandHeight/3;
		supportPositionY = plankPositionY - supportHeight/2;
		for (i = 0; i < plankNumber; i++){
			plankPositionX = ((this.radius*this.islandBaseRatio-this.radius)/2+this.radius+plankDepth/2+plankDepth*i)*
								Math.sin(this.startingAngle-angle).toFixed(3)+this.islandPositionX;
			plankPositionZ = ((this.radius*this.islandBaseRatio-this.radius)/2+this.radius+plankDepth/2+plankDepth*i)*
								Math.cos(this.startingAngle-angle).toFixed(3)+this.islandPositionZ;
			let plank_Geo = new THREE.BoxGeometry(plankwidth, this.islandHeight/10, plankDepth);
			let support1_Geo = new THREE.CylinderGeometry(supportRadius, supportRadius, supportHeight, 100, 1, false);
			let support2_Geo = new THREE.CylinderGeometry(supportRadius, supportRadius, supportHeight, 100, 1, false);
			this.planks.push(new THREE.Mesh(plank_Geo, new THREE.MeshStandardMaterial({color: 0x663300})));
			this.supports.push(new THREE.Mesh(support1_Geo, new THREE.MeshStandardMaterial({color: 0x663300})));
			this.supports.push(new THREE.Mesh(support2_Geo, new THREE.MeshStandardMaterial({color: 0x663300})));
			this.planks[i].position.set(plankPositionX, plankPositionY, plankPositionZ);
			supportPositionX = (plankwidth/2)*Math.sin(this.startingAngle-angle+Math.PI/2).toFixed(3)+plankPositionX;
			supportPositionZ = (plankwidth/2)*Math.cos(this.startingAngle-angle+Math.PI/2).toFixed(3)+plankPositionZ;
			this.supports[2*i].position.set(supportPositionX, supportPositionY, supportPositionZ);
			supportPositionX = (plankwidth/2)*Math.sin(this.startingAngle-angle-Math.PI/2).toFixed(3)+plankPositionX;
			supportPositionZ = (plankwidth/2)*Math.cos(this.startingAngle-angle-Math.PI/2).toFixed(3)+plankPositionZ;
			this.supports[2*i+1].position.set(supportPositionX, supportPositionY, supportPositionZ);
			this.add(this.planks[i]);
			this.add(this.supports[2*i]);
			this.add(this.supports[2*i+1]);
		}
		
	}
	
	update(){
	}
}