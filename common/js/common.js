$(window).resize(function() {
	window.location.reload();
});

var $eventShow = $("#eventShow");
var $device_view = $("#device_view");
var $mainPage = $(".mainPage");
var $phone = $(".phone");
var $linkBtn = $(".linkBtn");
var $comLoadingWrap = $(".comLoadingWrap");
$(document).ready(function(){
	var flexHeight = $phone.height();
	var flexWidth = flexHeight*0.55;
	var $windowWidth = $(".WebView").width();
	var flexHeight2 = $windowWidth*1.7;
	
    if($windowWidth<flexWidth){
        $phone.width($windowWidth);
        $phone.height(flexHeight2);
        $phone.css("box-sizing","border-box");
        $phone.removeClass("flexGrow visibility_hidden");
        $phone.addClass("visibility_show");
    }else{
        $phone.width(flexWidth);
        $phone.removeClass("visibility_hidden");
        $phone.addClass("visibility_show");
        $linkBtn.addClass("font16");
    }
    
    
    $linkBtn.on("click",function(){
        var link = "happyEvent/"+$(this).data("event")+"/index.html";
        $eventShow.attr("src",link);
        $mainPage.hide();
        $comLoadingWrap.show();
        $eventShow.show();
        
        $eventShow.on('load', function(){
        	$eventShow.removeClass("visibility_hidden");
        	$comLoadingWrap.hide();
        });
        
       
    });
    
    $(".btn_home").on("click",function(){
        window.location.reload();
    });
    
    
});
