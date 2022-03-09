import {Form,Input,Button, message } from 'antd'
import { useEffect } from 'react'
import request from '../utils/request'


function Regs(props){
      
        const rules ={
            username:[
                {
                    required: true,
                    message: '用户名不能为空',
                }
            ],
            password:[
                {
                    required: true,
                    message: '密码不能为空',  
                },
                {
                  min:6,
                  max:12,
                  message:"密码长度6-12位"
                }
            ]
        }
        const onFinish =(value)=>{
            console.log("value",value);
            request.post("/user/reg",value).then(({data})=>{
              console.log("data.reg",data);
              if(data.code===200){
                message.success("注册成功")
                props.history.push({
                  pathname:"/login",
                  search:"?username="+value.username
                })
              }else{
                message.success("用户名已存在,请重新注册!")
              }
            }).catch((err)=>{console.log(err)})
        }
        const onFinishFailed=()=>{
            console.log("注册失败");
        }
        const gotoLogin =()=>{
          props.history.push("/login")
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
        <Input defaultValue="内部人员注册" style={{textAlign:"center",height:"70px",fontSize:"55px"
        ,borderRadius:"15px",fontFamily:"方正舒体"}} disabled/>
      </Form.Item>

      <Form.Item
        label=""
        name="username"
        rules={rules.username}
      >
        <Input placeholder='   输入用户名' style={{borderRadius:"10px",height:"37px"}} />
      </Form.Item>

      <Form.Item
        label=""
        name="password"
        rules={rules.password}
      >
        <Input.Password placeholder='   输入密码!' style={{borderRadius:"10px",height:"37px"}} />
      </Form.Item>

      <Form.Item
        wrapperCol={{
          span: 7,
        }}
      >
        <a href="#" onClick={gotoLogin} style={{color:"#eee",textDecoration:"underline"}}>已有账号?去登陆</a>
      </Form.Item>

      <Form.Item
        wrapperCol={{
          span: 20,
        }}
      >
        <Button type="primary" htmlType="submit" style={{width:"100%",height:"39px",borderRadius:"10px"}}>
          注册账号
        </Button>
      </Form.Item>
    </Form>
            </div>
        )
    }


export default Regs