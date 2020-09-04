  
import React from "react";
import Axios from "axios";
import "./index.css";

class App extends React.Component {
  state = {
    users: [],
    followers: [],
  };

  componentDidMount() {
    Axios.get("https://api.github.com/users/mmitch2958")
      .then(userResponse => {
        console.log(userResponse);
        Axios.get("https://api.github.com/users/mmitch2958/followers")
          .then(followerResponse => {
            console.log(followerResponse);
            this.setState({
              users: [...this.state.users, userResponse.data],
              followers: [...this.state.followers, followerResponse.data],
            });
            console.log(this.state);
          })
          .catch(error => { });
      })
      .catch(error => { });
  }

  render() {
    return (
      <div className="App">
        <div className="container">
          <div className="header">
            <p>React</p> <p>GitHub</p> <p>Cards</p>
          </div>
          <div className="cards">
            {this.state.users.map((element) => (
              <div className="card">
                <img src={element.avatar_url} />
                <div className="card-info">
                  <h3 className="name">{element.name}</h3>
                  <p className="username">{element.login}</p>
                  <p>Location: {element.location}</p>
                  <p>Followers ({element.following}): {this.state.followers[0].map((follower) => (<>{follower.login}, </>))} </p>
                  <p>Following: {element.following}</p>
                  <p>
                    Profile:
                    <a href={element.url}> {element.url}</a>
                  </p>
                  <p>Bio: {element.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div >
    );
  }
}

export default App;