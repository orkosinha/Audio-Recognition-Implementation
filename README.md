# Audio Slider
This project is an implementation of an audio recognition network using TensorFlow.js. You can either use a [pre-trained model](https://github.com/tensorflow/tfjs-models/tree/master/speech-commands) or train your own model to move a slider left and right using your microphone. A live demo is available [here](https://orkosinha.github.io/Audio-Recognition-Implementation/). 

## Instructions
#### Pre-trained
* Press the **"Train"** button without collecting any data.
* This should load the pre-trained model, press the **Listen** button to make predictions from the microphone and control the slider with your voice.

#### Training
* There are three possible commands: **left**, **right** and **none**.
* Each command has it's own button. **Press and hold** the button for 3-4 seconds to collect data (say "left", "right", or neither of them for each corresponding button).
* Once you've collected examples, press the **"Train"** button. This will start training the model and you should have an accuracy above 90%. If it is below, try collecting more data.
Once the training is done, press the **"Listen"** button to make predictions from the microphone and control the slider with your voice.
