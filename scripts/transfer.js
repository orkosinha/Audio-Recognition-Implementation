var contentURL, styleURL;
//async function(){
  const vgg19 =  tf.loadModel(`model/model.json`);
//}

function readForm() {
  var form = document.getElementById("urlForm");
  contentURL = form.elements[0].value;
  styleURL = form.elements[1].value;
}

function preprocessImage(image){
  let tensor=tf.fromPixels(image)
    .resizeNearestNeighbor([224,224])
    .toFloat();
  let meanImageNetRGB= tf.tensor1d([123.68,116.779,103.939]);
  return tensor.sub(meanImageNetRGB)
    .reverse(2)
    .expandDims();
}
