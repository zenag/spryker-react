import * as wishlistActions from '@stores/actions/pages/wishlist';
import { api, setAuthToken, ApiServiceAbstract } from '@services/api';
import { RefreshTokenService } from '@services/common/RefreshToken';
import { IWishlist } from '@interfaces/wishlist';
import { TApiResponseData } from '@services/types';
import { IRequestBody } from '@services/pages/Wishlist/types';
import { NotificationsMessage } from '@components/Notifications/NotificationsMessage';
import { typeNotificationSuccess } from '@constants/notifications';
import { parseWishlistResponse } from '@helpers/parsing/wishlist';
import { errorMessageInform } from '@helpers/common';

export class WishlistActionsService extends ApiServiceAbstract {
    public static async addWishlist(dispatch: Function, name: string): Promise<string> {
        dispatch(wishlistActions.addWishlistPendingState());
        try {
            const token: string = await RefreshTokenService.getActualToken(dispatch);
            setAuthToken(token);

            const body: IRequestBody = {
                data: {
                    type: 'wishlists',
                    attributes: {name},
                },
            };

            const response: TApiResponseData = await api.post('wishlists', body, {withCredentials: true});

            if (response.ok) {
                const parsedWishlist: IWishlist = parseWishlistResponse(response.data.data);
                dispatch(wishlistActions.addWishlistFulfilledState(parsedWishlist));
                NotificationsMessage({
                    id: 'wishlist.created.message',
                    type: typeNotificationSuccess
                });

                return parsedWishlist.id;
            } else {
                const errorMessage = this.getParsedAPIError(response);
                dispatch(wishlistActions.addWishlistRejectedState(errorMessage));
                errorMessageInform(errorMessage);
            }

        } catch (error) {
            dispatch(wishlistActions.addWishlistRejectedState(error.message));
            errorMessageInform(error.message, false);
        }
    }

    public static async deleteWishlist(dispatch: Function, wishlistId: string): Promise<void> {
        dispatch(wishlistActions.deleteWishlistPendingState());
        try {
            const token: string = await RefreshTokenService.getActualToken(dispatch);
            setAuthToken(token);

            const response: TApiResponseData = await api.delete(`wishlists/${wishlistId}`, {}, {withCredentials: true});

            if (response.ok) {
                dispatch(wishlistActions.deleteWishlistFulfilledState(wishlistId));
                NotificationsMessage({
                    id: 'wishlist.deleted.message',
                    type: typeNotificationSuccess
                });
            } else {
                const errorMessage = this.getParsedAPIError(response);
                dispatch(wishlistActions.deleteWishlistRejectedState(errorMessage));
                errorMessageInform(errorMessage);
            }

        } catch (error) {
            dispatch(wishlistActions.deleteWishlistRejectedState(error.message));
            errorMessageInform(error.message, false);
        }
    }

    public static async updateWishlist(dispatch: Function, wishlistId: string, name: string): Promise<void> {
        dispatch(wishlistActions.updateWishlistPendingState());
        try {
            const token: string = await RefreshTokenService.getActualToken(dispatch);
            setAuthToken(token);

            const body: IRequestBody = {
                data: {
                    type: 'wishlists',
                    attributes: {name},
                },
            };

            const response: TApiResponseData = await api.patch(
                `wishlists/${wishlistId}`,
                body,
                {withCredentials: true}
            );

            if (response.ok) {
                const parsedWishlists = parseWishlistResponse(response.data.data);
                dispatch(wishlistActions.updateWishlistFulfilledState(parsedWishlists, wishlistId));
            } else {
                const errorMessage = this.getParsedAPIError(response);
                dispatch(wishlistActions.updateWishlistRejectedState(errorMessage));
                errorMessageInform(errorMessage);
            }

        } catch (error) {
            dispatch(wishlistActions.updateWishlistRejectedState(error.message));
            errorMessageInform(error.message, false);
        }
    }
}
