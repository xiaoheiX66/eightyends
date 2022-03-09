import { Table, Collapse  } from 'antd';
function Home(){
    const goodsinfo = JSON.parse(localStorage.getItem("goodsinfo"))
    // console.log("即将渲染的goods",goodsinfo);
    const columns = [
        {
          title: '影片相册',
          dataIndex: 'imgurl',
          key: 'imgurl',
          render: text => <img src={text} width="100px" height="100px" alt='加载中..' />,
        },
        {
          title: '影片类型',
          dataIndex: 'covers',
          key: 'covers',
        },
        {
          title: '影片名称',
          dataIndex: 'title',
          key: 'title',
        },
        {
          title: '更新状态',
          key: 'sequel',
          dataIndex: 'sequel',
        },
        {
            title: '主要内容',
            key: 'actors',
            dataIndex: 'actors',
        },
      ];
     
    return(
        <div>
            <Table columns={columns} dataSource={goodsinfo} />
        </div>
    )
}

export default Home