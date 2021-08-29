import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import withWidth from '@material-ui/core/withWidth';
import Grid from '@material-ui/core/Grid';
import { injectIntl, intlShape } from 'react-intl';
import messages from './messages';
import TemoignageCard from '../CardPaper/Temoignage-card';
import Title from './Title';
import styles from './landingStyle-jss';
import "./showcase.css";
function Showcase(props) {
  const { classes, width, intl } = props;
  const tem = [
    {
      id : 1,
      descreption: 'All Up allows us to increase our employees commitmentand motivation too, thanks toits intelligent system which helps us to personalisethe deals and to select the most suitableones for our employees expectations and desires.It sabsolutely amazing work.',
      img : "https://i.imgur.com/X84yF8e.jpg",
      title : 'UIB',
      linkIn : "https://www.linkedin.com/company/uib/",
      linkWeb : "https://www.uib.com.tn/"
    },
    {
      id : 2,
      descreption: 'Thanks to All Up we can now save more time and resourcespreviously spent on finding thebest deals because now, by following a few steps,we can find the best deals that match ourconstraints.',
      img : "https://i.imgur.com/V25WM5f.jpg",
      title : 'NOTITIA',
      linkIn : "https://www.linkedin.com/company/notitia-tn/",
      linkWeb : "#"
    },
    {
      id : 3,
      descreption: 'The All Up group is composed of young Tunisians wholike to innovate and invent technologicalsolutions that create added value on all levels (technological,economic, etc.). We have fullconfidence in this team.',
      img : "https://i.imgur.com/FAls8ix.jpg",
      title : 'ISG TUNIS',
      linkIn : "#",
      linkWeb : "http://www.isg.rnu.tn/"
    },
    {
      id : 4,
      descreption: 'We have full confidence in the All Up applicationbecause we trust in the skills of the membersworking on this project, each of whom has his or herown strengths that can create a veryimportant added value in the implementation of theproject.Good luck All Up team.',
      img : "https://i.imgur.com/klj2PTx.jpg",
      title : 'UNIVERSIDAD DE MÁLAGA',
      linkIn : "https://www.linkedin.com/school/universidad-de-malaga/",
      linkWeb : "https://www.uma.es/#gsc.tab=0"
    },
    {
      id : 5,
      descreption: 'We think that All Up is a good solution for companiesthat can help them to motivate theiremployees. We recommend this solution and we are sureyou will like it.',
      img : "https://i.imgur.com/CgcJBmG.png",
      title : 'GIZ',
      linkIn : "https://www.linkedin.com/company/giz-tunisie/",
      linkWeb : "https://www.giz.de/en/html/index.html"
    },
  ]
  return (
    <section className={classes.showcase}>
      <div className={classes.container}>
      <Title title="WHAT ARE OUR USERS SAYING ?
" desc="All Up is a professional marketplace for enterprisesand companies willing to share and profitfrom deals. It is divided into interactive web applicationaimed for enterprises and mobileapplication principally for the employees." align={width === 'lg' ? 'center' : 'center'} />
        <div className='containerTemoin'>
        {tem.map((tem) => (
  <Grid item sm={6} md={4} xs={12}> 

  <TemoignageCard key={tem.id} tem={tem}/>
</Grid>
        ))}
        
          {/* <Grid item sm={6} md={4} xs={12}>
          <TemoignageCard/>
          
          </Grid>
          <Grid item sm={6} md={4} xs={12}>
          <TemoignageCard/>
              
          </Grid> */}
        </div>
      </div>
    </section>
  );
}


Showcase.propTypes = {
  classes: PropTypes.object.isRequired,
  width: PropTypes.string.isRequired,
  intl: intlShape.isRequired
};

export default withWidth()(withStyles(styles)(injectIntl(Showcase)));
