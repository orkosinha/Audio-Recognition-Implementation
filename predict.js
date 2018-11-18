//Triggering change event after the Image is selected from the Browse Button
$("#image-selector").change(function(){

    //Defining the filereader()
    let reader = new FileReader();

    //Initialization on Load of the Window.
    reader.onload = function(){
        let dataURL = reader.result;
        $("#selected-image").attr("src",dataURL);
        $("#prediction-list").empty();
    }

    let file = $("#image-selector").prop('files')[0];

    //reading the file from file object
    reader.readAsDataURL(file);
});

//defining the model
let model;

//define a async function under which Model Load up and Progress bar is controlled
(async function(){
    model=await tf.loadModel('http://localhost:8080/vgg/model.json');
    $('.progress-bar').hide();
})();

//define a 1D tensor with ImageNet mean RGB Values..
let meanImageNetRGB= tf.tensor1d([123.68,116.779,103.939]);

//defining the Click event.
$("#predict-button").click(async function(){

    //Initialize the image object
    let image= $('#selected-image').get(0);

    //convert the image object to a tensor by resizing it and Normalizing it using the ImageNet mean RGB values
    let tensor = tf.fromPixels(image)
                    .resizeNearestNeighbor([224,224])
                    .toFloat().sub(meanImageNetRGB)
                       .reverse(2)
                       .expandDims();

//define the Prediction object and put a future event for prediction.
let prediction = await model.predict(tensor).data();

//get the top 5 prediction
let top5=Array.from(prediction)
.map(function(p,i){
    return {
        probability: p,
        className: IMAGENET_CLASSES[i]
    };
}).sort(function(a,b){
    return b.probability-a.probability;
}).slice(0,5);

//manupulating the DOM using Jquery
$("#prediction-list").empty();
top5.forEach(function(p){
    $("#prediction-list").append(`<li>${p.className}:${p.probability.toFixed(6)}</li>`);
});

});
