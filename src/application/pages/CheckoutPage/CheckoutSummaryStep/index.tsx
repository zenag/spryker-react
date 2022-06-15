import * as React from 'react';
import { ICheckoutSummaryStepProps as Props } from './types';
import { Button, Typography, withStyles } from '@material-ui/core';
import { styles } from './styles';
import {
    pathCheckoutAddressStep,
    pathCheckoutPaymentStep,
    pathCheckoutShipmentStep,
    pathCheckoutLoginStep
} from '@constants/routes';
import { NavLink, Redirect } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { CheckoutSummaryAddresses } from './CheckoutSummaryAddresses';
import { CheckoutSummaryShipment } from './CheckoutSummaryShipment';
import { CheckoutSummaryPayment } from './CheckoutSummaryPayment';
import { EditIcon } from './icons';

const CheckoutSummaryStepComponent: React.FC<Props> = (props): JSX.Element => {
    const {
        classes,
        isSendBtnDisabled,
        sendData,
        stepsCompletion: { isAddressStepPassed, isBillingStepPassed, isShipmentStepPassed, isPaymentStepPassed }
    } = props;
    const isAllCheckoutFormsFulfilled = isAddressStepPassed && isBillingStepPassed && isShipmentStepPassed &&
        isPaymentStepPassed;

    if (!isAllCheckoutFormsFulfilled) {
        return <Redirect to={ pathCheckoutLoginStep } />;
    }

    return (
        <div className={ classes.container }>
            <div className={ classes.block }>
                <div className={ classes.heading }>
                    <Typography component="h2" variant="h2" className={ classes.title }>
                        <FormattedMessage id={ 'word.addresses.title' } />
                    </Typography>
                    <NavLink to={ pathCheckoutAddressStep } className={ classes.link }>
                        <span className={ classes.linkIcon }><EditIcon /></span>
                    </NavLink>
                </div>
                <CheckoutSummaryAddresses />
            </div>
            <div className={ classes.block }>
                <div className={ classes.heading }>
                    <Typography component="h2" variant="h2">
                        <FormattedMessage id={ 'word.shipment.title' } />
                    </Typography>
                    <NavLink to={ pathCheckoutShipmentStep } className={ classes.link }>
                        <span className={ classes.linkIcon }><EditIcon /></span>
                    </NavLink>
                </div>
                <CheckoutSummaryShipment />
            </div>

            <div className={ classes.block }>
                <div className={ classes.heading }>
                    <Typography component="h2" variant="h2">
                        <FormattedMessage id={ 'word.payment.title' } />
                    </Typography>
                    <NavLink to={ pathCheckoutPaymentStep } className={ classes.link }>
                        <span className={ classes.linkIcon }><EditIcon /></span>
                    </NavLink>
                </div>
                <CheckoutSummaryPayment />
            </div>
            <div className={ classes.submitButton }>
                <Button
                    variant="contained"
                    disabled={ isSendBtnDisabled }
                    fullWidth
                    onClick={ sendData }
                >
                    { <FormattedMessage id={ 'place.order.title' } /> }
                </Button>
            </div>
        </div>
    );
};

export const CheckoutSummaryStep = withStyles(styles)(CheckoutSummaryStepComponent);
