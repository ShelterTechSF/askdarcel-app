'use strict';

import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Button, Input } from './shared';
import { formStyles } from '../styles';

class Login extends Component {
  render() {
    return (
      <View style={formStyles.container}>
        <Input 
          label={'Email'}
          placeholder={'name@example.com'}
        />
        <Input
          secure 
          label={'Password'}
          placeholder={'password'}
        />
        <Button onPress={() => Actions.main()}>
          Login
        </Button>
      </View>
    );
  }
}

export default Login;
