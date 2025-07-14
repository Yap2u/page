// Object holding currency exchange rates relative to USD
var currencyRates = {
  USD: 1,
  BRL: 5.2,
  EUR: 0.93,
  GBP: 0.79,
  CAD: 1.37,
  INR: 83.2
};

function getUserCurrency() {
  var locale = navigator.language || "en-US";
  var country = locale.split("-")[1] || "US";

  var map = {
    US: "USD",
    BR: "BRL",
    IN: "INR",
    FR: "EUR",
    DE: "EUR",
    CA: "CAD",
    GB: "GBP"
  };

  if (locale.indexOf("pt") === 0) {
    return "BRL";
  }

  return map[country] || "USD";
}

function roundToNearest5(value) {
  return Math.round(value / 5) * 5;
}

function convertPrices() {
  var userCurrency = getUserCurrency();
  var rate = currencyRates[userCurrency] || 1;

  var priceElements = document.querySelectorAll('.local-price');
  for (var i = 0; i < priceElements.length; i++) {
    var el = priceElements[i];
    var basePrice = parseFloat(el.getAttribute('data-base-price'));
    var fromCurrency = el.getAttribute('data-currency') || "USD";
    var baseToUSD = basePrice / (currencyRates[fromCurrency] || 1);
    var converted = roundToNearest5(baseToUSD * rate);

    el.textContent = converted + " " + userCurrency;
  }

  // Update meta currency
  var metaElements = document.querySelectorAll('meta[itemprop="priceCurrency"]');
  for (var j = 0; j < metaElements.length; j++) {
    metaElements[j].setAttribute('content', userCurrency);
  }
}

if (document.addEventListener) {
  document.addEventListener('DOMContentLoaded', convertPrices);
} else if (window.attachEvent) {
  window.attachEvent('onload', convertPrices);
}
