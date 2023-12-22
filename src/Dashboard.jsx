import { BrowserRouter, Routes, Route } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Home from "./Files/Home";

import DashboardSidebar from "./Component/DashboardSidebar";
import LoginPage from "./Files/LoginPage";
import PrivateRoute from "./Component/PrivateRoute";

import AddCurrency from "./Files/AddCurrency";
import Transactions from "./Files/Transactions";
import AddTransaction from "./Files/AddTransaction";
import Signup from "./Files/Signup";
import ReportTransactions from "./Files/ReportTransactios";
import ReportCurrencies from "./Files/ReportCurrencies ";


const Dashboard = () => {
  const timeOut = 1000;
  // const [product, setProduct] = useState([]);

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route
            element={
              <div className="flex h-screen bg-gray-200">
                <DashboardSidebar />
              </div>
            }
          >
            <Route path="/home" element={<Home />} />
          
          
            <Route path="/addcurrency" element={<AddCurrency />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/addtransaction" element={<AddTransaction />} />
            <Route path="/reports" element={<ReportTransactions />} />
            <Route path="/curencyReport" element={<ReportCurrencies />} />
            
          </Route>
        </Route>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>

      <ToastContainer autoClose={timeOut} />
    </BrowserRouter>
  );
};
export default Dashboard;
