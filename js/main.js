var imageLoader = $('#imageLoader');
    imageLoader.change(handleImage);

var iconLinks = $(".icon-row img");
    iconLinks.click(addToCanvas);

var actions = $(".actions");

var canvas = new fabric.Canvas('imageCanvas', { width: 1200, height: 400 }); // Calculate these from viewport size? Or parent element?

fabric.Canvas.prototype.customiseControls({
    tr: {
        action: 'remove',
        cursor: 'pointer'
    },
    bl: {
        action: 'scale'
    },
    br: {
        action: 'rotate',
        cursor: 'pointer'
    } 
}, function() {
    canvas.renderAll();
});

var HideControls = {
    tl: false,
    mtr: false,
    mt: false,
    mr: false,
    mb: false,
    ml: false,
};

function handleImage(e) {
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);     
    reader.onload = function(event) {
        var img = new Image();
        img.src = event.target.result;
        img.onload = function() {
            canvas.setWidth(img.width);
            canvas.setHeight(img.height);
            canvas.setBackgroundImage(event.target.result, canvas.renderAll.bind(canvas));

            actions.show();
            iconLinks.show();
            imageLoader.closest('form').hide();
        }
    }
}

function addToCanvas() {
    var imageUrl = $(this).attr("src");
    var img = new Image();
    img.src = imageUrl;

    img.onload = function() {
        var imgInstance = new fabric.Image(img, {
          left: 15,
          top: 15
        });

        if ((img.width + 30) > canvas.width)
            imgInstance.scaleToWidth(canvas.width - 30);

        var reducedBy = canvas.width / img.width;

        if ((reducedBy * img.height) > canvas.height)
            imgInstance.scaleToHeight(canvas.height - 30);

        imgInstance.setControlsVisibility(HideControls);
        canvas.add(imgInstance);
    }
}

$("#action--download").click(function() {
    window.open(canvas.toDataURL());
});
