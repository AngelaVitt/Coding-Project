import ReactTable from 'react-table'
import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import renderer from 'react-test-renderer';

const columns = [{
  Header: 'IP Address',
  accessor: 'ipAddress' // String-based value accessors!
}]

const data = [{
    ipAddress: 34.23423
  },{
    ipAddress: 54.23423
  }]


export default class SearchableTable extends React.Component {
  

  render() {
    return (
      <ReactTable 
          data = {data}
          columns = {columns}
          sortable = {false}
          filterable
          defaultPageSize = {10}
          pageSizeOptions = {[5, 10, 20, 25, 50, 100, 500, 1000]}
          defaultFilterMethod = {(filter, row, column) => {
            const id = filter.pivotId || filter.id
            return row[id] !== undefined ? String(row[id]).toLowerCase().startsWith(filter.value.toLowerCase()) : true
          }}
          >
        
      </ReactTable>
    );
  }
}


test("renders correctly", () => {
  const renderer = new ShallowRenderer();

  const result = renderer.render(<SearchableTable/>);

  expect(result).toMatchSnapshot();
});
