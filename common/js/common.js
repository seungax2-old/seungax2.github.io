$(window).resize(function() {
	window.location.reload();
});

var $eventShow = $("#eventShow");
var $mainPage = $("#mainPage");
var $phone = $(".phone");
var $loading = $(".loading");
$(window).load(function(){
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
    });
    
    
});
