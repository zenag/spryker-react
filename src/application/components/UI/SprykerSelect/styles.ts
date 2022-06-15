import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
    root: {
        width: '100%',
        marginLeft: 0
    },
    formControl: {
        width: '100%',
        textTransform: 'capitalize',
        '& > label + div': {
            marginTop: 0
        }
    },
    icon: {
        fill: 'currentColor',
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        right: 18,
        width: 12,
        height: 12,
        lineHeight: 0,
        pointerEvents: 'none',
    },
    iconOpened: {
        color: theme.appColors.blue,
        transform: 'translateY(-50%) rotate(180deg)'
    },
    selectRoot: {
        transition: 'color 0.3s ease-in-out',
        color: theme.appColors.black,
        '&:hover': {
            color: theme.appColors.blue
        }
    },
    input: {
        boxSizing: 'border-box',
        display: 'flex',
        alignItems: 'center',
        height: 38,
        minWidth: 90,
        padding: '2px 42px 2px 16px',
        fontSize: 12,
        lineHeight: 1.5,
        letterSpacing: 0.1,
        borderRadius: 4,
        background: theme.appColors.weekWhite,
        color: theme.appColors.grey,
        transition: 'color 0.3s ease-in-out, background 0.3s ease-in-out',
        [theme.breakpoints.up('md')]: {
            padding: '5px 42px 5px 14px',
            height: 42,
            fontSize: 14,
        },
        '&:focus:hover, &:hover': {
            background: theme.appColors.darkWhite,
            color: theme.appColors.blue
        },
        '&:focus': {
            background: theme.appColors.weekWhite
        }
    },
    inputSimple: {
        height: 50,
        fontSize: 15,
        letterSpacing: 0.2,
        color: theme.appColors.black
    },
    inputPlaceholder: {
        '&$inputSimple': {
            color: theme.appColors.lightGrey
        }
    },
    inputFocused: {
        background: theme.appColors.white,
        boxShadow: '0 2px 10px 0 rgba(216, 216, 216, 0.5)'
    },
    menu: {
        minHeight: '0',
        borderRadius: 4,
        boxShadow: ' 0 4px 10px 0 rgba(216, 216, 216, 0.5)',
        marginTop: -3,
        minWidth: 140,
        '&& ul': {
            padding: '10px 10px 2px !important'
        }
    },
    menuItem: {
        display: 'flex',
        fontSize: 14,
        lineHeight: 1.5,
        padding: '12px 44px 12px 14px',
        marginBottom: 8,
        letterSpacing: 0.1,
        height: 'auto',
        borderRadius: 4,
        color: theme.appColors.grey,
        background: theme.appColors.weekWhite,
        '&:after, &:before': {
            content: '""',
            position: 'absolute',
            right: 15,
            top: '50%',
            transform: 'translateY(-50%)',
            borderRadius: 50
        },
        '&:after': {
            width: 14,
            height: 14,
            border: `1px solid ${theme.appColors.lightGrey}`
        },
        '&:before': {
            right: 19,
            width: 8,
            height: 8
        },
        '&:hover': {
            boxShadow: '0 2px 10px 0 rgba(216, 216, 216, 0.5)',
            background: theme.appColors.white
        },
        '&$selected': {
            color: theme.appColors.white,
            background: theme.appColors.blue,
            '&:hover': {
                background: theme.appColors.darkBlue
            }
        }
    },
    selected: {
        color: theme.appColors.white,
        background: theme.appColors.blue,
        '&:after': {
            borderColor: theme.appColors.white
        },
        '&:before': {
            background: theme.appColors.white
        }
    },
    menuItemPlaceholder: {
        display: 'none'
    },
    menuItemText: {
        minWidth: 0,
        overflow: 'hidden',
        textOverflow: 'ellipsis'
    },
    title: {
        display: 'inline-flex'
    },
    label: {
        display: 'block',
        position: 'static',
        paddingBottom: 10,
        color: theme.appColors.grey,
        fontSize: 15,
        letterSpacing: 0.2,
        lineHeight: 1.3,
        fontWeight: 400,
        transform: 'none',
        '&$labelFocused': {
            color: theme.appColors.grey
        }
    },
    labelFocused: {},
    asterisk: {
        color: theme.appColors.blue
    },
});
