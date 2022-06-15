import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
    root: {
        [theme.breakpoints.up('lg')]: {
            padding: '21px 21px 11px',
            marginBottom: 30,
            background: theme.appColors.weekWhite,
            borderRadius: 4
        }
    },
    filtersHolder: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        flexDirection: 'column',
        background: theme.appColors.white,
        zIndex: 999,
        visibility: 'hidden',
        opacity: 0,
        pointerEvents: 'none',
        transition: 'visibility 0.2s ease-in-out, opacity 0.2s ease-in-out',
        [theme.breakpoints.up('md')]: {
            pointerEvents: 'auto',
            background: 'none',
            position: 'static',
            display: 'block',
            visibility: 'visible',
            opacity: 1
        },
        [theme.breakpoints.only('md')]: {
            display: 'none',
            padding: '21px 21px 11px',
            marginBottom: 20,
            background: theme.appColors.weekWhite,
            borderRadius: 4
        }
    },
    filtersOpen: {
        pointerEvents: 'auto',
        visibility: 'visible',
        opacity: 1,
        [theme.breakpoints.up('md')]: {
            display: 'block'
        }
    },
    button: {
        marginBottom: 20,
        color: theme.appColors.blue,
        borderColor: theme.appColors.blue,
        '&:hover': {
            backgroundColor: theme.appColors.white,
            color: theme.appColors.blue,
            borderColor: theme.appColors.blue
        },
        '&:active': {
            backgroundColor: theme.appColors.white,
            color: theme.appColors.blue,
            borderColor: theme.appColors.blue
        },
        [theme.breakpoints.up('lg')]: {
            display: 'none'
        }
    },
    buttonActive: {
        color: theme.appColors.grey,
        borderColor: theme.appColors.lightGrey,
        '&:hover': {
            color: theme.appColors.grey,
            borderColor: theme.appColors.lightGrey
        },
        '&:active': {
            color: theme.appColors.grey,
            borderColor: theme.appColors.lightGrey
        }
    },
    buttonIcon: {
        fill: 'currentColor',
        width: 24,
        height: 21,
        lineHeight: 1,
        marginRight: 15
    }
});
