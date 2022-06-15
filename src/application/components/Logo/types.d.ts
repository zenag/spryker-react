import { WithStyles } from '@material-ui/core/styles/withStyles';
import { styles } from './styles';

export interface ILogoProps extends WithStyles<typeof styles> {
    addSimpleLogo?: boolean;
    addlLogoWithoutImage?: boolean;
}
