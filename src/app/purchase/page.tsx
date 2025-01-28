import Navigation from "@/components/Navbar";
import PurchasePage from "@/components/PurchasePage";
import Sidebar from "@/components/SideBar";
import { useRouter, useSearchParams } from "next/navigation";

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
            <PurchasePage />
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
