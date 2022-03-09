import { Component,useEffect} from "react";
import { Layout, Menu, Breadcrumb,Tooltip ,Popconfirm, message } from 'antd';
import { AlignRightOutlined ,DropboxOutlined, ProfileOutlined, NotificationOutlined,WindowsFilled,YuqueOutlined,AliyunOutlined} from '@ant-design/icons';
import "./scss/dist/home.css"
import {withLogin} from '../utils/withHoc'
import { Route, Switch } from "react-router-dom";
import Home from './manager/Home'
import ListMan from './manager/homeMana/ListMan'
import IdList from './manager/idMana/IdList'
import PowSet from './manager/powMana/PowSet'

import request from '../utils/request'

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
class Manager extends Component{
    constructor(props){
      super(props)
      console.log("props.home",props);
      this.state ={
        menu:[
          {
            path:"home",
            text:"首页",
            icon:<AlignRightOutlined />
          },
          {
            path:"/homeMana",
            text:"首页管理",
            icon:<AlignRightOutlined />,
            children:[
              {
                path:"/listUpda",
                text:"清单管理",
                icon:<DropboxOutlined />
              },
              {
                path:"/listAdd",
                text:"内容添加",
                icon:<DropboxOutlined />
              },
              {
                path:"/listMan",
                text:"内容更新",
                icon:<DropboxOutlined />
              },
            ]
          },
          {
            path:"/idMana",
            text:"账号管理",
            icon:<ProfileOutlined/>,
            children:[
              {
                path:"/addUpdat",
                text:"账户列表",
                icon:<YuqueOutlined />
              },
              {
                path:"/addChang",
                text:"列表修改",
                icon:<YuqueOutlined />
              },
              {
                path:"/idList",
                text:"更新列表",
                icon:<YuqueOutlined />
              },
            ]
          },
          {
            path:"/powMana",
            text:"权限管理",
            icon:<NotificationOutlined />,
            children:[
              {
                path:"/powSet",
                text:"权限设置",
                icon:<AliyunOutlined />
              }
            ]
          }
        ],
        baseUrl:"/manager",
        datainfos:[]
      }
      // this.changeMenu = this.changeMenu.bind(this)
    }
    componentDidMount(){
      this.getData();
    }
     getData=()=>{
      request.get("/goods/list",{params:{size:50,page:1}}).then(({data})=>{
        console.log("商品",data);
        this.setState({
          datainfos:data.info
        })
        localStorage.setItem("goodsinfo",JSON.stringify(data.info))
      }).catch((err)=>{console.log(err)})
      // const goodsinfo = JSON.parse(localStorage.getItem("goodsinfo"))
      // return goodsinfo
    }
    changeMenu =({item,key})=>{
      // console.log("点击列表内容",key,item);
      // console.log("this指向",this);
      console.log("cchange",key);
      this.props.history.push(key)
    }
    render(){
     let getUsername =this.props.userinfo.username;
     const {menu} = this.state
     const {baseUrl} = this.state
     console.log("menu",menu);
    //  退出登录
    const backToLogin =()=>{
      message.success('退出成功');
      this.props.history.push("/login")
      localStorage.removeItem("userinfo")
    }
    function confirm(e) {
      console.log(e);
      message.success('取消退出');
    }
    
    function cancel(e) {
      console.log(e);
    }
   
      return(
            <div>
                <Layout style={{minHeight:"730px"}}>
    <Header className="header">
      <div className="logo" />
      <Menu theme="dark" mode="horizontal">
        <Menu.Item key="1"><WindowsFilled style={{fontSize:"27px"}} /></Menu.Item>
        <Menu.Item key="2"><img src="http://www.rzhdjz.com.cn/template/mytheme/statics/img/logo.png" alt="" /></Menu.Item>
        <Menu.Item key="3" style={{fontSize:"20px"}}>{getUsername.length>0 ? getUsername : '登录'}</Menu.Item>
        <Menu.Item key="4" style={{float:"right"}} onClick={backToLogin}>
        <Popconfirm title="确认退出?"  onConfirm={confirm} onCancel={cancel} okText="狠心退出" cancelText="暂不推出">
          {getUsername.length>0 ? '退出' : '注册'}</Popconfirm>
          </Menu.Item>
      </Menu>
    </Header>
    <Layout>
      <Sider width={200} className="site-layout-background">
        <Menu
          mode="inline"
          defaultSelectedKeys={['/manager/home']}
          defaultOpenKeys={['/manager/homeMana']}
          style={{ height: '100%', borderRight: 0 }}
          onClick={this.changeMenu}
        >
          {menu.map(item=>{
            if(item.children){
              return (
                <SubMenu key={baseUrl+item.path} icon={item.icon} title={item.text}>
              {item.children.map(it=> <Menu.Item key={baseUrl+item.path+it.path} icon={it.icon}>{it.text}</Menu.Item>)}
              </SubMenu>
              )
            }else{
              return <Menu.Item key={"/manager/"+item.path} icon={item.icon}>{item.text}</Menu.Item>
            }
          })}
         
        </Menu>
      </Sider>
      <Layout style={{ padding: '0 24px 24px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Manager</Breadcrumb.Item>
        </Breadcrumb>
        <Content
          className="site-layout-background"
          style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
          }}
        >
         <Switch>
         <Route path={baseUrl+"/home"} component={Home} />
           <Route path={baseUrl+"/homeMana"} component={ListMan}/>
           <Route path={baseUrl+"/idMana"} component={IdList} />
           <Route path={baseUrl+"/powMana"} component={PowSet} />
         </Switch>
        </Content>
      </Layout>
    </Layout>
  </Layout>
            </div>
        )
    }
}

export default withLogin(Manager)