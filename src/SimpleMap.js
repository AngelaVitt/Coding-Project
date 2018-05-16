import React from 'react';
import './index.css';
import GoogleMapReact from 'google-map-react';

import Background from './markerImage.png';
var xhr;
var tempLatitude = [];
var tempLongitude = [];
var tempMarkers = []; 

const K_WIDTH = 30;
const K_HEIGHT = 30; 

const greatPlaceStyle = {
  // initially any map object has left top corner at lat lng coordinates
  // it's on you to set object origin to 0,0 coordinates
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
  
  <img src={Background} style={greatPlaceStyle} alt="" />
    
);

class SimpleMap extends React.Component {
   constructor(props){
    super(props);
    this.state = {
        markers: [],
    }

    this.processRequest = this.processRequest.bind(this);
    this.processRequest2 = this.processRequest2.bind(this);  }

  componentDidMount(){

    xhr = new XMLHttpRequest();
    xhr.open("GET", "http://osint.bambenekconsulting.com/feeds/c2-ipmasterlist.txt");
    xhr.setRequestHeader("Cache-Control", "no-cache");
    xhr.setRequestHeader("Allow-Control-Allow-Origin", "*");
    xhr.addEventListener("readystatechange", this.processRequest, false);
    xhr.send();
  }

  processRequest() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      var response = xhr.responseText;
      var coordinates = response.split( "\n" );
      var ipAddress = [];
      var user;
      var date;
      var url;
      var n = 0;

      var coordinatesResponse

      for (var i = 0; (i < coordinates.length -1) && (n != 3); i++) {
            if(!coordinates[i].startsWith("#")) { //Only deal with the actual data
              n += 1;
              var splitLine = coordinates[i].split(",");
              ipAddress.push(splitLine[0])
              user = splitLine[1];
              date = splitLine[2];
              url = splitLine[3];
            }
        }

          this.setState({
            ip_address: ipAddress
          });

          this.convertIPToCoordinates(ipAddress);
    }
  }

  convertIPToCoordinates(ipAddress) {
    var ipAddressTemp = ipAddress.slice();
    while(ipAddressTemp.length > 0) {
      var individualIP = ipAddressTemp.pop();

      xhr = new XMLHttpRequest();
      xhr.open("GET", "http://api.ipstack.com/"+individualIP+"?access_key=ce92c245e15256f5abf89a0c3519f725", false);
      xhr.setRequestHeader("Cache-Control", "no-cache");
      xhr.setRequestHeader("Allow-Control-Allow-Origin", "*");
      xhr.addEventListener("readystatechange", this.processRequest2, false);
      xhr.send();
    }
    this.setState({
          markers: tempMarkers
        });
  }

  processRequest2() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      var response = JSON.parse(xhr.responseText);
      //console.log(response);
      tempLatitude.push(response.latitude);
      tempLongitude.push(response.longitude);
      tempMarkers.push({lat: response.latitude, lng: response.longitude})
      
    }
  }

  static defaultProps = {
    center: {lat: 36.170332, lng: -115.143132},
    zoom: 1
  };

  render() {
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