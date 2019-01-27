let recognizer;
let examples = [];

const FRAMES = 3;  //One frame is ~23ms of Audio

//Called by buttons from index.html
function collect(label) {
  if (label == null) {
    return recognizer.stopListening();
  }
  recognizer.listen(async ({spectrogram: {frameSize, data}}) => {
    let vals = normalize(data.subarray(-frameSize * FRAMES));
    examples.push({vals, label});
    console.log(examples);
    document.querySelector('#console').textContent = `${examples.length} examples collected`;
  }, {
    overlapFactor: 0.999,
    includeSpectrogram: true,
    invokeCallbackOnNoiseAndUnknown: true
  });
}

function normalize(x) {
  const mean = -100;
  const std = 10;
  return x.map(x => (x - mean) / std);
}

/*
function predictWord() {
  //Array of words that the recognizer is trained to recognize
  const words = recognizer.wordLabels();
  recognizer.listen(({scores}) => {
    //Turn scores into a list of (score, word) pairs
    scores = Array.from(scores).map((s, i) => ({score: s, word: words[i]}));
    //Find the most probable words
    scores.sort((s1, s2) => s2.score - s1.score);
    document.querySelector('#console').textContent = scores[0].word;
  }, {probabilityThreshold: 0.75});
}
*/

async function app() {
  recognizer = speechCommands.create('BROWSER_FFT');
  await recognizer.ensureModelLoaded();
  //predictWord();
}

app();
