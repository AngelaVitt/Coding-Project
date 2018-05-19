import ReactTable from 'react-table'
import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import renderer from 'react-test-renderer';

const columns = [{
  Header: 'IP Address',
  accessor: 'ipAddress' // String-based value accessors!
}]

export default class SearchableTable extends React.Component {
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

  

  render() {
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


test("renders correctly", () => {
  const renderer = new ShallowRenderer();

  const result = renderer.render(<SearchableTable/>);

  expect(result).toMatchSnapshot();
});
