import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Layout } from "antd";
import "./app.css";
import "./styles/Main.css";
import "./styles/LibraryCard.css";
import { getData } from "./api";
import Main from "./components/main/Main";
import LibraryCard from "./components/library-card/LibraryCard";
import NotFound from "./components/not-found/NotFound";

export const AppContext = React.createContext();

export default function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getData().then(setData);
  }, []);

  return (
    <Layout>
      <BrowserRouter>
        <AppContext.Provider value={data}>
          <div className="app">
            <Switch>
              <Route exact path="/" component={Main} />
              <Route exact path="/library/:order" component={LibraryCard} />
              <Route component={NotFound} />
            </Switch>
          </div>
        </AppContext.Provider>
      </BrowserRouter>
    </Layout>
  );
}
