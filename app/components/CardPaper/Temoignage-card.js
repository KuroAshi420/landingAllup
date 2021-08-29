import React from 'react'
import './Temoignage-card.css'
import LanguageIcon from '@material-ui/icons/Language';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
function TemoignageCard(props) {
 
    return (
        <div className="TemoignageCard">
            <div className="Temoig-card-img-container">
                <img src={props.tem.img} />
            </div>
            <div className="footer-temoignage">

                <h3 className="TemoignageCard-title">{props.tem.title}</h3>

            </div>
            <p className="TemoignageCard-descrep">{props.tem.descreption}</p>

            <div className="temoignage-icons">
                <a href={props.tem.linkWeb} target="_blank"><LanguageIcon color="primary"/></a>
                
                <a href={props.tem.linkIn} target="_blank"><LinkedInIcon color="primary"/></a>
            </div>
        </div>
    )
}

export default TemoignageCard;
