"use client";
import MarketerBanner from "@/components/MarketerBanner";
import Link from "next/link";
import { useState } from "react";
import { FaBook, FaEllipsisV, FaTint } from "react-icons/fa";

export default function Programs() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  return (
    <div>
      <MarketerBanner />
      <div className="rounded-lg dark:border-gray-700 mt-2">
        {/* Table Section */}
        <div className=" bg-white rounded-lg shadow-lg dark:bg-gray-800">
          <div className="relative p-2 overflow-x-auto shadow-md sm:rounded-lg">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl md:text-2xl font-semibold text-gray-700 dark:text-gray-300">
                Programs
              </h2>
              <Link href="" className="">
                <button className=" flex items-center  md:px-4 py-2 bg-blue-800 text-white rounded-md hover:bg-blue-700">
                  <FaBook className="m-1" />
                  <span className="">Add Program</span>
                </button>
              </Link>
            </div>

            {/* Filter, Search, Export */}
            <div className="flex justify-between items-end gap-4 space-y-4 md:space-y-0 py-4 bg-white dark:bg-gray-900 px-4">
              <div>
                <button
                  id="dropdownActionButton"
                  data-dropdown-toggle="dropdownAction"
                  className="inline-flex items-center text-gray-500 bg-white border border-gray-300 rounded-lg text-sm px-3 py-1.5"
                >
                  Filter
                  <svg
                    className="w-2.5 h-2.5 ms-2.5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m1 1 4 4 4-4"
                    />
                  </svg>
                </button>
              </div>
              <div className="md:flex-2">
                <form className="w-full max-w-md mx-auto">
                  <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3">
                      <svg
                        className="w-4 h-4 text-gray-500"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 20"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                        />
                      </svg>
                    </div>
                    <input
                      type="search"
                      className="block w-full p-4 ps-10 text-sm border border-gray-300 rounded-lg bg-gray-50"
                      placeholder="Search..."
                    />
                    <button
                      type="submit"
                      className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 px-4 py-2 rounded-lg"
                    >
                      Search
                    </button>
                  </div>
                </form>
              </div>
              <div className="flex items-center gap-3">
                <a href="#">
                  <button className="px-2.5 py-1.5 bg-green-500 text-white rounded-lg">
                    <i className="fa fa-download"></i>
                    <span className="pl-2">Export</span>
                  </button>
                </a>
              </div>
            </div>

            {/* Table */}
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 bg-gray-50">
                <tr>
                  <th className="p-4">
                    <input type="checkbox" />
                  </th>
                  <th className="px-6 py-3">ATC No.</th>
                  <th className="px-6 py-3">Customer</th>
                  <th className="px-6 py-3">Liters</th>
                  <th className="px-6 py-3">Cost (NGN)</th>
                  <th className="px-6 py-3">Cost (USD)</th>
                  <th className="px-6 py-3">Truck</th>
                  <th className="px-6 py-3">Driver</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white border-b">
                  <td className="p-4">
                    <input type="checkbox" />
                  </td>
                  <td className="px-6 py-4">ATC-23543600</td>
                  <td className="px-6 py-4">Neil Sims</td>
                  <td className="px-6 py-4">500</td>
                  <td className="px-6 py-4">₦50,000</td>
                  <td className="px-6 py-4">$120</td>
                  <td className="px-6 py-4">Truck A</td>
                  <td className="px-6 py-4">John Doe</td>
                  <td className="px-6 py-4">Delivered</td>
                  <td className="px-6 py-4">
                    <button
                      id="dropdownMenuIconButton1"
                      onClick={toggleDropdown}
                      className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                      type="button"
                    >
                      <FaEllipsisV className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
            {isModalOpen && (
        <div
          className="fixed top-0 left-0 right-0 z-50 items-center justify-center w-full p-4 overflow-x-hidden overflow-y-auto h-[calc(100%-1rem)] max-h-full"
          onClick={toggleDropdown}
        >
          <div className="relative w-full max-w-2xl max-h-full bg-white dark:bg-gray-700">
            {/* Modal content */}
            <div className="fixed inset-0 flex justify-end items-center z-50">
  <form className="relative w-full max-w-md bg-white rounded-lg shadow dark:bg-gray-700">
    <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
        Purchase Information
      </h3>
      <button
        type="button"
        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
       
        
    >
        <svg
          className="w-3 h-3"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 14"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
          />
        </svg>
      </button>
    </div>

    <div className="p-6 space-y-6 dark:text-white">
      <div className="w-100 text-center">
        You are purchasing LPG (cooking gas)
      </div>
      <div className="grid grid-cols-6 gap-6">
        <div className="col-span-12">
          <label
            htmlFor="first-name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Enter Litters to purchase
            <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            name="first-name"
            id="first-name"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="700,000"
            required
            value="200"
          />
        </div>
      </div>

      <div className="w-100 text-center">Total cost of product</div>

      <div className="flex gap-6">
        <div className="col-span-6 sm:col-span-3 w-100 md:w-6/12">
          <label
            htmlFor="amount-cost"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Cost in Naira (NGN)
          </label>
          <input
            type="text"
            name="last-name"
            id="last-name"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="0"
            required
            value="1,800,000"
            disabled
          />
        </div>

        <div className="col-span-6 sm:col-span-3 w-100 md:w-6/12">
          <label
            htmlFor="slots"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Cost in Dollar (USD)
          </label>
          <input
            type="text"
            name="phone-number"
            id="phone-number"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="0"
            required
            value="500"
            disabled
          />
        </div>
      </div>
    </div>

    <div className="flex items-center p-6 space-x-3 rtl:space-x-reverse border-t border-gray-200 rounded-b dark:border-gray-600">
      <button
        type="submit"
        className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
      >
        Save
      </button>
    </div>
  </form>
</div>

          </div>
        </div>
      )}
          </div>
        </div>
      </div>
    </div>
  );
}
