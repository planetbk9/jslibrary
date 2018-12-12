(function () {
	var containers = document.getElementsByClassName('slidercontainer');
	
	[].forEach.call(containers, function(container){
		var ul = container.getElementsByClassName('slider')[0];
		if(!ul.index) ul.index = 0;
		var lists = ul.getElementsByClassName('slide');
		ul.style.width = lists.length * 100 + '%';
		[].forEach.call(lists, function(slide){
			slide.style.width = 100 / lists.length + '%';
		}, lists);
		var btnLeft = container.getElementsByClassName('slideleft')[0];
		var btnRight = container.getElementsByClassName('slideright')[0];
		btnLeft.addEventListener('click', slide.bind(null, ul, lists, 0));
		btnRight.addEventListener('click', slide.bind(null, ul, lists, 1));
		slide(ul, lists);
	});
	
	function slide(ul, lists, direction) {
		var listLength = lists.length;
		if(direction === 0) {
			ul.index = (ul.index -= 1) < 0 ? ul.index + listLength : ul.index;
		}else if(direction === 1){
			ul.index = (ul.index += 1) > listLength-1 ? ul.index - listLength : ul.index;
		}
		ul.style.left = '-' + ul.index*100 + '%';
	}
}());
