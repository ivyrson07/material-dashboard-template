const DRAWER_WIDTH = 271;
const SMALL_DRAWER_WIDTH = 71;
const TOP_HEIGHT = 64;
export default theme => ({
  wrapper: {
    position: 'relative'
  },
  topbar: {
    position: 'fixed',
    width: '100%',
    top: 0,
    left: 0,
    right: 'auto',
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  topbarShift: {
    marginLeft: DRAWER_WIDTH,
    width: `calc(100% - ${DRAWER_WIDTH}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  appBarShift: {
    marginLeft: DRAWER_WIDTH,
    width: `calc(100% - ${DRAWER_WIDTH}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  viewContainer: {
    flexGrow: 1,
    marginTop: TOP_HEIGHT,
    paddingTop: theme.spacing(4),
    // dark theme
    backgroundColor: '#464B53',
    // colorful theme
    // backgroundColor: '#FFF',//theme.palette.background.default,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  breadcrumb: {
    marginLeft: theme.spacing(6),
    marginRight: theme.spacing(6)
  },
  breadcrumbText: {
    // dark theme
    color: '#C2C7CB'
  },
  breadcrumbPrimaryText: {
    fontWeight: 500,
    // dark theme
    color: '#C2C7CB'
  },
  content: {
    padding: theme.spacing(0, 2),
  },
  contentShift: {
    marginLeft: `calc( ${DRAWER_WIDTH}px - 1px)`
  },
  narrowContent: {
    marginLeft: SMALL_DRAWER_WIDTH
  },
  speedDial: {
    position: 'fixed',
    bottom: theme.spacing(5),
    right: theme.spacing(6),
    // '&$directionUp, &$directionLeft': {
    // },
  },
});
