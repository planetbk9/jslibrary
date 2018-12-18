(function () {
    var brickContainers = document.getElementsByClassName('brickcontainer');
    var bricks;
    [].forEach.call(brickContainers, function (container) {
        bricks = container.getElementsByClassName('brick-item');
        container.items = [].slice.call(bricks);
        [].forEach.call(container.items, function (brick) {
            brick.startX = 0;
            brick.startY = 0;
            brick.endX = 0;
            brick.endX = 0;
        });
    });
    window.addEventListener('resize', onResize);
    window.onload = onResize;
    //$(document).ready(onResize);

    function onResize() {
        [].forEach.call(brickContainers, function (container) {
            var containerWidth = parseFloat(window.getComputedStyle(container).getPropertyValue('width'));
            //var containerWidth = $(container).width();
            var prevX = 0;
            [].forEach.call(container.items, function (brick, index) {
                var computedWidth = parseFloat(window.getComputedStyle(brick).getPropertyValue('width'));
                //var computedWidth = $(brick).width();
                var lineChange = false;
                if (prevX + computedWidth > containerWidth) {
                    brick.startX = 0;
                    lineChange = true;
                } else {
                    brick.startX = prevX;
                    lineChange = false;
                }
                brick.startY = findY(bricks, index, lineChange);
                brick.style.setProperty('left', brick.startX + 'px');
                brick.style.setProperty('top', brick.startY + 'px');

                //$(brick).css('left', brick.startX + 'px');
                //$(brick).css('top', brick.startY + 'px');
                
            brick.endX = prevX = brick.startX + computedWidth;
            brick.endY = brick.startY + parseFloat(window.getComputedStyle(brick).getPropertyValue('height'));
            //brick.endY = brick.startY + $(brick).height();
        });

        function findY(bricks, curIndex, line) {
            if (curIndex === 0) return 0;
            var startX, endX;

            if (line) {
                startX = 0;
                endX = startX + parseFloat(window.getComputedStyle(bricks[curIndex]).getPropertyValue('width'));
                //endX = startX + $(bricks[curIndex]).width();
            } else {
                startX = bricks[curIndex - 1].endX;
                endX = startX + parseFloat(window.getComputedStyle(bricks[curIndex]).getPropertyValue('width'));
                //endX = startX + $(bricks[curIndex]).width();
            }

            var y = 0;
            var inRange = false;
            for (var i = curIndex - 1; i >= 0; i--) {
                if (!(bricks[i].endX <= startX || bricks[i].startX >= endX)) {
                    //console.log('in: ' + bricks[i].endX + ", " + startX);
                    y = Math.max(y, bricks[i].endY);
                    inRange = true;
                    continue;
                }
                if (inRange) break;
            }
            return y;
        }
    });
}
}());