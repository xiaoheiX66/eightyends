import { Component } from "react";
import {
  Table,
  Button,
  Space,
  Drawer,
  Popconfirm,
  message,
  Form,
  Input,
} from "antd";
import request from "../../../utils/request";
// import {withComsUpdate} from '../../../utils/withHoc'

class ListUpda extends Component {
    constructor(props){
      super(props)
      this.state={
        visible:false,
        dataInfosbig:[],
        dataInfoAll:[],
        singlesss:[],
        tests:{
          imgurl:"niemide",
          title:"xxx",
          covers:"xjosdso",
          actors:"jdosdks",
          sequel:"djosdkps"
        },
        newDatainfo:[]
      }
    }
   onFinish = (values) => {
    console.log(values);
    const id = JSON.parse(localStorage.getItem("idx"))
    request.put("/goods/update?id="+id,{
      imgurl:values.imgurl,covers:values.covers,
      title:values.title,actors:values.actors,
      sequel:values.sequel
    }).then(({data})=>{
      console.log("更新结果",data);
    }).catch((err)=>{console.log(err);})
  };
  //
   showDrawer = (id) => {
      // console.log("当前点击的编辑id",id);
      request.get("/goods/"+id).then(({data})=>{
        // console.log("data.id",data);
        // const singleInfo =data.info;
        this.setState({
          singlesss:data.info
        })
        console.log("单点信息",data.info);
        localStorage.setItem("idx",JSON.stringify(data.info.id))
       this.myform.setFieldsValue(data.info)
        // localStorage.setItem("singleInfo",JSON.stringify(singleInfo))
      //  this.setState({
      //   dataInfosbig:singleInfo
      //  })
      }).catch((err)=>{console.log(err)})
      this.setState({
        visible:true
      })
  };
   onClose = () => {
    this.setState({
      visible:false
    })
  };
  //   刷新页面
   confirm = (id) => {
    console.log("删除当前id", id);
    request.delete("/goods/" + id).then(({ data }) => {
      console.log("删除结果", data);
      if (data.code === 200) {
        message.success("删除成功!");
        // window.location.reload();
        return;
      } else {
        message.error("删除失败!");
      }
    });
    this.forceUpdate()
  };
   cancel = () => {
    // message.error('取消了删除');
    console.log("取消删除");
  };
  getData = ()=>{
    const goodsinfo = JSON.parse(localStorage.getItem("goodsinfo"));

    return goodsinfo
  }
  componentDidMount(){
    this.getData()
  }
 render(){
  //  const singleInfo = JSON.parse(localStorage.getItem("singleInfo"))
  //  const goodsinfo = JSON.parse(localStorage.getItem("goodsinfo"));
   const {visible} =this.state;
  //  console.log("当个id值信息",singlesss);
  
  const columns = [
    {
      title: "影片相册",
      dataIndex: "imgurl",
      key: "imgurl",
      render: (text) => (
        <img src={text} width="100px" height="100px" alt="加载中.." />
      ),
    },
    {
      title: "影片类型",
      dataIndex: "covers",
      key: "covers",
    },
    {
      title: "影片名称",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "更新状态",
      key: "sequel",
      dataIndex: "sequel",
    },
    {
      title: "主要内容",
      key: "actors",
      dataIndex: "actors",
    },
    {
      title: "相关操作",
      key: "id",
      dataIndex: "id",
      render: (id) => {
        return (
          <div style={{ width: "240px" }}>
            <Button
              type="success"
              style={{ width: "100px" }}
              onClick={()=>{this.showDrawer(id)}}
              key={id}
            >
              编辑
            </Button>
            <Popconfirm
              title="确认删除当前内容?"
              onConfirm={() => {
                this.confirm(id);
              }}
              onCancel={this.cancel}
              okText="确实删除"
              cancelText="暂时放过"
            >
              <Button
                type="danger"
                style={{ width: "100px", marginLeft: "10px" }}
                key={id}
              >
                {id}删除
              </Button>
            </Popconfirm>
          </div>
        );
      },
    },
  ];
  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };
  
  return (
    <div>
      <Table columns={columns} dataSource={this.getData()} ellipsis={true} />
      <Drawer
        title="欢迎进入编辑区"
        placement="left"
        width={500}
        onClose={this.onClose}
        visible={visible}
        extra={
          <Space>
            <Button onClick={this.onClose}>取消</Button>
            <Button type="primary" onClick={this.onClose}>
              确认修改
            </Button>
          </Space>
        }
      >
        <Form
          {...layout}
          name="nest-messages"
          onFinish={this.onFinish}
          // initialValues={this.state.singlesss}
          ref={el=>this.myform=el}
        >
          <Form.Item
            // name={["singleInfo", "imgurl"]}
            name="imgurl"
            label="图片地址"
            rules={[
              {
                max:200
              },
            ]}
          >
             <Input.TextArea defaultValue={this.state.singlesss.imgurl} />
          </Form.Item>
          <Form.Item
            // name={["singleInfo", "covers"]}
            name="covers"
            label="影片类型"
          >
            <Input  />
          </Form.Item>
          <Form.Item
            // name={["singleInfo", "title"]}
            name="title"
            label="影片名称"
          >
            <Input  />
          </Form.Item>
          <Form.Item 
          // name={["singleInfo", "sequel"]} 
          name="sequel"
          label="更新状态">
            <Input  />
          </Form.Item>
          <Form.Item 
          // name={["singleInfo", "actors"]} 
          name="actors"
          label="影片叙述">
            <Input.TextArea />
          </Form.Item>
          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
            <Button type="primary" htmlType="submit" style={{width:"100%"}}>
             确认修改
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  );
}
}
// ListUpda = withComsUpdate(ListUpda)
export default ListUpda;
