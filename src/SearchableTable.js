import React from 'react';
import ReactTable from 'react-table'
import 'react-table/react-table.css'


const columns = [{
  Header: 'IP Address',
  accessor: 'ipAddress' // String-based value accessors!
}]

function Equals(a, b) {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length !== b.length) return false;

  for (var i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

class SearchableTable extends React.Component {
  constructor(props){
    super(props);
    console.log("incoming props: " + JSON.stringify(this.props));
    this.state = {
      data: this.props.data,
      page:0,
      pageSize:10,
      visableData:[]
      
    }

  }


  componentWillReceiveProps(nextProps) {
    if (!Equals(this.state.data,nextProps.data)) {
      this.setState({data: nextProps.data});

      const data = nextProps.data;
      var visableData = data.slice(10 * 0, 10 * 0 + 10);
      this.setState({visableData:visableData});
      this.reloadMap(visableData);
      console.log("searchable table receive props");
    }
    
   
  }

  reloadMap(returnData) {
    this.props.callbackFromParent(returnData);
  }

 render() {
    console.log("load table: " + JSON.stringify(this.state.data));
    
    return (
       <ReactTable 
          data = {this.state.data}
          columns = {columns}
          onFilteredChange = {(column, value, row) => {

            const page = this.state.page;
            const pageSize = this.state.pageSize;
            const data = this.state.data;

            var visableDataOld = data.slice(pageSize * page, pageSize * page + pageSize);
            var visableDataNew = [];
            var filter = row;
            for (var i = 0; i < visableDataOld.length; i++) {
              var ipAddress = visableDataOld[i].ipAddress;

              if(ipAddress.startsWith(filter)){
                visableDataNew.push(visableDataOld[i]);
              }
            }
            visableDataOld = this.state.visableData;
            if (!Equals(visableDataOld,visableDataNew)) {
              this.setState({visableData:visableDataNew});
              this.reloadMap(visableDataNew);
            }
            visableDataNew = [];
          

          }}
          onPageSizeChange = {(pageSize) => {
            const page = this.state.page;
            const data = this.state.data;
            this.setState({pageSize: pageSize});
            var visableData = data.slice(pageSize * page, pageSize * page + pageSize);
            this.setState({visableData:visableData});
            this.reloadMap(visableData);
          }}
          onPageChange = {(page) => {
            const pageSize = this.state.pageSize;
            const data = this.state.data;
            this.setState({page: page});
            var visableData = data.slice(pageSize * page, pageSize * page + pageSize);
            this.setState({visableData:visableData});
            this.reloadMap(visableData);
          }}
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

export default SearchableTable;
