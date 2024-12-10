import { FC, ReactNode } from 'react'
import NavBar from '../components/global/NavBar/NavBar'

interface LayoutProps {
  children: ReactNode
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <NavBar />
      {children}
    </>
  )
}

export default Layout
