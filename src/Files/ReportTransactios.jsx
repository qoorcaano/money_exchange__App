import React, { useState, useEffect   } from 'react';
import { fetchTransactions } from '../services/api-calls';
import { FaSearch, FaFileExport, FaPrint, } from 'react-icons/fa';



import jsPDF from 'jspdf';
import 'jspdf-autotable';

const ReportTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  
 

  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const getTransactions = async () => {
      try {
        const isAuthenticated = checkAuthentication();

        if (isAuthenticated) {
          const userId = user._id;
          const data = await fetchTransactions(userId);
          console.log('Fetched transactions:', data);

          if (data && data.length > 0) {
            setTransactions(data);
          } else {
            console.log('No transactions found in the data:', data);
          }
        } else {
          console.log('User not authenticated');
        }

        setLoading(false);
      } catch (error) {
        console.error('Error fetching transactions:', error);
        setLoading(false);
      }
    };

    getTransactions();
  }, [user._id]);


  
  
  const handlePrintTable = () => {
    window.print();
  };

  const handleExportPDF = () => {
    const pdf = new jsPDF();
  
    // Add a header to the PDF
    pdf.text('Transactions Report', 20, 10);
  
    // Define table columns
    const columns = ['Amount', 'Currency From', 'Currency To', 'Exchange Rate', 'Date'];
  
    // Get filtered rows based on the current search query
    const filteredRows = filteredTransactions.map((transaction) => [
      transaction.amount,
      transaction.currencyFrom.name,
      transaction.currencyTo.name,
      `${transaction.exchangeRate}%`,
      transaction.date,
    ]);
  
    // Auto-generate the table based on columns and filtered rows
    pdf.autoTable({
      head: [columns],
      body: filteredRows,
      startY: 20, // Y-coordinate where the table starts
    });
  
    // Save the PDF
    pdf.save('transactions_report.pdf');
  };
  
  if (loading) {
    return <div>Loading...</div>;
  }

  if (!transactions || transactions.length === 0) {
    return <div>No transactions found.</div>;
  }

  const filteredTransactions = filteredArray(transactions, query);

  return (
    <div className="bg-white m-5 p-5">
      <div className="flex justify-between items-center ">
        <h1 className="text-3xl text-black font-semibold m-4">
          Report Transactions
        </h1>

        <div className="flex items-center gap-4">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleExportPDF}
          >
            Export
            <FaFileExport className="inline-block ml-2" />
          </button>

          <button
            className="bg-gray-700 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded"
            
            onClick={handlePrintTable}
          >
            Print
            <FaPrint className="inline-block ml-2" />
          </button>

        </div>
      </div>

      <hr className="bg-gray-400 h-1" />
      <br />
      <div className="flex justify-between items-center m-2">
        <div className="flex items-center">
          <FaSearch className="text-gray-400 mr-2" />
          <input
            type="search"
            placeholder="Search"
            className="outline-none border-b-2 border-gray-400"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>

      <table id="table" className="table-auto min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Amount
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Currency From
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Currency To
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Exchange Rate
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Date
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {filteredTransactions.map((transaction) => (
            <tr key={transaction._id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">
                  {transaction.amount}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">
                  {transaction.currencyFrom.name}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">
                  {transaction.currencyTo.name}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">
                  {transaction.exchangeRate}%
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">
                  {transaction.date}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

function filteredArray(array, query) {
  return array.filter(
    (item) =>
      item.amount.toString().toLowerCase().includes(query.toLowerCase()) ||
      item.currencyFrom.name.toLowerCase().includes(query.toLowerCase()) ||
      item.currencyTo.name.toLowerCase().includes(query.toLowerCase()) ||
      item.exchangeRate.toString().toLowerCase().includes(query.toLowerCase()) ||
      item.date.toLowerCase().includes(query.toLowerCase())
  );
}



function checkAuthentication() {
  const user = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token');

  if (user && token) {
    return true;
  }

  return false;
}

export default ReportTransactions;
