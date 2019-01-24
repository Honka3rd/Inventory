import React, { Component } from "react";
import CSVReader from "react-csv-reader";
import firebase from './firebase'

class ReadCSV extends Component{
    state={
        imported:[],
        push:false
    }
    handleForce = data => {
        try{
            console.log(data);
            if(
                data!=null && 
                data[0][0]==='名称' &&
                data[0][1]==='售出量' &&
                data[0][2]==='在途数量' &&
                data[0][3]==='总量' &&
                data[0][4]==='现货数量'
                )
            {
                let arr = this.state.imported;
                for(let i=1;i<data.length-1;i++)
                {
                    let fst = [];
                    fst = [data[i][1],data[i][2],data[i][3],data[i][4]]
                    if(fst.some((el)=>{
                        return isNaN(parseInt(el))
                    }) === false)
                    {
                        if(parseInt(data[i][2])+parseInt(data[i][4])===parseInt(data[i][3])){
                            let item={
                                名称:data[i][0],
                                售出量:data[i][1],
                                在途数量:data[i][2],
                                总量:data[i][3],
                                现货数量:data[i][4]
                            }
                            arr.push(item);
                            this.setState({push:true})
                        }
                        else{
                            this.setState({push:false})
                            window.alert(`第${i+1}行计算错误`)
                        }
                    }
                    else{
                        window.alert(`第${i+1}行有非数字`)
                        this.setState({push:false})
                    }
                }
                console.log(arr)
                if(arr.length!=0 && this.state.push===true){
                    firebase[0].set('');
                    this.setState({imported:arr})
                    firebase[0].set(arr)
                    window.location.reload();
                    window.alert('表格读取完成')
                }
            }
            else{
                window.alert('数据表结构有误，请提交正确的数据表')
            }
        }
        catch(err){
            //window.location.reload();
        }
      };

      render(){
          return(
          <div className="container">
            <CSVReader
                cssClass="react-csv-input"
                label=""
                onFileLoaded={this.handleForce}
            />
        </div>)
      }
}

export default ReadCSV;
