import React, {useState} from "react";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
// import axios from "axios";

  function Login() {
  const [user, setUser] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();
    setUser(true);

    console.log(user);
  }

  const userId = "ffad8bfc00374ad9";

  // render() {
    return (
      // <Container fluid>
      <div className="auth-wrapper">
        <div className="auth-inner">
          <form onSubmit={handleSubmit}>
            <h3>Login</h3>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Id"
                 value={userId}
                // onChange={this.handleChange}
                // required
              />
            </div>

            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Name"
                // value={this.state.name}
                // onChange={this.handleChange}
                required
              />
            </div>

            <Link to="/dashboard">
              <button type="submit" className="btn btn-primary btn-block">
              Login
              </button>
            </Link>
          </form>
        </div>
      </div>
      // </Container>
    );
  }
// }

export default Login;
