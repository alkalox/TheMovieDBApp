import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Image,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import fetchMovies from '../src/actions/index.js'


class MoviesApp extends React.Component {

  componentDidMount() {
    this.props.fetchMovies(this.props.page);
  }


  renderFooter = () => {
    return (
      <View style={styles.footer}>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => this.props.fetchMovies(this.props.page)}
          style={styles.Button}>
          <Text style={styles.buttonText}>Load more Movies</Text>
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    return (
      <View style = {{padding: 10, paddingTop: 15, marginBottom: 10}}>
        <View style =  {{alignItems:'center', paddingBottom: 10}}>
          <Text style = {{fontFamily: 'Roboto', fontSize: 17.5, fontWeight: 'bold'}}> 
            TheMovieDB Popular Movies
          </Text>
        </View>
        {this.props.loading ? <ActivityIndicator /> : (
          <FlatList
            data={this.props.data}
            renderItem={({item}) => <Card {...item} /> }
            showsVerticalScrollIndicator = {false}
            keyExtractor={(item, index) => index.toString()}
            ListFooterComponent={this.renderFooter}
          />
        )}
        
      </View>
    );
  }
}

const Card = props => (
  <View style = {{flexDirection:'row', paddingTop: 10}}>
    <Image
      style={{width: 185, height: Dimensions.get('window').height/2.8 }}
      source={{ uri: `https://image.tmdb.org/t/p/w185` + props.poster_path}}
    />
    <View style = {{flex:1, paddingLeft: 3 }}>
      <Text style = {{fontWeight: 'bold'}}> 
        {props.title} 
      </Text>
      <Text style = {{fontWeight: 'bold'}}>
        Rating: <Text style = {{fontWeight:'normal'}}>{props.vote_average} </Text> </Text>
      <Text style = {{marginTop: 10,  fontSize: 12.5}}>
        {props.overview}
      </Text>
    </View>
  </View>
)

const styles = StyleSheet.create({
    footer: {
      padding: 10,
      marginBottom: 10,
      justifyContent: 'center',
      alignItems: 'center',
    },
    Button: {
      padding: 10,
      backgroundColor: 'green',
      width: 200,
      borderRadius: 4,
    },
    buttonText: {
      color: 'white',
      fontSize: 15,
      textAlign: 'center',
    },
  });

  

const mapStateToProps = state => ({
    page: state.page,
    data: state.data,
    loading: state.loading,
    error: state.error,
  });

  const mapDispatchToProps = dispatch => bindActionCreators({
    fetchMovies: fetchMovies,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(MoviesApp)

