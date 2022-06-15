import * as React from 'react';
import { connect } from './connect';
import { FormattedMessage, FormattedPlural } from 'react-intl';
import { withStyles, Typography } from '@material-ui/core';
import { OrderProductList } from './OrderProductsList';
import { ICustomerOrderDetailsProps as Props, ICustomerOrderDetailsState as State } from './types';
import { styles } from './styles';
import { DateFormatter } from '@components/DateFormatter';
import { AddressDetails } from '@components/AddressDetails';
import { TotalsBlock } from '@components/TotalsBlock';
import { NavLink } from 'react-router-dom';
import { pathCustomerOverview } from '@constants/routes';
import { PrevIcon } from './icons';

@connect
class CustomerOrderDetailsComponent extends React.Component<Props, State> {
    public readonly state: State = {
        selectedItems: {},
        selectedItemsData: null
    };

    public componentDidMount = (): void => {
        if (!this.props.isOrderExist || (this.props.isOrderExist && this.props.orderIdParam !== this.props.order.id)) {
            this.initRequestData();
        }
    };

    public componentDidUpdate = (): void => {
        if (!this.props.isRejected && !this.props.isOrderExist) {
            this.initRequestData();
        }
    };

    protected initRequestData = (): void => {
        if (this.props.isLoading) {
            return;
        }

        if (this.props.isAppDataSet && this.props.orderIdParam) {
            this.props.getOrderDetailsAction(this.props.orderIdParam as string);
        }
    };

    protected orderAmount = (): number => {
        const { order } = this.props;

        return order.items.reduce((accumulator, currentValue): number => accumulator + currentValue.quantity, 0);
    };

    public render(): JSX.Element {
        const { classes, isOrderExist, isFulfilled, order } = this.props;

        return (
            <>
                { isFulfilled &&
                    <>
                        <div className={ classes.heading }>
                            <Typography component="h1" variant="h2">
                                <FormattedMessage id={ 'order.details.title' } />
                            </Typography>
                            { isOrderExist &&
                                <span className={ classes.amount }>
                                    {`${ this.orderAmount() } `}
                                    <FormattedPlural
                                        value={ this.orderAmount() }
                                        one={ <FormattedMessage id={ 'word.item.title' } /> }
                                        other={ <FormattedMessage id={ 'word.items.title' } /> }
                                    />
                                </span>
                            }
                        </div>
                        { isOrderExist
                            ? <>
                                <div className={ classes.block }>
                                    <span className={ classes.generalInfoRow }>
                                        <span className={ classes.generalInfoTitle }>
                                            <FormattedMessage id={ 'order.detail.number.title' } />
                                        </span>
                                        <span className={ classes.generalInfoDescritption }>
                                            { order.id }
                                        </span>
                                    </span>
                                    <span className={ classes.generalInfoRow }>
                                        <span className={ classes.generalInfoTitle }>
                                            <FormattedMessage id={ 'order.detail.date.title' } />
                                        </span>
                                        <span className={ classes.generalInfoDescritption }>
                                            <DateFormatter date={ order.dateCreated } />
                                        </span>
                                    </span>
                                    <OrderProductList items={ order.items } />
                                </div>
                                <AddressDetails
                                    address={ order.billingAddress }
                                    title={<FormattedMessage id={ 'billing.address.title' } />}
                                />
                                <AddressDetails
                                    address={ order.shippingAddress }
                                    title={<FormattedMessage id={ 'shipping.address.title' } />}
                                />
                                <div className={ classes.block }>
                                    <Typography component="h3" variant="h3" className={ classes.blockTitle }>
                                        <FormattedMessage id={ 'orders.total.title' } />
                                    </Typography>
                                    <TotalsBlock
                                        totals={ order.totals }
                                        expenses={ order.expenses }
                                        isMinus={ false }
                                        classes={{
                                            discountText: classes.discountText,
                                            wrapper: classes.totalWrapper,
                                            row: classes.totalRow,
                                            totalText: classes.totalText,
                                            totalTextPrice: classes.totalTextPrice
                                        }}
                                    />
                                </div>

                                <div className={ classes.back }>
                                    <NavLink to={ pathCustomerOverview } className={ classes.backLink }>
                                        <span className={ classes.icon } >
                                            <PrevIcon />
                                        </span>
                                        <FormattedMessage id={ 'word.back.title' } />
                                    </NavLink>
                                </div>
                            </>
                            : (
                                <Typography component="h3" variant="h3">
                                    <FormattedMessage id={ 'no.order.message' } /> } />
                                </Typography>
                            )
                        }
                    </>
                }
            </>
        );
    }
}

export const CustomerOrderDetails = withStyles(styles)(CustomerOrderDetailsComponent);
