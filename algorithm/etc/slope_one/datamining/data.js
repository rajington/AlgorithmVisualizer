// var SAMPLES = 10;
// var ITEMS = 5;
// var samples = Array2D.random(SAMPLES, ITEMS, 0, 5);
// var newSample = Array1D.random(ITEMS, 0, 5);

var samples = [
    [4, 3, 4],
    [5, 2, 0],
    [0, 3.5, 4],
    [5, 0, 3],
];
var newSample = [5, 2, 0];
var SAMPLES = samples.length;
var ITEMS = samples[0].length;

// samples to generate the recommender from
var samplesTracer = new Array2DTracer();
samplesTracer._setData(samples);

// new sample to predict values for
var newSampleTracer = new Array1DTracer();
newSampleTracer._setData(newSample);

// store the current diffs for the recommender, initialize with 0s
var diffsTracer = new Array2DTracer();
var diffs = Array2D.random(ITEMS, ITEMS, 0, 0);
diffsTracer._setData(diffs);

// store the current counts for the recommender, initialize with 0s
var countsTracer = new Array2DTracer();
var counts = Array2D.random(ITEMS, ITEMS, 0, 0);
countsTracer._setData(counts);

// prediction for new sample, initialize with 0s
var predictionTracer = new Array1DTracer();
var prediction = Array1D.random(ITEMS, 0, 0);
predictionTracer._setData(prediction);

// counts for prediction, initialize with 0s
var predictionCountsTracer = new Array1DTracer();
var predictionCounts = Array1D.random(ITEMS, 0, 0);
predictionCountsTracer._setData(predictionCounts);

var logger = new LogTracer();
