import React, { Component } from 'react';
import {
	StyleSheet,
	View,
	Image,
} from 'react-native';

export default class RatingHeartComponent extends Component {
	render() {
		// Recieve the ratings object from the props
		let ratingObj = this.props.ratingObj;
		// This array will contain our star tags. We will include this
		// array between the view tag.
		let stars = [];
		// Loop 5 times
		for (var i = 1; i <= 5; i++) {
			// set the path to filled stars
			let path = require('../Images/heart-filled.png');
			// If ratings is lower, set the path to unfilled stars
			if (i > ratingObj.ratings) {
				path = require('../Images/heart-not-filled.png');
			}
			stars.push((<Image style={styles.image} source={path} />));
		}

		return (
			<View style={ styles.container }>
				{ stars }
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'center'
	},
	image: {
		width: 50,
		height: 50
	},
	text: {
		fontSize: 20,
		marginLeft: 10,
		marginRight: 10
	}
});