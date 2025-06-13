import React from 'react';
import { FixedSizeList as List } from 'react-window';
import './VirtualizedList.css'

const Row = ({ index, style }) => (
  <div className="row" style={style}>
    รายการที่ #{index}
  </div>
);

const VirtualizedList = () => {
  return (
    <div >
      <h2>รายการทั้งหมด 100,000 รายการ</h2>
      <List
        height={600}
        itemCount={100000}
        itemSize={35}
        width="100%"
      >
        {Row}
      </List>
    </div>
  );
};

export default VirtualizedList;

