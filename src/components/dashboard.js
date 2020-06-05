import React, { useState } from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTrash, faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Pie } from "react-chartjs-2";
import Card from "react-bootstrap/Card";
import CardDeck from "react-bootstrap/CardDeck";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import { MDBAnimation } from "mdbreact";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";

library.add(faTrash, faCheck);

function Todo({ todo, index, completeTodo, removeTodo, updateTodoAtIndex }) {
  return (

    <div
      className="todo"
      style={{ textDecoration: todo.isCompleted ? "line-through" : "" }}
    >
      <input
        type="text"
        id={index}
        value={todo.text}
        onChange={(e) => updateTodoAtIndex(e, index)}
      />

      <div>
        <button onClick={() => completeTodo(index)}>
          <span>
            <FontAwesomeIcon className="faicons" icon="check" />
          </span>
        </button>
        <button onClick={() => removeTodo(index)}>
          <span>
            <FontAwesomeIcon className="faicons" icon="trash" />
          </span>
        </button>
      </div>
    </div>
  );
}

function TodoForm({ addTodo }) {
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value) return;
    addTodo(value);
    setValue("");
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* <div> */}
      <input
        type="text"
        className="input"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <span>
        <MDBAnimation type="pulse" infinite>
          <Button variant="primary" type="submit">
            Add New Task
          </Button>
        </MDBAnimation>
      </span>
      {/* </div> */}
    </form>
  );
}

function Dashboard() {
  const [todos, setTodos] = useState([
    {
      text: "Learn about React",
      isCompleted: false,
    },
    {
      text: "Meet friend for lunch",
      isCompleted: false,
    },
    {
      text: "Build really cool todo app",
      isCompleted: false,
    },
  ]);

  const addTodo = (text) => {
    const newTodos = [...todos, { text }];
    setTodos(newTodos);
  };

  const completeTodo = (index) => {
    const newTodos = [...todos];
    newTodos[index].isCompleted = true;
    setTodos(newTodos);
  };

  const removeTodo = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  function updateTodoAtIndex(e, index) {
    const newTodos = [...todos];
    newTodos[index].text = e.target.value;
    setTodos(newTodos);
  }

  function getCompletedLength() {
    return todos.filter((todo) => todo.isCompleted).length;
  }

  function getUnCompletedLength() {
    return todos.filter((todo) => !todo.isCompleted).length;
  }

  function getLength() {
    return todos.length;
  }

  //helper function
  function checkTodoArray(){
    if (todos.length > 0){
      return getLastThreeItems();
    }
    return <p>Null</p>
  }

  function getLastThreeItems() {
    let a = [];
    let y = [];
    for (var i = 0; i < todos.length; i += 3) {
      let x = todos.slice(i, i + 3);
      y.push(x);
    }
    let z = y[y.length - 1];

    if (z[2] !== undefined) {
      a.push(z[2].text);
      a.push(z[1].text);
      a.push(z[0].text);
    } else if (z[1] !== undefined) {
      a.push(z[1].text);
      a.push(z[0].text);
    } else a.push(z[0].text);

    return a.join("<br>");
  }

  const state = {
    labels: ["Completed", "Uncompleted"],
    datasets: [
      {
        label: "Task",
        backgroundColor: ["#3fe330", "#d6ee16"],
        hoverBackgroundColor: ["#107c06", "#626d05"],
        data: [getCompletedLength(), getUnCompletedLength()],
      },
    ],
  };

  const [showWarn, setShowWarn] = useState(true);
  const [showInfo, setShowInfo] = useState(true);

  return (
    <div>
      <div>
        <nav className="navbar navbar-expand-lg navbar-light">
          <div className="container">
            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                {/* <Link className="nav-link" to="/sign-in"> */}
                    <a href="/sign-in"><h1>Logout</h1></a>
                  {/* </Link> */}
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
      <div className="app">
        {/* <Navbar>
          <Navbar.Brand href="#home">Navbar with text</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              Signed in as: <a href="#login">Mark Otto</a>
            </Navbar.Text>
          </Navbar.Collapse>
        </Navbar> */}
        <CardDeck>
          <Card>
            <Card.Body>
              <Card.Text>
                <MDBAnimation type="bounce">
                  <h1>
                    {getCompletedLength()}/{getLength()}
                  </h1>
                  <h3>completed</h3>
                </MDBAnimation>
              </Card.Text>
            </Card.Body>
          </Card>
          <Card>
            <Card.Body>
              <Card.Text>
                <MDBAnimation type="swing">
                  <h5>Newly added:</h5>
                  <h3>{checkTodoArray()}</h3>
                </MDBAnimation>
              </Card.Text>
            </Card.Body>
          </Card>
          <Card>
            <Card.Body>
              <Card.Text>
                <MDBAnimation type="pulse">
                  <Pie
                    className="chart-wrapper"
                    data={state}
                    height={200}
                    width={400}
                    options={{
                      maintainAspectRatio: false,
                      legend: {
                        display: true,
                        position: "top",
                      },
                    }}
                  />
                </MDBAnimation>
              </Card.Text>
            </Card.Body>
          </Card>
        </CardDeck>
        <br />

        <Card>
          {todos.map((todo, index) => (
            <Card.Header>
              <Todo
                key={index}
                index={index}
                todo={todo}
                completeTodo={completeTodo}
                removeTodo={removeTodo}
                updateTodoAtIndex={updateTodoAtIndex}
              />
            </Card.Header>
          ))}
          <Card.Body>
            <Card.Title></Card.Title>
            <Card.Text>
              <TodoForm addTodo={addTodo} />
            </Card.Text>
          </Card.Body>
        </Card>

        <br />
        {showWarn ? (
          <Alert
            variant="warning"
            onClose={() => setShowWarn(false)}
            dismissible
          >
            Try edit the todolist directly.
          </Alert>
        ) : (
          ""
        )}
        {showInfo ? (
          
          <Alert variant="info" onClose={() => setShowInfo(false)} dismissible>
            More features coming soon, eg. search, modal overlay pop-up & more.
          </Alert>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default Dashboard;
