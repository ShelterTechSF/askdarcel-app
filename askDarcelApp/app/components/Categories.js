'use strict';

import React, { Component } from 'react'
import {
  ActivityIndicator,
  Platform,
  ScrollView,
  Text,
  TouchableHighlight,
  View
} from 'react-native';

import dismissKeyboard from 'dismissKeyboard';

// import styles
import { commonStyles } from '../styles';
import Category from './Category';
import ResourcesScreen from './ResourcesScreen';

import { fetchCategories, setCategory } from '../actions/categoryActions';

// import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

@connect((store) => {
  return {
    categories: store.category.list,
    fetched: store.category.fetched,
    fetching: store.category.fetching,
    categoryId: store.category.id,
    error: store.category.error
  };
})

class Categories extends Component {

  componentWillMount() {
    this.props.dispatch(fetchCategories());
  }

  searchResources(categoryId) {
    let idx = categoryId - 1;
    if (Platform.OS === 'ios') {
      this.props.navigator.push({
        title: this.props.categories[idx].name,
        component: ResourcesScreen,
        passProps: this.props.categories[idx]
      });
    } else {
      dismissKeyboard();
      this.props.navigator.push({
        title: this.props.categories[idx].name,
        name: 'resources',
        category: this.props.categories[idx]
      });
    }
  }

  _onButtonPress(category, idx) { 
    console.warn("Pressed " + category + idx);
    this.props.dispatch(setCategory(category, idx));
    this.searchResources(idx);
  }

  render() {
    let { categories } = this.props;
    let categoryList = categories.map((category, i) =>  
      <TouchableHighlight onPress={this._onButtonPress.bind(this, category.name, category.id)} key={i}>
        <View>
          <Category category={category} idx={i}/>
        </View>
      </TouchableHighlight>
    )
    return (
      <View>
        <Text style={commonStyles.title}>Browse Categories</Text>
        <ScrollView>
          {categoryList}
        </ScrollView>
      </View>
    );
  }
}

export default Categories;