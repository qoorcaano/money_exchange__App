import React, { useState, useEffect } from 'react';
import { fetchTransactions } from '../services/api-calls';
import { FaSearch } from 'react-icons/fa';

const TransactionList = () => {
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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!transactions || transactions.length === 0) {
    return <div>No transactions found.</div>;
  }

  const filteredTransactions = filteredArray(transactions, query);
  



  return (
    <div className="bg-white m-5 p-5">
      <h2 className="text-black">Transaction List</h2>
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
      <table className="table-auto min-w-full divide-y divide-gray-200">
        {/* Table headers and body here */}
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
  
  
  function filteredArray(arr, query) {
    return arr?.filter((el) => {
      return (
        el.currencyFrom.name.toLowerCase().includes(query.toLowerCase()) ||
        el.currencyTo.name.toLowerCase().includes(query.toLowerCase()) ||
        el.amount.toString().toLowerCase().includes(query.toLowerCase()) ||
        el.exchangeRate.toString().toLowerCase().includes(query.toLowerCase())
      );
    });
  }
};

export default TransactionList;

const checkAuthentication = () => {
  // Replace this with your authentication logic
  return true;
};
