import { useEffect, useState } from "react";
import "./Data.css";
import axios from "axios";

interface DataItem {
  LOGIN: number;
  TICKET: number;
  OPEN_TIME: string;
  TYPE: string;
  VOLUME: number;
  SYMBOL: string;
  OPEN_PRICE: number;
  SL: number;
  TP: number;
  CLOSE_TIME: string;
  CLOSE_PRICE: number;
  SWAPS: number;
  PROFIT: number;
}

function Data() {
  const [data, setData] = useState<DataItem[]>([]);
  useEffect(() => {
    axios
      .get("http://localhost:3001/api/data") // replace with your server's API endpoint
      .then((response) => {
        console.log(response.data); // log the data
        setData(response.data);
      })
      .catch((error) => console.error(`Error: ${error}`));
  }, []);

  return (
    <table className="data-table">
      <thead>
        <tr>
          <th>#</th>
          <th>LOGIN</th>
          <th>TICKET</th>
          <th>OPEN_TIME</th>
          <th>TYPE</th>
          <th>VOLUME</th>
          <th>SYMBOL</th>
          <th>OPEN_PRICE</th>
          <th>SL</th>
          <th>TP</th>
          <th>CLOSE_TIME</th>
          <th>CLOSE_PRICE</th>
          <th>SWAPS</th>
          <th>PROFIT</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{item.LOGIN}</td>
            <td>{item.TICKET}</td>
            <td>{item.OPEN_TIME}</td>
            <td>{item.TYPE}</td>
            <td>{item.VOLUME}</td>
            <td>{item.SYMBOL}</td>
            <td>{item.OPEN_PRICE}</td>
            <td>{item.SL}</td>
            <td>{item.TP}</td>
            <td>{item.CLOSE_TIME}</td>
            <td>{item.CLOSE_PRICE}</td>
            <td>{item.SWAPS}</td>
            <td>{item.PROFIT}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Data;
