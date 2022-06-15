import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
    textField: {},
    inputRoot: {
        'label + &': {
            marginTop: 0
        }
    },
    input: {
        boxSizing: 'border-box',
        borderRadius: 4,
        border: `solid 1px ${theme.appColors.weekWhite}`,
        backgroundColor: theme.appColors.weekWhite,
        padding: '4px 16px',
        width: '100%',
        height: 50,
        lineHeight: 1.5,
        letterSpacing: 0.2,
        color: theme.appColors.black,
        fontSize: 15,
        fontWeight: 500,
        boxShadow: 'none',
        appearance: 'none',
        '&::-webkit-inner-spin-button, &::-webkit-outer-spin-button': {
            appearance: 'none',
            margin: 0
        },
        '&::-webkit-input-placeholder, &::placeholder': {
            opacity: 1,
            color: theme.appColors.lightGrey

        },
        '&:focus': {
            backgroundColor: theme.appColors.white
        }
    },
    inputStartIcon: {
        paddingLeft: 57
    },
    inputEndIcon: {
        paddingRight: 57
    },
    error: {
        color: theme.appColors.red,
        '& $input': {
            color: theme.appColors.red,
            borderColor: theme.appColors.red,
            background: 'rgba(235, 85, 60, 0.05)',
            boxShadow: `inset 0 0 0 0.5px ${theme.appColors.red}`,
            '&::-webkit-input-placeholder, &::placeholder': {
                color: theme.appColors.red
            },
        },
        '& $icon': {
            fill: theme.appColors.red
        }
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
        },
        '&$labelError': {
            color: theme.appColors.red
        }
    },
    labelFocused: {},
    labelError: {},
    asterisk: {
        color: theme.appColors.blue
    },
    icon: {},
    errorText: {
        display: 'none',
        marginTop: 8,
        fontSize: 13,
        letterSpacing: 0.1,
        color: theme.appColors.red
    },
    errorTextActive: {
        display: 'block'
    },
    placeholder: {
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        left: 16,
        right: 16,
        overflow: 'hidden',
        marginTop: 0,
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        pointerEvents: 'none',
        fontSize: 15,
        letterSpacing: 0.2,
        color: theme.appColors.weakGrey
    },
    placeholderError: {
        color: theme.appColors.red
    },
    placeholderFilled: {
        display: 'none'
    },
    placeholderFocused: {
        display: 'none'
    }
});
