import { bindActionCreators, Dispatch } from 'redux';
import { reduxify } from '@hoc/Reduxify';
import { IWishlistState } from '@stores/reducers/pages/Wishlist/types';
import { IReduxOwnProps, IReduxStore } from '@stores/reducers/types';
import { addItemToCartAction } from '@stores/actions/common/cart';
import { deleteItemWishlistAction } from '@stores/actions/pages/wishlist';
import { getCartId, getTotalItemsQuantity, isCartStateLoading } from '@stores/reducers/common/cart/selectors';
import { getAppCurrency } from '@stores/reducers/common/init/selectors';
import { IWishlist, IWishlistProduct } from '@interfaces/wishlist';

const mapStateToProps = (state: IReduxStore, ownProps: IReduxOwnProps) => {
    const isCartLoading: boolean = isCartStateLoading(state, ownProps);
    const wishlistProps: IWishlistState = state.pageWishlist ? state.pageWishlist : null;
    const cartItemsLength: number = getTotalItemsQuantity(state, ownProps);
    const cartId: string = getCartId(state, ownProps);
    const currency: string = getAppCurrency(state, ownProps);
    const wishlist: IWishlist = wishlistProps && wishlistProps.data ? wishlistProps.data.currentWishlist : null;
    const products: IWishlistProduct[] = wishlistProps && wishlistProps.data
        ? wishlistProps.data.currentItems : null;
    const isLoading: boolean = wishlistProps ? wishlistProps.pending : false;

    return {
        isLoading,
        isCartLoading,
        products,
        wishlist,
        cartItemsLength,
        cartId,
        currency
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
    addItemToCartAction,
    deleteItemWishlistAction
}, dispatch);

export const connect = reduxify(mapStateToProps, mapDispatchToProps);
