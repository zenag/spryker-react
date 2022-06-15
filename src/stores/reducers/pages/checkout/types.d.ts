import { IAddressItemCollection } from '@interfaces/addresses';
import { IActionData, IReduxState } from '@stores/reducers/types';
import {
    IPaymentMethod,
    IShipmentMethod,
    IBillingSelectionState,
    ICheckoutCreditCardState,
    ICheckoutInvoiceState,
    ICheckoutStepsCompletionState,
    IDeliverySelectionState,
    IFormUpdatePaymentStatus,
    IFormFieldMutate
} from '@interfaces/checkout';
import { IAddressFormState } from '@interfaces/forms';

export interface ICheckoutState extends IReduxState {
    deliverySelection: IDeliverySelectionState;
    billingSelection: IBillingSelectionState;
    deliveryNewAddress: IAddressFormState;
    billingNewAddress: IAddressFormState;
    stepsCompletion: ICheckoutStepsCompletionState;
    shipmentMethod: string;
    shipmentMethodPrice: number;
    paymentMethod: string;
    paymentCreditCardData: ICheckoutCreditCardState;
    paymentInvoiceData: ICheckoutInvoiceState;
    data: ICheckoutStateData;
}

export interface IPageCheckoutAction extends IActionData {
    payloadSendFulfilled?: {
        orderId: string;
    };
    payloadGetFulfilled?: ICheckoutResponseData;
    payloadFormFieldMutate?: IFormFieldMutate;
    payloadCurrentSelection?: string;
    payloadFormUpdatePaymentStatus?: IFormUpdatePaymentStatus;
    payloadUpdateSectionStatus?: boolean;
    payloadSelectionSameAsDelivery?: boolean;
    payloadCurrentMethodSelection?: {
        id: string;
        price: number;
    };
}

export interface ICheckoutResponseData {
    payments: IPaymentMethod[];
    shipments: IShipmentMethod[];
    addressesCollection: IAddressItemCollection[];
}

export interface ICheckoutStateData extends ICheckoutResponseData {
    orderId: string;
}
