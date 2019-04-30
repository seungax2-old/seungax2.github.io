var $checkBrowser = checkBrowser();
var $body = $("body");
$(document).ready(function(){
	if($checkBrowser == "pc"){
		var $browserKind = checkBrowserKind();
		console.log($browserKind);
		if($browserKind == "chrome"){
			$body.css("visibility","visible");
			$(".header").height("60px");
			$(".content").addClass("Conpc");
		}else{
//			document.location.href="common/noChrome.html";
			document.location.href="https://seungax2.github.io/common/noChrome.html";
		}
	}else{
		$body.css("visibility","visible");
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
//브라우저 환경알아내기
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

//브라우저 종류 알아내기
function checkBrowserKind(){
	var browserKind = "notChrome";
	// includes는 IE에서 동작하지 않아서 indexOf를 사용
	var userAgent = window.navigator.userAgent;
	var isChrome = userAgent.indexOf('Chrome');
	var isEdge = userAgent.indexOf('Edge');
//	var isChromeMobile = userAgent.indexOf('CriOS');
//	var isSamsungBrowser = userAgent.indexOf('SamsungBrowser');
//	var isWindows = userAgent.indexOf('Windows NT');
//	var isIE = userAgent.indexOf('Trident');

	// 크롬 브라우저 체크
	if(isChrome > -1){
	    if(isEdge < 0){
	    	browserKind = "chrome";
	    }
	}
	return browserKind;
	/*if(isChrome > -1 || isChromeMobile > -1){
	    if(isSamsungBrowser < 0 && isEdge < 0){
	        $('body').css('background', 'yellow');
	    }
	}*/
}
