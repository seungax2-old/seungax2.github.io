// 프레임 번호 정보로 데이터 불러올것
// 데이터 저장할 배열 필요 일종의 q 배열
// 데이터 실시간으로 넘어오는데로 q에 프레임 번호 넣고 담은뒤 하나씩 꺼내서 그리기
// 매프레임마다 새로 그리기 > render 안에 요소 삭제 render.remove()

function PointCloud()
{
    this.vertexDataObject = new Object();
    this.vertexDataArray = undefined;
    this.frameNo = 0;
    this.dataframeIndex = 0;

    this.scene = undefined;
    this.renderer = undefined;
    this.camera = undefined;
    this.controls = undefined;
    this.light = undefined;

    this.point = undefined;
    this.geometry = undefined;
    this.material = undefined;
    this.points = undefined;
}

PointCloud.prototype.getData = function(vertexData){
    this.vertexDataArray = vertexData;
    this.vertexDataObject[this.dataframeIndex] = this.vertexDataArray;
    this.dataframeIndex += 1;
}

PointCloud.prototype.threeJsBaseDraw = function(){
    const container = document.createElement('div');
    document.body.appendChild(container);

    //1.공간,장면
    this.scene = new THREE.Scene();

    //2.랜더러
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(this.renderer.domElement);

    //3.카메라
    this.camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000);
    this.camera.position.set(10,10,-100);

    this.controls = new THREE.OrbitControls( this.camera, this.renderer.domElement );
    this.controls.update();
    this.controls.maxDistance = 500
    this.controls.minDistance = 10

    //4.빛
    this.light = new THREE.DirectionalLight(0xffffff);
    this.light.position.set(-10,10,30).normalize();
    this.scene.add(this.light);

    this.render();
}

PointCloud.prototype.render = function(){
    this.renderer.render(this.scene, this.camera);
    this.controls.update();
}

PointCloud.prototype.frameVertex = function(){
    if(Object.keys(this.vertexDataObject).length > this.frameNo ){
        this.vertexDataParse();
        this.scene.remove( this.points );
    }else{
        this.frameNo = this.frameNo - 1;
        this.vertexDataParse();
        return;
    }
}

PointCloud.prototype.vertexDataParse = function(){
    this.geometry = new THREE.Geometry(5,50,50);
    this.geometry.dispose();
    this.geometry.verticesNeedUpdate = true;
    this.geometry.normalsNeedUpdate = true;

    for(var i = 0; i < this.vertexDataObject[this.frameNo].length; i ++){
        this.point = new THREE.Vector3();
        //vector(float) - vx, vy, vz
        this.point.x = this.vertexDataObject[this.frameNo][i * 3 + 0];
        this.point.y = this.vertexDataObject[this.frameNo][i * 3 + 1];
        this.point.z = this.vertexDataObject[this.frameNo][i * 3 + 2];

        this.geometry.vertices.push(this.point);

        // cololist 0~255 사이 숫자 - cr1, cg1, cb1
        let color = new THREE.Color(0xffffff)
        this.geometry.colors.push(color)
    }

    this.material = new THREE.PointsMaterial({size:1, vertexColors:THREE.VertexColors});
    this.points = new THREE.Points(this.geometry, this.material);
    this.scene.add(this.points);

    this.render();
    this.frameNo++;
}
