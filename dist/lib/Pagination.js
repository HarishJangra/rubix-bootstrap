'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Pagination = require('react-bootstrap/lib/Pagination');

var _Pagination2 = _interopRequireDefault(_Pagination);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
  var prev = _ref.prev,
      next = _ref.next,
      first = _ref.first,
      last = _ref.last,
      ellipsis = _ref.ellipsis,
      boundaryLinks = _ref.boundaryLinks,
      items = _ref.items,
      maxButtons = _ref.maxButtons,
      activePage = _ref.activePage,
      onSelect = _ref.onSelect,
      rest = (0, _objectWithoutProperties3.default)(_ref, ['prev', 'next', 'first', 'last', 'ellipsis', 'boundaryLinks', 'items', 'maxButtons', 'activePage', 'onSelect']);

  var onPrev = function onPrev() {
    activePage !== 1 && onSelect(activePage - 1);
  };

  var onNext = function onNext() {
    activePage !== items && onSelect(activePage + 1);
  };

  var firstEllp = (items > activePage + 2 || items >= activePage - 2) && activePage > 4;
  var secondEllp = items > activePage + 2 && activePage < items;
  var arr = getArary(items, activePage);

  return _react2.default.createElement(
    _Pagination2.default,
    rest,
    prev && _react2.default.createElement(_Pagination2.default.Prev, { disabled: activePage === 1, onClick: onPrev }),
    _react2.default.createElement(
      _Pagination2.default.Item,
      {
        active: activePage === 1,
        onClick: function onClick() {
          onSelect(1);
        }
      },
      1
    ),
    firstEllp && _react2.default.createElement(_Pagination2.default.Ellipsis, null),
    _.map(arr, function (i) {
      return _react2.default.createElement(
        _Pagination2.default.Item,
        {
          onClick: function onClick() {
            onSelect(i);
          },
          active: i === activePage,
          key: i
        },
        i
      );
    }),
    secondEllp && _react2.default.createElement(_Pagination2.default.Ellipsis, null),
    _react2.default.createElement(
      _Pagination2.default.Item,
      {
        onClick: function onClick() {
          onSelect(items);
        },
        active: activePage === items
      },
      items
    ),
    next && _react2.default.createElement(_Pagination2.default.Next, { disabled: activePage === items, onClick: onNext })
  );
};

var getArary = function getArary(items, active) {
  var arr = [];

  for (var i = active - 2; i <= active + 2; i++) {
    if (i > 1 && i < items) arr.push(i);
  }
  return arr;
};