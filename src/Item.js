import React,{Component} from 'react';

class Item extends Component {
    state={
        id:this.props.id,
        name:this.props.single.名称,
        num:this.props.single.现货数量,
        onTheWay:this.props.single.在途数量,
        total:this.props.single.总量,
        sold:this.props.single.售出量,
        delName:'',
        saveClass:'ui primary button',
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
        this.setState({name:event.target.value})
        this.setState({saveClass:'ui primary button'})
    }

    onTotalHandler=(event)=>{
        if(event.target.value>=0){
            let totalChange = event.target.value-this.state.total
            let onItsWay = this.state.onTheWay+totalChange;
            this.setState({onTheWay:onItsWay})
            this.setState({total:event.target.value})
            let numChange = this.state.total-this.state.onTheWay;
            this.setState({num:numChange})
            this.setState({saveClass:'ui primary button'})
            if(this.state.num===0)
            {
                this.setState({numClass:"ui red tag label"})
            }
            else{
                this.setState({numClass:"ui teal tag label"})
            }
        }
    }

    onOnTheWayHandler=(event)=>{
        let onTheWayChange = event.target.value - this.state.onTheWay;
        let onItsWay = this.state.onTheWay+onTheWayChange;
        if(onItsWay>=0 && onItsWay<this.state.total)
        {
            this.setState({onTheWay:onItsWay})
            this.setState({num:this.state.total-onItsWay})
            this.setState({saveClass:'ui primary button'})
            if(this.state.num===0)
            {
                this.setState({numClass:"ui red tag label"})
            }
            else{
                this.setState({numClass:"ui teal tag label"})
            }
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
                this.setState({saveClass:'ui primary button'})
                if(minus===0)
                {
                    this.setState({numClass:"ui red tag label"})
                }
                else{
                    this.setState({numClass:"ui teal tag label"})
                }
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
                this.setState({saveClass:'ui primary button'})
                if(this.state.num===0)
                {
                    this.setState({numClass:"ui red tag label"})
                }
                else{
                    this.setState({numClass:"ui teal tag label"})
                }
            }
        }
    }

    onTheWayPlusHandler=()=>{
        let plusOne = this.state.onTheWay+1
        if(plusOne<=this.state.total)
        {
            this.setState({onTheWay: plusOne})
            this.setState({num:this.state.num-=1})
            this.setState({saveClass:'ui primary button'})
            if(this.state.num===0)
            {
                this.setState({numClass:"ui red tag label"})
            }
            else{
                this.setState({numClass:"ui teal tag label"})
            }
        }
    }

    onTheWayMinusHandler=()=>{
        let minusOne = this.state.onTheWay-1
        if(minusOne>=0)
        {
            this.setState({onTheWay: minusOne})
            this.setState({num:this.state.num+=1})
            this.setState({saveClass:'ui primary button'})
            if(this.state.num===0)
            {
                this.setState({numClass:"ui red tag label"})
            }
            else{
                this.setState({numClass:"ui teal tag label"})
            }
        }
    }

    onTotalPlusHandler=()=>{
        this.setState({total:this.state.total+=1})
        this.setState({onTheWay:this.state.onTheWay+=1})
        this.setState({saveClass:'ui primary button'})
    }

    onTotalMinusHandler=()=>{
        let minusOne = this.state.total-1
        let onItsWay = this.state.onTheWay-1
        if(minusOne>=0 && onItsWay>=0)
        {
            this.setState({total:minusOne})
            this.setState({onTheWay:onItsWay})
            this.setState({saveClass:'ui primary button'})
            if(this.state.num===0)
            {
                this.setState({numClass:"ui red tag label"})
            }
            else{
                this.setState({numClass:"ui teal tag label"})
            }
        }
    }

    onDelNameHandler=(event)=>{
        this.setState({delName:event.target.value})
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
                    <button className={this.state.saveClass} style={{margin:'5px'}} onClick={()=>{
                        this.setState({saveClass:'ui button'})
                        this.props.onSave(
                        this.state.id,
                        this.state.name,
                        this.state.num,
                        this.state.onTheWay,
                        this.state.total,
                        this.state.sold
                    )}}><i className="save icon"></i>Save</button>
                </td>
                <td>
                    <button className="ui red basic button" style={{margin:'5px'}} onClick={()=>this.props.onDelete(this.state.name)}><i className="trash icon"></i>Del</button>
                </td>
            </tr>
       )
    }
}

export default Item;
