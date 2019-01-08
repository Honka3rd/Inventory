import React,{Component}from 'react';
import ItemList from './ItemList'

class Application extends Component{
    conditionalReturn(){
        if(this.props.onPass===true)
        {
            document.getElementById("auth").style.visibility = "hidden";
            document.getElementById("auth").style.height = 0;
            return(
            <div>
                <ItemList 
                    data={this.props.data} 
                    onSave={this.props.onSave} 
                    onDelete={this.props.onDelete}
                    onPush={this.props.onPush}
                />
            </div>)
        }
        return(
        <h2 className="ui header" style={{paddingTop:'20px'}}>
            <div className="content">{this.props.errorMsg}</div>
        </h2>)
    }
    render(){
        return(
            <div>{this.conditionalReturn()}</div>
        )
    }
}

export default Application;