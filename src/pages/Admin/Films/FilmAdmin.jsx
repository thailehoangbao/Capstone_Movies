import React, { Fragment, useEffect } from 'react'
import { Button, Table } from 'antd';
import { AudioOutlined, DeleteOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons';
import { Input, Space } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { layDanhSachPhimAction } from '../../../redux/actions/QuanLyPhimAction';
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';
import { history } from '../../../App';
const { Search } = Input;
const suffix = (
  <AudioOutlined style={{ fontSize: 16, color: '#1677ff', }} />);





export default function FilmAdmin() {
  const { arrFilmDefaulft } = useSelector(state => state.QuanLyPhimReducer);
  const dispatch = useDispatch();

  console.log("arrFilmDefaulft", arrFilmDefaulft);

  useEffect(() => {
    dispatch(layDanhSachPhimAction());

  }, [])


  const onSearch = (value) => console.log(value);
  const columns = [
    {
      title: 'Tên Phim',
      dataIndex: 'tenPhim',
      filterSearch: true,
      onFilter: (value, record) => record.name.startsWith(value),
      width: '30%',
      sorter: (a, b) => {
        let tenPhimA = a.tenPhim.toLowerCase().trim();
        let tenPhimB = b.tenPhim.toLowerCase().trim();
        if (tenPhimA < tenPhimB) {
          return 1
        }
        return -1
      },
    },
    {
      title: 'Mã Phim',
      dataIndex: 'maPhim',
      sorter: (a, b) => a.maPhim - b.maPhim,
      sortDirections: ["descend", "ascend"],
      width: '10%'
    },
    {
      title: 'Hình Ảnh',
      dataIndex: 'hinhAnh',
      onFilter: (value, record) => record.address.startsWith(value),
      filterSearch: true,
      render: (text, films) => {
        return <Fragment>
          <img src={films.hinhAnh} alt={films.biDanh} width={50} height={50} onError={({ currentTarget }) => {
            currentTarget.onerror = null; // prevents looping
            currentTarget.src = "https://inthienha.com/wp-content/uploads/CGV-Cinemas.png";
          }} />
        </Fragment>
      },
      width: '10%',
    },
    {
      title: 'Mô Tả',
      dataIndex: 'moTa',
      sorter: (a, b) => a.moTa - b.moTa,
      sortDirections: ["descend", "ascend"],
      width: '35%',
      render: (words,films) => {
        return <Fragment>
          {films.moTa.length >40 ? films.moTa.substr(0,40) + '...' :films.moTa}
        </Fragment>
      }
    },
    {
      title: 'Action',
      dataIndex: 'hanhDong',
      render: (words,films) => {
        return <Fragment>
          <NavLink to="/"><EditOutlined className='p-2 text-green-600 text-lg text-right'/></NavLink>
          <NavLink to="/"><DeleteOutlined className='p-2 text-red-700 text-lg text-right'/></NavLink>

        </Fragment>
      },
      width: '15%'
    }
  ];
  const data = arrFilmDefaulft
  const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };



  return (
    <div>
      <h3 className='text-left mb-1 text-2xl font-bold'>Quản lý Phim</h3>
      <Button className='mb-2' onClick={()=> {
        history.push('/admin/films/addnew')
      }}>Thêm Phim</Button>
      <Search
        style={{ backgroundColor: "black", borderRadius: "5px" }}
        placeholder="input search text"
        allowClear
        enterButton={<SearchOutlined className='pb-2' />}
        size="large"
        onSearch={onSearch}
        className='mt-2 mb-4'
      />
      <Table columns={columns} dataSource={data} onChange={onChange} />
    </div>
  )
}
