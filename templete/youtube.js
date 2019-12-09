// 스와이프 붙이고
// yotubeOnClick();
// modalSwiper.on('slideChangeTransitionEnd', youtubeAllStop);
// 해주기

var tag = document.createElement('script');
tag.src = 'https://www.youtube.com/iframe_api';
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 생성된 id를 추가 시켜 영상을 조작하기 위한 객체
var player = {};
var eventList = {};

function makeYoutube(id, link) {
	player[id] = new YT.Player(id, {
		height: '300',
		width: '480',
		playerVars: { autoplay: 1, controls: 0 },
		videoId: link,
		events: {
			onReady: onPlayerReady
		}
	});

	function onPlayerReady(event) {
		eventList[id] = event;
		event.target.playVideo();
	}
}

/*
    조금이라도 첫 로딩을 빠르게 하기 위해
    .youtube를 클릭할 때 영상을 로드 시킴.
                                                     ↓        
    makeRandomId() 함수를 추가한 이유는 new YT.Player(id,{})
    이 부분에는 id만 들어가기 떄문이다.

    swiper.js option에 loop:true를 추가하게 되면 처음과 마지막 슬라이드의 복제가 생기는데 
    그렇게되면 id도 복제가 되서 같은 id가 2개가 된다.
    그럼 처음 검색된 id에만 동영상이 로딩되고 다음 id엔 로드가 되지 않는다.
    그래서 생각한 것이 html에는 id를 넣지 않고 클릭될 때 id를 추가해서 넣고 그 아이디로 영상을 로드시키는 방법이다.
*/

function yotubeOnClick() {
	[].forEach.call(document.querySelectorAll('.swiper-slide'), function(el, index) {
		el.addEventListener('click', function() {
			var thisYoutube = $($(this).find('div.youtube')[0]);
			var thisYoutubeLink = thisYoutube.attr('data-youtubeLink');
			
			if($(this).find('iframe').length >0 ){
				console.log(eventList[$(this).attr('data-iframeId')])
				eventList[$(this).attr('data-iframeId')].target.playVideo();
			}else{
				var thisId = makeRandomId();
				$(this).attr('data-iframeId',thisId);
				thisYoutube.attr('id',thisId);
				makeYoutube(thisId, thisYoutubeLink);    		
			}
		});
	});
}

// load될 때 클릭 이벤트와 swiper가 슬라이드 될 때 동영상을 stop 시키는 이벤트 추가.
function onLoadEvent() {
  
}

// 위에 생성해둔 player 객체 안에 있는 프로퍼티들을 검색해서 비디오 멈춤
function youtubeAllStop() {
  for (var youtube in player) {
    player[youtube].pauseVideo();
  }
}

var makeRandomId = function() {
	var text = '';
	var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+=-';
	for (var i = 0; i < 11; i++) text += possible.charAt(Math.floor(Math.random() * possible.length));
	return text;
};