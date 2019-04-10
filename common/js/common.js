$(window).resize(function() {
	window.location.reload();
});

var $eventShow = $("#eventShow");
var $mainPage = $("#mainPage");
var $phone = $(".phone");
$(document).ready(function(){
    var flexHeight = $phone.height();
    var flexWidth = flexHeight*0.55;
    var $windowWidth = $(".WebView").width();
    var flexHeight2 = $windowWidth*1.7;
    
    if($windowWidth<flexWidth){
        $phone.width($windowWidth);
        $phone.height(flexHeight2);
        $phone.css("box-sizing","border-box");
        $phone.removeClass("flexGrow");
    }else{
        $phone.width(flexWidth);
    }
    
    
    $(".linkBtn").on("click",function(){
        var link = "happyEvent/"+$(this).data("event")+"/index.html";
        $eventShow.attr("src",link);
        $eventShow.show();
        $mainPage.hide();

        /* var filter = "win16|win32|win64|mac|macintel";
        if ( navigator.platform ) { 
            if ( filter.indexOf( navigator.platform.toLowerCase() ) < 0 ) { 
                location.href=link;
            } else { 
                $eventShow.attr("src",link);
                $eventShow.show();
                $mainPage.hide();
            }
        } */

    });
    
    $(".btn_home").on("click",function(){
        window.location.reload();
    });
    
    
});

/*window.onbeforeunload = function(e) {
	alert(window.location.href);
};*/

/*$(window).bind("pageshow", function (event) {
	if (event.originalEvent.persisted) {
		console.log('BFCahe로부터 복원됨');
	}
	else {
		console.log('새로 열린 페이지');
	}
});*/