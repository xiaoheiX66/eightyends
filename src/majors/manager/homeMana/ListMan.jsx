import { Component } from "react";
import {Switch,Route} from 'react-router-dom'
import ListAdd from "./ListAdd";
import ListUpda from "./ListUpda";

function ListMan(props){
     const baseUrl =props.match.path
     console.log("baseurl.niebu",baseUrl);
        return(
            <div>
            <Switch>
           <Route path={baseUrl+"/listAdd"} component={ListAdd}></Route>
           <Route path={baseUrl+"/listUpda"} component={ListUpda}></Route>
            </Switch>
            </div>
        )
    }


export default ListMan