import React, { useEffect, useState } from "react"
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { green, purple, red } from '@material-ui/core/colors';
import BlockIcon from '@material-ui/icons/Block';
import Avatar from '@material-ui/core/Avatar';

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
import Icon from "@material-ui/core/Icon";
import { fetchUsers, changeStateUser } from '../../../redux/actions/AdminAction'
import Switch from '@material-ui/core/Switch';

import CheckCircleIcon from '@material-ui/icons/CheckCircle';

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

function UsersTable(props) {
  const { classes } = props;

  const users = useSelector(state => state.get("users"));

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true)


  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState();
  const [typeMessage, setTypeMessage] = useState();
  const handleChange = (user_id, state) => {

    dispatch(changeStateUser(user_id, state));

  };
 


  useEffect(() => {
    const fetchData = async () => {
      try {

        setLoading(true)

        await dispatch(fetchUsers())

        setLoading(false)

      }
      catch (e) {
        setLoading(false)
        console.log("An error occurred when we tried to fetch users")
      }
    }
    console.log("useEffect")

    fetchData()
  }, [])

  return (
    <div className={classes.rootTable}>
      <Toolbar className={classes.toolbar}>
        <div className={classes.title}>
          <Typography variant="h6">List of users</Typography>
        </div>
      </Toolbar>
      <Table className={classNames(classes.table, classes.bordered)}>
        <TableHead>
          <TableRow>
          <TableCell>First Name</TableCell>
                      <TableCell >Last Name</TableCell>
                      <TableCell >Email</TableCell>
                      <TableCell >Position</TableCell>
                      <TableCell >company Name</TableCell>
                      <TableCell >company email</TableCell>
                      <TableCell >actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
       { users.map((user) => (


<TableRow key={user._id}>

  <TableCell component="th" scope="row"> {user.firstName}</TableCell>
  <TableCell >{user.lastName}</TableCell>
  <TableCell >{user.email}</TableCell>
  <TableCell >{user.role === "RH_OWNER" || user.role === "OWNER" ? <span> Enterprise representative </span>
                            : user.role === "RH" ? <span>RH manager</span>
                              : <span>Employee</span>}</TableCell>
  <TableCell >{user.enterprise.company_name}</TableCell>
  <TableCell>

  {user.enterprise.company_email}

  </TableCell>
  <TableCell>
  <Switch
                            color="primary"
                            defaultChecked={user.isActive}
                            onChange={() => handleChange(user._id, !user.isActive)}
                            inputProps={{ 'aria-label': 'primary checkbox' }}
                          />
  </TableCell>

</TableRow>

))
}
        </TableBody>
      </Table>
    </div>
  );
}

UsersTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UsersTable);
