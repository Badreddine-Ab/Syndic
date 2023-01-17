import { useState, useEffect } from "react";
import { isAuthenticated } from "../../helper";
import { Navigate } from "react-router-dom";
import axios from "axios";

const Payment = () => {
  const [payments, setPayments] = useState([]);
  const [apartments, setApartments] = useState([]);
  const [showAddPaymentModal, setShowAddPaymentModal] = useState(false);
  const [selectedApartment, setSelectedApartment] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [amount, setAmount] = useState("");


  const fetchApartments = async () => {
    try {
      const jwt = isAuthenticated();
      if (!jwt) {
        return <Navigate to="/login" />;
      }
      const res = await axios.get("http://localhost:8080/api/apartment/", {
        withCredentials: true,
      });
      setApartments(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  
  useEffect(() => {
    fetchPayments();
    fetchApartments();
  }, []);

  const fetchPayments = async () => {
    try {
      const jwt = isAuthenticated();
      if (!jwt) {
        return <Navigate to="/login" />;
      }
      const res = await axios.get(`http://localhost:8080/api/payment/`, {
        withCredentials: true,
      });
      console.log(res);
      setPayments(res.data.payments);
    } catch (error) {
      console.log(error);
    }
  };

  const [addPayment, setAddPayment] = useState(false);
  const [newPayment, setNewPayment] = useState({
    apartment: "",
    month: "",
    amount: "",
    year: "",
  });

  const handleAddPayment = () => {
    setAddPayment(!addPayment);
    setNewPayment({
      apartment: "",
      month: "",
      amount: "",
      year: "",
    });
  };

  const handleChange = (e) => {
    setNewPayment({
      ...newPayment,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const jwt = isAuthenticated();
      if (!jwt) {
        return <Navigate to="/login" />;
      }
      const res = await axios.post(
        `http://localhost:8080/api/payment/`,
        newPayment,
        {
          withCredentials: true,
        }
      );
      setPayments([...payments, res.data]);
      setAddPayment(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="w-full h-screen bg-gray-900">
        <div className="relative overflow-x-auto p-5">
          <button
            onClick={handleAddPayment}
            className="bg-gray-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mb-3"
          >
            Add Payment
          </button>
          {addPayment && (
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Apartment"
                name="apartment"
                value={newPayment.apartment}
                onChange={handleChange}
              />
              <input
                type="text"
                placeholder="Month"
                name="month"
                value={newPayment.month}
                onChange={handleChange}
              />
              <input
                type="text"
                placeholder="Amount"
                name="amount"
                value={newPayment.amount}
                onChange={handleChange}
              />
              <input
                type="text"
                placeholder="Year"
                name="year"
                value={newPayment.year}
                onChange={handleChange}
              />
              <button
                type="submit"
                className="bg-gray-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mb-3"
              >
                Submit
              </button>
            </form>
          )}
          {payments.length > 0 && (
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Payment ID
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Amount
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Month
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Year
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Owner
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment) => (
                  <tr key={payment._id} className="bg-white border-b">
                    <td className="px-6 py-4">{payment.apartment.name}</td>
                    <td className="px-6 py-4">{payment.amount}</td>
                    <td className="px-6 py-4">{payment.month}</td>
                    <td className="px-6 py-4">{payment.year}</td>
                    <td className="px-6 py-4">{payment.apartment.owner}</td>
                    <td className="px-6 py-4">
                      <button className="bg-gray-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                        Edit
                      </button>
                      <button className="bg-gray-900 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};
export default Payment;
