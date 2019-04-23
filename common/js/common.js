$(document).ready(function(){
	var filter = "win16|win32|win64|mac|macintel";
	if ( navigator.platform ) { 
		if ( filter.indexOf( navigator.platform.toLowerCase() ) < 0 ) { 
			console.log('mobile 접속'); 
			$(".header").height("15vw");
		} else { 
			console.log('pc 접속');
			$(".header").height("60px");
		}
	}
	
	$(".hrefBtn").on("click",function(){
        var link = $(this).data("href");
        location.href=link;
    });
});

