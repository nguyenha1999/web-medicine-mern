import React from 'react'
import { Layout } from 'antd'
import './layout.css'

const { Footer } = Layout;
const FooterComponent = () => {
  return (
    <>
      <Footer style={{ textAlign: 'center' }}>Medicine App ©2021 Created by Hà_TEAM</Footer>
    </>
  )
}

export default React.memo(FooterComponent);