import React, { useState } from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import ProductCard from "../CardPaper/ProductCard";
import ProductDetail from "./ProductDetail";

function ProductGallery(props) {
  const [open, setOpen] = useState(false);
  const [index, setindex] = useState(0);
  const {
    dataProduct,
    handleAddToCart,
    productIndex,
    keyword,
    editProduct,
    deleteProduct,
    listView,
    showDetail,
    handleDeleteDeal,
    noteModal,
  } = props;

  const handleDetailOpen = (product, index) => {
    setOpen(true);
    setindex(index);
    showDetail(product);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <ProductDetail
        open={open}
        close={handleClose}
        detailContent={dataProduct}
        productIndex={index}
        handleAddToCart={handleAddToCart}
      />
      <Grid
        container
        alignItems="flex-start"
        justify="flex-start"
        direction="row"
        spacing={3}
      >
        {dataProduct.map((product, index) => {
          /* if (product.get('name').toLowerCase().indexOf(keyword) === -1) {
              return false;
            }*/
          const itemAttr = {
            id: product._id,
            name: product.deal_label,
            thumbnail: product.deal_picture,
            price: product.deal_price,
            quantity: 1,
          };
          return (
            <Grid
              item
              md={listView === "list" ? 12 : 4}
              sm={listView === "list" ? 12 : 6}
              xs={12}
              key={index.toString()}
            >
              <ProductCard
                list={listView === "list"}
                name={product.deal_label}
                thumbnail={product.deal_picture}
                desc={product.deal_description}
                // rating={product.get('rating')}
                price={product.deal_price}
                product={product}
                editProduct={editProduct}
                deleteProduct={deleteProduct}
                noteModal={noteModal}
                // prevPrice={product.get('prevPrice')}
                // discount={product.get('discount')}
                //soldout={product.get('soldout')}
                handleDeleteDeal={handleDeleteDeal}
                detailOpen={() => handleDetailOpen(product, index)}
                addToCart={() => handleAddToCart(itemAttr)}
              />
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
}

ProductGallery.propTypes = {
  dataProduct: PropTypes.object.isRequired,
  handleAddToCart: PropTypes.func.isRequired,
  showDetail: PropTypes.func.isRequired,
  productIndex: PropTypes.number.isRequired,
  keyword: PropTypes.string.isRequired,
  listView: PropTypes.string.isRequired,
};

export default ProductGallery;
