import React, { Component } from 'react';
import { Fragment } from "react";
import { Route } from "react-router";
import { TeamOutlined, FileOutlined, DesktopOutlined, PieChartOutlined, UserOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { useState } from 'react';
import { NavLink } from 'react-router-dom/cjs/react-router-dom';
import SubMenu from 'antd/es/menu/SubMenu';
const { Header, Content, Footer, Sider } = Layout;

export default function AdminTemplates(props) {
    const { Component, ...restProps } = props;
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    return <Route {...restProps} render={(propsRoute) => {
        return <Fragment>
            <Layout
                style={{
                    minHeight: '100vh',
                }}
            >
                <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                    <div className="demo-logo-vertical" >
                        <img src="https://inthienha.com/wp-content/uploads/CGV-Cinemas.png" alt="logo" />
                    </div>
                    <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" >
                        <Menu.Item key={1} icon={<UserOutlined />}>
                            <NavLink to="/admin/users">Users</NavLink>
                        </Menu.Item>
                        <SubMenu key="sub1" icon={<UserOutlined />} title="Films">
                            <Menu.Item key={10} icon={<FileOutlined />}>
                                <NavLink to="/admin/films">Film</NavLink>
                            </Menu.Item>
                            <Menu.Item key={11} icon={<FileOutlined />}>
                                <NavLink to="/admin/films/addnew">Add New</NavLink>
                            </Menu.Item>
                        </SubMenu>
                        <Menu.Item key={3} icon={<DesktopOutlined />}>
                            <NavLink to="/admin/showtimes">ShowTimes</NavLink>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout>
                    <Header style={{ padding: 0, background: colorBgContainer }} />
                    <Content style={{ margin: '0 16px', }}>
                        <Breadcrumb style={{ margin: '16px 0' }}>
                            <Breadcrumb.Item>User</Breadcrumb.Item>
                            <Breadcrumb.Item>Bill</Breadcrumb.Item>
                        </Breadcrumb>
                        <div style={{ padding: 24, minHeight: 360, background: colorBgContainer }}>
                            <Component {...propsRoute} />
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center', padding: "20px" }}>
                        Ant Design ©2023 Created by Ant UED
                    </Footer>
                </Layout>
            </Layout>
        </Fragment>
    }
    } />
};

