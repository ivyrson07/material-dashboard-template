import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';

// Externals
import classNames from 'classnames';
import compose from 'recompose/compose';
import PropTypes from 'prop-types';

// Material helpers
import { withStyles } from '@material-ui/core';

// Material components
import {
  Badge,
  IconButton,
  Popover,
  Toolbar,
  Avatar,
  Typography,
  Button,
  ClickAwayListener,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@material-ui/core';

// Material icons
import {
  Menu as MenuIcon,
  NotificationsOutlined as NotificationsIcon,
  Person as PersonIcon,
  Search as SearchIcon,
  ExpandMoreOutlined as ExpandIcon,
  StarBorderOutlined as StartIcon
} from '@material-ui/icons';

// Shared services
import { getNotifications } from 'services/notification';

// Custom components
import { NotificationList } from './components';

// Component styles
import styles from './styles';

import { Dropdown } from 'rsuite';

class Topbar extends Component {
  signal = true;

  state = {
    notifications: [],
    notificationsLimit: 4,
    notificationsCount: 0,
    notificationsEl: null,
    profileEl: null,
    dropdownOpen: false
  };

  async getNotifications() {
    try {
      const { notificationsLimit } = this.state;

      const { notifications, notificationsCount } = await getNotifications(
        notificationsLimit
      );

      if (this.signal) {
        this.setState({
          notifications,
          notificationsCount
        });
      }
    } catch (error) {
      return;
    }
  }

  componentDidMount() {
    this.signal = true;
    this.getNotifications();
  }

  componentWillUnmount() {
    this.signal = false;
  }

  handleSignOut = () => {
    const { history } = this.props;

    localStorage.setItem('isAuthenticated', false);
    history.push('/sign-in');
  };

  handleShowNotifications = event => {
    this.setState({
      notificationsEl: event.currentTarget
    });
  };

  handleCloseNotifications = () => {
    this.setState({
      notificationsEl: null,
    });
  };

  handleShowProfile = event => {
    this.setState({
      profileEl: event.currentTarget
    });
  };

  handleCloseProfile = () => {
    this.setState({
      profileEl: null
    })
  }

  handleClickDropDown = () => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  };

  handleClickAway = () => {
    this.setState({
      dropdownOpen: false
    });
  };


  render() {
    const { classes, className, isSidebarOpen, onToggleSidebar, isMobile } = this.props;
    const { notifications, notificationsCount, notificationsEl, profileEl, dropdownOpen, } = this.state;

    const rootClassName = classNames(classes.root, className);
    const showNotifications = Boolean(notificationsEl);
    const showProfile = Boolean(profileEl);

    return (
      <Fragment>
        <div className={rootClassName}>
          <Toolbar className={classes.toolbar}>
            <IconButton
              className={classNames(classes.menuButton, {
                [classes.hidden]: isSidebarOpen,
              })}
              onClick={onToggleSidebar}
              variant="text"
            >
              <MenuIcon />
            </IconButton>

            {/* TODO: search box */}
            {/* TODO: if isMobile --> leftButtons responsive */}

            {isMobile ?
              <div className={classes.dropdownContainer}>
                {/* <ClickAwayListener onClickAway={this.handleClickAway}>
                  <div>
                    <Button onClick={this.handleClickDropDown}>Open menu</Button>
                    {dropdownOpen ? (
                      <Paper className={classes.dropdown}>
                        <List component="div" disablePadding>
                          <ListItem button>
                            <ListItemIcon>
                              <StartIcon />
                            </ListItemIcon>
                          </ListItem>
                        </List>
                      </Paper>
                    ) : null}
                  </div>
                </ClickAwayListener> */}
              </div>
              :
              <div className={classes.leftButtons}>
                <IconButton
                >
                  <SearchIcon />
                </IconButton>
                <IconButton
                  onClick={this.handleShowNotifications}
                >
                  <Badge
                    badgeContent={notificationsCount}
                    color="primary"
                    variant="dot"
                  >
                    <NotificationsIcon />
                  </Badge>
                </IconButton>
                <IconButton
                >
                  <PersonIcon />
                </IconButton>

                {/* <Button size="small"
                  className={classes.profile}
                  onClick={this.handleShowProfile}>
                  <Avatar
                    className={classes.avatar}
                    src="/images/avatars/avatar_1.png"
                  />
                  <span>
                    Nguyễn Minh Híu
  </span>

                  <ExpandIcon />

                </Button> */}
              </div>}



          </Toolbar>
        </div>

        <Popover
          anchorEl={notificationsEl}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center'
          }}
          onClose={this.handleCloseNotifications}
          open={showNotifications}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center'
          }}
        >
          <NotificationList
            notifications={notifications}
            onSelect={this.handleCloseNotifications}
          />
        </Popover>
        <Popover
          anchorEl={profileEl}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          onClose={this.handleCloseProfile}
          open={showProfile}
        >
          <div>
            <Avatar
              className={classes.avatar}
              src="/images/avatars/avatar_1.png"
            />

            <Button
              color="primary"
              variant="outlined"
              onClick={this.handleSignOut}
            >
              Sign Out
          </Button>
          </div>
        </Popover>
      </Fragment>
    );
  }
}

Topbar.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  isSidebarOpen: PropTypes.bool,
  onToggleSidebar: PropTypes.func,
  title: PropTypes.string
};

Topbar.defaultProps = {
  onToggleSidebar: () => { }
};

export default compose(
  withRouter,
  withStyles(styles)
)(Topbar);
