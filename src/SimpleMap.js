import React from 'react';
import GoogleMapReact from 'google-map-react';

import Background from './markerImage.png';

const K_WIDTH = 30;
const K_HEIGHT = 30; 

const markerStyle = {

  position: 'absolute',
  width: K_WIDTH,
  height: K_HEIGHT,
  left: -K_WIDTH / 2,
  top: -K_HEIGHT / 2,

  border: '5px solid #71B300',
  borderRadius: K_HEIGHT,
  backgroundColor: 'white',
  textAlign: 'center',
  color: '#3f51b5',
  fontSize: 16,
  fontWeight: 'bold',
  padding: 4
};

const AnyReactComponent = ({ text }) => (
  
  <img src={Background} style={markerStyle} alt="" />
    
);

export class SimpleMap extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      markers: this.props.markers
    }  
  }

  componentWillReceiveProps(nextProps) {
    this.setState({markers: nextProps.markers});
  }

  static defaultProps = {
    center: {lat: 36.170332, lng: -115.143132},
    zoom: 1
  };

  render() {
    console.log("making map " + JSON.stringify(this.state.markers));
    return (
       <GoogleMapReact
        defaultCenter={this.props.center}
        defaultZoom={this.props.zoom}
      >
        {this.state.markers.map((marker, i) =>{
              return(
                <AnyReactComponent
                  key = {i}
                  lat={marker.lat}
                  lng={marker.lng}
                />

              )
            })}      
      
      </GoogleMapReact>
    );
  }
}
export default SimpleMap;