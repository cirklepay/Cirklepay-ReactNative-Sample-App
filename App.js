import React  from 'react';
import { View,Text, TouchableOpacity, Modal} from 'react-native';
import { WebView } from 'react-native-webview';

export default class App extends React.Component{
  state={
    showModal:false,
    status:'Pending'
  }
  handleResponse= data=>{
    if(data.title==='Success'){
      this.setState({showModal:false, status:'Complete'})
    }else if(data.title==='Failed'){
      this.setState({showModal:false, status:'Cancelled'})
    }else{
      return;
    }
  }
  render(){
    return(
      <View style={{marginTop :100}}>
        <Modal
        visible={this.state.showModal}
        onRequestClose={()=>{this.setState({showModal:false})}}>
          <WebView source={{ uri:'https://localhost:3000'}} onNavigationStateChange={data=>this.handleResponse(data)}>

          </WebView>
        </Modal>
      <TouchableOpacity
      style={{width:300, height:100}}
      onPress={()=>this.setState({showModal:true})}>
        <Text>Pay with CirklePay</Text>
      </TouchableOpacity>
      <Text>Payment Status: {this.state.status}</Text>
      </View>
    )
  }
}