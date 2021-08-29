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
//import AddCategoryModal from "./CategorySection/AddSection/AddCategoryModal.js";
//import UpdateCategoryModal from "./CategorySection/UpdateSection/UpdateCategoryModal.js";
import { fetchCategories, deleteCategory }from '../../../redux/actions/CategoryAction'
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

function Categories(props) {
  const { classes } = props;

  const categories = useSelector(state => state.get("categories"));

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true)
  const handleDeleteCategory = async (category_id) => {


    dispatch(deleteCategory(category_id))

  }

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState();
  const [typeMessage, setTypeMessage] = useState();
  useEffect(() => {
    const fetchData = async () => {
      try {

        setLoading(true)

        await dispatch(fetchCategories())

        setLoading(false)

      }
      catch (e) {
        setLoading(false)
        console.log("An error occurred when we tried to fetch categories")
      }
    }
    console.log("useEffect")

    fetchData()
  }, [])
  return (
    <div className={classes.rootTable}>
      <Toolbar className={classes.toolbar}>
        <div className={classes.title}>
          <Typography variant="h6">List of Categories</Typography>
        </div>
      </Toolbar>
      <Table className={classNames(classes.table, classes.bordered)}>
        <TableHead>
          <TableRow>
          <TableCell>#</TableCell>
                      <TableCell >Category Name</TableCell>

                      <TableCell >actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {categories.map((category, index) => (


<TableRow key={category._id}>
<TableCell>
{index}
                </TableCell>
  <TableCell component="th" scope="row"> {category.category_name}</TableCell>
  <TableCell>{/*<UpdateCategoryModal category={category} />*/}
  <IconButton onClick={() => handleDeleteCategory(category._id)}>
                            <DeleteIcon className="btnColorDelete" /> </IconButton></TableCell>
</TableRow>

))
}
        </TableBody>
      </Table>
    </div>
  );
}

Categories.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Categories);
