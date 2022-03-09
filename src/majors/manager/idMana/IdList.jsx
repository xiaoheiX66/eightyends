import { Component} from "react";
import {Switch,Route} from 'react-router-dom'
import AddChang from './AddChang'
import AddUpdat from './AddUpdat'


class IdList extends Component{
    constructor(props){
        super(props)
        console.log("props.idlist",props.match.path);
    }
    render(){
        const baseUrl =this.props.match.path
        return(
            <div>
        <Switch>
           <Route path={baseUrl+"/addChang"} component={AddChang}></Route>
           <Route path={baseUrl+"/addUpdat"} component={AddUpdat}></Route>
         </Switch>
            </div>
        )
    }
}

export default IdList