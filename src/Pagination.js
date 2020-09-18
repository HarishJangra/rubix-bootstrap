import React from 'react'
import Pagination from 'react-bootstrap/lib/Pagination';

export default ({
    prev,
    next,
    first,
    last,
    ellipsis,
    boundaryLinks,
    items,
    maxButtons,
    activePage,
    onSelect,
    ...rest
  }) => {
    const onPrev = () => {
      activePage !== 1 && onSelect(activePage - 1);
    };
  
    const onNext = () => {
      activePage !== items && onSelect(activePage + 1);
    };
  
    let firstEllp =
      (items > activePage + 2 || items >= activePage - 2) && activePage > 4;
    let secondEllp = items > activePage + 2 && activePage < items;
    let arr = getArary(items, activePage);
  
    return (
      <Pagination {...rest}>
        {prev && <Pagination.Prev disabled={activePage === 1} onClick={onPrev} />}
        <Pagination.Item
          active={activePage === 1}
          onClick={() => {
            onSelect(1);
          }}
        >
          {1}
        </Pagination.Item>
  
        {firstEllp && <Pagination.Ellipsis />}
        {_.map(arr, (i) => {
          return (
            <Pagination.Item
              onClick={() => {
                onSelect(i);
              }}
              active={i === activePage}
              key={i}
            >
              {i}
            </Pagination.Item>
          );
        })}
        {secondEllp && <Pagination.Ellipsis />}
  
        <Pagination.Item
          onClick={() => {
            onSelect(items);
          }}
          active={activePage === items}
        >
          {items}
        </Pagination.Item>
        {next && (
          <Pagination.Next disabled={activePage === items} onClick={onNext} />
        )}
      </Pagination>
    );
  };
  
  const getArary = (items, active) => {
    let arr = [];
  
    for (let i = active - 2; i <= active + 2; i++) {
      if (i > 1 && i < items) arr.push(i);
    }
    return arr;
  };
  