import { WithStyles } from '@material-ui/core/styles/withStyles';
import { styles } from './styles';
import { IOrderItem } from '@interfaces/order';

export interface IOrdersListProps extends WithStyles<typeof styles> {
    orders?: IOrderItem[];
    getOrdersCollectionAction?: Function;
    hasOrders?: boolean;
    isFulfilled?: boolean;
    shouldShowOrdersAmount?: boolean;
    ordersLimit?: number | Infinity;
    isInitiated?: boolean;
}
