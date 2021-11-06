
    var images = [
        "bg.jpg",
        "bg2.jpg",
        "bg22.jpg",
        "bg222.jpg",
        "bg2222.jpg"
    ];
    function loadImg(i){
        if(images[i] != undefined){
            var img = new Image();
            img.src = images[i];
            img.onload = function(){
                i++;
                loadImg(i);
            }
        }
        if(images.length == i) 
            document.getElementsByClassName("body")[0].classList.add("loaded");
    }
    loadImg(0);