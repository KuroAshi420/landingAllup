import React from "react";
import { Switch, Route } from "react-router-dom";
import NotFound from "../Pages/Standalone/NotFoundDedicated";
import Auth from "./Auth";
import Application from "./Application";
import LandingCorporate from "./Landing";
import ThemeWrapper from "./ThemeWrapper";
import ApplicationAdmin from "./ApplicationAdmin";
import ApplicationCompany from "./ApplicationCompany";
import chatData from "../Pages/Chat/api/chatData";
import { Chat } from "../pageListAsync";
window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;

function App() {
  return (
    <ThemeWrapper>
      <Switch>
        <Route path="/" exact component={LandingCorporate} />
        <Route path={`/admin`} component={ApplicationAdmin} />
        <Route path={`/company`} component={ApplicationCompany} />
        <Route path="/company/Chat" exact component={Chat} />
        <Route path={`/company/Chat`}
        component={ApplicationCompany} />
        

        <Route path="/app" component={Application} />
        <Route component={Auth} />
        <Route component={NotFound} />
      </Switch>
    </ThemeWrapper>
  );
}

export default App;
