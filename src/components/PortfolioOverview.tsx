import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { addAsset, removeAsset } from '../store/slice';
import { FixedSizeList as List } from 'react-window';
import './PortfolioOverview.scss';

const PortfolioOverview: React.FC = () => {
  const dispatch = useDispatch();
  const assets = useSelector((state: RootState) => state.portfolio.assets);
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState(0);

  const handleAddAsset = () => {
    const newAsset = {
      id: name.toLowerCase(),
      name,
      quantity,
      price: 0,
      change24h: 0,
    };
    dispatch(addAsset(newAsset));
    setName('');
    setQuantity(0);
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
            <input
              type="text"
              placeholder="Asset Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
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
            <input
              type="text"
              placeholder="Asset Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
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