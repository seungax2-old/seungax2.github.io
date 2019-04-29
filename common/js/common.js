var $checkBrowser = checkBrowser();
$(document).ready(function(){
	if($checkBrowser == "pc"){
		$(".header").height("60px");
		$(".content").addClass("Conpc");
	}else{
		$(".header").height("15vw");
		$(".content").addClass("Conmo");
		$(".content.gallery .smallView .imgWrap").css("max-height","75vh");
	}
	
	$(".hrefBtn").on("click",function(){
        var link = $(this).data("href");
        location.href=link;
    });
	
	$(".backBtn").on("click",function(){
		window.history.back();
	})
	
});

$(window).load(function(){
	if($checkBrowser == "pc"){
		var flexGallery = $(".gallery").height()*0.95;
		$(".content.gallery .smallView .imgWrap").css("max-height",flexGallery);
		var flexWGallery = $(".Wgallery").height()*0.95;
		$(".content.Wgallery .smallView .imgWrap").css("max-height",flexWGallery);
	}
});

function loading_check(){
	$(window).load(function() {
		setTimeout(function(){
			$(".comLoadingWrap_Gallery").hide();
			$(".content").removeClass("noscroll");
		},2000);
	});
}

function checkBrowser(){
	var browser;
	var filter = "win16|win32|win64|mac|macintel";
	if ( navigator.platform ) { 
		if ( filter.indexOf( navigator.platform.toLowerCase() ) < 0 ) { 
			browser = "mo";
		} else { 
			browser = "pc";
		}
		return browser;
	}
}
