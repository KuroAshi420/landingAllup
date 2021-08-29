import React, { useEffect, useState } from "react";
// nodejs library that concatenates classes
import classNames from "classnames";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import CircularProgress from "@material-ui/core/CircularProgress";
import IconButton from "@material-ui/core/IconButton";

// @material-ui/icons
import DeleteIcon from "@material-ui/icons/Delete";
import RoomIcon from "@material-ui/icons/Room";

import EditModal from "./editSection/EditModal";
import ModalDetails from "./detailSection/ModalDetails";

import "./DealSection.css";

// core components
import { GridContainer, ProductGallery } from "enl-components";
import styles from "enl-components/deals/dealStyle.js";
import styles2 from "enl-components/deals/formStyle-jss";

import { useDispatch, useSelector } from "react-redux";
// import actions from redux
import { fetchMyDeals, deleteDeal } from "../../../../redux/actions/DealAction";

const useStyles = makeStyles(styles);
const useStyles2 = makeStyles(styles2);

export default function DealSection() {
  const classes = useStyles();
  const reducer = "ecommerce";
  const keyword = useSelector((state) =>
    state.getIn([reducer, "keywordValue"])
  );
  const productIndex = useSelector((state) =>
    state.getIn([reducer, "productIndex"])
  );
  const [listView, setListView] = useState("grid");

  const deals = useSelector((state) => state.get("deals"));
  const { user } = useSelector((state) => state.get("authentification"));

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgCard
  );

  const handleDeleteDeal = async (deal_id) => {
    dispatch(deleteDeal(deal_id));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        await dispatch(fetchMyDeals(user.enterprise._id));

        setLoading(false);
      } catch (e) {
        setLoading(false);
        console.log(e);
        console.log("An error occurred when we tried to fetch deals");
      }
    };
    console.log("useEffect");

    fetchData();
  }, []);

  return (
    <div>
      {loading ? (
        <CircularProgress />
      ) : deals.length > 0 ? (
        <ProductGallery
          listView={listView}
          dataProduct={deals}
          showDetail={(payload) => showDetail(detailAction(payload))}
          editProduct={true}
          deleteProduct={true}
          productIndex={productIndex}
          keyword={keyword}
          handleDeleteDeal={handleDeleteDeal}
        />
      ) : (
        <div className={classes.notfound}>you don't have any deal</div>
      )}
    </div>
  );
}
