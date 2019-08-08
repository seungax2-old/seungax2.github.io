const init = function(){
    const container = document.createElement('div');
    document.body.appendChild(container);

    //1.공간,장면
    const scene = new THREE.Scene();

    //2.랜더러
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    //3.카메라
    const cam = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000);
    cam.position.set(10,10,-100);

    var controls = new THREE.OrbitControls( cam, renderer.domElement );
    controls.update();
    controls.maxDistance = 500
    controls.minDistance = 10

    //4.빛
    const light = new THREE.DirectionalLight(0xffffff);
    light.position.set(-10,10,30).normalize();
    scene.add(light);

    //5.물체
    const geometry = new THREE.Geometry(5,50,50);
    // vCount (int) - n개
    let count = 8 ;
    let vertexArray = [0,0,0,20,0,0,20,0,20,0,0,20,0,20,0,20,20,0,20,20,20,0,20,20];

    for(let i = 0; i < count; i++){
        //vector(float) - vx, vy, vz
        const point = new THREE.Vector3();
        point.x = vertexArray[i * 3 + 0];
        point.y = vertexArray[i * 3 + 1];
        point.z = vertexArray[i * 3 + 2];
        console.log(point)

        geometry.vertices.push(point);
        // cololist 0~255 사이 숫자 - cr1, cg1, cb1
        var color = new THREE.Color(0xffffff)
        geometry.colors.push(color)
    }
    let material = new THREE.PointsMaterial({size:0.5, vertexColors:THREE.VertexColors});

    let points = new THREE.Points(geometry, material);
    scene.add(points);

    const animation = function(){
        renderer.render(scene, cam)
        controls.update()
        requestAnimationFrame(animation);

        cam.lookAt(scene.position);
    }
    requestAnimationFrame(animation);
}
window.onload = init();
