import { Fragment, useState } from "react";
import { Outlet, Link } from "react-router-dom";
import {
  FaHome,
 
 
  FaMoneyBillAlt,

  FaChartBar,
  FaSignOutAlt,
  FaListAlt,
  FaCcMastercard,
 
 
} from "react-icons/fa";
import "./App.css";

export default function DashboardSidebar() {
  const [show, setShow] = useState(false);
  const [showReport, setShowReport] = useState(false);
  // console.log user id login 
  
  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user._id);

  
   

  return (
    <Fragment>
      <div
        className="flex flex-col flex-shrink-0  bg-gray-800 colored text-white dark-mode:text-gray-200 dark-mode:bg-gray-800 w-[250px] no-printme"
        id="no-printme"
      >
        <div
          className="bg-gray-900 text-white block px-3 py-2 rounded-md  font-medium text-2xl"
          aria-current="page"
        >
          <div className="flex items-center justify-center">
            <img
              className="h-8 w-8 rounded-full object-cover"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYOxhrR8VMEWZTYyv6JssYmCKcdBfFzNxUhQ&usqp=CAU"
              alt="profile"
            />
            <span className="ml-3 text-xl font-bold">
            Air Exchange Money
            </span>
          </div>
        </div>
        <div className="flex flex-col justify-between flex-1 h-0 overflow-y-auto">
          <ul className="flex flex-col py-4 space-y-1">
            <li className="px-5">
              <Link
                to="/home"
                className="flex items-center px-2 py-2 text-sm font-medium leading-snug text-white rounded-md dark-mode:text-gray-200 hover:bg-gray-700 dark-mode:hover:bg-white"
              >
                <FaHome className="w-5 h-5" />
                <span className="ml-2">Home</span>
              </Link>
            </li>
            <li className="px-5">
              <button
                onClick={() => setShow(!show)}
                className="flex items-center px-2 py-2 text-sm font-medium leading-snug text-white rounded-md dark-mode:text-gray-200 hover:bg-gray-700 dark-mode:hover:bg-white focus:outline-none"
              >
                <FaCcMastercard className="w-5 h-5" />
                <span className="ml-2">Transactions</span>
              </button>
              {show ? (
                <ul className="flex flex-col py-4 space-y-1">
                  <div className="px-5">
                    <Link
                      to="/transactions"
                      className="flex items-center px-2 py-2 text-sm font-medium leading-snug text-white rounded-md dark-mode:text-gray-200 hover:bg-gray-700 dark-mode:hover:bg-white"
                    >
                      <FaListAlt className="w-5 h-5" />
                      <span className="ml-2">List Transactions</span>
                    </Link>
                  </div>
                  <div className="px-5">
                    <Link
                      to="/addtransaction"
                      className="flex items-center px-2 py-2 text-sm font-medium leading-snug text-white rounded-md dark-mode:text-gray-200 hover:bg-gray-700 dark-mode:hover:bg-white"
                    >
                      <FaCcMastercard className="w-5 h-5" />
                      <span className="ml-2">
                        Add Transactions
                      </span>
                    </Link>
                  </div>
                </ul>
              ) : null}
            </li>
            <li className="px-5">
              <Link
                to="/addcurrency"
                className="flex items-center px-2 py-2 text-sm font-medium leading-snug text-white rounded-md dark-mode:text-gray-200 hover:bg-gray-700 dark-mode:hover:bg-white"
              >
                < FaMoneyBillAlt className="w-5 h-5" />
                <span className="ml-2">Currency</span>
              </Link>
            </li>
          
            
            {/* <li className="px-5">
          <Link
            to="/reports"
            className="flex items-center px-2 py-2 text-sm font-medium leading-snug text-white rounded-md dark-mode:text-gray-200 hover:bg-gray-700 dark-mode:hover:bg-white"
          >
            <FaChartBar className="w-5 h-5" />
            <span className="ml-2">Reports</span>
          </Link>
        </li>
      </ul> */}
            <li className="px-5">
              <button
                onClick={() => setShowReport(!showReport)}
                className="flex items-center px-2 py-2 text-sm font-medium leading-snug text-white rounded-md dark-mode:text-gray-200 hover:bg-gray-700 dark-mode:hover:bg-white focus:outline-none"
              >
                <FaChartBar className="w-5 h-5" />
                <span className="ml-2">Reports</span>
              </button>

              {showReport ? (
                <ul className="flex flex-col py-4 space-y-1">
                  <div className="px-5">
                    <Link
                      to="/reports"
                      className="flex items-center px-2 py-2 text-sm font-medium leading-snug text-white rounded-md dark-mode:text-gray-200 hover:bg-gray-700 dark-mode:hover:bg-white"
                    >
                      <FaChartBar className="w-5 h-5" />
                      <span className="ml-2">Transaction Report</span>
                    </Link>
                  </div>
                  <div className="px-5">
                    <Link
                      to="/curencyReport"
                      className="flex items-center px-2 py-2 text-sm font-medium leading-snug text-white rounded-md dark-mode:text-gray-200 hover:bg-gray-700 dark-mode:hover:bg-white"
                    >
                      <FaChartBar className="w-5 h-5" />
                      <span className="ml-2">Currency Report</span>
                    </Link>
                  </div>
                
                </ul>
              ) : null}
            </li>
          </ul>

          <div className="px-5 mt-5">
            <button
              type="button"
              className="flex items-center justify-center px-2 py-2 text-sm font-medium leading-snug text-red-500 rounded-md dark-mode:text-gray-200 hover:bg-gray-700 dark-mode:hover:bg-white"
              onClick={() => {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                window.location.href = "/";
              }}
            >
              <FaSignOutAlt className="w-5 h-5" />
              <span className="ml-2">Logout</span>
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col overflow-x-hidden flex-1">
        <div className="flex flex-col w-full h-full overflow-hidden border-t">
          <main className="flex flex-col overflow-x-hidden flex-1">
            <div className="flex flex-col flex-1  overflow-x-hidden mx-10">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </Fragment>
  );
}
