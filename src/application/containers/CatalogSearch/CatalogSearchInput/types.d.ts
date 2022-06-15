import { IInputProps } from '../types';
import { ISearchQuery } from '@interfaces/search';
import { WithStyles } from '@material-ui/core';
import { styles } from './styles';

export interface IInputComponentProps extends WithStyles<typeof styles> {
    currency?: string;
    isLoading?: boolean;
    completion?: string[];
    inputProps: IInputProps;
    clearSuggestion: (query: string) => void;
    sendSearchAction?: (params: ISearchQuery) => void;
    push?: (query: string) => void;
}

export interface IInputComponentState {
    parts: array;
    matches: array;
}
