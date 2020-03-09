import React, { useEffect, useState, useContext } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import "./index.scss";
import Header from "./components/Header";
import Home from "./components/Home";
import Login from "./components/Login";

import { Authenticator, AmplifyTheme } from "aws-amplify-react";
import Amplify from "@aws-amplify/core";
import { Auth, Hub } from "aws-amplify";
// This was added by amplify when we initialized it and added auth.
import aws_exports from "./aws-exports";
// We use the generated file to config Amplify with our desired settings
Amplify.configure(aws_exports);

export const UserContext = React.createContext();

function LoginApp() {
  return <Authenticator theme={theme} />;
}

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    getUserData();
    console.dir(AmplifyTheme);
    Hub.listen("auth", data => {
      const { payload } = data;
      listener(payload);
      console.log(data.payload.data.username + " has " + data.payload.event);
    });
  }, []);

  const getUserData = async () => {
    const user = await Auth.currentAuthenticatedUser();
    user ? setUser(user) : setUser(null);
  };

  const listener = payload => {
    switch (payload.event) {
      case "signIn":
        getUserData();
        break;
      case "signUp":
        console.log("sign up");
        break;
      case "signOut":
        setUser(null);
        break;
      default:
        return;
    }
  };

  const handleSignOut = async () => {
    try {
      await Auth.signOut();
    } catch (err) {
      console.log("Error signing out user", err);
    }
  };

  return (
    <UserContext.Provider value={{ user }}>
      <Router>
        <Header handleSignOut={handleSignOut} />
        {/* <p onClick={() => handleSignOut()}>sign out</p> */}

        <Switch>
          <Route exact path="/" component={Home} />
          {user ? (
            <Route path="/login" render={() => <Redirect to="/" />} />
          ) : (
            <Route path="/login" component={LoginApp} />
          )}
          <Route path="/login" component={LoginApp} />
          <Route path="/:id" component={Home} />
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

const theme = {
  ...AmplifyTheme,
  navBar: {
    ...AmplifyTheme.navBar,
    backgroundColor: "#ffffff"
  },
  button: {
    ...AmplifyTheme.button,
    backgroundColor: "#ffffff"
  },
  sectionFooter: {
    ...AmplifyTheme.sectionFooter,
    backgroundColor: "#ffffff"
  },
  sectionHeader: {
    ...AmplifyTheme.sectionHeader,
    backgroundColor: "#ffffff",
    color: "#000000"
  },
  formSection: {
    ...AmplifyTheme.formSection,
    backgroundColor: "#fff",
    border: "none"
  }
};

// export default withAuthenticator(App, { includeGreetings: true });

export default App;
