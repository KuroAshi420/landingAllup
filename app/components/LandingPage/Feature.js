import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';
import { injectIntl, intlShape } from 'react-intl';
import messages from './messages';
import Title from './Title';
import styles from './landingStyle-jss';

let counter = 0;
function createFeatureData(icon, title, desc) {
  counter += 1;
  return {
    id: counter,
    icon,
    title,
    desc
  };
}

function Feature(props) {
  const featureList = [
    createFeatureData('loyalty', 'A Lot Of Deals', 'Best way to find better deals in our club and provide plenty of privileges.'),
    createFeatureData('chat', 'Free Chat', 'Because you need a free and easy way to communicate with other enterprises.'),
    createFeatureData('verified', 'Verified Accounts', 'Each company account must be verified in order to be able to propose a deal.')
  ];

  const { classes, intl } = props;
  return (
    <div className={classes.feature}>
      <div className={classes.container}>
        <Title title={intl.formatMessage(messages.titleFeature)} desc="AllUp is a professional virtual club for both small and medium sized enterprises and companies willing to share and profit from deals." align="center" />
        <Grid container className={classes.root} spacing={5}>
          { featureList.map(item => (
            <Grid key={item.id.toString()} item xs={12} md={4}>
              <Typography component="h4" variant="h6">
                <span className={classes.icon}>
                  <Icon>{item.icon}</Icon>
                </span>
                <br />
                {item.title}
              </Typography>
              <Typography>
                {item.desc}
              </Typography>
            </Grid>
          )) }
        </Grid>
      </div>
    </div>
  );
}

Feature.propTypes = {
  classes: PropTypes.object.isRequired,
  intl: intlShape.isRequired
};

export default withStyles(styles)(injectIntl(Feature));
