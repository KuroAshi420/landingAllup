import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import reactLogo from 'enl-images/logo/react.svg';
import Vermeg from 'enl-images/logo/Vermeg.png';
import California from 'enl-images/logo/California.png';
import Talan from 'enl-images/logo/Talan.png';
import Binance from 'enl-images/logo/Binance.png';
import Coin from 'enl-images/logo/Coin.png';
import Ethereum from 'enl-images/logo/Ethereum.png';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import messages from './messages';
import Title from './Title';
import styles from './landingStyle-jss';

function Technology(props) {
  const { classes, intl } = props;
  return (
    <div className={classes.tech}>
      <div className={classes.container}>
        <Title title={intl.formatMessage(messages.titleTech)} desc="Cras convallis lacus orci, tristique tincidunt magna consequat in." align="center" />
        <Grid container className={classes.root} spacing={3}>
          <Grid item sm={4} xs={12}>
            <div className={classes.wool}>
              <figure>
                <img src={Vermeg} alt="Vermeg logo" />
              </figure>
              <Typography variant="h5" className={classes.react}>Vermeg</Typography>
            </div>
            <div className={classes.wool}>
              <figure>
                <img src={Binance} alt="Binance logo" />
              </figure>
              <Typography variant="h5" className={classes.router}>Binance</Typography>
            </div>
          </Grid>
          <Grid item sm={4} xs={12}>
            <div className={classes.centerTech}>
              <div className={classes.wool}>
                <figure>
                  <img src={California} alt="California Gym" />
                </figure>
                <Typography variant="h5" className={classes.redux}>California Gym</Typography>
              </div>
              <Hidden smDown>
                <Button variant="contained" size="large" color="secondary">
                  <FormattedMessage {...messages.buttonTech} />
                </Button>
              </Hidden>
              <div className={classes.wool}>
                <figure>
                  <img src={Ethereum} alt="Ethereum logo" />
                </figure>
                <Typography variant="h5" className={classes.jss}>Ethereum</Typography>
              </div>
            </div>
          </Grid>
          <Grid item sm={4} xs={12}>
            <div className={classes.wool}>
              <figure>
                <img src={Talan} alt="Talan logo" />
              </figure>
              <Typography variant="h5" className={classes.mui}>Talan</Typography>
            </div>
            <div className={classes.wool}>
              <figure>
                <img src={Coin} alt="CoinBase logo" />
              </figure>
              <Typography variant="h5" className={classes.webpack}>Coin Base</Typography>
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

Technology.propTypes = {
  classes: PropTypes.object.isRequired,
  intl: intlShape.isRequired
};

export default withStyles(styles)(injectIntl(Technology));
