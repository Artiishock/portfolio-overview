"use strict";

var _slice = require("./store/slice");
var _store = require("./store/store");
var socket = new WebSocket('wss://stream.binance.com:9443/stream?streams=btcusdt@ticker/ethusdt@ticker');
socket.onmessage = function (event) {
  var data = JSON.parse(event.data);
  var stream = data.stream;
  var price = parseFloat(data.data.c);
  var change24h = parseFloat(data.data.P);
  if (stream.includes('btcusdt')) {
    _store.store.dispatch((0, _slice.updateAssetPrice)({
      id: 'btc',
      price: price,
      change24h: change24h
    }));
  } else if (stream.includes('ethusdt')) {
    _store.store.dispatch((0, _slice.updateAssetPrice)({
      id: 'eth',
      price: price,
      change24h: change24h
    }));
  }
};