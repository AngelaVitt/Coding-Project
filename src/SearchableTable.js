import React from 'react';
import ReactTable from 'react-table'
import 'react-table/react-table.css'


const data = [{
      ipAddress: 'Tanner Linsley',
      coordinates: 26,
      friend: {
        name: 'Jason Maurer',
        age: 23,
      }
    }]


    const columns = [{
      Header: 'ipAddress',
      accessor: 'ipAddress' // String-based value accessors!
    }, {
      Header: 'Coordinates',
      accessor: 'coordinates',
      Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
    }, {
      id: 'friendName', // Required because our accessor is not a string
      Header: 'Friend Name',
      accessor: d => d.friend.name // Custom value accessors!
    }, {
      Header: props => <span>Friend Age</span>, // Custom header components!
      accessor: 'friend.age'
    }]
class SearchableTable extends React.Component {
 render() {
    return (
       <ReactTable 
          data={data}
          columns={columns}
          filterable
          defaultPageSize = {10}
           pageSizeOptions = {[5, 10, 20, 25, 50, 100, 500, 1000]}
          defaultFilterMethod={(filter, row, column) => {
    const id = filter.pivotId || filter.id
    return row[id] !== undefined ? String(row[id]).toLowerCase().startsWith(filter.value.toLowerCase()) : true
  }}
          >
        
      </ReactTable>
        
    );
  }
}

export default SearchableTable;
