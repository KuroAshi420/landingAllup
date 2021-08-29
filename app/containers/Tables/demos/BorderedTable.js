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
import { fetchEnterprises, confirmRegistration } from '../../../redux/actions/EnterpriseAction'
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

function BorderedTable(props) {
  const { classes } = props;

  const enterprises = useSelector(state => state.get("enterprises"));

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true)


  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState();
  const [typeMessage, setTypeMessage] = useState();
  const handleConfirmRegistration = async (enterprise_id) => {

    dispatch(confirmRegistration(enterprise_id)).then(result => {

      if (result === false) {

        alert("error")
        setMessage("error confirm registration");
        setTypeMessage("error")
        setOpen(true);

      }
      else {

        setMessage("Success confirm registration");
        setTypeMessage("success")
        setOpen(true);

      }
    })

  }


  useEffect(() => {
    const fetchData = async () => {
      try {

        setLoading(true)


        await dispatch(fetchEnterprises())


        setLoading(false)

      }
      catch (e) {
        setLoading(false)
        console.log("An error occurred when we tried to fetch enterprises")
      }
    }
    console.log("useEffect")

    fetchData()
  }, [])
  return (
    <div className={classes.rootTable}>
      <Toolbar className={classes.toolbar}>
        <div className={classes.title}>
          <Typography variant="h6">List of companies</Typography>
        </div>
      </Toolbar>
      <Table className={classNames(classes.table, classes.bordered)}>
        <TableHead>
          <TableRow>
          <TableCell>logo</TableCell>
                        <TableCell>Matricule fiscale</TableCell>
                        <TableCell>Company_name</TableCell>
                        <TableCell >Email</TableCell>
                        <TableCell>phone Number</TableCell>
                        <TableCell >Address</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
       { enterprises.map((enterprise, index) => (


<TableRow key={index}>
<TableCell>
                  <div className={classes.flex}>
                    <Avatar  src={enterprise.logo} className={classes.productPhoto} />
                   
                  </div>
                </TableCell>
  <TableCell component="th" scope="row"> {enterprise.matricule_fiscale}</TableCell>
  <TableCell >{enterprise.company_name}</TableCell>
  <TableCell >{enterprise.company_email}</TableCell>
  <TableCell >{enterprise.company_phoneNumber}</TableCell>
  <TableCell >{enterprise.company_address}</TableCell>
  <TableCell>

    {!enterprise.isVerified ? <BlockIcon style={{ color: red[500] }} />
      : <CheckCircleIcon style={{ color: green[500] }} />}

  </TableCell>
  <TableCell>



  
    {!enterprise.isVerified ? <Button variant="outlined" color="primary" onClick={() => handleConfirmRegistration(enterprise._id)}>Confirm </Button>
      : <span></span>}

    {/*  <DealsModal deals_in={enterprise.deals_in} deals_out={enterprise.deals_out} /> */}
  </TableCell>

</TableRow>

))
}
        </TableBody>
      </Table>
    </div>
  );
}

BorderedTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BorderedTable);
