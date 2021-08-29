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

import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import {
  fetchEmployees,
  deleteEmployee,
  assignRH,
  unassignRH,
} from "../../../redux/actions/EmployeeAction";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function EmployeesTables(props) {
  const { classes } = props;

  const employees = useSelector((state) => state.get("employees"));
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

  const handleAssignRH = async (user_id) => {
    dispatch(assignRH(user_id, user.enterprise._id)).then((result) => {
      if (result.error === false) {
        setMessage("Success Assign an RH Manager ");
        setTypeMessage("success");
        setOpen(true);
      } else {
        setMessage(result.data);
        setTypeMessage("warning");
        setOpen(true);
      }
    });
  };

  const handleUnassignRH = async (user_id) => {
    dispatch(unassignRH(user_id, enterprise._id)).then((result) => {
      if (result.error === false) {
        setMessage("Success Unassign an RH Manager ");
        setTypeMessage("success");
        setOpen(true);
      }
    });
  };

  const handleDeleteEmployee = async (user_id) => {
    dispatch(deleteEmployee(user_id));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        await dispatch(fetchEmployees(user.enterprise._id, user._id));

        setLoading(false);
      } catch (e) {
        setLoading(false);
        console.log("An error occurred when we tried to fetch employees");
      }
    };

    fetchData();
  }, [user]);

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
      <div className={classes.rootTable}>
        <div className={classes.section}>
          <h4 className={classes.title}>token : {user.enterprise.token}</h4>
          {employees.length > 0 ? (
            <TableContainer component={Paper}>
              <Table className={classNames(classes.table, classes.bordered)}>
                <TableHead>
                  <TableRow>
                    <TableCell>First Name</TableCell>
                    <TableCell>Last Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>PhoneNumber</TableCell>
                    <TableCell>Position</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {employees.map((row) =>
                    row.role === "EMPLOYEE" && user.role === "RH_OWNER" ? (
                      <TableRow key={row._id}>
                        <TableCell component="th" scope="row">
                          {" "}
                          {row.firstName}
                        </TableCell>
                        <TableCell>{row.lastName}</TableCell>
                        <TableCell>{row.email}</TableCell>
                        <TableCell>{row.phoneNumber}</TableCell>
                        <TableCell>{row.position}</TableCell>
                        <TableCell>
                          <Button
                            variant="outlined"
                            className={classes.btn}
                            onClick={() => handleDeleteEmployee(row._id)}
                          >
                            <DeleteIcon />
                          </Button>
                          <Button
                            variant="outlined"
                            color="primary"
                            onClick={() => handleAssignRH(row._id)}
                          >
                            Assign RH manager{" "}
                          </Button>
                        </TableCell>
                      </TableRow>
                    ) : row.role === "EMPLOYEE" && user.role === "OWNER" ? (
                      <TableRow key={row._id}>
                        <TableCell component="th" scope="row">
                          {" "}
                          {row.firstName}
                        </TableCell>
                        <TableCell>{row.lastName}</TableCell>
                        <TableCell>{row.email}</TableCell>
                        <TableCell>{row.phoneNumber}</TableCell>
                        <TableCell>{row.position}</TableCell>
                        <TableCell>
                          <Button
                            variant="outlined"
                            className={classes.btn}
                            onClick={() => handleDeleteEmployee(row._id)}
                          >
                            <DeleteIcon />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ) : (
                      <TableRow key={row._id}>
                        <TableCell component="th" scope="row">
                          {" "}
                          {row.firstName}
                        </TableCell>
                        <TableCell>{row.lastName}</TableCell>
                        <TableCell>{row.email}</TableCell>
                        <TableCell>{row.phoneNumber}</TableCell>
                        <TableCell>{row.position}</TableCell>
                        <TableCell>
                          <Button
                            variant="outlined"
                            color="primary"
                            onClick={() => handleUnassignRH(row._id)}
                          >
                            Unassign RH manager{" "}
                          </Button>
                        </TableCell>
                      </TableRow>
                    )
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <h5 className={classes.title}> employees List empty</h5>
          )}
        </div>
      </div>
    </>
  );
}

EmployeesTables.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EmployeesTables);
