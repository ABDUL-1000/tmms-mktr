
import Navigation from '@/components/Navbar'
import ProductPage from '@/components/Products'
import Sidebar from '@/components/SideBar'
import React from 'react'

import ProtectedRoute from '@/components/ProtectedRoute'



const page = () => {
  return (
    <div>
      <ProtectedRoute>
       <Navigation/>
       <div className="max-w-7xl mx-auto px-4 ">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 ">
              <div className="hidden lg:block lg:col-span-3"><Sidebar/></div>
              <div className="lg:col-span-9 min-h-screen">
                        <ProductPage/>
                       
              </div>
    </div>
    </div>
    
    </ProtectedRoute>   
    </div>

           
         
  )
}

export default page
