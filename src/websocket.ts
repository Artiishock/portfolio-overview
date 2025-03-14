import { updateAssetPrice } from './store/slice';
import { store } from './store/store';

const socket = new WebSocket('wss://stream.binance.com:9443/stream?streams=btcusdt@ticker/ethusdt@ticker');

socket.onmessage = (event) => {
  const data = JSON.parse(event.data);
  const stream = data.stream;
  const price = parseFloat(data.data.c);
  const change24h = parseFloat(data.data.P);

  if (stream.includes('btcusdt')) {
    store.dispatch(updateAssetPrice({ id: 'btc', price, change24h }));
  } else if (stream.includes('ethusdt')) {
    store.dispatch(updateAssetPrice({ id: 'eth', price, change24h }));
  }
};