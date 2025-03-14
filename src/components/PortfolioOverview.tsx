import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { addAsset, removeAsset } from '../store/slice';
import { FixedSizeList as List } from 'react-window';
import './PortfolioOverview.scss';


interface Asset {
  id: string;
  name: string;
  price: number;
  change24h: number;
}

const PortfolioOverview: React.FC = () => {
  const dispatch = useDispatch();
  const assets = useSelector((state: RootState) => state.portfolio.assets);
  const [quantity, setQuantity] = useState(0);
  const [selectedAsset, setSelectedAsset] = useState<string>('');
  const [availableAssets, setAvailableAssets] = useState<Asset[]>([]);

  // Подключение к WebSocket для получения данных о активах
  useEffect(() => {
    const socket = new WebSocket('wss://stream.binance.com:9443/stream?streams=btcusdt@ticker/ethusdt@ticker/bnbusdt@ticker/neousdt@ticker');

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const stream = data.stream;
      const price = parseFloat(data.data.c);
      const change24h = parseFloat(data.data.P);

      setAvailableAssets((prevAssets) => {
        const assetId = stream.split('@')[0].toLowerCase();
        const assetIndex = prevAssets.findIndex((a) => a.id === assetId);

        if (assetIndex !== -1) {
          // Обновляем существующий актив
          const updatedAssets = [...prevAssets];
          updatedAssets[assetIndex] = {
            ...updatedAssets[assetIndex],
            price,
            change24h,
          };
          return updatedAssets;
        } else {
          // Добавляем новый актив
          return [
            ...prevAssets,
            {
              id: assetId,
              name: assetId.toUpperCase(),
              price,
              change24h,
            },
          ];
        }
      });
    };

    return () => {
      socket.close();
    };
  }, []);

  const handleAddAsset = () => {
    const asset = availableAssets.find((a) => a.id === selectedAsset);
    if (asset && quantity > 0) {
      dispatch(addAsset({
        id: asset.id,
        name: asset.name,
        quantity,
        price: asset.price,
        change24h: asset.change24h,
      }));
      setSelectedAsset('');
      setQuantity(0);
    }
  };

  const handleRemoveAsset = (id: string) => {
    dispatch(removeAsset(id));
  };

  const totalPortfolioValue = assets.reduce((sum, asset) => sum + asset.quantity * asset.price, 0);

  const Row = ({ index, style }: { index: number; style: React.CSSProperties }) => {
    const asset = assets[index];
    const totalValue = asset.quantity * asset.price;
    const portfolioPercentage = (totalValue / totalPortfolioValue) * 100;

    return (
      <div style={style} onClick={() => handleRemoveAsset(asset.id)} className="asset-row">
        <div>{asset.name}</div>
        <div>{asset.quantity}</div>
        <div>${asset.price.toFixed(2)}</div>
        <div>${totalValue.toFixed(2)}</div>
        <div>{asset.change24h.toFixed(2)}%</div>
        <div>{portfolioPercentage.toFixed(2)}%</div>
      </div>
    );
  };

  return (
    <div className="portfolio-overview">
      {assets.length === 0 ? (
        <div className="empty-portfolio">
          <p>Нет активов в вашем портфеле. Добавьте что–нибудь, чтобы начать!</p>
          <div className="form">
            <select
              value={selectedAsset}
              onChange={(e) => setSelectedAsset(e.target.value)}
            >
              <option value="">Выберите актив</option>
              {availableAssets.map((asset) => (
                <option key={asset.id} value={asset.id}>{asset.name}</option>
              ))}
            </select>
            <input
              type="number"
              placeholder="Quantity"
              value={quantity}
              onChange={(e) => setQuantity(parseFloat(e.target.value))}
            />
            <button onClick={handleAddAsset}>Добавить</button>
          </div>
        </div>
      ) : (
        <>
          <div className="form">
            <select
              value={selectedAsset}
              onChange={(e) => setSelectedAsset(e.target.value)}
            >
              <option value="">Выберите актив</option>
              {availableAssets.map((asset) => (
                <option key={asset.id} value={asset.id}>{asset.name}</option>
              ))}
            </select>
            <input
              type="number"
              placeholder="Quantity"
              value={quantity}
              onChange={(e) => setQuantity(parseFloat(e.target.value))}
            />
            <button onClick={handleAddAsset}>Добавить</button>
          </div>
          <div className="list-header">
            <div>Name</div>
            <div>Quantity</div>
            <div>Price</div>
            <div>Total Value</div>
            <div>24h Change</div>
            <div>Portfolio %</div>
          </div>
          <List
            height={400}
            itemCount={assets.length}
            itemSize={50}
            width={1800}
          >
            {Row}
          </List>
        </>
      )}
    </div>
  );
};

export default PortfolioOverview;