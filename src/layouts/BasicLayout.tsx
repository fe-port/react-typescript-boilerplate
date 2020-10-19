import React from 'react'
import { Avatar, Dropdown, Layout, Menu } from 'antd'
// import { Route, useHistory } from 'react-router-dom'
import './BasicLayout.less'

interface Props {}

const { Header, Content, Footer } = Layout

const BasicLayout: React.FC<Props> = ({ children }) => {
  return (
    <Layout className="layout-basic">
      <Header className="layout-basic-header">
        {/* 个人中心 */}
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item>
                <a onClick={() => console.log('logout')}>退出</a>
              </Menu.Item>
            </Menu>
          }
        >
          <Avatar />
        </Dropdown>
      </Header>
      <Content className="layout-basic-content">{children}</Content>
      <Footer className="layout-basic-footer">
        Turing ©2020 Created by Turing
      </Footer>
    </Layout>
  )
}

export default BasicLayout
