import React, { useContext } from "react";
import { PropTypes } from "prop-types";
import { Switch, Route } from "react-router-dom";
import DashboardAdmin from "../Templates/DashboardAdmin";
import { AppContext } from "./ThemeWrapper";
import withAuthorizationRouter from "../Session/withAuthorizationRouter";
import {
  AnalyticDashboard,
  MarketingDashboard,
  CryptoDashboard,
  Infographics,
  MiniApps,
  Analytics,
  Gallery,
  Status,
  Parent,
  AppLayout,
  Responsive,
  Grid,
  SimpleTable,
  AdvancedTable,
  TablePlayground,
  TreeTable,
  EditableCell,
  ReduxForm,
  DialButton,
  DateTimePicker,
  CheckboxRadio,
  Switches,
  Selectbox,
  SliderRange,
  Buttons,
  ToggleButton,
  Textbox,
  Autocomplete,
  Upload,
  TextEditor,
  Avatars,
  Accordion,
  Badges,
  List,
  PopoverTooltip,
  Snackbar,
  Typography,
  Tabs,
  Cards,
  ImageGrid,
  Progress,
  DialogModal,
  Steppers,
  DrawerMenu,
  Breadcrumbs,
  Icons,
  SliderCarousel,
  Tags,
  TreeView,
  LineCharts,
  BarCharts,
  AreaCharts,
  PieCharts,
  RadarCharts,
  ScatterCharts,
  CompossedCharts,
  Todo,
  Contact,
  Email,
  TodoFirebase,
  ContactFirebase,
  EmailFirebase,
  Profile,
  Timeline,
  Chat,
  Ecommerce,
  ProductPage,
  CheckoutPage,
  InvoicePage,
  BlankPage,
  AuthenticatedPage,
  Photos,
  Error,
  MapMarker,
  MapDirection,
  SearchMap,
  TrafficIndicator,
  StreetViewMap,
  NotFound,
  CompaniesTable,
  UsersTable,
  Deals,
  Categories,
  Reports,
} from "../pageListAsync";
import PrivateRoute from "./PrivateRoute";

function ApplicationAdmin(props) {
  const { history } = props;
  const changeMode = useContext(AppContext);

  return (
    <DashboardAdmin history={history} changeMode={changeMode}>
      <Switch>
        {/* Home */}
        <PrivateRoute
          exact
          path="/admin"
          roles={["ADMIN"]}
          component={AnalyticDashboard}
        />

        <PrivateRoute
          exact
          path="/admin/Entreprise"
          roles={["ADMIN"]}
          component={CompaniesTable}
        />
        <PrivateRoute
          exact
          path="/admin/Users"
          roles={["ADMIN"]}
          component={UsersTable}
        />
        <PrivateRoute
          exact
          path="/admin/Deals"
          roles={["ADMIN"]}
          component={Deals}
        />
        <PrivateRoute
          exact
          path="/admin/Categories"
          roles={["ADMIN"]}
          component={Categories}
        />
        <PrivateRoute
          exact
          path="/admin/Reports"
          roles={["ADMIN"]}
          component={Reports}
        />

        {/* Default */}
        <Route component={NotFound} />
      </Switch>
    </DashboardAdmin>
  );
}

ApplicationAdmin.propTypes = {
  history: PropTypes.object.isRequired,
};

export default ApplicationAdmin;
