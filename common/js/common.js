$(document).ready(function(){
	var filter = "win16|win32|win64|mac|macintel";
	if ( navigator.platform ) { 
		if ( filter.indexOf( navigator.platform.toLowerCase() ) < 0 ) { 
			console.log('mobile 접속'); 
			$(".header").height("15vw");
			$(".content").addClass("Conmo");
		} else { 
			console.log('pc 접속');
			$(".header").height("60px");
			$(".content").addClass("Conpc");
		}
		var flexGallery = $(".gallery").height()*0.95;
		$(".content .smallView .imgWrap").css("max-height",flexGallery);
	}
	
	$(".hrefBtn").on("click",function(){
        var link = $(this).data("href");
        location.href=link;
    });
	
});

