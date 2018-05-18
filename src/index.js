import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import SearchableTable from './SearchableTable'
import SimpleMap from './SimpleMap'

var xhr;
var tempCoords = [];

class App extends React.Component {
	constructor(props){
    	super(props);
	    this.state = {
	     	markers: [{lat: 36, lng: -115}],
        ip_address:[]
	    };

	    
	    this.processData = this.processData.bind(this);
	    this.processIPMapping = this.processIPMapping.bind(this);
	}


	componentDidMount(){
		this.fetchData();
		console.log("tempCoords: " + JSON.stringify(tempCoords));
		console.log("componentDidMount");
	}

	myCallback = (dataFromChild) => {

		for (var i = 0; i < dataFromChild.length; i++) {
      var ipAddress = dataFromChild[i].ipAddress;
      console.log(ipAddress);
			this.convertIPToCoordinates(ipAddress);
		}
    tempCoords = [];

	}

	fetchData() {
		console.log("fetchData");
		xhr = new XMLHttpRequest();
	    xhr.open("GET", "http://osint.bambenekconsulting.com/feeds/c2-ipmasterlist.txt");
	    xhr.setRequestHeader("Cache-Control", "no-cache");
	    xhr.setRequestHeader("Allow-Control-Allow-Origin", "*");
	    xhr.addEventListener("readystatechange", this.processData, false);
	    xhr.send();
	}

	processData() {
		if (xhr.readyState === 4 && xhr.status === 200) {
			var response = xhr.responseText;
			var coordinates = response.split( "\n" );
			var ipAddress = [];

			for (var i = 0; i < coordinates.length; i++) {
            	if(!coordinates[i].startsWith("#")) { //Only deal with the actual data
            		
            		var splitLine = coordinates[i].split(",");

            		//this.convertIPToCoordinates(splitLine[0]);

            		ipAddress.push({ipAddress: splitLine[0]});
            	}
        	}

        	console.log("ip_address " + JSON.stringify(ipAddress));

        	this.setState({
        		ip_address: ipAddress
        	});
      	}
  	}

  	convertIPToCoordinates(ipAddress) {
  		console.log("incoming conversion " + JSON.stringify(ipAddress));

	    xhr = new XMLHttpRequest();
	    xhr.open("GET", "http://api.ipstack.com/"+ipAddress+"?access_key=ce92c245e15256f5abf89a0c3519f725", false);
	    xhr.setRequestHeader("Cache-Control", "no-cache");
	    xhr.setRequestHeader("Allow-Control-Allow-Origin", "*");
	    xhr.addEventListener("readystatechange", this.processIPMapping, false);
	    xhr.send();

	}

	processIPMapping() {
    	if (xhr.readyState === 4 && xhr.status === 200) {
      		var response = JSON.parse(xhr.responseText);
      		tempCoords.push({lat: response.latitude, lng: response.longitude});
      		console.log("tempCoords: " + JSON.stringify(tempCoords));
      		this.setState({markers: tempCoords});
    	}
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

ReactDOM.render(
  <App />,
  document.getElementById('main')
);

