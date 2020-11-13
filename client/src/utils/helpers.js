import dayjs from 'dayjs';

export const countryNameFromSlug = (countrySlug, countries) => {
  return countries.find((country) => country.slug === countrySlug).country;
};

export const formatDate = (date) => {
  return dayjs(date).format('DD.MMM.YYYY');
};

export const populationFromSlug = (countrySlug, countries) => {
  return countries.find((country) => country.slug === countrySlug).population;
};

export const populationString = (countrySlug, countries) => {
  let population = populationFromSlug(countrySlug, countries);
  return `(${abbreviateNumber(population)})`;
};

export const abbreviateNumber = (value) => {
  var newValue = value;
  if (value >= 1000) {
    var suffixes = ['', 'k', 'm', 'b', 't'];
    var suffixNum = Math.floor(('' + value).length / 3);
    var shortValue = '';
    for (var precision = 2; precision >= 1; precision--) {
      shortValue = parseFloat(
        (suffixNum != 0
          ? value / Math.pow(1000, suffixNum)
          : value
        ).toPrecision(precision)
      );
      var dotLessShortValue = (shortValue + '').replace(/[^a-zA-Z 0-9]+/g, '');
      if (dotLessShortValue.length <= 2) {
        break;
      }
    }
    if (shortValue % 1 != 0) shortValue = shortValue.toFixed(1);
    newValue = shortValue + suffixes[suffixNum];
  }
  return newValue;
};

export const per100k = (countrySlug, dataArray, countries) => {
  let population = populationFromSlug(countrySlug, countries);
  return dataArray.map((entry) => ((entry / population) * 100000).toFixed(0));
};

export const percentage = (countrySlug, dataArray, countries) => {
  let population = populationFromSlug(countrySlug, countries);
  return dataArray.map((entry) => ((entry / population) * 100).toFixed(1));
};

export const cumulativeToDifference = (cumulativeArray) => {
  let differenceArray = [];
  differenceArray.push(cumulativeArray[0]);
  for (let i = 1; i < cumulativeArray.length; i++) {
    differenceArray.push(cumulativeArray[i] - cumulativeArray[i - 1]);
  }
  return differenceArray;
};

export const cumulativeErrorFix = (originalArray) => {
  originalArray.reverse();
  let fixedArray = [];
  fixedArray.push(originalArray[0]);
  for (let i = 1; i < originalArray.length; i++) {
    if (originalArray[i] > fixedArray[i - 1]) {
      fixedArray.push(fixedArray[i - 1]);
    } else {
      fixedArray.push(originalArray[i]);
    }
  }
  fixedArray.reverse();
  return fixedArray;
};

/**
 * returns an array with moving average of the input array
 * @param array - the input array
 * @param count - the number of elements to include in the moving average calculation
 * @param qualifier - an optional function that will be called on each
 *  value to determine whether it should be used
 * eg function(val){ return val != 0; }
 */
export const movingAverage = (array, count, qualifier) => {
  // calculate average for subarray
  var avg = function (array, qualifier) {
    var sum = 0,
      count = 0,
      val;
    for (var i in array) {
      val = array[i];
      if (!qualifier || qualifier(val)) {
        sum += val;
        count++;
      }
    }

    return sum / count;
  };

  var result = [],
    val;

  // pad beginning of result with null values
  for (var i = 0; i < count - 1; i++) result.push(null);

  // calculate average for each subarray and add to result
  for (var i = 0, len = array.length - count; i <= len; i++) {
    val = avg(array.slice(i, i + count), qualifier);
    if (isNaN(val)) result.push(null);
    else result.push(val);
  }

  return result;
};
