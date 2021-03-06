import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import logo from './../../../../assets/images/logo/logovn.png';

// Externals
import classNames from 'classnames';
import PropTypes from 'prop-types';

// Material helpers
import { withStyles, Typography } from '@material-ui/core';
import { withTranslation } from "react-i18next";

// Material components
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
  Drawer,
  IconButton
} from '@material-ui/core';

// Context
import RouteContext from 'context/RouteContext'

// Material icons
import {
  DashboardOutlined as DashboardIcon,
  PeopleOutlined as PeopleIcon,
  ShoppingBasketOutlined as ShoppingBasketIcon,
  TextFields as TextFieldsIcon,
  InfoOutlined as InfoIcon,
  AccountBoxOutlined as AccountBoxIcon,
  SettingsOutlined as SettingsIcon,
  Close as CloseIcon,
  HomeOutlined as HomeIcon,
  TableChart as TableIcon,
  EditOutlined as EditIcon,
  MapOutlined as MapIcon
} from '@material-ui/icons';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

// Component styles
import styles from './styles';

const dashboardMenu = [
  {
    id: '1',
    name: 'Monitor',
    to: '/dashboard/monitor',
    icon: <DashboardIcon />
  },
  {
    id: '2',
    to: '/dashboard/users',
    name: 'Users',
    icon: <PeopleIcon />

  },
  {
    id: '3',
    to: '/dashboard/products',
    name: 'Products',
    icon: <ShoppingBasketIcon />
  },
  {
    id: '5',
    to: '/dashboard/tables',
    name: 'Tables',
    icon: <TableIcon />
  },
  {
    id: '6',
    to: '/dashboard/account',
    name: 'Account',
    icon: <AccountBoxIcon />
  },
  {
    id: '9',
    to: '/dashboard/form',
    name: 'Form',
    icon: <EditIcon />
  },
]

const moreMenu = [
  {
    id: '11',
    to: '/dashboard/about',
    name: 'About',
    icon: <InfoIcon />
  }
]

class NestedList extends Component {
  state = {};
  handleClick = e => {
    this.setState({ [e]: !this.state[e] });
  };

  render() {
    const { classes, open, data, match, title, t } = this.props;

    return (
      <div>
        <div className={classes.listHeader}>
          {open ? <Typography className={classes.listTitle} variant="span">{t(title)}</Typography> : <div className={classes.listTitleHidden}/>}
        </div>
        <List
          component="div"
          disablePadding
          className={classes.marginTopList}
        >
          {data && data.map((item) => {
            return (
              <div key={item.id}>
                {item.subitems == null ?
                  <ListItem
                    activeClassName={classes.activeListItem}
                    className={classes.listItem}
                    component={NavLink}
                    to={item.to ? (match.url + item.to) : ''}>
                    <ListItemIcon className={classes.listItemIcon}>
                      {item.icon}
                    </ListItemIcon>
                    {open ? <ListItemText
                      classes={{ primary: classes.listItemText }}
                      primary={t(item.name.toLowerCase())}
                    /> : null}
                  </ListItem> :
                  <div key={item.id}>
                    <ListItem
                      activeClassName={classes.activeListItem}
                      className={classes.listItem}
                      button
                      selected={this.state[item.name]}
                      onClick={this.handleClick.bind(
                        this,
                        item.name
                      )}>
                      <ListItemIcon className={classes.listItemIcon}>
                        {item.icon}
                      </ListItemIcon>
                      {open ? <ListItemText
                        classes={{ primary: classes.listItemText }}
                        primary={item.name}
                      /> : null}
                      {this.state[item.name] ? (<ExpandLess className={classNames(classes.listItemText, { [classes.hidden]: !open })} />) : (<ExpandMore className={classNames(classes.listItemText, { [classes.hidden]: !open })} />)}
                    </ListItem>
                    <Collapse
                      component="li"
                      in={this.state[item.name]}
                      timeout="auto"
                      unmountOnExit
                    >
                      <List disablePadding>
                        {item.subitems.map(
                          sitem => {
                            return (
                              <ListItem
                                activeClassName={classes.activeListSubItem}
                                className={classes.listSubItem}
                                component={NavLink}
                                to={sitem.to ? sitem.to : ''}>
                                <ListItemText
                                  classes={{ primary: classes.listItemText }}
                                  primary={sitem.name}
                                />
                              </ListItem>
                            );
                          }
                        )}
                      </List>
                    </Collapse>
                  </div>
                }
              </div>
            );
          }
          )}
        </List>
      </div>
    );
  }
}

class Sidebar extends Component {

  // A static variable for Route Context
  static contextType = RouteContext

  render() {
    const { classes, className, onClose, open, anchor, isHidden, onToggleSidebar, ...rest } = this.props;
    const { match } = this.context

    return (
      <Drawer
        // anchor={anchor}
        className={classNames(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: classNames({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
        onClose={onClose}
        open={open}
        variant={isHidden ? 'temporary' : 'permanent'}
      >
        <div className={classes.toolbar}>
          <div className={classes.logoWrapper}>
            <Link
              className={classes.logoLink}
              to={`${match.url}/dashboard/monitor`}>
              <img
                alt="Logo"
                className={classes.logoImage}
                src={logo}
              />
            </Link>
          </div>

          <IconButton
            className={classNames(classes.sidebarCollapseButton, {
              // [classes.hidden]: !open,
            })}
            onClick={onToggleSidebar}
            variant="text"
          >
            <CloseIcon />
          </IconButton>
        </div>

        <div className={classes.sidebar}>
          <NestedList title={"dashboard"} data={dashboardMenu} classes={classes} open={open} match={match} {...rest} />
          <NestedList title={"more"} data={moreMenu} classes={classes} open={open} match={match} {...rest} />
        </div>

      </Drawer>
    );
  }
}

Sidebar.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(withTranslation('default')(Sidebar));
