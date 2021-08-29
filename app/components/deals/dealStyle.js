import {
  cardTitle,
  title,
  successColor,
  whiteColor,
  grayColor,
  hexToRgb,
} from "./material-kit-react.js";
import imagesStyle from "./imageStyles.js";

const dealStyle = {
  section: {
    padding: "70px 0",
  },
  selectCategory: {
    textAlign: "center",
    minWidth: "150px",
  },
  title: {
    ...title,
    marginBottom: "1rem",
    marginTop: "30px",
    minHeight: "32px",
    textDecoration: "none",
    textAlign: "center",
  },

  ...imagesStyle,
  itemGrid: {
    marginLeft: "auto",
    marginRight: "auto",
  },
  cardTitle,
  smallTitle: {
    color: "#3d7c1e",
    fontSize: "20px",
  },
  avatar: {
    background: "#fff",
    width: "55px",
    height: "55px",
  },
  logo_card: {
    position: "absolute",
    bottom: "-24px",
    right: "16px",
  },
  logo_card2: {
    position: "absolute",
    top: "8px",
    right: "16px",
  },
  address_card: {
    position: "absolute",
    bottom: "8px",
    left: "16px",
    color: "#fff",
    fontWeight: "500",
  },

  imgContainer: {
    position: "relative",
    height: "200px",
    width: "100%",
    overflow: "hidden",
  },
  imgLogo: {
    width: "100%",
    height: "auto",
    overflow: "hidden",
  },
  imgCard: {
    width: "100%",
    height: "auto",
    overflow: "hidden",
  },
  description: {
    color: "#666",
  },
  justifyCenter: {
    display: "flex",
    justifyContent: "center",
  },
  socials: {
    marginTop: "0",
    width: "100%",
    transform: "none",
    left: "0",
    top: "0",
    height: "100%",
    lineHeight: "41px",
    fontSize: "20px",
    color: "#666",
  },
  margin5: {
    margin: "5px",
  },
  cardClass: {
    minHeight: "390px",
  },
  btnDetails: {
    margin: "5px",
    backgroundColor: "#5ea5ac",
  },
  successText: {
    color: successColor[0],
  },

  priceText: {
    fontWeight: "bolder",
    color: "#3d7c1e  ",
  },
  addressIcon: {
    width: "16px",
    height: "16px",
    color: grayColor[0],
  },
  addressText: {
    color: grayColor[0],
  },
  stats: {
    display: "inline-flex",
    fontSize: "12px",
    lineHeight: "22px",

    "& svg": {
      top: "4px",
      width: "16px",
      height: "16px",
      position: "relative",
      marginRight: "3px",
      marginLeft: "3px",
    },
    "& .fab,& .fas,& .far,& .fal,& .material-icons": {
      top: "4px",
      fontSize: "16px",
      position: "relative",
      marginRight: "3px",
      marginLeft: "3px",
    },
  },
  cardCategory: {
    color: grayColor[0],
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    paddingTop: "10px",
    marginBottom: "0",
  },
  cardCategoryWhite: {
    color: "rgba(" + hexToRgb(whiteColor) + ",.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0",
  },
  cardTitle: {
    color: grayColor[2],
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "bolder",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: grayColor[1],
      fontWeight: "400",
      lineHeight: "1",
    },
  },
  cardTitleWhite: {
    color: whiteColor,
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: grayColor[1],
      fontWeight: "400",
      lineHeight: "1",
    },
  },
  img: {
    width: "100%",
    height: "auto",
    overflow: "hidden",
  },

  box: {
    marginTop: "-30px",
    height: "180px",
    width: "100%",
    overflow: "hidden",
    borderRadius: "6px",
    boxShadow:
      "0 5px 15px -8px rgb(0 0 0 / 24%), 0 8px 10px -5px rgb(0 0 0 / 20%)",
  },
  notfound: {
    margin: "auto",
  },
};

export default dealStyle;
