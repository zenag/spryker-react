import * as React from 'react';
import { connect } from './connect';
import { withStyles, Grid, Radio, FormControlLabel } from '@material-ui/core';
import { checkFormInputValidity, checkFormValidity, cardExpiryFormat } from '@helpers/forms';
import { checkoutFormsNames, creditCardConfigInputStable } from '@constants/checkout';
import { InputChangeEvent } from '@interfaces/common';
import { ICreditCardPaymentFormProps as Props } from './types';
import { styles } from './styles';
import { FormattedMessage } from 'react-intl';
import { SprykerInput } from '@components/UI/SprykerInput';
import { CardIcon, CalendarIcon, LockIcon, QuestionIcon } from './icons';

@connect
class CreditCardPaymentFormComponent extends React.Component<Props> {
    public componentDidUpdate = (prevProps: Props): void => {
        const shouldCheckFormValidity = prevProps.paymentCreditCardData !== this.props.paymentCreditCardData;

        if (shouldCheckFormValidity) {
            this.handleCreditCardValidity();
        }
    };

    protected handleCreditCardInputs = (event: InputChangeEvent): void => {
        const { mutateStateCreditCardAction } = this.props;
        const { name, value } = event.target;

        const isInputValid = checkFormInputValidity({ value, fieldConfig: creditCardConfigInputStable[name] });
        const changedFiledData = { key: name, value, isError: !isInputValid };

        mutateStateCreditCardAction(changedFiledData);
    };

    protected handleCreditCardValidity = (): void => {
        const { paymentCreditCardData, mutatePaymentSectionAction } = this.props;

        const isFormValid = checkFormValidity({form: paymentCreditCardData, fieldsConfig: creditCardConfigInputStable});
        mutatePaymentSectionAction(isFormValid);
    };

    protected renderPaymentProviderItems = (): JSX.Element[] => {
        const { classes, providersCollection, paymentCreditCardData } = this.props;
        const selectedValue = paymentCreditCardData.paymentProvider.value;

        return providersCollection.map(item => (
            <Grid item xs={ 6 }  lg={ 3 } key={ item.value }>
                <FormControlLabel
                    value={ item.value.toString() }
                    classes={{
                        root: `${classes.inputRadio} ${item.value === selectedValue ? classes.checkedInputRadio : '' }`,
                        label: classes.radioLabel
                    }}
                    control={
                        <Radio
                            name={ creditCardConfigInputStable.paymentProvider.inputName }
                            classes={{ root: classes.radio }}
                            onChange={ this.handleCreditCardInputs }
                            checked={ item.value === selectedValue }
                            checkedIcon={<></>}
                            icon={<></>}
                        />
                    }
                    label={ item.labelIcon }
                />
            </Grid>
        ));
    };

    public render = (): JSX.Element => {
        const { classes, paymentCreditCardData } = this.props;

        return (
            <form name={ checkoutFormsNames.creditCard }>
                <Grid container spacing={ 24 }>
                    <Grid item xs={ 12 }>
                        <span className={ classes.label }>
                            <FormattedMessage id={ 'payment.provider.label' } />
                            <span className={ classes.asterisk }>{`${' '}`}*</span>
                        </span>
                        <Grid container spacing={ 16 }>
                            { this.renderPaymentProviderItems() }
                        </Grid>
                    </Grid>
                    <Grid item xs={ 12 }>
                        <SprykerInput
                            isRequired
                            label={ <FormattedMessage id={ 'payment.credit.card.number.label' } /> }
                            inputName={ creditCardConfigInputStable.cardNumber.inputName }
                            onChangeHandler={ this.handleCreditCardInputs }
                            inputValue={ paymentCreditCardData.cardNumber.value }
                            isError={ paymentCreditCardData.cardNumber.isError }
                            iconProps={{
                                iconStartComponent: {
                                    icon: <CardIcon />
                                }
                            }}
                            maskProps={{
                                mask: '-',
                                format: '# # # #   # # # #   # # # #   # # # #',
                                placeholder: '- - - -   - - - -   - - - -   - - - -'
                            }}
                        />
                    </Grid>
                    <Grid item xs={ 12 }>
                        <SprykerInput
                            isRequired
                            label={ <FormattedMessage id={ 'payment.credit.card.name.label' } /> }
                            inputName={ creditCardConfigInputStable.cardName.inputName }
                            onChangeHandler={ this.handleCreditCardInputs }
                            inputValue={ paymentCreditCardData.cardName.value }
                            isError={ paymentCreditCardData.cardName.isError }
                        />
                    </Grid>
                    <Grid item xs={ 12 } lg={ 6 }>
                        <SprykerInput
                            isRequired
                            label={ <FormattedMessage id={ 'payment.expiry.date.label' } /> }
                            inputName={ creditCardConfigInputStable.cardExpiryDate.inputName }
                            onChangeHandler={ this.handleCreditCardInputs }
                            inputValue={ paymentCreditCardData.cardExpiryDate.value }
                            isError={ paymentCreditCardData.cardExpiryDate.isError }
                            iconProps={{
                                iconStartComponent: {
                                    icon: <CalendarIcon />
                                }
                            }}
                            maskProps={{
                                format: cardExpiryFormat,
                                placeholder: 'MM/YY'
                            }}
                        />
                    </Grid>
                    <Grid item xs={ 12 } lg={ 6 }>
                        <SprykerInput
                            isRequired
                            label={ <FormattedMessage id={ 'payment.credit.card.cvc.label' } /> }
                            inputName={ creditCardConfigInputStable.cardCVC.inputName }
                            onChangeHandler={ this.handleCreditCardInputs }
                            inputValue={ paymentCreditCardData.cardCVC.value }
                            isError={ paymentCreditCardData.cardCVC.isError }
                            iconProps={{
                                iconStartComponent: {
                                    icon: <LockIcon />
                                },
                                iconEndComponent: {
                                    icon: <span className={ classes.tooltipContainer }><QuestionIcon /></span>,
                                    tooltip: true,
                                    tooltipArrowed: true,
                                    tooltipComponent: (
                                        <>
                                            <span className={ classes.tooltipTitle }>
                                                <FormattedMessage id={ 'cvc.hint.title' } />
                                            </span>
                                            <FormattedMessage id={ 'cvc.hint.message' } />
                                        </>
                                    )
                                }
                            }}
                            maskProps={{
                                format: '####',
                                placeholder: 'XXX'
                            }}
                        />
                    </Grid>
                </Grid>
            </form>
        );
    };
}

export const CreditCardPaymentForm = withStyles(styles)(CreditCardPaymentFormComponent);
