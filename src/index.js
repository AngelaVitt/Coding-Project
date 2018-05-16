import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import SearchableTable from './SearchableTable'
import SimpleMap from './SimpleMap'



ReactDOM.render(
  <div style={{width: '100%', height: '400px'}}>
    <SimpleMap/>
  </div>,
  document.getElementById('main')
);



ReactDOM.render(
    <SearchableTable/>,
  document.getElementById('tableOfData')
);


