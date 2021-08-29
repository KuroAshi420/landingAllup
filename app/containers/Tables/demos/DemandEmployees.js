import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import styles from "enl-components/Tables/tableStyle-jss";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import DeleteIcon from "@material-ui/icons/Delete";
import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
import { getemployeesdemands } from "../../../redux/actions/Demands";
import MuiAlert from "@material-ui/lab/Alert";

function DemandEmployees(props) {
  const { classes } = props;

  const [loading, setLoading] = useState(true);
  const { listeDemande } = useSelector((state) =>
    state.get("DemandsEmployees")
  );
  const { user } = useSelector((state) => state.get("authentification"));

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        await dispatch(getemployeesdemands(user.enterprise._id));

        setLoading(false);
      } catch (e) {
        setLoading(false);
        console.log(
          "An error occurred when we tried to fetch deals to confirm"
        );
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className={classes.rootTable}>
        <div className={classes.section}>
          {loading ? (
            <CircularProgress />
          ) : listeDemande.length ? (
            <TableContainer component={Paper}>
              <Table className={classNames(classes.table, classes.bordered)}>
                <TableHead>
                  <TableRow>
                    <TableCell>Demand_id</TableCell>
                    <TableCell>Deal_id</TableCell>
                    <TableCell>Employee</TableCell>
                    <TableCell>status</TableCell>
                    <TableCell>Grant</TableCell>
                    <TableCell>Cash</TableCell>
                  </TableRow>
                </TableHead>
                {listeDemande.map((demand) => (
                  <TableBody>
                    <TableRow>
                      <TableCell>{demand._id}</TableCell>
                      <TableCell>{demand.deal.deal_label}</TableCell>
                      <TableCell>
                        {demand.user.firstName} {demand.user.lastName}
                      </TableCell>
                      <TableCell>{demand.status ? "true" : "false"}</TableCell>
                      {demand.grantValue ? (
                        <TableCell>{demand.grantValue}</TableCell>
                      ) : (
                        ""
                      )}
                      {demand.cashValue ? (
                        <TableCell>{demand.cashValue}</TableCell>
                      ) : (
                        ""
                      )}
                    </TableRow>
                  </TableBody>
                ))}
              </Table>
            </TableContainer>
          ) : (
            <div className={classes.notfound}>you don't have any demand</div>
          )}
        </div>
      </div>
    </>
  );
}

DemandEmployees.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DemandEmployees);
