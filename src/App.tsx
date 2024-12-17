import React, { useContext, useState } from 'react';
import './App.css';
import { useDeleteItemMutation, useGetItemsQuery } from './Redux/Api';
import { Space, Table } from 'antd';
import type { TableProps } from 'antd';
import { ItemType } from './types';
import ModalBtn from './Components/ModalBtn/ModalBtn';
import swal from 'sweetalert';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { PostData } from './Context/PostData';
import { Spin } from "antd";
import Notifications from './Components/Notification/Notifications';
function App() {
  const [deleteItem] = useDeleteItemMutation();
  const [modal2Open, setModal2Open] = useState(false);
const {setCurrentItem,setMode}=useContext(PostData)
  const handleDelete = async (id: string) => {
    const endpoint = `posts/${id}`;
    try {
      const willDelete = await swal({
        title: "Confirm Deletion",
        text: "You are about to delete this item permanently.",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      });
      if (willDelete) {
        const response = await deleteItem({ endpoint }).unwrap();
        swal("Deleted Successfully", { icon: "success" });
      }
    } catch (error) {
      console.error("Error deleting item:", error);
      swal("Error", "Failed to delete the post.", "error");
    }
  };

  const showEditModal = (item: ItemType) => {
    setCurrentItem(item);
    setModal2Open(true);
    setMode('edit')
  };

  const handleCloseModal = () => {
    setModal2Open(false);
    setCurrentItem(null);
    setMode('add')
  };

  const columns: TableProps<ItemType>['columns'] = [
    {
      title: 'id',
      dataIndex: 'id',
      key: 'id',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'body',
      dataIndex: 'body',
      key: 'body',
    },
    {
      title: 'Action',
      key: 'action',
      render: (item) => (
        <Space size="middle">
          <a style={{ color: 'red' }} onClick={() => handleDelete(item.id)}>
            <DeleteOutlined />
          </a>
          <a style={{ color: 'orange' }} onClick={() => showEditModal(item)}>
            <EditOutlined />
          </a>
        </Space>
      ),
    },
  ];

  const { data, error, isLoading } = useGetItemsQuery('posts');
  const dataSource = data?.map((item) => ({
    ...item,
    key: item.id,
  }));
  return (
    <>
      <ModalBtn    onClose={handleCloseModal} modal2Open={modal2Open} setModal2Open={setModal2Open} />
      {isLoading && <div className='LoaderData'><Spin/></div>}
      {error && <Notifications message={error?.error}/>}
      {data && <Table<ItemType> bordered columns={columns} dataSource={dataSource} />}
    </>
  );
}

export default App;
