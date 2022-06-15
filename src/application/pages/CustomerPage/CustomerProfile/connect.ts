import { bindActionCreators, Dispatch } from 'redux';
import { reduxify } from '@hoc/Reduxify';
import { IReduxOwnProps, IReduxStore } from '@stores/reducers/types';
import {
    isCustomerProfilePresent,
    isPageCustomerProfileFulfilled,
    isPageCustomerProfileLoading,
    isPageCustomerProfileRejected
} from '@stores/reducers/pages/customerProfile/selectors';
import { getCustomerProfileAction } from '@stores/actions/pages/customerProfile';
import { getCustomerReference } from '@stores/reducers/pages/login/selectors';
import { isAppInitialized } from '@stores/reducers/common/init/selectors';

const mapStateToProps = (state: IReduxStore, ownProps: IReduxOwnProps) => {
    const isLoading = isPageCustomerProfileLoading(state, ownProps);
    const isRejected = isPageCustomerProfileRejected(state, ownProps);
    const isFulfilled = isPageCustomerProfileFulfilled(state, ownProps);
    const isAppDataSet = isAppInitialized(state, ownProps);
    const isCustomerDataExist = isCustomerProfilePresent(state, ownProps);
    const customerReference = getCustomerReference(state, ownProps);

    return {
        isLoading,
        isRejected,
        isFulfilled,
        isAppDataSet,
        isCustomerDataExist,
        customerReference
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
    getCustomerProfileAction
}, dispatch);

export const connect = reduxify(mapStateToProps, mapDispatchToProps);
