
import MarketerBanner from "@/components/MarketerBanner";
import StatisticalWidge from "@/components/StatisticalWidge";

import Sidebar from "@/components/SideBar";
import Navigation from "@/components/Navbar";


export default async function Home() {
 
 
  return (
   <div>
   <Navigation/>
    <div className="max-w-7xl mx-auto px-4 ">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 ">
              <div className="hidden lg:block lg:col-span-3"><Sidebar/></div>
              <div className="lg:col-span-9 min-h-screen">
              <MarketerBanner/>
              <StatisticalWidge/>
                </div>
              </div>
           
            </div>

  
    
   </div>
  );
}
