import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
    wrapper: {
        position: 'relative',
        height: '100%'
    },
    wrapperHoverable: {
        '&:hover': {
            '& $tooltip': {
                transform: 'scale(1)',
                opacity: 1
            }
        }
    },
    cartPopover: {
        marginTop: -10
    },
    badge: {
        transition: 'transform .3s ease-in-out',
        background: theme.appColors.blue,
        width: 'auto',
        minWidth: 16,
        right: 0,
        top: -6,
        transform: 'translateX(40%)',
        padding: 2,
        height: 16,
        fontSize: 11,
        lineHeight: 14,
        [theme.breakpoints.up('sm')]: {
            padding: 4,
            minWidth: 18,
            height: 18,
        }
    },
    hideBadge: {
        transform: 'scale(0)'
    },
    cartNotification: {
        top: 70,
        right: 21
    },
    iconButton: {},
    isPopupOpened: {},
    iconButtonUnhoverable: {},
    icon: {},
    tooltip: {
        position: 'absolute',
        top: '100%',
        right: 0,
        transform: 'scale(0)',
        opacity: 0,
        marginTop: 5,
        padding: '4px 8px',
        fontSize: 10,
        lineHeight: 1,
        borderRadius: 4,
        background: 'rgba(97, 97, 97, 0.9)',
        color: theme.appColors.white,
        transition: 'transform 0.2s ease-in-out, opacity 0.2s ease-in-out',
        whiteSpace: 'nowrap',
        pointerEvents: 'none',
        transformOrigin: 'top right'
    }
});
