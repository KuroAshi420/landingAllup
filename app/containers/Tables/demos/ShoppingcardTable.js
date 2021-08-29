import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { green, purple, red } from "@material-ui/core/colors";
import BlockIcon from "@material-ui/icons/Block";
import Avatar from "@material-ui/core/Avatar";

import Toolbar from "@material-ui/core/Toolbar";
import classNames from "classnames";
import Typography from "@material-ui/core/Typography";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import styles from "enl-components/Tables/tableStyle-jss";
import { useDispatch, useSelector } from "react-redux";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";

import CheckCircleIcon from "@material-ui/icons/CheckCircle";

function ShoppingcardTable(props) {
  const { classes } = props;
  const [test, setTest] = useState(false);

  return (
    <div className={classes.rootTable}>
      <Toolbar className={classes.toolbar}>
        <div className={classes.title}>
          <Typography variant="h6">List of shopping card</Typography>
        </div>
      </Toolbar>
      <Table className={classNames(classes.table, classes.bordered)}>
        <TableHead>
          <TableRow>
            <TableCell>CoinsTotalValue</TableCell>

            <TableCell>beneficiaryNumber</TableCell>
            <TableCell>Deal</TableCell>
            <TableCell>Seller</TableCell>
            <TableCell>Buyer</TableCell>
            <TableCell>cash_montant</TableCell>
            <TableCell>accepted</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>400144</TableCell>

            <TableCell>1245</TableCell>
            <TableCell>****</TableCell>
            <TableCell>****</TableCell>
            <TableCell>****</TableCell>
            <TableCell>1000</TableCell>
            <TableCell>
              {!test ? (
                <Button variant="outlined" color="primary">
                  Accept{" "}
                </Button>
              ) : (
                <CheckCircleIcon style={{ color: green[500] }} />
              )}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}

ShoppingcardTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ShoppingcardTable);
