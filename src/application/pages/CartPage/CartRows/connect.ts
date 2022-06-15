import { bindActionCreators, Dispatch } from 'redux';
import { reduxify } from '@hoc/Reduxify';
import { ICartItem } from '@interfaces/cart';
import { IReduxOwnProps, IReduxStore } from '@stores/reducers/types';
import {
    cartDeleteItemAction,
    updateItemInCartAction,
    updateCartFulfilledStateAction
} from '@stores/actions/common/cart';
import { getCartId, getProductsFromCart } from '@stores/reducers/common/cart/selectors';
import { isUserAuthenticated } from '@stores/reducers/pages/login/selectors';
import { getAnonymId } from '@stores/reducers/common/init/selectors';

const mapStateToProps = (state: IReduxStore, ownProps: IReduxOwnProps) => {
    const isUserLoggedIn: boolean = isUserAuthenticated(state, ownProps);
    const anonymId: string = getAnonymId(state, ownProps);
    const { items }: { items: ICartItem[] } = getProductsFromCart(state, ownProps);
    const cartId: string = getCartId(state, ownProps);
    const isCartRejected: boolean = state.cart.rejected;

    return {
        isUserLoggedIn,
        anonymId,
        items,
        cartId,
        isCartRejected
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
    cartDeleteItemAction,
    updateItemInCartAction,
    updateCartFulfilledStateAction
}, dispatch);

export const connect = reduxify(mapStateToProps, mapDispatchToProps);
