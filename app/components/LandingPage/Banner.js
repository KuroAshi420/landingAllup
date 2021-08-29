import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import link from "enl-api/ui/link";
import { injectIntl, FormattedMessage } from "react-intl";
import messages from "./messages";
import "enl-styles/vendors/slick-carousel/slick-carousel.css";
import "enl-styles/vendors/slick-carousel/slick.css";
import "enl-styles/vendors/slick-carousel/slick-theme.css";
import Slider from "react-slick";
import styles from "./landingStyle-jss";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import DetailModal from "./DetailModal";
import { categoriesData } from "./CategoriesData";

function Banner(props) {
  const { classes } = props;
  const settings = {
    dots: true,
    infinite: true,
    centerMode: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className={classNames(classes.banner, classes.fit)}>
      <svg className={classNames(classes.deco, classes.decoLeft)}>
        <use xlinkHref="/images/decoration/hexaDecoration.svg#decoration" />
      </svg>
      <svg className={classNames(classes.deco, classes.decoRight)}>
        <use xlinkHref="/images/decoration/hexaDecoration.svg#decoration" />
      </svg>
      <svg className={classNames(classes.deco, classes.decoBottom)}>
        <use xlinkHref="/images/decoration/hexaDecoration.svg#decoration" />
      </svg>
      <div className={classes.container}>
        <Typography component="h2" variant="h2" gutterBottom>
          AllUp
        </Typography>
        <Typography component="p" variant="h5" gutterBottom>
          <FormattedMessage {...messages.subtitle} />
        </Typography>
        <div className={classes.btnArea}>
          <Button
            size="large"
            variant="contained"
            color="secondary"
            className={classes.button}
            component={Link}
            to={link.register}
          >
            <FormattedMessage {...messages.demo} />
          </Button>
        </div>
        <div>
          <Slider {...settings}>
            {categoriesData.map((item) => (
              <div className={classes.item}>
                <Card className={classes.root}>
                  <CardActionArea>
                    <CardMedia
                      className={classes.media}
                      image={item.image}
                      title="Contemplative Reptile"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h5">
                        {item.name}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <div className={classes.btn}>
                      <DetailModal
                        category={item}
                        categoryData={categoriesData}
                      />
                    </div>
                  </CardActions>
                </Card>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
}

Banner.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(injectIntl(Banner));

/* import React from "react";
import Slider from "react-slick";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import imgData from "enl-api/images/imgData";
import "enl-styles/vendors/slick-carousel/slick-carousel.css";
import "enl-styles/vendors/slick-carousel/slick.css";
import "enl-styles/vendors/slick-carousel/slick-theme.css";



class Banner extends React.Component {
  render() {
    const { classes } = this.props;
    const settings = {
      dots: true,
      infinite: true,
      centerMode: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1,
    };
    return (
      <div>
        <Slider {...settings}>
          <div className={classes.item}>
            <img src="/images/screen/sports.png" alt="Sports" />
          </div>

          <div className={classes.item}>
            <img src="/images/screen/Hotel.jpg" alt="Hotel" />
          </div>

          <div className={classes.item}>
            <img src="/images/screen/human.jpg" alt="Human" />
          </div>

          <div className={classes.item}>
            <img src="/images/screen/beauty.jpg" alt="beauty" />
          </div>
        </Slider>
      </div>
    );
  }
}

Banner.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Banner); */
