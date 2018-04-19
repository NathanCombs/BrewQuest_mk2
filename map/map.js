// import React, { Component } from 'react';
// import { StyleSheet, Text, View } from 'react-native';
// import mapboxgl from 'mapbox-gl';

// mapboxgl.accessToken = 'pk.eyJ1IjoibmF0aGFuY29tYnMiLCJhIjoiY2pnMnNzZnVrMjIwNTJ4cnE5dTF5bGlzZyJ9.Igg3bQywQjGMEQOfA4xk9Q';

// export default class Map extends Component {
//     constructor() {
//         super();
//         this.state = {
//             lng: 45,
//             lat: 111,
//             zoom: 1.5
//         };
//     }

//     componentDidMount() {
//         const {lat, lng, zoom} = this.state;

//         const map = new mapboxgl.Map({
//             container: this.mapContainer,
//             style: 'mapbox://styles/mapbox/streets-v9',
//             center: [lat, lng],
//             zoom
//         });

//         map.on('move', () => {
//             const {lng, lat} = map.getCenter();

//             this.setState({
//                 lng: lng.toFixed(4),
//                 lat: lat.toFixed(4),
//                 zoom: map.getZoom().toFixed(2)
//             });
//         });
//     }

//     render() {
//         // return(
//         // // <View>
//         // //     <div className="inline-block absolute top left mt12 ml12 bg-darken75 color-white z1 py6 px12 round-full txt-s txt-bold">
//         // //         <div>{`Longitude: ${lng} Latitude: ${lat} Zoom: ${zoom}`}</div>
//         // //     </div>
//         // //     <div ref={el => this.mapContainer = el} className="absolute top right left bottom" />
//         // // </View>
//         // )
//     }
// }