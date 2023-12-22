import React, { useState, useEffect } from 'react';
import { fetchCurrencies } from '../services/api-calls';
import { FaSearch, FaFileExport, FaPrint } from 'react-icons/fa';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const ReportCurrencies = () => {
  const [currencies, setCurrencies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const getCurrencies = async () => {
      try {
        const data = await fetchCurrencies();

        if (data && data.length > 0) {
          setCurrencies(data);
        } else {
          console.log('No currencies found in the data:', data);
        }

        setLoading(false);
      } catch (error) {
        console.error('Error fetching currencies:', error);
        setLoading(false);
      }
    };

    getCurrencies();
  }, []);

  const handlePrintTable = () => {
    window.print();
  };

  const handleExportPDF = () => {
    const pdf = new jsPDF();

    pdf.text('Currencies Report', 20, 10);

    const columns = ['Name', 'Code',];
    const filteredRows = filteredArray(currencies, query);

    pdf.autoTable({
      head: [columns],
      body: filteredRows.map((currency) => [
        currency.name,
        currency.code,
       
      ]),
      startY: 20,
    });

    pdf.save('currencies_report.pdf');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!currencies || currencies.length === 0) {
    return <div>No currencies found.</div>;
  }

  const filteredCurrencies = filteredArray(currencies, query);

  return (
    <div className="bg-white m-5 p-5">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl text-black font-semibold m-4">
          Report Currencies
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

      <table
        id="table"
        className="table-auto min-w-full divide-y divide-gray-200"
      >
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Code
            </th>
          
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {filteredCurrencies.map((currency) => (
            <tr key={currency._id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{currency.name}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{currency.code}</div>
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
      item.name.toLowerCase().includes(query.toLowerCase()) ||
      item.code.toLowerCase().includes(query.toLowerCase()) 
    
  );
}

export default ReportCurrencies;
