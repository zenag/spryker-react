import * as React from 'react';
import { connect } from './connect';
import Autosuggest from 'react-autosuggest';
import { withStyles, CircularProgress } from '@material-ui/core';
import { CatalogSearchInput } from './CatalogSearchInput';
import { Suggestions } from './Suggestions';
import { SuggestionsContainer } from './SuggestionsContainer';
import { ErrorBoundary } from '@hoc/ErrorBoundary';
import { InputChangeEvent } from '@interfaces/common';
import { IProductCard } from '@interfaces/product';
import { ICatalogProps as Props, ICatalogState as State, IInputProps } from './types';
import { styles } from './styles';

@connect
class CatalogSearchComponent extends React.Component<Props, State> {
    public readonly state: State = {
        value: ''
    };

    protected containerRef: React.RefObject<HTMLDivElement> = React.createRef();
    protected timer: number;

    protected getSuggestionValue = (suggestion: IProductCard): string => suggestion.abstractName;

    protected handleSuggestionsFetchRequested = ({ value }: { value: string }) => {
        const { value: currentValue } = this.state;

        if (!this.props.isLoading && value !== currentValue) {
            clearTimeout(this.timer);

            this.timer = window.setTimeout(() => {
                if (this.state.value === value) {
                    this.props.sendSuggestionAction(value);
                }
            }, 800);
        }
    };

    protected handleSuggestionsClearRequested = (): void => {
        return;
    };

    protected clearSuggestion = (value: string): void => {
        this.props.clearSuggestions(value);
        this.setState({ value: '' });
    };

    protected handleChange = (event: InputChangeEvent, { newValue }: { newValue: string }): void => {
        const maxLettersValueToClearSuggestField = 3;

        if (newValue.trim().length < maxLettersValueToClearSuggestField) {
            this.props.clearSuggestions(newValue);
        }

        if (!this.props.isLoading) {
            this.setState({
                value: newValue
            });
        }
    };

    protected shouldRenderSuggestions = (value: string): boolean => {
        const minLettersValueToSuggest = 2;

        return value && value.trim().length >= minLettersValueToSuggest;
    };

    protected renderInputComponent = (inputProps: IInputProps): JSX.Element => {
        const inputComponentProps = {
            inputProps: { ...inputProps },
            clearSuggestion: this.clearSuggestion
        };

        return (
            <ErrorBoundary>
                <CatalogSearchInput { ...inputComponentProps } />
            </ErrorBoundary>
        );
    };

    protected renderSuggestion = (
        suggestion: IProductCard,
        { query, isHighlighted }: { query: string; isHighlighted: boolean }
    ): JSX.Element => {
        const suggestionsProps = {
            isHighlighted,
            query,
            suggestion,
            clearSuggestion: this.clearSuggestion,
            containerRef: this.containerRef
        };

        return (
            <ErrorBoundary>
                <Suggestions { ...suggestionsProps } />
            </ErrorBoundary>
        );
    };

    protected renderSuggestionsContainer = (options: Autosuggest.RenderSuggestionsContainerParams): JSX.Element => {
        const { classes } = this.props;
        const suggestionsContainerProps = {
            options,
            clearSuggestion: this.clearSuggestion
        };

        return (
            <ErrorBoundary>
                <SuggestionsContainer
                    { ...suggestionsContainerProps }
                    classes={{suggestionsContainer: classes.suggestionsContainerOpen}}
                />
            </ErrorBoundary>
        );
    };

    public render(): JSX.Element {
        const { value } = this.state;
        const { classes, suggestions, isLoading, id, extraInputClassName } = this.props;

        const autosuggestProps = {
            id,
            suggestions,
            renderInputComponent: this.renderInputComponent,
            onSuggestionsFetchRequested: this.handleSuggestionsFetchRequested,
            onSuggestionsClearRequested: this.handleSuggestionsClearRequested,
            getSuggestionValue: this.getSuggestionValue,
            renderSuggestion: this.renderSuggestion,
            renderSuggestionsContainer: this.renderSuggestionsContainer,
            shouldRenderSuggestions: this.shouldRenderSuggestions
        };

        return (
            <div className={ classes.root } id="CatalogSearch" ref={ this.containerRef }>
                <Autosuggest
                    { ...autosuggestProps }
                    inputProps={ {
                        extraInputClassName,
                        classes,
                        value,
                        onChange: this.handleChange,
                        type: 'text'
                    } }
                    theme={ {
                        container: classes.container,
                        suggestionsContainer: classes.suggestionsContainer,
                        suggestionsContainerOpen: classes.suggestionsContainerOpen,
                        suggestionsList: classes.suggestionsList,
                        suggestion: classes.suggestion
                    } }
                />

                { isLoading &&
                    <div className={ classes.pendingProgress }>
                        <CircularProgress size={ 34 } color="primary" />
                    </div>
                }
            </div>
        );
    }
}

export const CatalogSearch = withStyles(styles)(CatalogSearchComponent);
