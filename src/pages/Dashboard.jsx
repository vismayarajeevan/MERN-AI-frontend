
import React, { useEffect, useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from 'recharts';
import { io } from 'socket.io-client';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const socket = io('http://localhost:3000', {
  auth: {
    token: sessionStorage.getItem('token')
  }
});

const Dashboard = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const getAuthHeaders = () => {
    const token = sessionStorage.getItem('token');
    if (!token) {
      navigate('/');
      return {};
    }
    return {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
  };

  const fetchHistory = async () => {
    try {
      const res = await axios.get(
        'http://localhost:3000/api/data/history',
        getAuthHeaders()
      );
      setData(res.data);
    } catch (error) {
      if (error.response?.status === 401) {
        sessionStorage.removeItem('token');
        navigate('/');
      }
      console.error('Error fetching history:', error);
    }
  };

  const handleStart = async () => {
    try {
      await axios.post(
        'http://localhost:3000/api/data/start',
        {},
        getAuthHeaders()
      );
    } catch (error) {
      if (error.response?.status === 401) {
        sessionStorage.removeItem('token');
        navigate('/');
      }
      console.error('Error starting simulation:', error);
    }
  };

  const handleStop = async () => {
    try {
      await axios.post(
        'http://localhost:3000/api/data/stop',
        {},
        getAuthHeaders()
      );
    } catch (error) {
      if (error.response?.status === 401) {
        sessionStorage.removeItem('token');
        navigate('/');
      }
      console.error('Error stopping simulation:', error);
    }
  };

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (!token) {
      navigate('/');
      return;
    }

    fetchHistory();

    socket.auth = { token };
    socket.connect();

    socket.on('new-data', (newData) => {
      setData((prev) => [...prev.slice(-19), newData]);
    });

    socket.on('connect_error', (err) => {
      if (err.message === 'Authentication error') {
        sessionStorage.removeItem('token');
        navigate('/');
      }
    });

    return () => {
      socket.off('new-data');
      socket.off('connect_error');
      socket.disconnect();
    };
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4 text-center">Real-Time Sensor Chart</h2>
        <div className="flex justify-center gap-4 mb-6">
          <button
            onClick={handleStart}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Start
          </button>
          <button
            onClick={handleStop}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Stop
          </button>
        </div>
        <div className="w-full h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <XAxis
                dataKey="timestamp"
                tickFormatter={(ts) => new Date(ts).toLocaleTimeString()}
              />
              <YAxis />
              <Tooltip
                labelFormatter={(ts) => new Date(ts).toLocaleTimeString()}
              />
              <CartesianGrid stroke="#ccc" />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#8884d8"
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
