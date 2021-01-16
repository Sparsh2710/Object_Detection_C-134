img = "";

status = "";
objects = [];

function preload() {
    img = loadImage('dog_cat.jpg');
}

function setup() {
    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();

    objectDetector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "STATUS : Detecting Object";
}

function modelLoaded() {
    console.log("Model Loaded!");
    status = true;
    objectDetector.detect(video, gotResult);
}

function gotResult(results, error) {
    if(error) {
        console.log(error);
    }
    else {
        console.log(results);
        objects = results;
        objects[0].label;
        objects[0].width
    }
}

function draw() {
    image(video, 0, 0, 380, 380);
    
    if(status != "") {
        r = random(255);
        for(i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "STATUS : Objects Detected";
            document.getElementById("number_of_objects").innerHTML = objects.length + "objects(s) detected."; 
            console.log("DRAWING");

            fill(r, g, b);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke(r, g, b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}
