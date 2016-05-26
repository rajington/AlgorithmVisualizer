logger._print('ingesting samples');

for (var sample = 0; sample < SAMPLES; sample++) {
    // flash the current sample
  samplesTracer._selectRow(sample, 0, ITEMS)._wait()._deselectRow(sample, 0, ITEMS);

  for (var item1 = 0; item1 < ITEMS; item1++) {
        // skip items that weren't rated
    if (samples[sample][item1] === 0) {
      continue;
    }

    for (var item2 = 0; item2 < ITEMS; item2++) {
            // skip items that weren't rated
      if (samples[sample][item2] === 0) {
        continue;
      }

            // skip if items are the sample
      if (item1 == item2) {
        continue;
      }

            // calculate the diff and increment the count
      diffs[item1][item2] += samples[sample][item1] - samples[sample][item2];
      counts[item1][item2]++;

            // flash the involved values
      samplesTracer._select(sample, item1);
      samplesTracer._select(sample, item2);
      diffsTracer._notify(item1, item2, diffs[item1][item2]);
      countsTracer._notify(item1, item2, counts[item1][item2]);

      logger._wait();

      samplesTracer._deselect(sample, item1);
      samplesTracer._deselect(sample, item2);
      diffsTracer._denotify(item1, item2);
      countsTracer._denotify(item1, item2);
    }
  }
}

logger._print('normalizing diffs');

for (var item1 = 0; item1 < ITEMS; item1++) {
  for (var item2 = 0; item2 < ITEMS; item2++) {
    diffsTracer._select(item1, item2);
    countsTracer._select(item1, item2);
    if (counts[item1][item2] !== 0) {
      diffs[item1][item2] /= counts[item1][item2];
    }
    diffsTracer._notify(item1, item2, diffs[item1][item2]);
    logger._wait();
    diffsTracer._deselect(item1, item2);
    countsTracer._deselect(item1, item2);
    diffsTracer._denotify(item1, item2);
  }
}

logger._print('diffs now matches page 3-31');

logger._print('predicting diffs for new sample');

for (var item1 = 0; item1 < ITEMS; item1++) {
  for (var item2 = 0; item2 < ITEMS; item2++) {
    newSampleTracer._select(item1);
    newSampleTracer._select(item2);

        // calculate the prediction
    diffsTracer._select(item1, item2);
    countsTracer._select(item1, item2);
    prediction[item1] += (diffs[item1][item2] + newSample[item2]) * counts[item1][item2];
    predictionTracer._notify(item1, prediction[item1]);

    logger._wait();

    diffsTracer._deselect(item1, item2);
    predictionTracer._denotify(item1);


        // calculate the count
    predictionCounts[item1] += counts[item1][item2];
    predictionCountsTracer._notify(item1, predictionCounts[item1]);

    logger._wait();

    countsTracer._deselect(item1, item2);
    predictionCountsTracer._denotify(item1);

    newSampleTracer._deselect(item1);
    newSampleTracer._deselect(item2);
  }
}

logger._print('normalizing prediction diffs');


for (var item = 0; item < ITEMS; item++) {
  predictionTracer._select(item);
  predictionCountsTracer._select(item);
  prediction[item] /= predictionCounts[item];
  predictionTracer._notify(item, prediction[item]);
  logger._wait();
  predictionTracer._deselect(item);
  predictionCountsTracer._deselect(item);
  predictionTracer._denotify(item);
}

logger._print('prediction for how much Ben will like Whitney Houston is: ' + prediction[2]);
