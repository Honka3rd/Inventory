import React,{Component} from 'react';

class Add extends Component{
    state={name:''}

    onChangeHandler=(event)=>{
        this.setState({name:event.target.value})
    }

    conditionalRender(){
        if(this.props.err.length ===0)
        {
            return (
                <div>
                    <div className="ui input">
                        <input 
                            onChange={this.onChangeHandler}
                            placeholder="请输入产品名称(回车键提交)"
                        />
                    </div>
                    <button 
                        className="ui primary button" 
                        style={{margin:'5px'}}
                        onClick={()=>this.props.onPush(this.state.name)}
                    ><i className="plus square outline icon"></i>
                        添加新产品
                    </button>
                </div>)
        }
        else{
            return (
                <div>
                    <div>
                        <div class="ui negative message">
                            <div class="content">
                                <div class="header">
                                    {this.props.err}
                                </div>
                                <p>请重新输入</p>
                            </div>
                        </div>
                    </div>
                    <div className="ui input">
                        <input 
                            onChange={this.onChangeHandler}
                            placeholder="请输入产品名称"
                        />
                    </div>
                    <button 
                        className="ui primary button" 
                        style={{margin:'5px'}}
                        onClick={()=>this.props.onPush(this.state.name)}
                    ><i className="plus square outline icon"></i>
                        添加
                    </button>
                </div>)
        }
    }

    render(){
        return(this.conditionalRender());
    }
}

export default Add;