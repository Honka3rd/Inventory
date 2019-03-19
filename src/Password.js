import React,{Component} from 'react';
import firebase from './firebase'
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'

class Password extends Component{
    state = 
    {
        pwd:'',
        rendered:<div></div>,
        newPwdRd:<div></div>
    }

    onSubmitHandler=()=>{
        firebase[1].set(document.getElementById('new').value)
        this.setState(
            {
                rendered:<div></div>,
                newPwdRd:<div></div>
            });
        confirmAlert({
            title: '修改成功'
        })
    }

    onClickHandler=()=>{
        const org = document.getElementById('1st').value;
        const scd = document.getElementById('2nd').value;

        firebase[1].on('value', snapshot=>{
            this.setState({pwd:snapshot.val()})
            console.log(typeof this.state.pwd)
            console.log(typeof org)
            console.log(typeof scd)
            if(this.state.pwd===org && org===scd)
            {
                this.setState({newPwdRd:<div className="ui input">
                    <input style={{marginRight:'10px'}} id='new' type="password" placeholder='新密码'/>
                    <button className="ui button" onClick={this.onSubmitHandler}>提交</button>
                </div>})
            }
            else
            {
                this.setState({newPwdRd:<div></div>})
                confirmAlert({
                    title: '修改失败'
                })
            }
        })
    }

    onPopHandler=()=>{
        this.setState({
            rendered:<div className="ui input">
                        <input id='1st' style={{marginRight:'10px'}} placeholder='原密码'/>
                        <br/>
                        <input id='2nd' style={{marginRight:'10px'}} placeholder='请再输入一次'/>
                        <br/>
                        <button className="ui button" onClick={this.onClickHandler}>确认</button>
                    </div>
                    })
    }

    render()
    {
        return(
        <div className="ui input">
            <button style={{margin:'10px'}} className="ui button" onClick={this.onPopHandler}>修改密码</button>
            <div style={{margin:'10px'}}>{this.state.rendered}</div>
            <div style={{margin:'10px'}}>{this.state.newPwdRd}</div>
        </div>)
    }
}

export default Password;