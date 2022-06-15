import {
    IBillingSelectionState,
    ICheckoutCreditCardState,
    ICheckoutInvoiceState,
    ICheckoutStepsCompletionState,
    IDeliverySelectionState
} from '@interfaces/checkout';
import { IAddressFormState } from '@interfaces/forms';

export const deliverySelectionDefault: IDeliverySelectionState = {
    selectedAddressId: null,
    isAddNew: false,
};

export const billingSelectionDefault: IBillingSelectionState = {
    selectedAddressId: null,
    isAddNew: false,
    isSameAsDelivery: false,
};

export const deliveryNewAddressDefault: IAddressFormState = {
    salutation: {
        value: ' ',
        isError: false,
    },
    firstName: {
        value: '',
        isError: false,
    },
    lastName: {
        value: '',
        isError: false,
    },
    company: {
        value: '',
        isError: false,
    },
    address1: {
        value: '',
        isError: false,
    },
    address2: {
        value: '',
        isError: false,
    },
    address3: {
        value: '',
        isError: false,
    },
    email: {
        value: '',
        isError: false,
    },
    city: {
        value: '',
        isError: false,
    },
    zipCode: {
        value: '',
        isError: false,
    },
    country: {
        value: ' ',
        isError: false,
    },
    phone: {
        value: '',
        isError: false,
    },
};

export const billingNewAddressDefault: IAddressFormState = {
    ...deliveryNewAddressDefault,
};

export const stepCompletionCheckoutDefault: ICheckoutStepsCompletionState = {
    isAddressStepPassed: false,
    isBillingStepPassed: false,
    isShipmentStepPassed: false,
    isPaymentStepPassed: false
};

export const paymentCreditCardDefault: ICheckoutCreditCardState = {
    paymentProvider: {
        value: ' ',
        isError: false,
    },
    cardNumber: {
        value: '',
        isError: false,
    },
    cardName: {
        value: '',
        isError: false,
    },
    cardExpiryDate: {
        value: ' ',
        isError: false,
    },
    cardCVC: {
        value: '',
        isError: false,
    },
};

export const paymentInvoiceDefault: ICheckoutInvoiceState = {
    dateOfBirth: {
        value: '',
        isError: false,
    },
};
