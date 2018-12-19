(function () {
    var brickContainers = document.getElementsByClassName('brickcontainer');
    var bricks;
    [].forEach.call(brickContainers, function (container) {
        bricks = container.getElementsByClassName('brick-item-common');
        container.items = [].slice.call(bricks);
        [].forEach.call(container.items, function (brick) {
            brick.startX = 0;
            brick.startY = 0;
            brick.endX = 0;
            brick.endX = 0;
        });
    });
    var timeout = false;
    // Window resize event optimization - Debouncing
    window.addEventListener('resize', function() {
        clearTimeout(timeout);
        timeout = setTimeout(onResize, 250);
    });
    window.onload = onResize;

    var isIE = false || !!document.documentMode;
    
    function onResize() {
        var totHeight = 0;
        
        [].forEach.call(brickContainers, function (container) {
            var containerWidth = parseFloat(window.getComputedStyle(container).getPropertyValue('width'));
            
            var prevX = 0;
            [].forEach.call(container.items, function (brick, index) {
                var computed = window.getComputedStyle(brick);
                var width = parseFloat(computed.getPropertyValue('width'));
                var height = parseFloat(computed.getPropertyValue('height'));

                var paddingLeft = parseFloat(computed.getPropertyValue('padding-left'));
                var paddingRight = parseFloat(computed.getPropertyValue('padding-right'));
                var paddingTop = parseFloat(computed.getPropertyValue('padding-top'));
                var paddingBottom = parseFloat(computed.getPropertyValue('padding-bottom'));

                if(isIE) {
                    width += paddingLeft + paddingRight;
                    height += paddingTop + paddingBottom;
                }
                
                var lineChange = false;
                if (prevX + width > containerWidth) {
                    brick.startX = 0;
                    lineChange = true;
                } else {
                    brick.startX = prevX;
                    lineChange = false;
                }
                
                brick.endX = prevX = brick.startX + width;
                brick.startY = findY(bricks, index, lineChange, computed);
                brick.endY = brick.startY + height;
                
                brick.style.left = brick.startX + 'px';
                brick.style.top = brick.startY + 'px';
                totHeight = Math.max(totHeight, brick.endY);
            });
            
            container.style.height = totHeight + 'px';

            function findY(bricks, curIndex, line, computedBrick) {
                if (curIndex === 0) return 0;
                var startX, endX;

                var width = parseFloat(computedBrick.getPropertyValue('width'));
                var paddingLeft = parseFloat(computedBrick.getPropertyValue('padding-left'));
                var paddingRight = parseFloat(computedBrick.getPropertyValue('padding-right'));
                
                if(isIE) width += paddingLeft + paddingRight;

                if (line) {
                    startX = 0;
                    endX = startX + width;
                } else {
                    startX = bricks[curIndex - 1].endX;
                    endX = startX + width;
                }

                var y = 0;
                var inRange = false;
                for (var i = curIndex - 1; i >= 0; i--) {
                    if (!(bricks[i].endX <= startX || bricks[i].startX >= endX)) {
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
