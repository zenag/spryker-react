import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
    gridList: {
        width: 'auto',
        margin: -4,
        [theme.breakpoints.up('md')]: {
            margin: -8
        }
    },
    gridItem: {
        padding: 4,
        [theme.breakpoints.up('md')]: {
            padding: 8
        }
    },
    wrapper: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        [theme.breakpoints.up('md')]: {
            height: 'auto',
            display: 'block'
        }
    },
    heading: {
        display: 'flex',
        flexShrink: 0,
        position: 'relative',
        padding: '19px 50px 16px 15px',
        marginBottom: 20,
        background: theme.appColors.weekWhite,
        [theme.breakpoints.up('md')]: {
            display: 'none'
        }
    },
    filterIcon: {
        fill: theme.appColors.grey,
        width: 24,
        height: 21,
        lineHeight: 1,
        marginRight: 15
    },
    title: {
        color: theme.appColors.grey,
        fontSize: 16,
        fontWeight: 700,
        letterSpacing: 0.2
    },
    close: {
        position: 'absolute',
        right: 10,
        top: '50%',
        transform: 'translateY(-50%)',
        width: 30,
        height: 30,
        borderRadius: '50%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: theme.appColors.white
    },
    closeIcon: {
        fill: theme.appColors.grey,
        width: 12,
        height: 12,
        lineHeight: 0
    },
    apply: {
        marginTop: 5,
        padding: '16px 13px',
        flexShrink: 0,
        background: theme.appColors.weekWhite,
        [theme.breakpoints.up('md')]: {
            display: 'none'
        }
    },
    categoriesList: {
        [theme.breakpoints.up('lg')]: {
            display: 'none'
        }
    },
    filterList: {
        flexGrow: 1,
        padding: '0 16px',
        overflow: 'hidden',
        overflowY: 'auto',
        [theme.breakpoints.up('md')]: {
            padding: '0 0 10px',
            overflow: 'hidden'
        }
    }
});
