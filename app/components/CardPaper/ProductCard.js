import React from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import withWidth, { isWidthUp } from "@material-ui/core/withWidth";

import DeleteIcon from "@material-ui/icons/Delete";

import classNames from "classnames";
import Card from "@material-ui/core/Card";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import CardMedia from "@material-ui/core/CardMedia";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Chip from "@material-ui/core/Chip";
import AddShoppingCart from "@material-ui/icons/AddShoppingCart";
import Button from "@material-ui/core/Button";
import Fab from "@material-ui/core/Fab";
import Type from "enl-styles/Typography.scss";
import Rating from "../Rating/Rating";

import styles from "./cardStyle-jss";
import EditModal from "../../containers/Pages/Ecommerce/myDeals/editSection/EditModal";
import ModalReport from "../../containers/Pages/Ecommerce/dealsIn/reportSection/ModalReport";

import SelectCategory from "../LandingPage/SelectCategory";
import "./productCard.css"
function ProductCard(props) {
  const {
    classes,
    discount,
    soldout,
    thumbnail,
    name,
    desc,
    oper,
    rating,
    price,
    prevPrice,
    list,
    detailOpen,
    addToCart,
    width,

    product,
    editProduct,
    deleteProduct,
    handleDeleteDeal,
    noteModal,

    detailCategory,
    categoryData,
    setItem,
  } = props;
  console.log("desc", desc)
  return (
    <Card
      className={classNames(
        classes.cardProduct,
        isWidthUp("sm", width) && list ? classes.cardList : ""
      )}

    >
      <div className={classes.status}>
        {discount !== "" && (
          <Chip
            label={"Discount " + discount}
            className={classes.chipDiscount}
          />
        )}
        {soldout && <Chip label="Sold Out" className={classes.chipSold} />}
      </div>
      {/* <CardMedia
        className={classes.mediaProduct}
        image={thumbnail}
        title={name}
      /> */}
      <CardContent className={classes.floatingButtonWrap}>
        {!detailCategory && !soldout && (
          <Tooltip title="Add to cart" placement="top">
            <Fab
              onClick={addToCart}
              size="small"
              color="secondary"
              aria-label="add"
              className={classes.buttonAdd}
            >
              <AddShoppingCart />
            </Fab>
          </Tooltip>
        )}
        <div className='modal-products-body'>

          <div className="category-body-container">
          <div className="card-modal-prod-left">
            <div className={classes.rightAction}>

              {editProduct && <EditModal deal={product} />}
              {deleteProduct && (
                <IconButton onClick={() => handleDeleteDeal(product._id)}>
                  <DeleteIcon className="btnColorDelete" />
                </IconButton>
              )}
              {noteModal && <ModalReport id={product._id} />}

              {detailCategory ? (
                <SelectCategory setItem={setItem} categoryData={categoryData} />
              ) : (
                <Button
                  size="small"
                  variant="outlined"
                  color="secondary"
                  onClick={detailOpen}
                >
                  See Detail
                </Button>
              )}
              {!detailCategory && !soldout && (
                <Tooltip title="Add to cart" placement="top">
                  <IconButton
                    color="secondary"
                    onClick={addToCart}
                    className={classes.buttonAddList}
                  >
                    <AddShoppingCart />
                  </IconButton>
                </Tooltip>
              )}
            </div>
           </div>
            <div className="card-modal-prod-right">
              {/* <h2>{name}</h2> */}
              <h3>Descreption</h3>
              <p>  {desc}</p>
              <h3>Operation</h3>
              <p>{oper}</p>


            </div>

          </div>




        </div>

        <div className={classes.ratting}>
          {rating > 0 ? (
            <Rating value={rating} max={5} readOnly />
          ) : (
            <div className={classes.emptyRating} />
          )}
        </div>
      </CardContent>
      <CardActions className={classes.price}>
        <Typography variant="h5">
          {detailCategory ? "" : <span>{price} Dt</span>}
        </Typography>
        {prevPrice > 0 && (
          <Typography variant="caption" component="h5">
            <span className={Type.lineThrought}>{prevPrice}DT</span>
          </Typography>
        )}

      </CardActions>
    </Card>
  );
}

ProductCard.propTypes = {
  classes: PropTypes.object.isRequired,
  discount: PropTypes.string,
  width: PropTypes.string.isRequired,
  soldout: PropTypes.bool,
  thumbnail: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  prevPrice: PropTypes.number,
  list: PropTypes.bool,
  detailOpen: PropTypes.func,
  addToCart: PropTypes.func,
};

ProductCard.defaultProps = {
  discount: "",
  soldout: false,
  prevPrice: 0,
  list: false,
  detailOpen: () => false,
  addToCart: () => false,
};

const ProductCardResponsive = withWidth()(ProductCard);
export default withStyles(styles)(ProductCardResponsive);
