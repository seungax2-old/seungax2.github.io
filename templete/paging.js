/* 
	사용방법

	0. 선언
	let common = new Common();
	let api = new RecipeApi();
	let ele = new Element(common, api);


	1. 숫자 버튼형 페이징
	let recipeParam = {
		"container": 'prod_list',
		"api": "ProdRecipes",
		"onePageCt": 4,
		"elementFnName": "farmDetailReviewRecipeItem",
		"pageWrap" : 'page_reviewRecipe',
		"prodRegNo" : reg_id
	};
	
	ele.addContentListPage(recipeParam, function () {
		$(".prodReviewReipeBox").hide();
	});

	2. 더보기 버튼형
	let pdParam = {
		"container": 'event_prod_list',
		"api": "EventDetailProd",
		"onePageCt": 4,
		"elementFnName": "farmDetailSmallPrdItem",
		"moreBtn" : "Btn_more"
	};
	
	ele.addContentListPage(pdParam, function () { 
		$('.event_prod_box_wrapper').hide();
		$(".Btn_more").hide(); 
	});

*/


//functionalScript  사용하여 아래와 같이 elements만드는 클래스 생성
var Element = Object.extends({
	init: function (common, api) {
		//여기에 functionalScript.js  안에 두 클래스 존재 
		this.common = common;
		/* ajax로 api 연결 */
		this.api = api;
	},
	addContentListPage: function (...rest) {
		// 필요한데이터 아래와같이 계속 추가 -> api 호출에서 쓰는 데이터만 추출해 사용
		/* 
			ex>>>>
			ProdInquiry : function(args){
				let {
					prodRegNo,
					contentPage,
					onePageCt
				} = args;
				
				let parameter = {
					'url' : '/mall_product/prod_inquiry',
					'body' : {
						'reg_no' : prodRegNo,
						'page' : contentPage,
						'page_size' : onePageCt
					}
				}
				return this.loadApi(parameter)
			},
		*/
		let [args, callback] = rest;
		let {
			container,
			type,
			api,
			onePageCt,
			elementFnName,
			moreBtn,
			saveMyfileterIs,
			filterRegNo,
			search_keyword,
			pageWrap,

			/*상품, 이벤트 관련 페이징기능에는 regNo 필요*/
			prodRegNo,
			eventRegNo
		} = args

		//페이지수 
		let contentPage = 1;
		//전체 아이템 개수
		let contentTotalCt = 0;
		//넘겨받은 컨테이너 element
		let $container = $("." + container);

		// this => Element
		// elements init 에서 this.api = StoreApi 로 해주어 아래와 같이 사용 가능
		//api 호출 함수들이 있는 클래스 ex) 찾차: StoreApi
		let recipeApi = this.api;
		//파라미터로 넘긴 사용해야하는 api 이름 해당 클래스내에서 찾기
		let call = recipeApi[api];

		let callApi = function (selectPage) {
			selectPage ? contentPage = selectPage : ''
			let param = {
				'filterRegNo': filterRegNo,
				'type': type,
				'contentPage': contentPage,
				'onePageCt': onePageCt,
				'saveMyfileterIs': saveMyfileterIs,
				'search_keyword': search_keyword,
				'prodRegNo': prodRegNo,
				'eventRegNo': eventRegNo
			}

			call.call(recipeApi, param).then(function (contents) {
				let key = Object.keys(contents).filter(key => key.indexOf("list") != -1)[0];
				let contentsList = contents[key]

				if (contentsList.length > 0) {
					if (!pageWrap) {
						//1페이지 기본
						$container.append(this.forEach(contentsList, elementFnName));

						//숫자버튼식 페이지가 아닌경우에만
						contentPage++;
						contentTotalCt += contentsList.length;

						//현재 게시물갯수와 전체 개시물갯수가 다를때만 이벤트(재귀)
						if (contentTotalCt != contentsList[0].total_row) {
							if (!moreBtn) {
								//스크롤
								containerWrap.off('scroll').scroll(function () {
									var el = $(this);
									//scrollHeight : 스크롤 시키지 않았을때의 전체 높이, scrollTop : 스크롤 되어 올라간 높이, outerHeight : 눈에보이는 컨텐츠 높이
									if ((el[0].scrollHeight - el.scrollTop()) == el.outerHeight()) {
										callApi();
									}
								})
							} else {
								//더보기버튼
								let $moreBtn = $("." + moreBtn);
								$moreBtn.off("click").on('click', function () {
									callApi();
								});
							}
						}
					} else {
						//숫자버튼식 페이징은 영역 비우고 다시 append
						$container.empty().append(this.forEach(contentsList, elementFnName));
						//숫자버튼식 페이징
						let $pageWrap = $("." + pageWrap);
						let $numberPagerWrap = $(".numberWrap", $pageWrap);

						if ($numberPagerWrap.children().length == 0) {
							let totalPaging = Math.ceil(contentsList[0].tot / onePageCt);
							let pageingFragment = $(document.createDocumentFragment());
							for (var i = 1; i < totalPaging + 1; i++) {
								let pager = $(`<a class="pager_box page${i} ${i == 1 ? 'selectPage' : ''}" data-page='${i}'>${i}</a>`);
								pager.on('click', function () {
									let thisPage = $(this);
									let thisPageData = thisPage.data('page');

									if (contentPage == thisPageData) {
										console.log('Same Page')
									} else {
										//ui
										$('.pager_box', $numberPagerWrap).removeClass('selectPage');
										thisPage.addClass('selectPage');

										//call
										callApi(thisPageData)
									}
								})
								pageingFragment.append(pager);
							}

							$(".btn_right_pager", $pageWrap).on('click', function () {
								if (totalPaging == contentPage) {
									console.log('Last Page')
								} else {
									let nextPage = contentPage + 1;
									console.log(nextPage)
									$('.pager_box', $numberPagerWrap).removeClass('selectPage');
									$('.page' + nextPage, $numberPagerWrap).addClass('selectPage');
									callApi(nextPage)
								}
							});

							$(".btn_left_pager", $pageWrap).on('click', function () {
								if (contentPage == 1) {
									console.log('Start Page')
								} else {
									let prevPage = contentPage - 1
									$('.pager_box', $numberPagerWrap).removeClass('selectPage');
									$('.page' + prevPage, $numberPagerWrap).addClass('selectPage');
									callApi(prevPage)
								}
							});

							$numberPagerWrap.empty().append(pageingFragment)

						}
					}

				} else {
					contentPage > 1 ? console.log('No Data') : callback()
				}

			}.bind(this)).catch(function (e) {
				if (e.msg == 'NO_EXIST_DATA') {
					//빈값
					callback ? callback() : console.log('No Data')
				}
			});
		}.bind(this)

		callApi();
	},
	forEach: function (array, method, isSwiper) {
		if (!array || array.length == 0) return;
		let _this = this;
		let call = this[method];
		let fragment = $(document.createDocumentFragment());

		if (isSwiper) {
			array.forEach(function (v, i) {
				fragment.append(call.call(_this, v, i, isSwiper));
			});
		} else {
			array.forEach(function (v, i) {
				fragment.append(call.call(_this, v, i));
			});
		}

		return fragment;

	}
});

