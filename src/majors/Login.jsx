import {Form,Input,Checkbox,Button, message } from 'antd'
import { useEffect } from 'react';
import request from '../utils/request'
// import {withLogin} from '../utils/withHoc'

function Login(props){
    console.log("props",props);
     const uname =new URLSearchParams(props.location.search)
     const username2 = uname.get("username")
     console.log("uname",username2);
  
        const rules ={
            username:[
                {
                    required: true,
                    message: 'username is not null!!',
                }
            ],
            password:[
                {
                    required: true,
                    message: 'password is not null!!',  
                },
                {
                  min:6,
                  max:12,
                  message:"密码长度大小必须为6-12位!"
                }
            ]
        }
        const onFinish =(value)=>{
            console.log("value",value);
            request.get("/user/login",{params:value}).then(({data})=>{
              // console.log("登录结果",data);
              if(data.code===200){
                console.log("登陆成功",data.info);
                message.success("登陆成功")
                localStorage.setItem("userinfo",JSON.stringify(data.info))
                props.history.push({
                  pathname:"/manager/home",
                  search:"?username="+value.username
                })
              }else{
                console.log("登录失败",data);
                message.success("登录失败")
              }
            }).catch(err=>console.log(err))
        }
        const onFinishFailed=()=>{
            console.log("登录失败");
        }
        const goToRegs = (value)=>{
          console.log("你点击了注册");
          props.history.push("/regs")
        }
        return(
            <div>
                 <Form
      name="basic"
      labelCol={{
        span: 2,
      }}
      wrapperCol={{
        span: 20,
      }}
      initialValues={{
        remember: true,
      }}
      autoComplete="off"
      style={{width:"700px",margin:"300px auto"}}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
       <Form.Item
        label=""
        name="title"
      >
        <Input defaultValue="内部人员登录" style={{textAlign:"center",height:"70px",fontSize:"55px"
        ,borderRadius:"15px",fontFamily:"方正舒体"}} disabled/>
      </Form.Item>
      <Form.Item
        label=""
        name="username"
        initialValue={username2}
        rules={rules.username}
      >
        <Input placeholder='    输入用户名'  style={{borderRadius:"10px",height:"37px"}}/>
      </Form.Item>

      <Form.Item
        label=""
        name="password"
        rules={rules.password}
      >
        <Input.Password placeholder='   输入密码!' style={{borderRadius:"10px",height:"37px"}}/>
      </Form.Item>

      <Form.Item
        name="remember"
        valuePropName="checked"
        wrapperCol={{
          offset: 1,
          span: 22,
        }}
      >
        <Checkbox style={{marginLeft:"-395px"}}>免登录</Checkbox>
        <a style={{marginLeft:"50px",color:"#eee",fontSize:"14px",cursor:"pointer",textDecoration:"underline"}} onClick={goToRegs}>暂无账号?点击注册</a>
      </Form.Item>

      <Form.Item
        wrapperCol={{
          span: 20,
        }}
      >
        <Button type="primary" htmlType="submit" style={{width:"100%",height:"39px",borderRadius:"10px"}}>
          登录账号
        </Button>
      </Form.Item>
    </Form>
            </div>
        )
    }


export default (Login)