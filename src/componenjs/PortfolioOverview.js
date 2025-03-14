"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactRedux = require("react-redux");
var _store = require("../store/store");
var _slice = require("../store/slice");
var _reactWindow = require("react-window");
require("./PortfolioOverview.scss");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
var PortfolioOverview = function PortfolioOverview() {
  var dispatch = (0, _reactRedux.useDispatch)();
  var assets = (0, _reactRedux.useSelector)(function (state) {
    return state.portfolio.assets;
  });
  var _useState = (0, _react.useState)(0),
    _useState2 = _slicedToArray(_useState, 2),
    quantity = _useState2[0],
    setQuantity = _useState2[1];
  var _useState3 = (0, _react.useState)(''),
    _useState4 = _slicedToArray(_useState3, 2),
    selectedAsset = _useState4[0],
    setSelectedAsset = _useState4[1];
  var _useState5 = (0, _react.useState)([]),
    _useState6 = _slicedToArray(_useState5, 2),
    availableAssets = _useState6[0],
    setAvailableAssets = _useState6[1];

  // Подключение к WebSocket для получения данных о активах
  (0, _react.useEffect)(function () {
    var socket = new WebSocket('wss://stream.binance.com:9443/stream?streams=btcusdt@ticker/ethusdt@ticker/bnbusdt@ticker/neousdt@ticker');
    socket.onmessage = function (event) {
      var data = JSON.parse(event.data);
      var stream = data.stream;
      var price = parseFloat(data.data.c);
      var change24h = parseFloat(data.data.P);
      setAvailableAssets(function (prevAssets) {
        var assetId = stream.split('@')[0].toLowerCase();
        var assetIndex = prevAssets.findIndex(function (a) {
          return a.id === assetId;
        });
        if (assetIndex !== -1) {
          // Обновляем существующий актив
          var updatedAssets = _toConsumableArray(prevAssets);
          updatedAssets[assetIndex] = _objectSpread(_objectSpread({}, updatedAssets[assetIndex]), {}, {
            price: price,
            change24h: change24h
          });
          return updatedAssets;
        } else {
          // Добавляем новый актив
          return [].concat(_toConsumableArray(prevAssets), [{
            id: assetId,
            name: assetId.toUpperCase(),
            price: price,
            change24h: change24h
          }]);
        }
      });
    };
    return function () {
      socket.close();
    };
  }, []);
  var handleAddAsset = function handleAddAsset() {
    var asset = availableAssets.find(function (a) {
      return a.id === selectedAsset;
    });
    if (asset && quantity > 0) {
      dispatch((0, _slice.addAsset)({
        id: asset.id,
        name: asset.name,
        quantity: quantity,
        price: asset.price,
        change24h: asset.change24h
      }));
      setSelectedAsset('');
      setQuantity(0);
    }
  };
  var handleRemoveAsset = function handleRemoveAsset(id) {
    dispatch((0, _slice.removeAsset)(id));
  };
  var totalPortfolioValue = assets.reduce(function (sum, asset) {
    return sum + asset.quantity * asset.price;
  }, 0);
  var Row = function Row(_ref) {
    var index = _ref.index,
      style = _ref.style;
    var asset = assets[index];
    var totalValue = asset.quantity * asset.price;
    var portfolioPercentage = totalValue / totalPortfolioValue * 100;
    return /*#__PURE__*/_react.default.createElement("div", {
      style: style,
      onClick: function onClick() {
        return handleRemoveAsset(asset.id);
      },
      className: "asset-row"
    }, /*#__PURE__*/_react.default.createElement("div", null, asset.name), /*#__PURE__*/_react.default.createElement("div", null, asset.quantity), /*#__PURE__*/_react.default.createElement("div", null, "$", asset.price.toFixed(2)), /*#__PURE__*/_react.default.createElement("div", null, "$", totalValue.toFixed(2)), /*#__PURE__*/_react.default.createElement("div", null, asset.change24h.toFixed(2), "%"), /*#__PURE__*/_react.default.createElement("div", null, portfolioPercentage.toFixed(2), "%"));
  };
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "portfolio-overview"
  }, assets.length === 0 ? /*#__PURE__*/_react.default.createElement("div", {
    className: "empty-portfolio"
  }, /*#__PURE__*/_react.default.createElement("p", null, "\u041D\u0435\u0442 \u0430\u043A\u0442\u0438\u0432\u043E\u0432 \u0432 \u0432\u0430\u0448\u0435\u043C \u043F\u043E\u0440\u0442\u0444\u0435\u043B\u0435. \u0414\u043E\u0431\u0430\u0432\u044C\u0442\u0435 \u0447\u0442\u043E\u2013\u043D\u0438\u0431\u0443\u0434\u044C, \u0447\u0442\u043E\u0431\u044B \u043D\u0430\u0447\u0430\u0442\u044C!"), /*#__PURE__*/_react.default.createElement("div", {
    className: "form"
  }, /*#__PURE__*/_react.default.createElement("select", {
    value: selectedAsset,
    onChange: function onChange(e) {
      return setSelectedAsset(e.target.value);
    }
  }, /*#__PURE__*/_react.default.createElement("option", {
    value: ""
  }, "\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0430\u043A\u0442\u0438\u0432"), availableAssets.map(function (asset) {
    return /*#__PURE__*/_react.default.createElement("option", {
      key: asset.id,
      value: asset.id
    }, asset.name);
  })), /*#__PURE__*/_react.default.createElement("input", {
    type: "number",
    placeholder: "Quantity",
    value: quantity,
    onChange: function onChange(e) {
      return setQuantity(parseFloat(e.target.value));
    }
  }), /*#__PURE__*/_react.default.createElement("button", {
    onClick: handleAddAsset
  }, "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C"))) : /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
    className: "form"
  }, /*#__PURE__*/_react.default.createElement("select", {
    value: selectedAsset,
    onChange: function onChange(e) {
      return setSelectedAsset(e.target.value);
    }
  }, /*#__PURE__*/_react.default.createElement("option", {
    value: ""
  }, "\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0430\u043A\u0442\u0438\u0432"), availableAssets.map(function (asset) {
    return /*#__PURE__*/_react.default.createElement("option", {
      key: asset.id,
      value: asset.id
    }, asset.name);
  })), /*#__PURE__*/_react.default.createElement("input", {
    type: "number",
    placeholder: "Quantity",
    value: quantity,
    onChange: function onChange(e) {
      return setQuantity(parseFloat(e.target.value));
    }
  }), /*#__PURE__*/_react.default.createElement("button", {
    onClick: handleAddAsset
  }, "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C")), /*#__PURE__*/_react.default.createElement("div", {
    className: "list-header"
  }, /*#__PURE__*/_react.default.createElement("div", null, "Name"), /*#__PURE__*/_react.default.createElement("div", null, "Quantity"), /*#__PURE__*/_react.default.createElement("div", null, "Price"), /*#__PURE__*/_react.default.createElement("div", null, "Total Value"), /*#__PURE__*/_react.default.createElement("div", null, "24h Change"), /*#__PURE__*/_react.default.createElement("div", null, "Portfolio %")), /*#__PURE__*/_react.default.createElement(_reactWindow.FixedSizeList, {
    height: 400,
    itemCount: assets.length,
    itemSize: 50,
    width: 1800
  }, Row)));
};
var _default = exports.default = PortfolioOverview;