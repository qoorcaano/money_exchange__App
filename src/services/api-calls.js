import axios from "../utils/axios";

export const fetchUsers = async () => {
  return (await axios.get("/users")).data;
};

export const registerUser = async (data) => {
  const res = await axios.post("/users", {
    ...data,
  });
  return res.data;
};
export const updateUserByID = async (id, data) => {
  const res = await axios.put(`/users/${id}`, {
    ...data,
  });
  return res.data;
};

export const deleteUser = async (id) => {
  const res = await axios.delete(`/users/${id}`);
  return res.data;
};

// user count total from api to react app
export const fetchUserCount = async () => {
  return (await axios.get("/users/count")).data;
};

// login user
export const loginUser = async (data) => {
  const res = await axios.post("/login", {
    ...data,
  });
  return res.data;
};

// customer

// product

// product count total from api to react app


// currency 
 
export const fetchCurrencies = async () => {
  try {
    const response = await  axios.get('/currency');
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getCurrencies = async () => {
  try {
    const response = await  axios.get('/currency');
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
}

export const createCurrency = async (currency) => {
  try {
    const response = await  axios.post('/currency', currency);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const editCurrency = async (id, currency) => {
  try {
    const response = await  axios.put(`/currency/${id}`, currency);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const deleteCurrency = async (id) => {
  try {
    const response = await  axios.delete(`/currency/${id}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// fetch total currency count
export const fetchCurrencyCount = async () => {
  return (await axios.get("/currency/total")).data;
};


export const checkToken = async (token) => {
  return await axios.post(
    "/check-token",
    {},
    {
      headers: {
        Authorization: token,
      },
    }
  );
};




// export const fetchTransactions = async () => {
//   try {
//     const response = await axios.get('/transactions/user/:userId');
//     console.log('API Response:', response.data);
//     return response.data; // Adjust based on your actual API response
//   } catch (error) {
//     throw error.response.data;
//   }
// };

// fetch only user login transactions id by default
export const fetchTransactions = async (userId) => {
  try {
    const response = await axios.get(`/transactions/user/${userId}`);
    console.log('API Response:', response.data);
    return response.data; // Adjust based on your actual API response
  } catch (error) {
    throw error.response.data;
  }
};



export const addTransaction = async (formData, exchangeRate, userId) => {
  try {
    const response = await axios.post("/transactions/exchange", {
      ...formData,
      exchangeRate,
      userId,
    });
    return response.data;
  } catch (error) {
    console.error("Error adding transaction", error.response.data);
    throw error;
  }
};
export const fetchTransactionCount = async () => {
  try {
    const response = await axios.get("/transactions/total");
    const totalCount = response.data.totalTransactions;

    console.log("Total Transaction Count:", totalCount);

    return totalCount;
  } catch (error) {
    console.error("Error fetching total transaction count:", error);
    throw error; // Rethrow the error to be handled by the caller if needed
  }
};

