import React,{Component} from 'react';
import Application from './Application';
import Password from './Password'

class Auth extends Component{    
    render(){
        return(
        <div>
            <form onSubmit={this.props.onSubmit} id='auth' className="ui form" style={{paddingTop:'20px'}}>
                <div className="field">
                    <h1 className="ui dividing header"><i className="desktop icon"></i>please enter your password</h1>
                    <br></br>
                    <input value={this.props.password} onChange={this.props.onChange} type="password" placeholder="请输入密码"/>
                </div>
            </form>
            <div style={{position:'absolute',right:'0',top:'0'}}>
                <Password/>
            </div>
            <Application 
                onPass={this.props.onPass} 
                errorMsg={this.props.errMsg} 
                data={this.props.data} 
                onSave={this.props.onSave} 
                onDelete={this.props.onDelete}
                onPush={this.props.onPush}
            />
        </div>
        )
    }
}

export default Auth;