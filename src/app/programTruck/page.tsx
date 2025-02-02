import Navigation from '@/components/Navbar'
import ProgramTrucksTable from '@/components/ProgramTruck'
import Sidebar from '@/components/SideBar'
import React from 'react'

const page = () => {
   
  return (
    <div>
      <Navigation />
      <div className="max-w-7xl mx-auto px-4 ">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 ">
          <div className="hidden lg:block lg:col-span-3">
            <Sidebar />
          </div>
          <div className="lg:col-span-9 min-h-screen">
          <ProgramTrucksTable/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default page
