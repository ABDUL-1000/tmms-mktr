import Link from "next/link";

const Navigation = () => {
  return (
    <nav className="sticky top-0 bg-background/95 border-b w-full h-16 z-50 backdrop-blur supports-[backdrop-filter]:bg-background/65">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link
              href="/"
              className="flex items-center shadow p-2 px-3 text-xl md:px-8 md:text-2xl  rounded-lg dark:text-white dark:hover:bg-gray-700 group sm:text-center hover:bg-[#0828b9] bg-[#0828ad] text-blue-100 font-bold leading"
            >
              <span className="flex-1 ms-3 whitespace-nowrap dark:text-white pe-1">
                TMMMS
              </span>
            </Link>
          </div>
          
          <div className="flex items-center gap-2">

          <Link href="/signup" className="flex items-center blue-500">
            signup
          </Link>
            <button
              type="button"
              className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
              aria-expanded="false"
              data-dropdown-toggle="dropdown-user"
            >
              <span className="sr-only">Open user menu</span>
              <img
                className="w-8 h-8 rounded-full"
                src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                alt="user photo"
              />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
