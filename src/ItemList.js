import React,{Component} from 'react';
import Item from './Item'
import Add from './Add'
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'
import WriteCSV from './WriteCSV'
import ReadCSV from './ReadCSV'
import firebase from './firebase'

class ItemList extends Component{
    state = {
        rendered:[],
        err:''
    }
    
    onDeleteHandler=(name)=>{
        confirmAlert({
            title: '确认删除',
            message: 'Are you sure to Delete it?',
            buttons: [
              {
                label: 'Yes',
                onClick: () => {
                    let renderedList = [];
                    renderedList = this.state.rendered;
                    this.props.onDelete(name);
                    renderedList.forEach(function(el){
                        if(name===el.props.single.名称 && renderedList.length>1)
                        {
                            const idx = renderedList.indexOf(el);
                            renderedList.splice(idx,1);
                        }
                    });
                    this.setState({rendered:renderedList})
                    console.log(renderedList)}
              },
              {
                label: 'No',
                onClick: () => alert('取消删除')
              }
            ]
          })
        
    }

    onAddHandler=(name)=>{
        let push = true
        let list = []
        list = this.props.data;
        if(list.length>0)
        {
            this.props.data.forEach(
                (el)=>{
                    if(name === el.名称)
                        push = false;
                }
            )
        }
        
        if(push===true)
        {
            const item = {
                名称:name,
                现货数量:0,
                在途数量:0,
                总量:0,
                售出量:0
              }
              this.props.onPush(item);
              let renderedList = [];
              renderedList = this.state.rendered;
              let element = <Item 
                    key={item.名称} 
                    single={item} 
                    onSave={this.props.onSave} 
                    onDelete={this.onDeleteHandler}
                />
                renderedList.push(element)
                this.setState({rendered:renderedList})
                this.setState({err:''})
        }
        else{
            this.setState({err:'已经有此类商品，不能重复添加'})
        }
    }

    componentDidMount()
    {
        let list = []
        list = this.props.data;
        if(list){
            let renderedList = this.props.data.map((item,index) =>{
                return (
                <Item 
                    key={item.名称}
                    id={index} 
                    single={item} 
                    onSave={this.props.onSave} 
                    onDelete={this.onDeleteHandler}
                    saveClass={this.props.saveClass}
                />)
            })
            console.log(renderedList)
            this.setState({rendered:renderedList})
        }
        else{
            firebase[0] = firebase.database().ref().child('list').child('data')
        }
    }

    render(){
        return(
            <div>
                <h3>Online work space:</h3>
                <table className="ui celled table">
                    <thead>
                        <tr>
                            <th><i className="tags icon"></i>产品名称</th>
                            <th><i className="boxes icon"></i>现货数量</th> 
                            <th><i className="shipping fast icon"></i>在途数量</th>
                            <th><i className="warehouse icon"></i>货物总量</th>
                            <th><i className="clipboard check icon"></i>售出量</th>
                            <th><i className="eraser icon"></i>删除数据</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.rendered}
                    </tbody>
                </table>

                <form className="ui form" onSubmit={(event)=>{event.preventDefault()}}>
                    <div className="field">
                        <Add onPush={this.onAddHandler} err={this.state.err}/>
                    </div>
                </form>
                <div className="ui grid" style={{marginTop:'20px'}}>
                    <div className="seven wide column">
                        <h3>Before going offline:</h3>
                        <i className="download icon"></i>下载Excel表格:
                        <WriteCSV/>
                    </div>
                    <div className="seven wide column">
                        <h3>Once you back online:</h3>
                        <i className="upload icon"></i>上传Excel表格:<ReadCSV/>
                    </div>
                    <div className="two wide column">
                        <button className="ui button" style={{marginTop:'20px',marginBottom:'10px'}} onClick={()=>{window.location.reload()}}>
                            <i className="sign out alternate icon"></i>
                            登出
                        </button>
                    </div>
                </div>
            </div>
            )
    }
}

export default ItemList;