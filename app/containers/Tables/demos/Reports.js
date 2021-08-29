import React, { useEffect, useState } from "react"
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { green, purple, red } from '@material-ui/core/colors';
import BlockIcon from '@material-ui/icons/Block';
import Avatar from '@material-ui/core/Avatar';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from "@material-ui/core/IconButton";

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

import { fetchReports}from '../../../redux/actions/ReportAction'
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

function Reports(props) {
  const { classes } = props;

  const reports = useSelector(state => state.get("reports"));

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true)


  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState();
  const [typeMessage, setTypeMessage] = useState();
  useEffect(() => {
    const fetchData = async () => {
      try {

        setLoading(true)

        await dispatch(fetchReports())

        setLoading(false)

      }
      catch (e) {
        setLoading(false)
        console.log("An error occurred when we tried to fetch reports")
      }
    }
    console.log("useEffect")

    fetchData()
  }, [])
  return (
    <div className={classes.rootTable}>
      <Toolbar className={classes.toolbar}>
        <div className={classes.title}>
          <Typography variant="h6">List of Reports</Typography>
        </div>
      </Toolbar>
      <Table className={classNames(classes.table, classes.bordered)}>
        <TableHead>
          <TableRow>
          <TableCell>Report text</TableCell>
                      <TableCell >Report Date</TableCell>
                      <TableCell >enterprise name</TableCell>
                      <TableCell >Deal label</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {reports.map((report) => (


<TableRow key={report._id}>
<TableCell>
{report.reportText}
                </TableCell>
  <TableCell component="th" scope="row"> {report.dateSentReport}</TableCell>
  <TableCell>{report.enterprise.company_name}</TableCell>
  <TableCell>{report.deal.deal_label} </TableCell>
</TableRow>

))
}
        </TableBody>
      </Table>
    </div>
  );
}

Reports.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Reports);
