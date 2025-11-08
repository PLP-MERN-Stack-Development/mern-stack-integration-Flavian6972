import { useState, useEffect } from "react";
import axios from "axios";

const useApi = (url, method = "GET", body = null, deps = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios({ url, method, data: body });
        setData(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, deps); // refetch when dependencies change

  return { data, loading, error };
};

export default useApi;
