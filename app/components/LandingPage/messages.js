/*
 * Sidebar Component
 *
 * This contains all the text for the Sidebar Componen.
 */
import { defineMessages } from 'react-intl';

export const scope = 'boilerplate.components.Landing';

export default defineMessages({
  feature: {
    id: `${scope}.header.feature`,
    defaultMessage: 'Feature',
  },
  showcase: {
    id: `${scope}.header.Deals`,
    defaultMessage: 'Some Static Deals',
  },
  technology: {
    id: `${scope}.header.Partners`,
    defaultMessage: 'Our Partners',
  },
  contact: {
    id: `${scope}.header.contact`,
    defaultMessage: 'Contact',
  },
  login: {
    id: `${scope}.header.login`,
    defaultMessage: 'Sign In',
  },
  register: {
    id: `${scope}.header.register`,
    defaultMessage: 'Register',
  },
  subtitle: {
    id: `${scope}.banner.sub`,
    defaultMessage: 'Find Better Deals In Our Marketpalce',
  },
  demo: {
    id: `${scope}.banner.dem`,
    defaultMessage: 'Get Started',
  },
  titleFeature: {
    id: `${scope}.AllUp.title`,
    defaultMessage: 'Why choose AllUp ?',
  },
  titleShowcase: {
    id: `${scope}.Deals.title`,
    defaultMessage: 'Some Static Deals',
  },
  tryShowcase: {
    id: `${scope}.showcase.read`,
    defaultMessage: 'Read more',
  },
  demoShowcase: {
    id: `${scope}.showcase.rmore`,
    defaultMessage: 'Read more',
  },
  titleTech: {
    id: `${scope}.Partners.title`,
    defaultMessage: 'Our Partners',
  },
  buttonTech: {
    id: `${scope}.tech.button`,
    defaultMessage: 'Request To Implement Technology',
  },
  titleContact: {
    id: `${scope}.contact.title`,
    defaultMessage: 'Say hello to us',
  },
  nameContact: {
    id: `${scope}.contact.name`,
    defaultMessage: 'Who are You?',
  },
  emailContact: {
    id: `${scope}.contact.email`,
    defaultMessage: 'You\'r email?',
  },
  messagesContact: {
    id: `${scope}.contact.messages`,
    defaultMessage: 'Messages',
  },
  sendContact: {
    id: `${scope}.contact.send`,
    defaultMessage: 'Send',
  },
  copyright: {
    id: `${scope}.footer.copyright`,
    defaultMessage: 'Designs. All Right Reserved',
  }
});
