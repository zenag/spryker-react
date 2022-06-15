import * as React from 'react';
import { connect } from './connect';
import { withStyles } from '@material-ui/core';
import { checkFormInputValidity, checkFormValidity } from '@helpers/forms';
import { newAddressConfigInputStable, checkoutFormsNames, checkoutSelectionInputs } from '@constants/checkout';
import { IBillingFormProps as Props } from './types';
import { IAddressItemCollection } from '@interfaces/addresses';
import { InputChangeEvent } from '@interfaces/common';
import { styles } from './styles';
import { AddressForm } from '@components/AddressForm';
import { FormattedMessage } from 'react-intl';
import { SprykerCheckbox } from '@components/UI/SprykerCheckbox';
import { SavedAddressForm } from '@pages/CheckoutPage/CheckoutAddressStep/SavedAddressForm';

@connect
class BillingFormComponent extends React.Component<Props> {
    public componentDidMount = (): void => {
        this.setDefaultAddresses();
    };

    public componentDidUpdate = (prevProps: Props): void => {
        const shouldCheckFormValidity = prevProps.billingNewAddress !== this.props.billingNewAddress;

        if (shouldCheckFormValidity) {
            this.handleBillingNewAddressValidity();
        }
    };

    protected setDefaultAddresses = (): void => {
        const { addressesCollection: collection } = this.props;
        const { isAddNew, selectedAddressId, isSameAsDelivery } = this.props.billingSelection;
        const filteredCollection = Boolean(collection) ? collection.filter((item: IAddressItemCollection) =>
            item.isDefaultBilling === true) : null;
        const defaultValueBilling = filteredCollection && filteredCollection[0] ? filteredCollection[0].id : null;

        if (isAddNew || Boolean(selectedAddressId) || isSameAsDelivery) {
            return;
        }

        if (defaultValueBilling) {
            this.handleBillingSelection(checkoutSelectionInputs.isSameAsDeliveryValue, false);
            this.handleBillingSelection(defaultValueBilling);

            return null;
        }

        this.handleBillingSelection(checkoutSelectionInputs.isSameAsDeliveryValue, true);
    };

    protected handleBillingInputs = (event: InputChangeEvent): void => {
        const { name, value } = event.target;
        const { mutateStateNewAddressBillingAction } = this.props;
        const isInputValid = checkFormInputValidity({ value, fieldConfig: newAddressConfigInputStable[name] });
        const changedFiledData = { key: name, value, isError: !isInputValid };

        mutateStateNewAddressBillingAction(changedFiledData);
    };

    protected handleBillingNewAddressValidity = (): boolean => {
        const { mutateBillingStepAction, billingNewAddress } = this.props;
        const isFormValid = checkFormValidity({ form: billingNewAddress, fieldsConfig: newAddressConfigInputStable });
        mutateBillingStepAction(isFormValid);

        return isFormValid;
    };

    protected handleSelectionsChange = (event: InputChangeEvent): void => {
        const { value } = event.target;

        this.handleBillingSelection(value);
    };

    protected handleBillingSelection = (value: string, checker = false): void => {
        const {
            mutateStateBillingSelectionSameAsDeliveryAction,
            mutateStateBillingSelectionAddressIdAction,
            mutateStateBillingSelectionAddNewAction,
            billingSelection: { isSameAsDelivery }
        } = this.props;

        if (value === checkoutSelectionInputs.isAddNewBillingValue) {
            mutateStateBillingSelectionAddNewAction();

            return null;
        }

        if (value === checkoutSelectionInputs.isSameAsDeliveryValue) {
            const mutatedValue = checker ? checker : !isSameAsDelivery;
            mutateStateBillingSelectionSameAsDeliveryAction(mutatedValue);

            return null;
        }

        mutateStateBillingSelectionAddressIdAction(value);
    };

    protected getCurrentValueBillingSelection = (): IAddressItemCollection['id'] | string => {
        const { selectedAddressId, isAddNew, isSameAsDelivery } = this.props.billingSelection;

        return selectedAddressId || (isAddNew && checkoutSelectionInputs.isAddNewBillingValue) ||
            (isSameAsDelivery && checkoutSelectionInputs.isSameAsDeliveryValue) || null;
    };

    public render(): JSX.Element {
        const {
            billingNewAddress,
            addressesCollection,
            isUserLoggedIn,
            billingSelection: { isAddNew, isSameAsDelivery },
            classes
        } = this.props;

        const isAddressCollectionExist = addressesCollection && addressesCollection.length;
        const shouldShowNewAddressForm = isAddressCollectionExist ? isAddNew || !isUserLoggedIn : true;

        return (
            <>
                <form name={ checkoutFormsNames.sameAsDeliveryForm } className={ classes.sameFormCheckbox }>
                    <SprykerCheckbox
                        isChecked={ isSameAsDelivery }
                        changeHandler={ this.handleSelectionsChange }
                        label={ <FormattedMessage id={'same.as.delivery.label'} /> }
                        inputName={ checkoutSelectionInputs.isSameAsDeliveryValue }
                    />
                </form>
                { !isSameAsDelivery &&
                    <>
                        <SavedAddressForm
                            formName={ checkoutFormsNames.savedBilling }
                            currentMode={ this.getCurrentValueBillingSelection() }
                            onFieldChangeHandler={ this.handleSelectionsChange }
                            extraField={{
                                value: checkoutSelectionInputs.isAddNewBillingValue,
                                label: <FormattedMessage id={'add.new.billing.address.label'} />
                            }}
                        />
                        { shouldShowNewAddressForm &&
                            <AddressForm
                                shouldShowEmail
                                formName={ checkoutFormsNames.billing }
                                onFieldChangeHandler={ this.handleBillingInputs }
                                data={ billingNewAddress }
                            />
                        }
                    </>
                }
            </>
        );
    }
}

export const BillingForm = withStyles(styles)(BillingFormComponent);
