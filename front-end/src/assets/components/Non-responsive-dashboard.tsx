//import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Card from "react-bootstrap/Card";
import "bootstrap-icons/font/bootstrap-icons.css";

function Dashboard() {
  return (
    <>
      <div>
        <div>
          <Card
            bg="dark"
            text="white"
            style={{
              width: "45%",
              position: "absolute",
              top: "25px",
              left: "10px",
            }}
          >
            <Card.Body>
              <div className="m-2">
                <i className="bi bi-bootstrap-fill fs-3"></i>
                <br />
                Navigation
              </div>
            </Card.Body>
          </Card>
        </div>
        <div className="mb-3">
          <Card
            bg="dark"
            text="white"
            style={{
              width: "45%",
              height: "39%",
              position: "absolute",
              top: "120px",
              left: "10px",
            }}
          >
            <Card.Body>
              <Card.Text>
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
        <div className="mb-3">
          <Card
            bg="dark"
            text="white"
            style={{
              width: "45%",
              height: "39%",
              position: "absolute",
              bottom: "10px",
              left: "10px",
            }}
          >
            <Card.Body>
              <Card.Text>
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "row-reverse",
          height: "100vh",
          width: "100%",
        }}
      >
        <div style={{ width: "25%", height: "100%" }}>
          <div className="row g-3 my-2 d-flex">
            <Card
              bg="dark"
              text="white"
              style={{
                flex: 1,
                height: "33%",
                width: "17%",
                position: "absolute",
                top: "10px",
                right: "460px",
              }}
            >
              <Card.Body>
                <Card.Text>
                  <h3>vert 1</h3>
                </Card.Text>
              </Card.Body>
            </Card>
            <Card
              bg="dark"
              text="white"
              style={{
                flex: 1,
                height: "33%",
                width: "17%",
                position: "absolute",
                top: "230px",
                right: "460px",
              }}
            >
              <Card.Body>
                <Card.Text>
                  <h3>vert 1</h3>
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
          <div className="row g-3 my-2">
            <Card
              bg="dark"
              text="white"
              style={{
                flex: 1,
                height: "68%",
                width: "17%",
                position: "absolute",
                top: "10px",
                right: "235px",
              }}
            >
              <Card.Body>
                <Card.Text>
                  <h3>vert 2</h3>
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
          <div className="row g-3 my-2">
            <Card
              bg="dark"
              text="white"
              style={{
                flex: 1,
                height: "68%",
                width: "17%",
                position: "absolute",
                top: "10px",
                right: "10px",
              }}
            >
              <Card.Body>
                <Card.Text>
                  <h3>vert 3</h3>
                </Card.Text>
              </Card.Body>
            </Card>
          </div>

          <div style={{ width: "100%", height: "75%" }}>
            <Card
              bg="dark"
              text="white"
              style={{
                flex: 1,
                height: "25%",
                width: "52.7%",
                position: "absolute",
                bottom: "10px",
                right: "10px",
              }}
            >
              <Card.Body>
                <Card.Text>
                  <h3>Horozontal</h3>
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
