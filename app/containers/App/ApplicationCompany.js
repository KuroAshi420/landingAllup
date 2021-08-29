import React, { useContext } from "react";
import { PropTypes } from "prop-types";
import { Switch, Route } from "react-router-dom";
import DashboardCompany from "../Templates/DashboardCompany";
import { AppContext } from "./ThemeWrapper";
import withAuthorizationRouter from "../Session/withAuthorizationRouter";

import PrivateRoute from "./PrivateRoute";
import {
  AnalyticDashboard,
  NotFound,
  Deals,
  Categories,
  EmployeesTables,
  DemandsEmployeesTables,
  MyDeals,
  DealsIn,
  CreateDeal,
  DemandEmployees,
  ShoppingcardTable,
  Chat,
} from "../pageListAsync";


function ApplicationCompany(props) {
  const { history } = props;
  const changeMode = useContext(AppContext);

  return (
    <DashboardCompany history={history} changeMode={changeMode}>
      <Switch>
        {/* Home */}
        <PrivateRoute
          exact
          path="/company"
          roles={["RH_OWNER", "OWNER"]}
          component={AnalyticDashboard}
        />
        <PrivateRoute
          exact
          path="/company/Demands-Employees"
          roles={["RH_OWNER", "OWNER"]}
          component={DemandsEmployeesTables}
        />

        <PrivateRoute
          exact
          path="/company/MyDeals"
          roles={["RH_OWNER", "OWNER"]}
          component={MyDeals}
        />
        <PrivateRoute
          exact
          path="/company/Deals"
          roles={["RH_OWNER", "OWNER"]}
          component={Deals}
        />
        <PrivateRoute
          exact
          path="/company/DealsIn"
          roles={["RH_OWNER", "OWNER"]}
          component={DealsIn}
        />
        <PrivateRoute
          exact
          path="/company/Employees"
          roles={["RH_OWNER", "OWNER"]}
          component={EmployeesTables}
        />
        <PrivateRoute
          exact
          path="/company/Create-deal"
          roles={["RH_OWNER", "OWNER"]}
          component={CreateDeal}
        />
        <PrivateRoute
          exact
          path="/company/demands"
          roles={["RH_OWNER", "OWNER"]}
          component={DemandEmployees}
        />
        <PrivateRoute
          exact
          path="/company/shopping-card"
          roles={["RH_OWNER", "OWNER"]}
          component={ShoppingcardTable}
        />

            <PrivateRoute
          exact
          path="/company/Chat"
          roles={["RH_OWNER", "OWNER"]}
          component={Chat}
        />


        {/* Default */}
        <PrivateRoute component={NotFound} />
      </Switch>
    </DashboardCompany>
  );
}

ApplicationCompany.propTypes = {
  history: PropTypes.object.isRequired,
};

export default ApplicationCompany;
