import { HomeIcon, TruckIcon } from "lucide-react";
import Link from "next/link";
import { FaTint } from "react-icons/fa";

const Sidebar = () => {
  return (
    <div className="bg-gray-800 text-white h-full w-full shadow-lg inset-0 ">
      <div className="p-4 text-2xl font-bold border-b flex items-center border-gray-700">
        MyApp
      </div>
      <nav className="mt-4">
        <ul className="space-y-2 px-4">
          <li>
            <Link
            
              href="/"
              className=" py-2 px-3 flex rounded hover:bg-gray-700">
              <HomeIcon className="mr-2 w-6 h-6"/>
              Dashboard (M+)
            </Link>
          </li>
          <li>
            <Link
            
              href="/products"
              className="flex py-2 px-3 rounded hover:bg-gray-700">
                <FaTint className="mr-2 w-6 h-6"/>
                 Products
            </Link>
          </li>
          <li>
            <Link
              href="/purchase"
              className="block py-2 px-3 rounded hover:bg-gray-700"
            >
              Purchase (ATC)
            </Link>
          </li>
          <li>
            <Link
              href="/programs"
              className="block py-2 px-3 rounded hover:bg-gray-700"
            >
              Programs
            </Link>
          </li>
          <li>
            <Link 
            
              href="/customer/assignprogram"
              className="flex py-2 px-3  rounded hover:bg-gray-700"
            > <TruckIcon className="mr-2 w-6 h-6 " />
              Approved Programs
            </Link>
          </li>
          <li>
            <Link
              href="/movement"
              className="block py-2 px-3 rounded hover:bg-gray-700"
            >
              Movements
            </Link>
          </li>
          <li>
            <Link
              href="/profile"
              className="block py-2 px-3 rounded hover:bg-gray-700"
            >
              Profile
            </Link>
          </li>
          <li>
            <Link
              href="/settings"
              className="block py-2 px-3 rounded hover:bg-gray-700"
            >
              Settings
            </Link>
          </li>
          <li>
            <form
              method="post"
              action="/logout"
              className="hover:bg-gray-700 rounded"
            >
              <button
                type="submit"
                className="w-full py-2 px-3 text-left"
              >
                Logout
              </button>
            </form>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
