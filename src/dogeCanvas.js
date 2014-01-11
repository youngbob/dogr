var fontName = 'Comic Sans MS, doge, Marker Felt, Sans';
var fontSize = 30;
var palette = ['darkcyan', 'turquoise', 'maroon', 'navy', 'red', 'green', 'fuchsia', 'crimson', 'indigo', 'yellow'];

module.exports = function(options){
    var canvas = options.canvas,
        ctx = canvas.getContext('2d'),
        font = options.font,
        dogeImgURL = options.imgURL,
        img = new options.imageClass(),
        imageWidth,
        imageHeight;

    function initCanvas(){
        ctx.drawImage(img, 0, 0, img.width, img.height); //clears the canvas
        ctx.font =  fontSize + 'px ' + fontName;
        ctx.textAlign = "left";
        ctx.textBaseline = "top";
    }

    if (font) {
        fontName = font.name;
        console.log('Using font: ' + fontName);
        ctx.addFont(font);
    }

    img.onload = function(){
        imageWidth = canvas.width = img.width;
        imageHeight = canvas.height = img.height;

        initCanvas();

        if (options.callback) {
            options.callback();
        }
    };

    img.src = dogeImgURL;

    function addLineToCanvas (text){
        var textWidth = ctx.measureText(text).width,
            xMax = imageWidth - textWidth,
            yMax = imageHeight - fontSize,
            xPos = Math.random() * xMax,
            yPos = Math.random() * yMax,
            fillStyle = palette[Math.floor(( Math.random() * 1000 ) % palette.length)];

        ctx.fillStyle = fillStyle;
        ctx.fillText(text, xPos, yPos);

        return {
            fillStyle: fillStyle,
            text: text,
            xPos: xPos,
            yPos: yPos
        }
    }

    return {
        addLines: function(lines){
            initCanvas();

            return lines.map(addLineToCanvas);
        },

        fillCanvasFromData: function(dataArray){
            initCanvas();

            dataArray.forEach(function(data){
                ctx.fillStyle = data.fillStyle;
                ctx.fillText(data.text, parseFloat(data.xPos, 10), parseFloat(data.yPos, 10));
            });
        }
    };
};
