import React from 'react'
// import loadable from '@loadable/component'
import './UserLayout.less'

interface Props {}

const UserLayout: React.FC<Props> = ({ children }) => {
  return <div className="layout-user">{children}</div>
}

export default UserLayout
