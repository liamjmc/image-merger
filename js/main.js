var imageLoader = document.getElementById('imageLoader');
    imageLoader.addEventListener('change', handleImage, false);
var iconLinks = $(".icon-row img");
    iconLinks.click(addToCanvas);
var canvas = document.getElementById('imageCanvas');
var ctx = canvas.getContext('2d');

function handleImage(e){
    var reader = new FileReader();
    reader.onload = function(event){
        var img = new Image();
        img.onload = function(){
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img,0,0);
            iconLinks.show();
        }
        img.src = event.target.result;
    }
    reader.readAsDataURL(e.target.files[0]);     
}

function addToCanvas(){
    var imageUrl = $(this).attr("src");
    var img = new Image();
    img.src = imageUrl;

    img.onload = function(){
        ctx.drawImage(img,0,0);
    }
}