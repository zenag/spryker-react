import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from './connect';
import { ICategory, ClickEvent } from '@interfaces/common';
import { IActiveFilterCategories, ICategoriesListProps as Props, ICategoriesListState as State } from './types';
import { pathCategoryPageBase } from '@constants/routes';
import { CategoryItem } from './CategoryItem';
import { List, withStyles, withWidth } from '@material-ui/core';
import { isWidthUp } from '@material-ui/core/withWidth';
import { ChevronIcon } from './icons';
import { styles } from './styles';
import { PopoverWrapper } from '@components/PopoverWrapper';
import { resolutionChecker } from '@helpers/common';
import { IFilterValue } from '@interfaces/search';

@connect
class CategoriesListComponent extends React.Component<Props, State> {
    protected buttonRef: React.RefObject<HTMLDivElement> = React.createRef();

    public readonly state: State = {
        anchorElement: null,
    };

    protected selectCategory = (categoryId: number) => (event: ClickEvent): void => {
        const { locationCategoryId, push, setCurrentCategoryAction, onItemClickHandler } = this.props;
        const isMobile = resolutionChecker(window.innerWidth, 'md');

        if (locationCategoryId !== categoryId && !isMobile) {
            this.closePopover();
            setCurrentCategoryAction(categoryId);
            push(`${pathCategoryPageBase}/${categoryId}`);

            return;
        }

        onItemClickHandler(categoryId);
    };

    protected openPopover = ({ currentTarget }: ClickEvent): void =>
        this.setState(({anchorElement}) => ({ anchorElement: Boolean(anchorElement) ? null : currentTarget, }));

    protected closePopover = (): void => {
        this.setState({ anchorElement: null });
    };

    protected getCategoriesList = (
        data: ICategory[],
        activeData: IActiveFilterCategories
    ): JSX.Element[] => {
        const { selectedCategory, selectedMobileCategory, width } = this.props;
        const isMobile = !isWidthUp('md', width);

        if (!Array.isArray(data) || !data.length) {
            return null;
        }

        return data.map((category: ICategory) => {
            const quantity = activeData && activeData[category.nodeId] ? activeData[category.nodeId] : 0;
            const isSubcategoryExist = Array.isArray(category.children) && category.children.length &&
                category.children.length > 0;
            const appropriateSelectedId = isMobile ? Number(selectedMobileCategory) : Number(selectedCategory);

            return (
                <CategoryItem
                    key={ `category-${ category.nodeId }` }
                    categoryValue={ category.nodeId }
                    isSelected={ appropriateSelectedId === category.nodeId }
                    isActive={ Boolean(quantity) }
                    selectCategoryHandler={ this.selectCategory }
                    quantity={ quantity }
                    categoryName={ `${ category.name ? category.name : <FormattedMessage id={ 'no.name.title' } /> }` }
                >
                    { Boolean(isSubcategoryExist) &&
                        this.getCategoriesList(category.children as ICategory[], activeData)
                    }

                </CategoryItem>
            );
        });
    };

    protected getFormattedActiveCategories = (data: IFilterValue[]): IActiveFilterCategories => (
        data.reduce((accumulator: IActiveFilterCategories, item: IFilterValue) => {
            accumulator[item.value] = item.doc_count;

            return accumulator;
        }, {})
    );

    public render = (): JSX.Element => {
        const {
            classes,
            categories,
            categoriesTree,
            categoriesLocalizedName,
            width,
            isOpened,
            onTitleClick
        } = this.props;
        const isCategoriesExist = !Array.isArray(categories) || !categories.length;
        const activeCategories = !isCategoriesExist ? this.getFormattedActiveCategories(categories) : null;
        const { anchorElement } = this.state;
        const isOpen = Boolean(anchorElement);
        const isTablet = isWidthUp('md', width) && !isWidthUp('lg', width);

        if (isCategoriesExist) {
            return null;
        }

        if (isTablet) {
            return (
                <div className={classes.root}>
                    <span className={ classes.title } ref={ this.buttonRef } onClick={ this.openPopover }>
                        { categoriesLocalizedName
                            ? categoriesLocalizedName
                            : <FormattedMessage id={ 'categories.panel.title' } />
                        }
                        <span className={`${classes.chevron} ${isOpen ? classes.chevronOpened : ''}`}>
                            <ChevronIcon />
                        </span>
                    </span>
                    <PopoverWrapper
                        anchorElement={ anchorElement }
                        anchorReference="anchorEl"
                        hideBackdrop={ false }
                        closePopoverHandler={ this.closePopover }
                        classes={{
                            content: classes.popoverContent
                        }}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left'
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left'
                        }}
                    >
                        <List component="nav" className={classes.list}>
                            { this.getCategoriesList(categoriesTree, activeCategories) }
                        </List>
                    </PopoverWrapper>
                </div>
            );
        }

        return (
            <div className={classes.root}>
                <span className={ classes.title } onClick={ onTitleClick }>
                    { categoriesLocalizedName
                        ? categoriesLocalizedName
                        : <FormattedMessage id={ 'categories.panel.title' } />
                    }
                    <span className={`${classes.chevron} ${isOpened ? classes.chevronOpened : ''}`}>
                        <ChevronIcon />
                    </span>
                </span>
                <List component="nav" className={`${classes.list} ${isOpened ? classes.listOpened : ''}`}>
                    { this.getCategoriesList(categoriesTree, activeCategories) }
                </List>
            </div>
        );
    }
}

export const CategoriesList = withWidth()(withStyles(styles)(CategoriesListComponent));
