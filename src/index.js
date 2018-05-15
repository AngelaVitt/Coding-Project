import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import GoogleMapReact from 'google-map-react';


const AnyReactComponent = ({ text }) => (
  <div style={{
    position: 'relative', color: 'white', background: 'red',
    height: 40, width: 60, top: -20, left: -30,    
  }}>
    {text}
  </div>
);

class SimpleMap extends React.Component {
   constructor(props){
    super(props);
    this.state = {
        markers: [],
    }
  }

  componentDidMount(){

    // or you can set markers list somewhere else
    // please also set your correct lat & lng
    // you may only use 1 image for all markers, if then, remove the img_src attribute ^^
    this.setState({
      markers: [{lat: 50.955413, lng: 30.337844},{lat: 30.955413, lng: 37.337844}],
    });
  }
  static defaultProps = {
    center: {lat: 59.95, lng: 30.33},
    zoom: 11
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
                  lat={marker.lat}
                  lng={marker.lng}
                  text={'Kreysfgdfgdfger Avrora'} 
                />

              )
            })}      
      <AnyReactComponent 
          lat={57.955413} 
          lng={30.337844} 
          text={'Kreyser Avrora'} 
        />
      </GoogleMapReact>
    );
  }
}


ReactDOM.render(
  <div style={{width: '100%', height: '400px'}}>
    <SimpleMap/>
  </div>,
  document.getElementById('main')
);


