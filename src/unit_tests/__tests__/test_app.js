import GoogleMapReact from 'google-map-react';
import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import renderer from 'react-test-renderer';

import SearchableTable from './test_searchableTable'
import SimpleMap from './test_simpleMap'

export default class App extends React.Component {
  constructor(props){
      super(props);
      this.state = {
        markers: [{lat: 36, lng: -115}],
        ip_address:[]
      };

      
      this.processData = this.processData.bind(this);
      this.processIPMapping = this.processIPMapping.bind(this);
  }

  render() {
    return(
      <div>
        <div style={{width: '100%', height: '600px'}}>
            <SimpleMap markers={this.state.markers} />
          </div>
          <SearchableTable data={this.state.ip_address} callbackFromParent={this.myCallback} />
        </div>
      );
  }
}


test("renders correctly", () => {
  const renderer = new ShallowRenderer();

  const result = renderer.render(<SimpleMap/>);

  expect(result).toMatchSnapshot();
});


  
