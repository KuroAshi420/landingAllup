import React, { useEffect, useState } from "react";

import { PDFDownloadLink } from "@react-pdf/renderer";
import { PdfDocument } from "./PdfDocument";

// @material-ui/core components
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Slide from "@material-ui/core/Slide";
import IconButton from "@material-ui/core/IconButton";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

// @material-ui/icons
import VisibilityIcon from "@material-ui/icons/Visibility";
import Close from "@material-ui/icons/Close";
// core components

import { Button } from "enl-components";
import Tooltip from "@material-ui/core/Tooltip";

import { getUsersByDeal } from "../../../../../redux/services/deal.service";

import styles from "enl-components/deals/formStyle-jss";

const useStyles = makeStyles(styles);

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#5ea5ac",
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

Transition.displayName = "Transition";

export default function ModalDetails({ deal }) {
  const classes = useStyles();
  const [classicModal, setClassicModal] = React.useState(false);
  const [users, setUsers] = useState([]);

  const showModal = async () => {
    let res = await getUsersByDeal(deal._id);
    setUsers(res);
    setClassicModal(true);
  };

  return (
    <>
      <Tooltip
        id="tooltip-left"
        title="View"
        placement="bottom"
        classes={{ tooltip: classes.tooltip }}
      >
        <IconButton color="primary" onClick={() => showModal()}>
          <VisibilityIcon />
        </IconButton>
      </Tooltip>

      <Dialog
        classes={{
          root: classes.center,
          paper: classes.modal,
        }}
        open={classicModal}
        TransitionComponent={Transition}
        keepMounted
        fullWidth
        onClose={() => setClassicModal(false)}
        aria-labelledby="classic-modal-slide-title"
        aria-describedby="classic-modal-slide-description"
      >
        <DialogTitle
          id="classic-modal-slide-title"
          disableTypography
          className={classes.modalHeader}
        >
          <IconButton
            className={classes.modalCloseButton}
            key="close"
            aria-label="Close"
            color="inherit"
            onClick={() => setClassicModal(false)}
          >
            <Close className={classes.modalClose} />
          </IconButton>
        </DialogTitle>

        <DialogContent id="classic-modal-slide-description">
          <p>
            <span className="deal_text">deal label :</span> {deal.deal_label}
          </p>
          <p>
            <span className="deal_text">deal description :</span>{" "}
            {deal.deal_description}
          </p>
          <p>
            <span className="deal_text">deal price : </span>
            {deal.deal_price} Dt
          </p>

          {users.length > 0 ? (
            <div>
              <TableContainer component={Paper}>
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>First Name</StyledTableCell>
                      <StyledTableCell>Last Name</StyledTableCell>
                      <StyledTableCell>company_name</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {users.map((user, index) => (
                      <StyledTableRow key={index}>
                        <StyledTableCell> {user.firstName}</StyledTableCell>
                        <StyledTableCell>{user.lastName}</StyledTableCell>
                        <StyledTableCell>
                          {user.enterprise.company_name}
                        </StyledTableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <br />
              <PDFDownloadLink
                document={<PdfDocument users={users} deal={deal} />}
                fileName="deals.pdf"
                style={{
                  textDecoration: "none",
                  padding: "10px",
                  color: "#fff",
                  backgroundColor: "#5ea5ac",
                  border: "1px solid #5ea5ac",
                  borderRadius: "3px",
                }}
              >
                {({ blob, url, loading, error }) =>
                  loading ? "Loading document..." : "Download Pdf"
                }
              </PDFDownloadLink>
            </div>
          ) : (
            <h4>No users get this deal </h4>
          )}
        </DialogContent>
        <DialogActions className={classes.modalFooter}>
          <Button onClick={() => setClassicModal(false)} color="danger" simple>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
