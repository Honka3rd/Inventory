import React,{Component} from 'react';
import firebase from './firebase';

class Item extends Component {
    state={
        id:this.props.id,
        name:this.props.single.名称,
        num:this.props.single.现货数量,
        onTheWay:this.props.single.在途数量,
        total:this.props.single.总量,
        sold:this.props.single.售出量,
        delName:'',
        numClass:""

    }

    componentDidMount(){
        if(this.state.num===0)
        {
            this.setState({numClass:"ui red tag label"})
        }
        else{
            this.setState({numClass:"ui teal tag label"})
        }
    }

    onNameHandler=(event)=>{
        let oldName = this.state.name;
        let newName = event.target.value
        firebase[0].on('value',snapshot=>{
            if(snapshot.val()!=null)
            {
                try {
                    var keys = Object.keys(snapshot.val())
                    for(let i=keys[0];i<snapshot.val().length;i++)
                    {
                        let alterable = false;
                        let times = 0;
                        snapshot.val().forEach(
                            (el)=>{
                                if(el.名称===newName)
                                {
                                    times++;
                                }
                            }
                        )
                        if(times===0)
                            alterable = true;

                        if(snapshot.val()[i].名称===oldName && oldName!=newName && alterable===true)
                        {
                            this.setState({name:newName});
                            var query = firebase[0].orderByChild("名称").equalTo(oldName);
                            query.once("child_added", function(snapshot) {
                                snapshot.ref.update({ 名称: newName })
                            });
                        }
                    }
                  }
                  catch(err) {
                    window.location.reload();
                  }
                
            }
        })
    }

    onTotalHandler=(event)=>{
        if(event.target.value>=0){
            let totalChange = event.target.value-this.state.total
            let onItsWay = this.state.onTheWay+totalChange;
            this.setState({onTheWay:onItsWay})
            this.setState({total:event.target.value})
            let numChange = this.state.total-this.state.onTheWay;
            this.setState({num:numChange})
            if(this.state.num===0)
            {
                this.setState({numClass:"ui red tag label"})
            }
            else{
                this.setState({numClass:"ui teal tag label"})
            }
            this.props.onSave(
                this.state.name,
                numChange,
                onItsWay,
                event.target.value,
                this.state.sold
            );
        }
    }

    onOnTheWayHandler=(event)=>{
        let onTheWayChange = event.target.value - this.state.onTheWay;
        let onItsWay = this.state.onTheWay+onTheWayChange;
        let numChange = this.state.total-onItsWay
        if(onItsWay>=0 && onItsWay<this.state.total)
        {
            this.setState({onTheWay:onItsWay})
            this.setState({num:numChange})
            if(this.state.num===0)
            {
                this.setState({numClass:"ui red tag label"})
            }
            else{
                this.setState({numClass:"ui teal tag label"})
            }
            this.props.onSave(
                this.state.name,
                numChange,
                onItsWay,
                this.state.total,
                this.state.sold
            );
        }
    }

    onNumMinusHandler=()=>{
        let minus = this.state.num - 1;
        let sold = this.state.sold + 1;
        if(minus>=0){
            let total = minus+this.state.onTheWay;
            if(total>=0)
            {
                this.setState({num:minus})
                this.setState({total:total})
                this.setState({sold:sold})
                if(minus===0)
                {
                    this.setState({numClass:"ui red tag label"})
                }
                else{
                    this.setState({numClass:"ui teal tag label"})
                }
                this.props.onSave(
                    this.state.name,
                    minus,
                    this.state.onTheWay,
                    total,
                    sold
                )
            }
        }
    }

    onUndoNumHandler=()=>{
        let minus = this.state.num + 1;
        let sold = this.state.sold - 1;
        if(sold>=0){
            let total = minus+this.state.onTheWay;
            if(total>=0)
            {
                this.setState({num:minus})
                this.setState({total:total})
                this.setState({sold:sold})
                if(minus===0)
                {
                    this.setState({numClass:"ui red tag label"})
                }
                else{
                    this.setState({numClass:"ui teal tag label"})
                }
                this.props.onSave(
                    this.state.name,
                    minus,
                    this.state.onTheWay,
                    total,
                    sold
                );
            }
        }
    }

    onTheWayPlusHandler=()=>{
        let plusOne = this.state.onTheWay+1
        if(plusOne<=this.state.total)
        {
            this.setState({onTheWay: plusOne})
            this.setState({num:this.state.num-=1})
            if(this.state.num===0)
            {
                this.setState({numClass:"ui red tag label"})
            }
            else{
                this.setState({numClass:"ui teal tag label"})
            }
            this.autoOnSave();
        }
    }

    onTheWayMinusHandler=()=>{
        let minusOne = this.state.onTheWay-1
        if(minusOne>=0)
        {
            this.setState({onTheWay: minusOne})
            this.setState({num:this.state.num+=1})
            if(this.state.num===0)
            {
                this.setState({numClass:"ui red tag label"})
            }
            else{
                this.setState({numClass:"ui teal tag label"})
            }
            this.props.onSave(
                this.state.name,
                this.state.num,
                minusOne,
                this.state.total,
                this.state.sold
            )
        }
    }

    onTotalPlusHandler=()=>{
        this.setState({total:this.state.total+=1})
        this.setState({onTheWay:this.state.onTheWay+=1})
        this.autoOnSave();
    }

    onTotalMinusHandler=()=>{
        let minusOne = this.state.total-1
        let onItsWay = this.state.onTheWay-1
        if(minusOne>=0 && onItsWay>=0)
        {
            this.setState({total:minusOne})
            this.setState({onTheWay:onItsWay})
            if(this.state.num===0)
            {
                this.setState({numClass:"ui red tag label"})
            }
            else{
                this.setState({numClass:"ui teal tag label"})
            }
            this.props.onSave(
                this.state.name,
                this.state.num,
                onItsWay,
                minusOne,
                this.state.sold
            )
        }
    }

    onDelNameHandler=(event)=>{
        this.setState({delName:event.target.value})
    }

    autoOnSave(){
        this.props.onSave(
            this.state.name,
            this.state.num,
            this.state.onTheWay,
            this.state.total,
            this.state.sold
        )
    }

    render(){
        return (
            <tr>
                <td>
                    <div className="ui input">
                        <input size='15' style={{marginRight:'3px'}} value={this.state.name} onChange={this.onNameHandler}/> 
                    </div>
                </td>
                <td>
                    <button style={{marginLeft:'3px'}} className="ui button" onClick={this.onUndoNumHandler}><i className="undo icon"></i>Undo</button>
                        <a className={this.state.numClass}>{this.state.num}</a>
                    <button style={{marginLeft:'3px'}} className="ui primary button" onClick={this.onNumMinusHandler}><i className="dollar sign icon"></i>售出</button>
                </td> 
                <td>
                    <button className="ui button" style={{height:'40px',width:'40px'}} onClick={this.onTheWayPlusHandler}><i className="plus icon"></i></button>
                    <div className="ui input">
                        <input size='1' style={{marginRight:'3px'}} value={this.state.onTheWay} onChange={this.onOnTheWayHandler}/> 
                    </div>
                    <button style={{marginLeft:'3px',height:'40px',width:'40px'}} className="ui button" onClick={this.onTheWayMinusHandler}><i className="minus icon"></i></button>
                </td>
                <td>
                    <button className="ui button" style={{height:'40px',width:'40px'}} onClick={this.onTotalPlusHandler}><i className="plus icon"></i></button>
                    <div className="ui input">
                        <input size='1' style={{marginRight:'3px'}} value={this.state.total} onChange={this.onTotalHandler}/> 
                    </div>
                    <button className="ui button" style={{height:'40px',width:'40px'}} onClick={this.onTotalMinusHandler}><i className="minus icon"></i></button>
                </td>
                <td>
                    <a className="ui teal tag label">{this.state.sold}</a>
                </td>
                <td>
                    <button className="ui red basic button" style={{margin:'5px'}} onClick={()=>this.props.onDelete(this.state.name)}><i className="trash icon"></i>Del</button>
                </td>
            </tr>
       )
    }
}

export default Item;