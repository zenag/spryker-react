import { bindActionCreators, Dispatch } from 'redux';
import { reduxify } from '@hoc/Reduxify';
import {
    getCustomerReference,
    isPageLoginStateLoading,
    isUserAuthenticated
} from '@stores/reducers/pages/login/selectors';
import { customerRegisterAction } from '@stores/actions/pages/login';
import { getCustomerCartsAction } from '@stores/actions/common/cart';
import { IReduxOwnProps, IReduxStore } from '@stores/reducers/types';
import { isCartStateLoading } from '@stores/reducers/common/cart/selectors';
import { addMultipleAddressAction } from '@stores/actions/pages/addresses';
import { IBillingSelectionState } from '@interfaces/checkout';
import { IAddressFormState } from '@interfaces/forms';

const mapStateToProps = (state: IReduxStore, ownProps: IReduxOwnProps) => {
    const isUserLoggedIn: boolean = isUserAuthenticated(state, ownProps);
    const isLoading: boolean = isPageLoginStateLoading(state, ownProps)
        ? isPageLoginStateLoading(state, ownProps) : false;
    const isCartLoading: boolean = isCartStateLoading(state, ownProps);
    const customer: string = getCustomerReference(state, ownProps);
    const billingSelection: IBillingSelectionState = state.pageCheckout.billingSelection;
    const billingNewAddress: IAddressFormState = state.pageCheckout.billingNewAddress;
    const deliveryNewAddress: IAddressFormState = state.pageCheckout.deliveryNewAddress;
    const isMultipleAddressesLoading: boolean = state.pageAddresses.data.isMultipleAddressesLoading;

    return {
        isUserLoggedIn,
        isLoading,
        isCartLoading,
        customer,
        billingSelection,
        billingNewAddress,
        deliveryNewAddress,
        isMultipleAddressesLoading
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
    customerRegisterAction,
    getCustomerCartsAction,
    addMultipleAddressAction
}, dispatch);

export const connect = reduxify(mapStateToProps, mapDispatchToProps);
