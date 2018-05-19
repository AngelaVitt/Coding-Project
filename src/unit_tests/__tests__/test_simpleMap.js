import GoogleMapReact from 'google-map-react';
import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import renderer from 'react-test-renderer';

export default class SimpleMap extends React.Component {
  

  

  render() {
    return (
      <GoogleMapReact
        defaultCenter={this.props.center}
        defaultZoom={this.props.zoom}
      />
    );
  }
}


test("renders correctly", () => {
  const renderer = new ShallowRenderer();

  const result = renderer.render(<SimpleMap/>);

  expect(result).toMatchSnapshot();
});
