import React, {Component} from 'react';
import {View, Text, TextInput} from 'react-native';
import {Button} from 'native-base';

export default class Sample extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Asteroid: '',
      data: {},
    };
  }
  API() {
    const url =
      'https://api.nasa.gov/neo/rest/v1/neo/' +
      this.state.Asteroid +
      '?api_key=XeCmbcMQHClxcpfDSYzvRhNCwf477n9YdmOSwcNj';
    return (
      fetch(url)
        .then((response) => response.json())
        .then((json) => {
          console.log('json' + JSON.stringify(json));
          this.setState({data: json});
        })
        // eslint-disable-next-line handle-callback-err
        .catch((err) => {
          alert('Asteroid ID is not available in list');
          this.setState({data: {}});
        })
    );
  }
  gererateRandomAsteroid() {
    const url = 'https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=DEMO_KEY';
    return fetch(url)
      .then((response) => response.json())
      .then((json) => {
        var near_earth_objects = json.near_earth_objects;
        var index =
          near_earth_objects[
            Math.floor(Math.random() * near_earth_objects.length)
          ];
        this.setState({data: index});
      })
      .catch((err) => {
        return {
          status: false,
          error: err,
        };
      });
  }
  render() {
    var {Asteroid, data} = this.state;
    return (
      <View style={{justifyContent: 'center', alignItem: 'center'}}>
        <TextInput
          style={{borderWidth: 1, height: 40}}
          placeholder="Enter Asteroid ID"
          value={this.state.Asteroid}
          onChangeText={(text) => {
            this.setState({Asteroid: text});
          }}
        />
        {Asteroid ? (
          <View
            style={{margin: 10, justifyContent: 'center', alignItem: 'center'}}>
            <Button onPress={() => this.API()}>
              <Text>Submit</Text>
            </Button>
          </View>
        ) : null}
        <View
          style={{margin: 10, justifyContent: 'center', alignItem: 'center'}}>
          <Button onPress={() => this.gererateRandomAsteroid()}>
            <Text>Random Asteroid</Text>
          </Button>
        </View>
        {data && data.name && <Text>{'Name: ' + data.name}</Text>}
        {data && data.nasa_jpl_url && (
          <Text>{'nasa_jpl_url: ' + data.nasa_jpl_url}</Text>
        )}
        {data && data.is_potentially_hazardous_asteroid  && (
          <Text>
            {'is_potentially_hazardous_asteroid: ' +
              data.is_potentially_hazardous_asteroid}
          </Text>
        )}

        <View />
      </View>
    );
  }
}
