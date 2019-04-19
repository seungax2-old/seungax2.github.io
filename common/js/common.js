$(window).resize(function() {
	window.location.reload();
});

var $eventShow = $("#eventShow");
var $device_view = $("#device_view");
var $WebView = $(".WebView");
var $mainPage = $(".mainPage");
var $phone = $(".phone");
var $loading = $(".loading");
$(document).ready(function(){
	$WebView.load("../loading.html");
    var flexHeight = $phone.height();
    var flexWidth = flexHeight*0.55;
    var $windowWidth = $(".WebView").width();
    var flexHeight2 = $windowWidth*1.7;
    
    if($windowWidth<flexWidth){
        $phone.width($windowWidth);
        $phone.height(flexHeight2);
        $phone.css("box-sizing","border-box");
        $phone.removeClass("flexGrow");
        $device_view.show();
    }else{
        $phone.width(flexWidth);
        $device_view.show();
    }
    
    
    $(".linkBtn").on("click",function(){
        var link = "happyEvent/"+$(this).data("event")+"/index.html";
        $eventShow.attr("src",link);
        $mainPage.hide();
        $loading.show();
        $eventShow.show();
        
        $eventShow.on('load', function(){
        	$eventShow.removeClass("visibility_hidden");
        	$loading.hide();
        });
        
       
    });
    
    $(".btn_home").on("click",function(){
        window.location.reload();
        $loading.hide();
    });
    
    
});
