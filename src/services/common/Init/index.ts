import * as initActions from '@stores/actions/common/init';
import { api, ApiServiceAbstract } from '@services/api';
import { parseStoreResponse } from '@helpers/parsing';
import { TApiResponseData } from '@services/types';
import { ICategory } from '@interfaces/common';
import { IInitData } from '@interfaces/init';
import { ILocaleActionPayload } from '@stores/reducers/common/Init/types';
import { NavigationService } from '@services/common/Navigations';
import { errorMessageInform, getAnonymId } from '@helpers/common';

export class InitAppService extends ApiServiceAbstract {
    public static async getInitData(dispatch: Function): Promise<void> {
        const isTouch: boolean = 'ontouchstart' in window;
        dispatch(initActions.initApplicationDataPendingStateAction());
        try {
            const anonymId: string = getAnonymId();
            const response: TApiResponseData = await api.get('stores', null);

            if (response.ok) {
                const responseParsed: IInitData = parseStoreResponse(response.data);
                await NavigationService.getMainNavigation(dispatch);
                dispatch(initActions.getCategoriesAction());
                dispatch(initActions.anonymIdFilFilled(anonymId));
                dispatch(initActions.initApplicationDataFulfilledStateAction({ ...responseParsed, isTouch }));
            } else {
                const errorMessage = this.getParsedAPIError(response);
                dispatch(initActions.initApplicationDataRejectedStateAction(errorMessage));
                errorMessageInform(errorMessage);
            }

        } catch (error) {
            dispatch(initActions.initApplicationDataRejectedStateAction(error.message));
            errorMessageInform(error.message, false);
        }
    }

    public static async getCategoriesTree(dispatch: Function): Promise<void> {
        dispatch(initActions.categoriesPendingState());
        try {
            const response: TApiResponseData = await api.get('category-trees', {}, { withCredentials: false });

            if (response.ok) {
                let tree: ICategory[] = response.data.data[0].attributes.categoryNodesStorage;

                if (!Array.isArray(tree)) {
                    tree = [];
                }
                dispatch(initActions.categoriesFulfilledState(tree));
            } else {
                const errorMessage = this.getParsedAPIError(response);
                dispatch(initActions.categoriesRejectedState(errorMessage));
                errorMessageInform(errorMessage);
            }

        } catch (error) {
            dispatch(initActions.categoriesRejectedState(error.message));
            errorMessageInform(error.message, false);
        }
    }

    public static async switchLocale(dispatch: Function, payload?: ILocaleActionPayload): Promise<void> {
        dispatch(initActions.switchLocalePendingState());
        try {
            api.setHeader('Accept-Language', payload.locale);
            localStorage.setItem('locale', payload.locale);

            await NavigationService.getMainNavigation(dispatch);
            await this.getCategoriesTree(dispatch);

            dispatch(initActions.switchLocaleFulfilledState(payload));

        } catch (error) {
            dispatch(initActions.switchLocaleRejectedState(error.message));
            errorMessageInform(error.message, false);
        }
    }
}
