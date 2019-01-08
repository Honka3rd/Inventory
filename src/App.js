import React, { Component } from 'react';
import Auth from './Auth';
import firebase from './firebase'

class App extends Component {
  state = 
  {
    password:'',
    pass:false,
    err:'',
    data:[]
  }

  onChangeHandler=(event)=>{
    this.setState({password:event.target.value})
  }
  
  onSubmitHandler =(event)=>{
    event.preventDefault();
    firebase[1].on(
      'value', snapshot =>{
        if(this.state.password === snapshot.val()){
          this.setState({pass:true})
          this.setState({err:''})
        }
        else{
          this.setState({pass:false})
          this.setState({err:'密码错误'})
        }
      }
    )
  }

  componentDidMount(){
    this.setState({saveClass:'ui primary button'})
    firebase[0].on('value', snapshot => {
      var data = snapshot.val()
      //var keys = Object.keys(data)
      //console.log(keys)
      if(data===null)
        this.setState({data:[]})
      else
        this.setState({data:data})
      console.log(this.state.data)
    });
  }

  onSaveHandler=(index,name,num,onTheWay,total,sold)=>{
    const item = {
      名称:name,
      现货数量:num,
      在途数量:onTheWay,
      总量:total,
      售出量:sold
    }
    let list = [];
    list = this.state.data;
    list.forEach(
      function(el){
        if(el.名称===name)
        {
          console.log("save: "+el)
          list[list.indexOf(el)] = item
        }
      }
    )
    this.setState({data:list})
    console.log(list)
    const rootRef = firebase[0];
    rootRef.set(this.state.data);
  }

  onPushHandler=(item)=>{
    let items = this.state.data;
    if(this.state.data===null)
    {
      this.setState({data:[]})
      items = []
    }
    console.log(items)
    items.push(item)
    const rootRef = firebase[0];
    rootRef.set(items);
    this.setState({data:items})
  }

  onDeleteHandler=(name)=>{
    let list = []
    const rootRef = firebase[0];
    list = this.state.data;
    if(list.length>0){
      list.forEach(function(el){
        if(el.名称===name && list.length>=1)
        {
          list.splice(list.indexOf(el),1)
          var query = rootRef.orderByChild("名称").equalTo(name);
          query.once("value", function(snapshot) {
            snapshot.forEach(function(itemSnapshot) {
                itemSnapshot.ref.remove();
            }); 
         });
        }
      })
      this.setState({data:list})
      console.log(this.state.data)
    }
  }
  
  render() {
    return (
      <div className="App">
        <Auth 
          onPass={this.state.pass}
          onSubmit={this.onSubmitHandler} 
          password={this.state.password} 
          errMsg={this.state.err} 
          onChange={this.onChangeHandler}
          data = {this.state.data}
          onSave={this.onSaveHandler}
          onDelete={this.onDeleteHandler}
          onPush={this.onPushHandler}
        />
      </div>
    );
  }
}

export default App;
