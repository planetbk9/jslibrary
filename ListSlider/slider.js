function listSlide(container, ul, lists, direction/*left: 0, right: 1*/) {
	if(!ul.index) ul.index = 0;
	lists = Array.prototype.slice.call(lists);
	lists.forEach(function(slide) {
		slide.style.width = container.offsetWidth + 'px';
	});
	function slide(direction) {
		var listLength = lists.length;
		if(direction === 0) {
			ul.index = (ul.index -= 1) < 0 ? ul.index + listLength : ul.index;
		}else if(direction === 1){
			ul.index = (ul.index += 1) > listLength-1 ? ul.index - listLength : ul.index;
		}
		ul.style.left = '-' + ul.index*sliderView.offsetWidth + 'px';
	}
	slide(direction);
}
