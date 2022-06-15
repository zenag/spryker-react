import { reduxify } from '@hoc/Reduxify';
import { getAppLocale, getAppTimeZone } from '@stores/reducers/common/init/selectors';
import { IReduxOwnProps, IReduxStore } from '@stores/reducers/types';

const mapStateToProps = (state: IReduxStore, ownProps: IReduxOwnProps) => {
    const timeZone: string = getAppTimeZone(state, ownProps);
    const locale = getAppLocale(state, ownProps);

    return {
        timeZone,
        locale
    };
};

export const connect = reduxify(mapStateToProps);
