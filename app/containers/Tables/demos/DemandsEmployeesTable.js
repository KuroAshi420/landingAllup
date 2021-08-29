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
import { useDispatch, useSelector } from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import { green, purple, red } from "@material-ui/core/colors";
import { fetchDealsToConfirm } from "../../../redux/actions/DealAction";

import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function DemandsEmployeesTable(props) {
  const { classes } = props;

  const Deals = useSelector((state) => state.get("deals"));
  const { user } = useSelector((state) => state.get("authentification"));

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState();
  const [typeMessage, setTypeMessage] = useState();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleConfirmDeal = async (deal_id, user_id) => {
    dispatch(confirmDeal(deal_id, user_id)).then((result) => {
      if (result === false) {
        alert("error");
        setMessage("error confirm deal");
        setTypeMessage("error");
        setOpen(true);
      } else {
        setMessage("Success confirm deal");
        setTypeMessage("success");
        setOpen(true);
      }
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        await dispatch(fetchDealsToConfirm(user.enterprise._id));

        setLoading(false);
      } catch (e) {
        setLoading(false);
        console.log(
          "An error occurred when we tried to fetch deals to confirm"
        );
      }
    };
    console.log("useEffect");

    fetchData();
  }, []);

  return (
    <>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity={typeMessage}>
          {message}
        </Alert>
      </Snackbar>

      <div className={classes.section}>
        <h2 className={classes.title}>All demands</h2>

        <div>
          {Deals.length > 0 ? (
            <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>First Name</TableCell>
                    <TableCell>Last Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Deal label</TableCell>
                    <TableCell>date demande</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Deals.map((user, index) =>
                    user.deals.map((deal, index) => (
                      <TableRow key={index}>
                        <TableCell component="th" scope="row">
                          {" "}
                          {user.firstName}
                        </TableCell>
                        <TableCell>{user.lastName}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{deal.deal.deal_label}</TableCell>
                        <TableCell>
                          {new Date(parseInt(deal.date)).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          {" "}
                          {!deal.status ? (
                            <p>Waiting </p>
                          ) : (
                            <p>Accepted</p>
                          )}{" "}
                        </TableCell>
                        <TableCell>
                          {!deal.status ? (
                            <Button
                              variant="outlined"
                              color="primary"
                              onClick={() =>
                                handleConfirmDeal(deal._id, user._id)
                              }
                            >
                              Confirm{" "}
                            </Button>
                          ) : (
                            <CheckCircleIcon style={{ color: green[500] }} />
                          )}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <h4 className={classes.title}>No demand found</h4>
          )}
        </div>
      </div>
    </>
  );
}

DemandsEmployeesTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DemandsEmployeesTable);
