import React from 'react'
import Footer from '../Components/Footer'
import Navbar from '../Components/Navbar'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
      <div className="flex flex-col min-h-screen">
          <header>
              <Navbar />
          </header>

          <main className="flex-1">
              <Outlet />
          </main>

          <footer>
              <Footer />
          </footer>
      </div>

  )
}

export default Layout
