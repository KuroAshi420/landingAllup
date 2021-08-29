import React, { useEffect, useState } from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

import CircularProgress from "@material-ui/core/CircularProgress";
import { InputLabel, MenuItem, FormControl, Select } from "@material-ui/core";

// core components

import styles from "enl-components/deals/dealStyle.js";

import { useDispatch, useSelector } from "react-redux";
// import actions from redux
import {
  fetchDeals,
  filterByCategoryOutside,
} from "../../../redux/actions/DealAction";
import { fetchCategories } from "../../../redux/actions/CategoryAction";

const useStyles = makeStyles(styles);

export default function FilterCategory() {
  const classes = useStyles();

  const categories = useSelector((state) => state.get("categories"));

  const dispatch = useDispatch();

  const [category, setCategory] = useState("");

  const handleChange = (event) => {
    setCategory(event.target.value);

    if (event.target.value != 0) {
      dispatch(filterByCategoryOutside(event.target.value));
    } else {
      dispatch(fetchDeals());
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchCategories());
      } catch (e) {
        console.log(e);
        console.log("An error occurred when we tried to fetch categories");
      }
    };
    console.log("useEffect");

    fetchData();
  }, []);

  return (
    <div>
      <FormControl
        className={classes.selectCategory}
        variant="outlined"
        margin="normal"
      >
        <InputLabel id="demo-simple-select-label">Category *</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          label="Category*"
          id="demo-simple-select"
          value={category}
          onChange={handleChange}
          name="category"
        >
          <MenuItem value={0}>all categories</MenuItem>
          {categories.map((category, index) => (
            <MenuItem key={index} value={category._id}>
              {category.category_name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
