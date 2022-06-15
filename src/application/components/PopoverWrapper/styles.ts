import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
    popover: {},
    customCoordinates: {
        position: 'absolute',
        right: 0,
        top: '100%',
        left: 'auto',
        bottom: 'auto',
        width: '100%'
    },
    backdrop: {
        background: 'none'
    },
    content: {
        borderRadius: 0,
        overflowY: 'auto'
    },
    contentCustomCoordinates: {
        right: 0,
        left: 'auto !important',
        top: '0 !important',
        maxWidth: 'none',
        maxHeight: 'none'
    }
});
