import "bootstrap/dist/css/bootstrap.min.css";
import Card from "react-bootstrap/Card";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Button } from "react-bootstrap";
import {
  VictoryBar,
  VictoryChart,
  VictoryAxis,
  VictoryTheme,
  VictoryLine,
} from "victory";
import { Bar } from "react-chartjs-2";
import HorizontalBarChart from "./HorizontalBarChart";
import DailyPL from "./HorizontalBarChart";
import NumberOfTrdaes from "./NumberOfTrades";
import TopTrades from "./TopTrades";
import BottomTrades from "./BottomTrades";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";
import axios from "axios";

interface Items {
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

type DataItem = {
  sequence: number;
  profit: number;
};

type ProfitItem = {
  symbol: string;
  profit: number;
};

type GraphDataItem = {
  sequence: number;
  profit: number;
};

// This will create an array of 50 objects, each with a sequence from 1 to 50 and a random profit between 100 and 600.
const data: DataItem[] = [];
for (let i = 1; i <= 10; i++) {
  data.push({ sequence: i, profit: Math.floor(Math.random() * 400) + 50 });
}

// Assuming maxSequence is the maximum value for 'sequence' in your data
const maxSequence = Math.max(...data.map((item) => item.sequence));

// Generate an array of numbers from 0 to maxSequence in steps of 2
const tickValues = Array.from(
  { length: Math.floor(maxSequence / 2) + 1 },
  (_, i) => i * 2
);

// ...

// ...

// ...

// ...

function Dashboard() {
  const [data, setData] = useState<Items[]>([]);
  const [graphData, setGraphData] = useState<GraphDataItem[]>([]);
  const [totalProfit, setTotalProfit] = useState(0);
  const [totalLosses, setTotalLosses] = useState(0);
  const [totalWins, setTotalWins] = useState(0);
  const [totalLossesCount, setTotalLossesCount] = useState(0);
  const [bigWin, setBigWin] = useState(0);
  const [bigLoss, setBigLoss] = useState(0);
  const [maxConsecutiveWins, setMaxConsecutiveWins] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/data") // replace with your server's API endpoint
      .then((response) => {
        console.log(response.data); // log the data
        setData(response.data);

        // calculate total profit, total losses, total wins, total losses count, big win, big loss, and max consecutive wins
        let profit = 0;
        let losses = 0;
        let wins = 0;
        let lossesCount = 0;
        let maxProfit = 0;
        let minProfit = 0;
        let currentStreak = 0;
        let maxStreak = 0;
        response.data.forEach((item: Items, index: number) => {
          if (item.PROFIT > 0) {
            profit += item.PROFIT;
            wins++;
            currentStreak++;
            if (item.PROFIT > maxProfit) {
              maxProfit = item.PROFIT;
            }
          } else {
            losses += item.PROFIT;
            lossesCount++;
            if (item.PROFIT < minProfit) {
              minProfit = item.PROFIT;
            }
            if (currentStreak > maxStreak) {
              maxStreak = currentStreak;
            }
            currentStreak = 0;
          }

          // add the first 10 PROFIT values to the graph data
          if (index < 10) {
            setGraphData((prevGraphData) => [
              ...prevGraphData,
              { sequence: index + 1, profit: item.PROFIT },
            ]);
          }
        });
        setTotalProfit(profit);
        setTotalLosses(losses);
        setTotalWins(wins);
        setTotalLossesCount(lossesCount);
        setBigWin(maxProfit);
        setBigLoss(minProfit);
        setMaxConsecutiveWins(maxStreak);
      })
      .catch((error) => console.error(`Error: ${error}`));
  }, []);

  return (
    <div
      className="container-fluid"
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "#141414",
        padding: "10px",
      }}
    >
      <div
        className="row"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: "100%",
          height: "100%",

          padding: "5px",
        }}
      >
        <div
          className="col-lg-6"
          style={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
          }}
        >
          <Card bg="black" text="white" className="mb-2 " style={{ flex: 0.5 }}>
            <Card.Body>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div className="m-1">
                  <i className="bi bi-coin fs-1 " style={{ color: "#39FF14" }}>
                    <em>Logo</em>
                  </i>
                </div>

                <div
                  className="m-1"
                  onClick={() => navigate("/login")}
                  style={{ color: "#39FF14" }}
                >
                  <i className="bi bi-database fs-2 "></i>
                  <br />
                  <h6>Data</h6>
                </div>
                <div className="m-1">
                  <Link to="/login" style={{ color: "#39FF14" }}>
                    <i className="bi bi-person-fill-gear fs-2 "></i>
                    <br />
                    <h6>Admin</h6>
                  </Link>
                </div>
                <div className="m-1" style={{ color: "#FF5733" }}>
                  <i className="bi bi-power fs-2 "></i>
                  <br />
                  <h6>Logout</h6>
                </div>
              </div>
            </Card.Body>
          </Card>
          <Card bg="black" text="white" className="mb-2 " style={{ flex: 1 }}>
            <Card.Body>
              <Button
                variant="primary"
                style={{
                  backgroundColor: "#333333",
                  border: "none",
                  borderTopLeftRadius: "20px",
                  borderTopRightRadius: "20px",
                  borderBottomRightRadius: "20px",
                  borderBottomLeftRadius: "20px",
                  position: "absolute",
                  top: 5,
                  left: 5,
                }}
              >
                Wins and Losses
              </Button>
              <br />
              <Card.Text>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(4, 1fr)",
                    gridGap: "10px",
                    paddingTop: 10,
                  }}
                >
                  <Card //small card with number of wins
                    style={{
                      width: "130px",
                      height: "65px",
                      backgroundColor: "#222222",
                      color: "white",
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                      padding: 13,
                      paddingRight: 1,
                      paddingLeft: 5,
                    }}
                  >
                    <div
                      style={{
                        flex: 0.7,
                        textAlign: "center",
                        backgroundColor: "#444444",
                        borderTopLeftRadius: "10px",
                        borderTopRightRadius: "10px",
                        borderBottomRightRadius: "10px",
                        borderBottomLeftRadius: "10px",
                      }}
                    >
                      <i className="bi bi-hash fs-2 "></i>
                    </div>
                    <div style={{ flex: 1, textAlign: "center" }}>
                      <div>
                        <h6>Wins</h6>
                      </div>
                      <div>
                        <h6 style={{ color: "#39FF14" }}>{totalWins}</h6>
                      </div>
                    </div>
                  </Card>

                  <Card //small card with average win
                    style={{
                      width: "130px",
                      height: "65px",
                      backgroundColor: "#222222",
                      color: "white",
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                      padding: 13,
                      paddingRight: 1,
                      paddingLeft: 5,
                    }}
                  >
                    <div
                      style={{
                        flex: 0.7,
                        textAlign: "center",
                        backgroundColor: "#444444",
                        borderTopLeftRadius: "10px",
                        borderTopRightRadius: "10px",
                        borderBottomRightRadius: "10px",
                        borderBottomLeftRadius: "10px",
                      }}
                    >
                      <i className="bi bi-currency-dollar fs-2 "></i>
                    </div>
                    <div style={{ flex: 1, textAlign: "center" }}>
                      <div>
                        <h6>Avg Win</h6>
                      </div>
                      <div>
                        <h6 style={{ color: "#39FF14" }}>
                          {totalWins ? (totalProfit / totalWins).toFixed(2) : 0}
                        </h6>
                      </div>
                    </div>
                  </Card>
                  <Card //small card with largest win
                    style={{
                      width: "130px",
                      height: "65px",
                      backgroundColor: "#222222",
                      color: "white",
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                      padding: 13,
                      paddingRight: 1,
                      paddingLeft: 5,
                    }}
                  >
                    <div
                      style={{
                        flex: 0.7,
                        textAlign: "center",
                        backgroundColor: "#444444",
                        borderTopLeftRadius: "10px",
                        borderTopRightRadius: "10px",
                        borderBottomRightRadius: "10px",
                        borderBottomLeftRadius: "10px",
                      }}
                    >
                      <i className="bi bi-graph-up-arrow fs-2 "></i>
                    </div>
                    <div style={{ flex: 1, textAlign: "center" }}>
                      <div>
                        <h6>Big Win</h6>
                      </div>
                      <div>
                        <h6 style={{ color: "#39FF14" }}>{bigWin}</h6>
                      </div>
                    </div>
                  </Card>
                  <Card //small card with winning holding time
                    style={{
                      width: "130px",
                      height: "65px",
                      backgroundColor: "#222222",
                      color: "white",
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                      padding: 13,
                      paddingRight: 1,
                      paddingLeft: 5,
                    }}
                  >
                    <div
                      style={{
                        flex: 0.7,
                        textAlign: "center",
                        backgroundColor: "#444444",
                        borderTopLeftRadius: "10px",
                        borderTopRightRadius: "10px",
                        borderBottomRightRadius: "10px",
                        borderBottomLeftRadius: "10px",
                      }}
                    >
                      <i className="bi bi-hourglass-split fs-2 "></i>
                    </div>
                    <div style={{ flex: 1, textAlign: "center" }}>
                      <div>
                        <h6>Time</h6>
                      </div>
                      <div>
                        <h6 style={{ display: "inline" }}>3 </h6>
                        <h6 style={{ display: "inline" }}>Days</h6>
                      </div>
                    </div>
                  </Card>
                  <Card //small card with number of losses
                    style={{
                      width: "130px",
                      height: "65px",
                      backgroundColor: "#222222",
                      color: "white",
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                      padding: 13,
                      paddingRight: 1,
                      paddingLeft: 5,
                    }}
                  >
                    <div
                      style={{
                        flex: 0.7,
                        textAlign: "center",
                        backgroundColor: "#999999",
                        borderTopLeftRadius: "10px",
                        borderTopRightRadius: "10px",
                        borderBottomRightRadius: "10px",
                        borderBottomLeftRadius: "10px",
                      }}
                    >
                      <i className="bi bi-hash fs-2 "></i>
                    </div>
                    <div style={{ flex: 1, textAlign: "center" }}>
                      <div>
                        <h6>Loss</h6>
                      </div>
                      <div>
                        <h6 style={{ color: "#FF5733" }}>{totalLossesCount}</h6>
                      </div>
                    </div>
                  </Card>
                  <Card //small card with average loss
                    style={{
                      width: "130px",
                      height: "65px",
                      backgroundColor: "#222222",
                      color: "white",
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                      padding: 13,
                      paddingRight: 1,
                      paddingLeft: 5,
                    }}
                  >
                    <div
                      style={{
                        flex: 0.7,
                        textAlign: "center",
                        backgroundColor: "#999999",
                        borderTopLeftRadius: "10px",
                        borderTopRightRadius: "10px",
                        borderBottomRightRadius: "10px",
                        borderBottomLeftRadius: "10px",
                      }}
                    >
                      <i className="bi bi-currency-dollar fs-2 "></i>
                    </div>
                    <div style={{ flex: 1, textAlign: "center" }}>
                      <div>
                        <h6>Avg Loss</h6>
                      </div>
                      <div>
                        <h6 style={{ color: "#FF5733" }}>
                          {totalLossesCount
                            ? (totalLosses / totalLossesCount).toFixed(2)
                            : 0}
                        </h6>
                      </div>
                    </div>
                  </Card>
                  <Card //small card with largest loss
                    style={{
                      width: "130px",
                      height: "65px",
                      backgroundColor: "#222222",
                      color: "white",
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                      padding: 13,
                      paddingRight: 1,
                      paddingLeft: 5,
                    }}
                  >
                    <div
                      style={{
                        flex: 0.7,
                        textAlign: "center",
                        backgroundColor: "#999999",
                        borderTopLeftRadius: "10px",
                        borderTopRightRadius: "10px",
                        borderBottomRightRadius: "10px",
                        borderBottomLeftRadius: "10px",
                      }}
                    >
                      <i className="bi bi-graph-down-arrow fs-2 "></i>
                    </div>
                    <div style={{ flex: 1, textAlign: "center" }}>
                      <div>
                        <h6>Big Loss</h6>
                      </div>
                      <div>
                        <h6 style={{ color: "#FF5733" }}>{bigLoss}</h6>
                      </div>
                    </div>
                  </Card>
                  <Card //small card with losing holding time
                    style={{
                      width: "130px",
                      height: "65px",
                      backgroundColor: "#222222",
                      color: "white",
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                      padding: 13,
                      paddingRight: 1,
                      paddingLeft: 5,
                    }}
                  >
                    <div
                      style={{
                        flex: 0.7,
                        textAlign: "center",
                        backgroundColor: "#999999",
                        borderTopLeftRadius: "10px",
                        borderTopRightRadius: "10px",
                        borderBottomRightRadius: "10px",
                        borderBottomLeftRadius: "10px",
                      }}
                    >
                      <i className="bi bi-hourglass-split fs-2 "></i>
                    </div>
                    <div style={{ flex: 1, textAlign: "center" }}>
                      <div>
                        <h6>Time</h6>
                      </div>
                      <div>
                        <h6 style={{ display: "inline" }}>3 </h6>
                        <h6 style={{ display: "inline" }}>Hours</h6>
                      </div>
                    </div>
                  </Card>
                </div>
              </Card.Text>
            </Card.Body>
          </Card>
          <Card bg="black" text="white" className="mb-2 " style={{ flex: 1 }}>
            <Card.Body
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button
                variant="primary"
                style={{
                  backgroundColor: "#333333",
                  border: "none",
                  borderTopLeftRadius: "20px",
                  borderTopRightRadius: "20px",
                  borderBottomRightRadius: "20px",
                  borderBottomLeftRadius: "20px",
                  position: "absolute",
                  top: 5,
                  //center: 5,
                }}
              >
                P&L Last 10 Trades
              </Button>

              <Card.Text style={{ marginTop: "-30px" }}>
                <VictoryChart width={500} height={290}>
                  <VictoryLine
                    data={graphData}
                    x="sequence"
                    y="profit"
                    style={{
                      data: { stroke: "#39FF14" },
                    }}
                  />
                  <VictoryAxis
                    dependentAxis
                    label="Profit"
                    style={{
                      axis: { stroke: "white" },
                      ticks: { stroke: "white" },
                      tickLabels: { fill: "white" },
                      axisLabel: { padding: 38, fill: "white" },
                    }}
                  />
                  <VictoryAxis
                    label="Trades"
                    tickValues={tickValues}
                    style={{
                      axis: { stroke: "white" },
                      ticks: { stroke: "white" },
                      tickLabels: { fill: "white" },
                      axisLabel: { padding: 80, fill: "white" },
                    }}
                  />
                </VictoryChart>
              </Card.Text>
            </Card.Body>
          </Card>
        </div>

        <div
          className="col-lg-6"
          style={{
            display: "flex",
            flexDirection: "column",
            height: "100%",

            paddingBottom: "10px",
          }}
        >
          <div>
            <div
              className="row"
              style={{
                height: "75vh",
                padding: 0,
                margin: 0,
              }}
            >
              <div
                className="col-lg-4"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  padding: 0,
                  margin: 0,

                  width: "30%",
                }}
              >
                <Card
                  bg="black"
                  text="white"
                  className="mb-2 text-center"
                  style={{ flex: 1 }}
                >
                  <Card.Body>
                    <Card.Text>
                      <h5 style={{ color: "#39FF14" }}>Total Profit</h5>
                      <h3 style={{ color: "#39FF14" }}>
                        ${totalProfit.toFixed(2)}
                      </h3>
                      <br />
                      <h5 style={{ color: "#FF5733" }}>Total Losses</h5>
                      <h3 style={{ color: "#FF5733" }}>
                        ${totalLosses.toFixed(2)}
                      </h3>
                    </Card.Text>
                  </Card.Body>
                </Card>
                <Card
                  bg="black"
                  text="white"
                  className="mb-2 "
                  style={{ flex: 1 }}
                >
                  <Card.Body>
                    <Card.Text>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          height: "100%",
                        }}
                      >
                        <Button
                          variant="primary"
                          style={{
                            backgroundColor: "#333333",
                            border: "none",
                            borderTopLeftRadius: "20px",
                            borderTopRightRadius: "20px",
                            borderBottomRightRadius: "20px",
                            borderBottomLeftRadius: "20px",
                          }}
                        >
                          Streak
                        </Button>
                      </div>
                      <br />

                      <div
                        style={{
                          display: "flex",
                          alignItems: "left",
                          marginBottom: "10px",
                          marginTop: "0px",
                          marginLeft: "-10px",
                        }}
                      >
                        <label style={{ paddingTop: "18px" }}>
                          <h6 style={{ color: "grey" }}>Wins</h6>
                        </label>
                        <Card
                          style={{
                            width: "150px",
                            height: "60px",
                            backgroundColor: "#222222",
                            color: "white",
                            marginLeft: "10px",
                            marginBottom: "0px",
                            marginTop: "0px",
                          }}
                        >
                          <div style={{ color: "grey" }}>
                            <p
                              style={{ display: "inline", paddingLeft: "8px" }}
                            >
                              Max:{" "}
                            </p>
                            <p style={{ display: "inline" }}>
                              {maxConsecutiveWins} Trades
                            </p>
                          </div>
                          <div style={{ color: "grey" }}>
                            <p
                              style={{
                                display: "inline",
                                paddingLeft: "8px",
                              }}
                            >
                              Curr:{" "}
                            </p>
                            <p style={{ display: "inline" }}>2 Days</p>
                          </div>
                        </Card>
                      </div>

                      <div
                        style={{
                          display: "flex",
                          alignItems: "left",
                          marginBottom: "10px",
                          marginTop: "0px",
                          marginLeft: "-10px",
                        }}
                      >
                        <label style={{ paddingTop: "18px" }}>
                          <h6>Loss</h6>
                        </label>
                        <Card
                          style={{
                            width: "150px",
                            height: "60px",
                            backgroundColor: "#222222",
                            color: "white",
                            marginLeft: "13px",
                            marginRight: "1px",
                          }}
                        >
                          <div>
                            <p
                              style={{
                                display: "inline",
                                paddingLeft: "8px",
                              }}
                            >
                              Max:{" "}
                            </p>
                            <p style={{ display: "inline" }}>10 Days</p>
                          </div>
                          <div>
                            <p
                              style={{
                                display: "inline",
                                paddingLeft: "8px",
                              }}
                            >
                              Curr:{" "}
                            </p>
                            <p style={{ display: "inline" }}>2 Days</p>
                          </div>
                        </Card>
                      </div>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </div>
              <div
                className="col-lg-4"
                style={{ height: "100%", padding: 0, margin: 3, marginLeft: 5 }}
              >
                <Card
                  bg="black"
                  text="white"
                  className="mb-2 "
                  style={{ height: "98.5%" }}
                >
                  <div>
                    <DailyPL />
                  </div>
                  <br />
                  <div>
                    <NumberOfTrdaes />
                  </div>
                </Card>
              </div>
              <div
                className="col-lg-4"
                style={{ height: "100%", padding: 0, margin: 3 }}
              >
                <Card
                  bg="black"
                  text="white"
                  className="mb-2 "
                  style={{ height: "98.5%" }}
                >
                  <div>
                    <TopTrades />
                  </div>
                  <br />
                  <div>
                    <BottomTrades />
                  </div>
                </Card>
              </div>
            </div>
          </div>
          <div style={{ height: "100%" }}>
            <Card
              bg="black"
              text="white"
              className="mb-3"
              style={{ height: "100%", display: "flex" }}
            >
              <div style={{ width: "100%", height: "50%" }}>
                <Row
                  style={{
                    paddingLeft: "5px",
                    paddingTop: "5px",
                    paddingRight: "5px",
                  }}
                >
                  <Col>
                    <h5>Month</h5>
                  </Col>
                  <Col style={{ textAlign: "right" }}>
                    <i className="bi bi-funnel fs-5 "></i>
                  </Col>
                </Row>
                <Row style={{ paddingLeft: "5px", paddingRight: "15px" }}>
                  <Col
                    style={{
                      textAlign: "center",
                      padding: "0px",
                      marginLeft: "13px",
                    }}
                  >
                    <Card
                      text="white"
                      style={{
                        paddingRight: "2px",
                        marginRight: "5px",
                        backgroundColor: "#999999",
                      }}
                    >
                      January
                    </Card>
                  </Col>
                  <Col
                    style={{
                      textAlign: "center",
                      padding: "0px",
                      margin: "0px",
                    }}
                  >
                    <Card
                      text="white"
                      style={{
                        paddingRight: "2px",
                        marginRight: "5px",
                        backgroundColor: "#999999",
                      }}
                    >
                      February
                    </Card>
                  </Col>
                  <Col
                    style={{
                      textAlign: "center",
                      padding: "0px",
                      margin: "0px",
                    }}
                  >
                    <Card
                      text="white"
                      style={{
                        paddingRight: "2px",
                        marginRight: "5px",
                        backgroundColor: "#999999",
                      }}
                    >
                      March
                    </Card>
                  </Col>
                  <Col
                    style={{
                      textAlign: "center",
                      padding: "0px",
                      margin: "0px",
                    }}
                  >
                    <Card
                      text="white"
                      style={{
                        paddingRight: "2px",
                        marginRight: "5px",
                        backgroundColor: "#999999",
                      }}
                    >
                      April
                    </Card>
                  </Col>
                  <Col
                    style={{
                      textAlign: "center",
                      padding: "0px",
                      margin: "0px",
                    }}
                  >
                    <Card
                      text="white"
                      style={{
                        paddingRight: "2px",
                        marginRight: "5px",
                        backgroundColor: "#999999",
                      }}
                    >
                      May
                    </Card>
                  </Col>
                  <Col
                    style={{
                      textAlign: "center",
                      padding: "0px",
                      margin: "0px",
                    }}
                  >
                    <Card
                      text="white"
                      style={{
                        paddingRight: "2px",
                        marginRight: "5px",
                        backgroundColor: "#999999",
                      }}
                    >
                      June
                    </Card>
                    <br />
                  </Col>
                </Row>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
