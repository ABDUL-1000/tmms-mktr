import { HomeIcon, TruckIcon } from "lucide-react";
import Link from "next/link";
import { FaAppStore, FaCogs, FaFileUpload, FaShoppingCart, FaSignOutAlt, FaTerminal, FaTint, FaUser, FaUsers, FaWalking } from "react-icons/fa";
import { MdSettings } from "react-icons/md";

const Sidebar = () => {
  return (
    <div className="text-black h-full w-full shadow-lg inset-0 ">
      <div className="p-4 text-2xl  font-bold border-b flex items-center border-gray-300">
        MyApp
      </div>
      <nav className="mt-4 ">
        <ul className="space-y-2 px-4">
          <li>
            <Link
            
              href="/"
              className=" py-2 px-3 flex rounded hover:bg-gray-100">
              <HomeIcon className="mr-2 w-6 h-6"/>
              Dashboard (M+)
            </Link>
          </li>
          <li>
            <Link
            
              href="/products"
              className="flex py-2 px-3 rounded hover:bg-gray-100">
                <FaTint className="mr-2 w-6 h-6"/>
                 Products
            </Link>
          </li>
          <li>
            <Link
              href="/purchase"
              className="flex py-2 px-3 rounded hover:bg-gray-100"
            >
              <FaShoppingCart className="mr-2 w-6 h-6"/>
              Purchase (PTF)
            </Link>
          </li>
          <li>
            <Link
              href="/programs"
              className="flex py-2 px-3 rounded hover:bg-gray-100"
            >
              <FaAppStore className="mr-4 w-5 h-5"/>
              Programs
            </Link>
            <Link
              href="/transactions"
              className="flex py-2 px-3 rounded hover:bg-gray-100"
            >
              <FaFileUpload className="mr-4 w-5 h-5"/>
              Transactions
            </Link>
          </li>
          <li>
            <Link 
            
              href="/programTruck"
              className="flex py-2 px-3  rounded hover:bg-gray-100"
            > <TruckIcon className="mr-2 w-6 h-6 " />
              Approved Programs
            </Link>
          </li>
          <li>
            <Link
              href="/customers"
              className="flex py-2 px-3 rounded hover:bg-gray-100"
            >
              <FaUsers  className="mr-2 w-5 h-5"/>
             Customers
            </Link>
          </li>
          <li>
            <Link
              href="/movement"
              className="flex py-2 px-3 rounded hover:bg-gray-100"
            >
              <FaWalking  className="mr-2 w-5 h-5"/>
              Movements
            </Link>
          </li>
          <li>
            <Link
              href="/profile"
              className="flex py-2 px-3 rounded hover:bg-gray-100"
            >
              <FaUser className="mr-2 w-5 h-5"/>
              Profile
            </Link>
          </li>
          <li>
            <Link
              href="/settings"
              className="flex py-2 px-3 rounded hover:bg-gray-100"
            >
              <MdSettings className="mr-2 w-5 h-5"/>
              Settings
            </Link>
          </li>
          <li>
          
              <Link href="/login"
                type="submit"
                className=" flex py-2 px-3 text-left hover:bg-gray-100"
              >
                <FaSignOutAlt className="mr-2 w-5 h-5"/>
                Logout
              </Link>
           
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
