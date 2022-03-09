import {Component} from 'react'
import {withRouter,Redirect} from 'react-router-dom'
// import store from '../store'
export function withUser(Cp){
    return class extends Component{
        render(){
            let userinfo =localStorage.getItem("userinfo")
            try{
                userinfo =JSON.parse(userinfo) || {}
            }catch(err){
                userinfo = {}
            }
            return(
                <div>
                    <Cp userinfo={userinfo} {...this.props} />
                </div>
            )
        }
    }
}


// export function withStorage(key){
//     return function hoc(Cp){
//         return class extends Component{
//             render(){
//                 let value =localStorage.getItem(key)
//                 try{
//                     value = JSON.parse(value)
//                 }catch(err){
//                     value = value
//                 }
//                 // props[key] =value  动态变量key
//                 const data ={
//                     [key]:value
//                 }
//                 return(
//                     <div>
//                         <Cp {...data} {...this.props} />
//                     </div>
//                 )
//             }
//         }
//     }
// }
// withStorage('userinfo')(Home)  函数柯里化
// 通过函数调用继续返回函数的方式，实现多次接收参数后统一处理的函数编程方式
// 好处：用一个函数接收特定类型的参数

// 接收多个参数,增强版withstorage
// ... 扩展/展开
export function withStorage2(...keys){
    return function hoc(Cp){
        
        return class extends Component{
            constructor(props){
                super(props)
            }
            render(){
                const data ={}
                keys.forEach(key=>{
                let value =localStorage.getItem(key)
                 try{
                    value = JSON.parse(value)
                }catch(err){
                    value = value
                }
                data[key] =value
        })
                return(
                    <div>
                        <Cp {...data} {...this.props} />
                    </div>
                )
            }
        }
    }
}

// 定义高阶组件二：反向继承
// 只适用于类组件
export function withAuth(Cp){
    return class OutConponent extends Cp{
        render(){
           return super.render() 
        }
    }
}
// 使用属性代理，实现用户登录
export function withLogin(Cp){
    function OutComponent(props){
        // 判断用户是否登录
        if(props.userinfo.authorization){
            // 判断是否过期,是否被篡改
            return <Cp {...props} />
        }else{
            return <Redirect to="/login" />
        }
        
    }
    OutComponent = withUser(OutComponent)
    OutComponent = withRouter(OutComponent)
    return OutComponent
}
// 退出登录
export function withLoginOut(Cp){
    
}
// 高阶组件
// export function withRedux(Cp){
// // 往下传递新值
//     return class extends Component{
//         state = {
//             reduxData:{}
//         }
//         componentDidMount(){
//             let state = store.getState();
//             this.setState({
//                 reduxData:state
//             })
//             store.subscribe(function(){
//                 // state改变，获取新值
//                 state = store.getState()
//                 this.setState({
//                     reduxData:state
//                 })
//             })
//         }
//         render(){
//             return(
//                 <Cp {...this.props} {...this.state.reduxData}
//                 dispatch={store.dispatch}
//                 />
//             )
//         }
//     }
// }

// 页面刷新
export function withComsUpdate(Cp){
    return class extends Component{
        shouldComponentUpdate =()=>{
            this.forceUpdate()
        }
        render(){
            return(
                <div>
                    <Cp {...this.props}/>
                </div>
            )
        }
    }
}