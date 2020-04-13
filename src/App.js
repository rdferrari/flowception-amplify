import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import "./index.scss";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Section from "./components/section/Section";
import Subsection from "./components/subsection/Subsection";

import { Authenticator, AmplifyTheme } from "aws-amplify-react";
import Amplify from "@aws-amplify/core";
import Auth from "@aws-amplify/auth";
import { Hub } from "@aws-amplify/core";

import aws_exports from "./aws-exports";

Amplify.configure(aws_exports);

export const UserContext = React.createContext();

function LoginApp() {
  return (
    <div>
      <h1 className="authenticator-title">Sign in</h1>
      <Authenticator theme={theme} />
    </div>
  );
}

function ScrollToTopOnMount() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return null;
}

function App() {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState(null);
  const [group, setGroup] = useState(null);

  useEffect(() => {
    getUserData();
    console.dir(AmplifyTheme);

    Hub.listen("auth", (data) => {
      const { payload } = data;
      listener(payload);

      const groupUsers =
        data.payload.data.signInUserSession.idToken.payload["cognito:groups"];

      if (groupUsers) {
        console.log(groupUsers[0]);
        setGroup(groupUsers[0]);
      }
      const username = data.payload.data.username;
      setUsername(username);
      console.log(username + " has " + data.payload.event);
    });
  }, []);

  const getUserData = async () => {
    const user = await Auth.currentAuthenticatedUser();
    user ? setUser(user) : setUser(null);

    const groupUsers = user.signInUserSession.idToken.payload["cognito:groups"];

    if (groupUsers) {
      console.log(groupUsers[0]);
      setGroup(groupUsers[0]);
    }
  };

  const listener = (payload) => {
    switch (payload.event) {
      case "signIn":
        getUserData();
        break;
      case "signUp":
        console.log("sign up");
        break;
      case "signOut":
        getUserData();
        setUser(null);
        setUsername(null);
        setGroup(null);
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
    <UserContext.Provider value={{ user, username, group }}>
      <Router>
        <ScrollToTopOnMount />
        <Header handleSignOut={handleSignOut} />
        <div className="app-container">
          <Switch>
            <Route exact path="/" component={Section} />
            <Route path="/section/:id" component={Subsection} />

            {user ? (
              <Route path="/login" render={() => <Redirect to="/" />} />
            ) : (
              <Route path="/login" component={LoginApp} />
            )}
            <Route path="/login" component={LoginApp} />
          </Switch>
        </div>
        <Footer />
      </Router>
    </UserContext.Provider>
  );
}

const theme = {
  ...AmplifyTheme,
  container: {
    ...AmplifyTheme.container,
    fontFamily: "Rajdhani-Regular",
    paddingLeft: "1px",
    paddingRight: "1px",
  },
  nav: {
    ...AmplifyTheme.nav,
    margin: "1px",
  },
  navButton: {
    ...AmplifyTheme.navButton,
    display: "inline-block",
  },
  formSection: {
    ...AmplifyTheme.formSection,
    backgroundColor: "#fff",
    border: "none",
    width: "300px",
  },
  sectionHeader: {
    ...AmplifyTheme.sectionHeader,
    backgroundColor: "#ffffff",
    color: "#000000",
    display: "none",
  },
  sectionBody: {
    ...AmplifyTheme.sectionBody,
    padding: "5px",
  },
  sectionFooter: {
    ...AmplifyTheme.sectionFooter,
    backgroundColor: "#ffffff",
    padding: "5px",
    borderTop: "none",
    margin: "10px 0px",
  },

  navBar: {
    ...AmplifyTheme.navBar,
    backgroundColor: "#ffffff",
  },

  input: {
    ...AmplifyTheme.input,
    fontFamily: "Rajdhani-Regular",
    fontSize: "15px",
    margin: "10px 0px",
    padding: "20px",
  },
  button: {
    ...AmplifyTheme.button,
    backgroundColor: "#29ad85",
    border: "none",
    color: "#fff",
    marginBottom: "10px",
    padding: "10px",
    width: "290px",
  },
  a: {
    ...AmplifyTheme.a,
    color: "#29ad85",
  },
};

export default App;
