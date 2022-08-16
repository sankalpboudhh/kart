import { BrowserRouter, Route, Switch } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/Navbar.js";
import { useContext } from "react";
import { ThemeContext } from "./ThemeContext.js";
import HomePage from "./pages/HomePage.js";
import PostPage from "./pages/PostPage.js";
import LoginPage from "./pages/LoginPage.js";
import ProfilePage from "./pages/ProfilePage.js";
import PrivateRoute from "./components/PrivateRoute.js";
import CreatePostPage from "./pages/CreatePostPage.js";
import RegisterPage from "./pages/RegisterPage.js";

function App() {
  const { theme } = useContext(ThemeContext);
  return (
    <BrowserRouter>
      <div className={`container ${theme}`}>
        <Navbar />
        <div className="main">
          <Switch>
            <PrivateRoute
              path="/create"
              component={CreatePostPage}
            ></PrivateRoute>
            <PrivateRoute
              path="/profile"
              component={ProfilePage}
            ></PrivateRoute>
            <Route path={"/login"}>
              <LoginPage />
            </Route>
            <Route path={"/register"}>
              <RegisterPage />
            </Route>
            <Route path="/post/:postId">
              <PostPage />
            </Route>
            <Route path="/search/:query?">
              <HomePage />
            </Route>
            <Route path="/user/:userId?">
              <HomePage />
            </Route>
            <Route path="/">
              <HomePage />
            </Route>
          </Switch>
        </div>
        <div className="footer">Awesome Blog. All right reserved</div>
      </div>
    </BrowserRouter>
  );
}

export default App;
