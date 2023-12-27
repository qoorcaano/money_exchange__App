import React, { useState, useEffect } from "react";
import { useSpring, animated } from "react-spring";
import { fetchUserCount, fetchCurrencyCount, fetchTransactionCount } from "../services/api-calls";

const Report = () => {
  const [userCount, setUserCount] = useState("0");
  const [currencyCount, setCurrencyCount] = useState(5);
  const [transactionCount, setTransactionCount] = useState("0");

  useEffect(() => {
    const getUserCount = async () => {
      try {
        const response = await fetchUserCount();
        const count = response.count;
        setUserCount(String(count));
      } catch (error) {
        console.error("Error fetching user count:", error);
      }
    };

    const getCurrencyCount = async () => {
      try {
        const response = await fetchCurrencyCount();
        const count = response.count;
        setCurrencyCount(String(count));
      } catch (error) {
        console.error("Error fetching currency count:", error);
      }
    };

    const getTransactionCount = async () => {
      try {
        const response = await fetchTransactionCount();
        // Update this line to access the correct property
        const count = response; // or response.data, depending on the structure
        setTransactionCount(String(count));
      } catch (error) {
        console.error("Error fetching transaction count:", error);
      }
    };

    getUserCount();
    getCurrencyCount();
    getTransactionCount();
  }, []);

  // Animations using react-spring
  const transactionAnimation = useSpring({
    from: { opacity: 0, transform: "translateY(-50px)", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" },
    to: { opacity: 1, transform: "translateY(0)", boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)" },
    config: { mass: 1, tension: 120, friction: 14 },
    delay: 200,
  });

  const usersAnimation = useSpring({
    from: { opacity: 0, transform: "translateY(-50px)", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" },
    to: { opacity: 1, transform: "translateY(0)", boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)" },
    config: { mass: 1, tension: 120, friction: 14 },
    delay: 400,
  });

  const currencyAnimation = useSpring({
    from: { opacity: 0, transform: "translateY(-50px)", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" },
    to: { opacity: 1, transform: "translateY(0)", boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)" },
    config: { mass: 1, tension: 120, friction: 14 },
    delay: 600,
  });

  return (
    <div className="container mx-auto mt-8">
      <animated.div style={transactionAnimation} className="w-full p-3">
        {/* Total Transactions Card */}
        <div className="bg-white border rounded shadow p-4 mb-4">
          <h5 className="font-bold uppercase text-gray-600 text-center">Total Transactions</h5>
          <div className="p-5 text-center">
            <p className="text-3xl font-bold text-gray-800">{transactionCount}</p>
            <p className="text-sm text-gray-500">{transactionCount / 100} % From Last month</p>
          </div>
        </div>
      </animated.div>

      <animated.div style={usersAnimation} className="w-full p-3">
        {/* Total Users Card */}
        <div className="bg-white border rounded shadow p-4 mb-4">
          <h5 className="font-bold uppercase text-gray-600 text-center">Total Users</h5>
          <div className="p-5 text-center">
            <p className="text-3xl font-bold text-gray-800">{userCount}</p>
            <p className="text-sm text-gray-500">{userCount / 100} % From Last month</p>
          </div>
        </div>
      </animated.div>

      <animated.div style={currencyAnimation} className="w-full p-3">
        {/* Total Currency Card */}
        <div className="bg-white border rounded shadow p-4">
          <h5 className="font-bold uppercase text-gray-600 text-center">Total Currency</h5>
          <div className="p-5 text-center">
            <p className="text-3xl font-bold text-gray-800">{currencyCount}</p>
            <p className="text-sm text-gray-500">{currencyCount / 100} % From Last month</p>
          </div>
        </div>
      </animated.div>
    </div>
  );
};

export default Report;
