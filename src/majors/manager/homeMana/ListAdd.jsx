import { Component } from "react";
import { Form, Input, InputNumber, Button } from 'antd';
class ListAdd extends Component{
        constructor(props){
            super(props)
            this.state={
               
            }
        } 
          
    render(){
       const layout = {
            labelCol: {
              span: 2,
            },
            wrapperCol: {
              span: 22,
            },
          }
        const onFinish = (values) => {
            console.log(values);
          };
        return(
            <div>
                 <Form {...layout} name="nest-messages" onFinish={onFinish} style={{width:"1000px",marginTop:"100px"}}>
      <Form.Item
        name={['user', 'name']}
        label="影片地址"
      >
        <Input.TextArea />
      </Form.Item>
      <Form.Item
        name={['user', 'email']}
        label="影片类型"
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={['user', 'age']}
        label="影片名称"
      >
        <Input />
      </Form.Item>
      <Form.Item name={['user', 'website']} label="更新状态">
        <Input />
      </Form.Item>
      <Form.Item name={['user', 'introduction']} label="主要内容">
        <Input.TextArea />
      </Form.Item>
      <Form.Item wrapperCol={{ ...layout.wrapperCol,offset:2 }}>
        <Button type="primary" htmlType="submit" style={{width:"100%",height:"35px"}}>
          修改提交
        </Button>
      </Form.Item>
    </Form>
            </div>
        )
    }
}

export default ListAdd