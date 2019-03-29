(function() {

    start_snowPouring('l');
    start_snowPouring('r');
    /*setInterval(function() { end_snowPouring(); }, 1000);*/
/*    var end_Pouring = setTimeout(function() {
        end_snowPouring();
    }, 2000);*/
    
    function start_snowPouring(snow_place){
        var $snowPouringDiv;
        if(snow_place == "l"){
            $snowPouringDiv = $(".snowPouringl");
        }else{
            $snowPouringDiv = $(".snowPouringr");
        }
        for(var i=0; i<12; i++){
            var left_position = Math.floor(Math.random() * 100) + 1;
            var snow_size = Math.floor(Math.random() * 3) + 1;
            var delay_time = Math.floor(Math.random() * 3) + 1;
            var top_position = Math.floor(Math.random() * 35) + 1;
            var duration_time = Math.floor(Math.random()*5) + 3;
            var snows = "<p class='snow' style='animation-duration:" +duration_time+ "s;animation-delay:" + delay_time + "s; -webkit-animation-delay: "+delay_time+"s; top:-" + top_position + "%; left:" + left_position + "%; height:" + snow_size + "vw; width:" + snow_size + "vw;'></p>"
            $snowPouringDiv.append(snows);
        }
    }
  
    var scrollT=Math.max(window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop);
    $(window).scroll(function () {
        scrollT =Math.max(window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop);
    }); 

    var startTime,endTime,startMove;
    var bloom = document.getElementById("moveCursor");
    //빗자루 끝에 맞춰서 쓸기위하여
    var bloom_H = $("#moveCursor").height()*0.85;
    //브러쉬 넓이를 잡기위하여
    var bloom_W = $("#moveCursor").width()*0.7,
        bloom_hW = $("#moveCursor").width()*0.5;
    var isDrawing, lastPoint;
    var container    = document.getElementById('snowWrap');
    var canvas       = document.getElementById('snowCanvas');
    var ctx          = canvas.getContext('2d');
    
    canvas.height = $(".under_tree").height();
    canvas.width =  $( window ).width();
    
    var canvasWidth  = canvas.width,
    canvasHeight = canvas.height;
    
    var image        = new Image(),
    brush        = new Image();

    $(".start_btn").on("click",function(){
        $(".startBtn").hide();
        var divEl = $("#snowWrap");
                            
        var divX = divEl.offset().left;
        var divY = divEl.offset().top;

        var divHalfWidth = divEl.width() / 2;
        var divHalfHeight = divEl.height() / 2;

        var divCenterX = divX + divHalfWidth;
        var divCenterY = divY + divHalfHeight;

        console.log(divCenterX+","+divCenterY)
        bloom.style.left = divCenterX + "px";
        bloom.style.top = divCenterY + "px";
        
        bloom.style.visibility = 'visible';
    });
    /*var canvasOffsetY = $("#snowWrap").offset().top;*/
    // 지워지는 부분 이미지
    /*var spaceImg = document.getElementById('spaceImg');*/
    image.src = "resources/bg_normal.png";
    image.onload = function() {
        ctx.drawImage(image, 0, 0, canvasWidth,canvasHeight);
        image.crossOrigin = "Anonymous"
        document.querySelectorAll('.under_tree')[0].style.visibility = 'visible';
    };

    //브러쉬 이미지
    /*var brushImg = document.getElementById('brushImg');*/
    brush.src = "resources/brush_img.png";
    
    bloom.addEventListener('touchstart', handleMouseDown, false);
    bloom.addEventListener('touchend', handleMouseUp, false);
    /*container.addEventListener('touchstart', handleMouseDown, false);
    container.addEventListener('touchmove', handleMouseMove, false);
    container.addEventListener('touchend', handleMouseUp, false);*/

    //위치 거리 계산
    function distanceBetween(point1, point2) {
        return Math.sqrt(Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2));
    }
    //위치 앵글 계산
    function angleBetween(point1, point2) {
        return Math.atan2( point2.x - point1.x, point2.y - point1.y );
    }

    //픽셀수 확인하면서 지워진 부분 계산 -> 총 픽셀로 나누어서 퍼센트율 계산
    function getFilledInPixels(stride) {
        //stride > 1픽셀씩 확인하면 계산시간 너무 길어짐으로 단위 올림 but 너무 올릴수록 정확x!!
        if (!stride || stride < 1) { stride = 1; }
        var pixels   = ctx.getImageData(0, 0, canvasWidth, canvasHeight),
        pdata    = pixels.data,
        l        = pdata.length,
        total    = (l / stride),
        count    = 0;
       
        // 모든 픽셀 반복문 > 픽셀의 값이 없으면 지워진 부분
        for(var i = 0; i < l; i += stride) {
            if (parseInt(pdata[i]) === 0) {
                count++;
            }
        }
        //퍼센트 계산해서 리턴
        return Math.round((count / total) * 100);
    }

    //터치 위치 계산
    function getMouse(e, canvas) {
        var offsetX = 0, offsetY = 0, mx, my;

        if (canvas.offsetParent !== undefined) {
            do {
                offsetX += canvas.offsetLeft;
                offsetY += canvas.offsetTop;
            } while ((canvas = canvas.offsetParent));
        }

        mx = (e.pageX || e.touches[0].clientX) - offsetX;
        my = (e.pageY || e.touches[0].clientY) - offsetY+scrollT;

        return {x: mx, y: my};
    }

    //얼만큼 지워졌는지 퍼센트 지워진 퍼센트기준으로 완전 스크래치로
    function handlePercentage(filledInPixels) {
        filledInPixels = filledInPixels || 0;
        if (filledInPixels >90) {
            console.log("90%");
            canvas.parentNode.removeChild(canvas);
            container.removeEventListener('touchmove', handleMouseMove, false);
            $("#moveCursor").hide();
        }
    }
    
    //터치시작 첫 포인트 기록
    function handleMouseDown(e) {
        console.log("111");
       /* 
        lastPoint = getMouse(e, canvas);
      
        bloom.style.left = lastPoint.x - bloom_hW + "px";
        bloom.style.top = lastPoint.y - bloom_H + "px";*/
        /*if($("#moveCursor").hasClass('centerPlace')){
           $("#moveCursor").removeClass('centerPlace');
        }*/
        startTime = new Date().getTime();
        startMove = setTimeout(function() {
            $("#moveCursor").addClass("rotateBloom");
            isDrawing = true;
            lastPoint = getMouse(e, canvas);
            container.addEventListener('touchmove', handleMouseMove, false);
            /*container.addEventListener('touchend', handleMouseUp, false);*/
        }, 2000);
    }

   /* function endTouch(e){
        e.preventDefault();
        container.removeEventListener('touchmove', handleMouseMove, false);
        container.removeEventListener('touchend', handleMouseUp, false);
    }*/
    //터치 무브시 이벤트
    function handleMouseMove(e) {
        console.log("222")
        //드로잉 끝났다 - 터치엔드시 리턴
        if (!isDrawing) { return; }
        e.preventDefault();
        //무빙 포인트 기록
        var currentPoint = getMouse(e, canvas),
        //첫 포인트과 움직인 순간의 포인트 사이 거리 계산
        dist = distanceBetween(lastPoint, currentPoint),
        //첫 포인트과 움직인 순간의 포인트 사이 앵글 계산 (각도)
        angle = angleBetween(lastPoint, currentPoint),
        x, y;

        for (var i = 0; i < dist; i++) {
            x = lastPoint.x + (Math.sin(angle) * i);
            y = lastPoint.y + (Math.cos(angle) * i);
            //도형합성 - 투명으로 지우는 속성
            ctx.globalCompositeOperation = 'destination-out';
            ctx.drawImage(brush, x-bloom_hW, y, bloom_W, bloom_W);
            
            bloom.style.left = x - bloom_hW + "px";
            bloom.style.top = y - bloom_H + "px";
            
            if(currentPoint.x > lastPoint.x){
                $(".movebloom").removeClass("movebloom_right");
                $(".movebloom").removeClass("movebloom_middle");
                $(".movebloom").addClass("movebloom_left");
            } else {
                $(".movebloom").removeClass("movebloom_left");
                $(".movebloom").removeClass("movebloom_middle");
                $(".movebloom").addClass("movebloom_right");
            }
        }

        lastPoint = currentPoint;
        handlePercentage(getFilledInPixels(10));
    }

    //터치 끝날시
    function handleMouseUp(e) {
        e.preventDefault();
        console.log("3333")
        container.removeEventListener('touchmove', handleMouseMove, false);
        isDrawing = false;
        $(".movebloom").removeClass("movebloom_right")
        $(".movebloom").removeClass("movebloom_left")
        $(".movebloom").addClass("movebloom_middle");
    }
})();