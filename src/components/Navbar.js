import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logOut } from "../actions/auth";
import { searchResults } from "../actions/search";

class Navbar extends React.Component {
  logOut = () => {
    localStorage.removeItem("token");
    this.props.dispatch(logOut());
  };
  handleSearch = (event) => {
    const searchText = event.target.value;
    this.props.dispatch(searchResults(searchText));
  };
  render() {
    const { auth, results } = this.props;
    return (
      <nav className="nav">
        <div className="left-div">
		<Link to="/">
            <img
              src="https://ninjasfiles.s3.amazonaws.com/0000000000003454.png"
              alt="logo"
            />
          </Link>
        </div>
        <div className="search-container">
          <img
            className="search-icon"
            src="https://cdn-icons-png.flaticon.com/512/149/149852.png"
            alt="search-icon"
          />
          <input placeholder="search" onChange={this.handleSearch} />
          {results.length > 0 && (
            <div className="search-results">
              <ul>
                {" "}
                {results.map((user, index) => (
                  <Link to={`/user/${user._id}`} key={index}>
                    <li className="search-results-row" key={index}>
                      <img
                        src="https://cdn-icons-png.flaticon.com/512/1077/1077063.png"
                        alt="user-dp"
                      />
                      <span> {user.name} </span>{" "}
                    </li>{" "}
                  </Link>
                ))}{" "}
              </ul>{" "}
            </div>
          )}{" "}
        </div>{" "}
        <div className="right-nav">
          {" "}
          {auth.isLoggedIn && (
            <div className="user">
              <Link to="/settings">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/1077/1077063.png"
                  alt="user-dp"
                  id="user-dp"
                />
              </Link>{" "}
              <span> {auth.user.name} </span>{" "}
            </div>
          )}
          <div className="nav-links">
            <ul>
              {" "}
              {!auth.isLoggedIn && (
                <li>
                  <Link
                    type="button"
                    className="btn btn-primary"
                    style={{ textDecoration: "none" }}
                    to="/login"
                  >
                    Log In{" "}
                  </Link>{" "}
                </li>
              )}
              {auth.isLoggedIn && (
                <li
                  onClick={this.logOut}
                  type="button"
                  className="btn btn-dark"
                  style={{
                    textDecoration: "none",
                    padding: "5px 10px",
                  }}
                >
                  Log Out{" "}
                </li>
              )}
              {!auth.isLoggedIn && (
                <li>
                  <Link
                    to="/signup"
                    type="button"
                    className="btn btn-success"
                    style={{ textDecoration: "none" }}
                  >
                    SignUp{" "}
                  </Link>{" "}
                </li>
              )}{" "}
            </ul>{" "}
          </div>{" "}
        </div>{" "}
      </nav>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
    results: state.search.users,
  };
}

export default connect(mapStateToProps)(Navbar);
