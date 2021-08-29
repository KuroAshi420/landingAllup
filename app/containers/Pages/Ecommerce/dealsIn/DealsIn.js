import React, { useEffect, useState } from "react";
// nodejs library that concatenates classes

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
// @material-ui/icons
import RoomIcon from "@material-ui/icons/Room";

// core components
import { GridContainer, ProductGallery } from "enl-components";

import styles from "enl-components/deals/dealStyle.js";
import "./DealSection.css";

import { useDispatch, useSelector } from "react-redux";
// import actions from redux
import { fetchDealsIn } from "../../../../redux/actions/DealAction";

const useStyles = makeStyles(styles);

export default function DealSection() {
  const classes = useStyles();

  const deals = useSelector((state) => state.get("deals"));
  const { user } = useSelector((state) => state.get("authentification"));

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        await dispatch(fetchDealsIn(user.enterprise._id));

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
    <div className={classes.section}>
      <h2 className={classes.title}>Deals In</h2>
      <div>
        <GridContainer spacing={6}>
          {loading ? (
            <CircularProgress />
          ) : deals.length > 0 ? (
            <ProductGallery
              dataProduct={deals}
              showDetail={(payload) => showDetail(detailAction(payload))}
              noteModal={true}
            />
          ) : (
            <div className={classes.notfound}>deals In not found</div>
          )}
        </GridContainer>
      </div>
    </div>
  );
}
