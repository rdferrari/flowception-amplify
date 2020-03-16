import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import "./index.scss";
import Header from "./components/Header";
import Menu from "./components/Menu";
import Home from "./components/Home";
import Section from "./components/section/Section";
import Subsection from "./components/subsection/Subsection";
// import Login from "./components/Login";

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

    Hub.listen("auth", data => {
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

  const listener = payload => {
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
            <Route path="/:id" component={Home} />
          </Switch>
        </div>
      </Router>
    </UserContext.Provider>
  );
}

const theme = {
  ...AmplifyTheme,
  container: {
    ...AmplifyTheme.container,
    paddingLeft: "1px",
    paddingRight: "1px"
  },
  nav: {
    ...AmplifyTheme.nav,
    margin: "1px"
  },
  navButton: {
    ...AmplifyTheme.navButton,
    display: "inline-block"
  },
  formSection: {
    ...AmplifyTheme.formSection,
    backgroundColor: "#fff",
    border: "none",
    width: "320px"
  },
  sectionHeader: {
    ...AmplifyTheme.sectionHeader,
    backgroundColor: "#ffffff",
    color: "#000000"
  },
  sectionBody: {
    ...AmplifyTheme.sectionBody,
    padding: "5px"
  },
  sectionFooter: {
    ...AmplifyTheme.sectionFooter,
    backgroundColor: "#ffffff",
    padding: "5px",
    borderTop: "none"
  },

  navBar: {
    ...AmplifyTheme.navBar,
    backgroundColor: "#ffffff"
  },
  button: {
    ...AmplifyTheme.button,
    backgroundColor: "#ffffff"
  }
};

// export default withAuthenticator(App, { includeGreetings: true });

export default App;
