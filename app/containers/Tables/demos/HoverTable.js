import React, { useEffect, useState } from "react"
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import classNames from 'classnames';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import styles from 'enl-components/Tables/tableStyle-jss';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import { fetchEmployees, deleteEmployee,assignRH ,unassignRH } from'../../../redux/actions/EmployeeAction'

let id = 0;
function createData(name, calories, fat, carbs, protein) {
  id += 1;
  return {
    id,
    name,
    calories,
    fat,
    carbs,
    protein
  };
}

const data = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

function HoverTable(props) {
  const { classes } = props;

  const employees = useSelector(state => state.get("employees"))
  const enterprise = useSelector(state => state.get("authentification").get("user").get("enterprise"));
  const user = useSelector(state => state.get("authentification").get("user"));

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true)


  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState();
  const [typeMessage, setTypeMessage] = useState();
  const handleAssignRH = async (user_id) => {


    dispatch(assignRH(user_id, enterprise.get("_id"))).then(result => {

      if (result.error === false) {

        setMessage("Success Assign an RH Manager ");
        setTypeMessage("success")
        setOpen(true);

      }
      else {
        setMessage(result.data);
        setTypeMessage("warning")
        setOpen(true);
      }
    })


  }

  const handleUnassignRH = async (user_id) => {


    dispatch(unassignRH(user_id, enterprise._id)).then(result => {

      if (result.error === false) {

        setMessage("Success Unassign an RH Manager ");
        setTypeMessage("success")
        setOpen(true);

      }
    
    })


  }

  const handleDeleteEmployee = async (user_id) => {


    dispatch(deleteEmployee(user_id))

  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        

        setLoading(true)
        
console.log("salut"+user.get("_id"))
        await dispatch(fetchEmployees(enterprise.get("_id"), user.get("_id")))

        setLoading(false)

      }
      catch (e) {
        setLoading(false)
        console.log(e+ "An error occurred when we tried to fetch employees")
      }
    }
    console.log("useEffect")

    fetchData()
  }, [])
  return (
    <div className={classes.rootTable}>
      <Toolbar className={classes.toolbar}>
        <div className={classes.title}>
          <Typography variant="h6">Nutrition</Typography>
        </div>
      </Toolbar>
      <Table className={classNames(classes.table, classes.hover)}>
        <TableHead>
          <TableRow>
            <TableCell padding="default">First Name</TableCell>
            <TableCell align="right">Last Name</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">PhoneNumber</TableCell>
            <TableCell align="right">Position</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {employees.map((row) => (
            <TableRow key={row._id}>
              <TableCell padding="default">{row.firstName}</TableCell>
              <TableCell align="right">{row.lastName}</TableCell>
              <TableCell align="right">{row.email}</TableCell>
              <TableCell align="right">{row.phoneNumber}</TableCell>
              <TableCell align="right">{row.position}</TableCell>
              <TableCell align="right">
                              <Button variant="outlined" className={classes.btn} onClick={() => handleDeleteEmployee(row._id)}>
                                <DeleteIcon />
                              </Button>
                              <Button variant="outlined" color="primary" onClick={() => handleAssignRH(row._id)}>
                                Assign RH manager </Button>
                                </TableCell>
            </TableRow>
       ))}
        </TableBody>
      </Table>
    </div>
  );
}

HoverTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HoverTable);
