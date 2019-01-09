import { CSVLink} from "react-csv";
import firebase from './firebase'
import React,{Component} from 'react'

class WriteCSV extends Component{
    state={csvData:[]};
    componentDidMount(){
        try{
            firebase[0].on(
                'value',snapshot=>{
                    console.log(snapshot.val())
                    this.setState({csvData:snapshot.val()})
                }
            )
        }
        catch(err){
            window.location.reload();
        }
    }
    render(){
        return <button className="ui button"><CSVLink data={this.state.csvData}>download</CSVLink></button>;
    }
}

export default WriteCSV;
