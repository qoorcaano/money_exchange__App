import { BrowserRouter ,Link,Routes,Route } from "react-router-dom";
import { FaHome,FaUser,FaUserPlus , FaFileInvoice ,FaBoxOpen} from "react-icons/fa";

import Products from "./Files/Products";
import Customers from "./Files/Customers";

import SalesOrder from "./Files/SalesOder";
import Adduser from "./Files/Adduser";





const Dashboard = () => {
    return (
        <BrowserRouter>
       <div className= "bg-white ">
       
        <div className= "bg-gray-800 "
            style={{ width: "20%", height: "100vh", float: "left" }}>
            <nav className= "bg-gray-800 ">
                <div className= "px-2 space-y-3 ">
                <Link href= "#" className= "bg-gray-900 text-white block px-3 py-2 rounded-md  font-medium text-2xl" aria-current= "page" > Dashboard </Link>
                   <Link to= "/" className= "text-white flex items-center space-x-2 px-2 py-2 rounded-md text-sm font-medium hover:bg-gray-700 hover:text-white">
                        <FaHome className= "text-2xl" />
                        <span>Home</span>
                    </Link>
                    <Link to= "/customers" className= "text-white flex items-center space-x-2 px-2 py-2 rounded-md text-sm font-medium hover:bg-gray-700 hover:text-white">
                        <FaUserPlus className= "text-2xl" />
                        <span>Customers</span>
                    </Link>
                    <Link to= "/salesorder" className= "text-white flex items-center space-x-2 px-2 py-2 rounded-md text-sm font-medium hover:bg-gray-700 hover:text-white">
                        < FaFileInvoice className= "text-2xl" />
                        <span>Sales Order</span>
                    </Link>
                    <Link to= "/Products" className= "text-white flex items-center space-x-2 px-2 py-2 rounded-md text-sm font-medium hover:bg-gray-700 hover:text-white">
                        <FaBoxOpen className= "text-2xl" />
                        <span>Products</span>
                    </Link>
                    <Link to= "/adduser" className= "text-white flex items-center space-x-2 px-2 py-2 rounded-md text-sm font-medium hover:bg-gray-700 hover:text-white">
                        <FaUser className= "text-2xl" />
                        <span> User's</span>
                    </Link>
                    
                    
                    </div>
                </nav>
                 </div>
                 <Routes>
                    <Route path= "/" element= {<h1></h1>} />
                    <Route path= "/customers" element= {<Customers />} />
                    <Route path= "/salesorder" element= {<SalesOrder />} />
                    <Route path= "/Products" element= {<Products />} />
                    <Route path= "/adduser" element= {<Adduser />} />
                    </Routes>
            </div>
            </BrowserRouter>

    )
}
export default Dashboard;