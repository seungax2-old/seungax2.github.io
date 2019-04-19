$(window).resize(function() {
	window.location.reload();
});


$(document).ready(function(){
	var $eventShow = $("#eventShow");
	var $device_view = $("#device_view");
	var $mainPage = $(".mainPage");
	var $phone = $(".phone");
	
	var $device_loading = $(".device_loading .loading");
	var $window_loading = $(".window_loading .loading");
	var $comLoadingWrap = $(".comLoadingWrap");
	
	var flexHeight = $phone.height();
	var flexWidth = flexHeight*0.55;
	var $windowWidth = $(".WebView").width();
	var flexHeight2 = $windowWidth*1.7;
	
	$comLoadingWrap.load("common/loading.html");
	$window_loading.show();
	
    if($windowWidth<flexWidth){
        $phone.width($windowWidth);
        $phone.height(flexHeight2);
        $phone.css("box-sizing","border-box");
        $phone.removeClass("flexGrow");
        $phone.show();
        $window_loading.hide();
    }else{
        $phone.width(flexWidth);
        $phone.show();
        $window_loading.hide();
    }
    
    
    $(".linkBtn").on("click",function(){
        var link = "happyEvent/"+$(this).data("event")+"/index.html";
        $eventShow.attr("src",link);
        $mainPage.hide();
        $device_loading.show();
        $eventShow.show();
        
        $eventShow.on('load', function(){
        	$eventShow.removeClass("visibility_hidden");
        	$device_loading.hide();
        });
        
       
    });
    
    $(".btn_home").on("click",function(){
        window.location.reload();
        $device_loading.remove();
        $window_loading.remove();
    });
    
    
});
