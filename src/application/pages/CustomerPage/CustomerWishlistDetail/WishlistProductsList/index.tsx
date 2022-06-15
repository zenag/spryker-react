import * as React from 'react';
import { connect } from './connect';
import { FormattedMessage } from 'react-intl';
import { createCartItemAddToCart } from '@helpers/cart';
import { WishlistProductsListProps as Props } from './types';
import { IWishlistProduct } from '@interfaces/wishlist';
import { IProductAttributes } from '@interfaces/product';
import { Price } from '@components/Price';
import { Typography, Button, withStyles, Grid, IconButton } from '@material-ui/core';
import { styles } from './styles';
import { SquareImage } from '@components/SquareImage';
import { CartIcon } from './icons';

const WishlistProductsListComponent: React.FC<Props> = (props): JSX.Element => {
    const { classes, products } = props;

    if (!Boolean(products && products.length)) {
        return (
            <Typography component="h3" variant="h3">
                <FormattedMessage id={ 'wishlist.empty.message' } />
            </Typography>
        );
    }

    const renderProductItems = (): JSX.Element[] => {
        const {
            isLoading,
            isCartLoading,
            classes,
            deleteItemWishlistAction,
            wishlist: { id },
            addItemToCartAction,
            cartId
        } = props;

        return products.map((product: IWishlistProduct) => {
            const { sku, name, prices, attributes, image, isAvailable } = product;

            const renderSuperAttributes = attributes ? (
                attributes.map((attr: IProductAttributes, index: number) => {
                    const attributeTitle = Object.keys(attr)[0].split('_').join(' ');
                    const attributeValue = Object.values(attr)[0];

                    return (
                        <div key={ `${ sku }-attr-${ index }` } className={ classes.attributes }>
                            <span className={ classes.attributesTitle }>{ `${ attributeTitle }: ` }</span>
                            <span className={ classes.attributesValue }>{ attributeValue }</span>
                        </div>
                    );
                })
            ) : null;

            return (
                <Grid container key={ sku } className={ `${ classes.productItem }` }>
                    <Grid item className={ classes.imageOuter }>
                        <div className={ classes.imageHolder }>
                            <SquareImage image={ image } alt={ name } classes={ { imgWrapper: classes.imgWrapper } } />
                        </div>
                        <IconButton
                            className={ classes.removeButton }
                            onClick={ () => deleteItemWishlistAction(id, sku) }
                            disabled={ isCartLoading || isLoading }
                            classes={{ disabled: classes.buttonDisabled }}
                        >
                            <span className={ classes.removeButtonIcon } />
                            <span className={ classes.removeButtonText }>
                                <FormattedMessage id={ 'remove.button.title' } />
                            </span>
                        </IconButton>
                    </Grid>
                    <Grid item className={ classes.contentOuter }>
                        <Grid container spacing={ 16 }>
                            <Grid item xs>
                                <Typography component="h5" variant="h5" className={ classes.name }>
                                    { name }
                                </Typography>
                                <div className={ classes.attributes }>
                                    <span className={ classes.attributesTitle }>
                                        <FormattedMessage id={ 'product.sku.title' } />:
                                    </span>
                                    <span className={ classes.attributesValue }>
                                        {` ${ sku }`}
                                    </span>
                                </div>
                                { renderSuperAttributes }
                                <div className={ classes.attributes }>
                                    <span className={ classes.attributesTitle }>
                                        <FormattedMessage id={ 'word.price.title' } />:
                                    </span>
                                    <span className={ classes.attributesValue }>
                                        <Price value={ prices ? prices.priceDefaultGross : 0 } />
                                    </span>
                                </div>
                                <div className={ classes.attributes }>
                                    <span className={ classes.attributesTitle }>
                                        <FormattedMessage id={ 'word.availability.title' } />:
                                    </span>
                                    <span
                                        className={`
                                            ${classes.attributesValue}
                                            ${isAvailable ? classes.available : classes.noAvailable}
                                        `}
                                    >
                                         <FormattedMessage
                                             id={`${ isAvailable ? 'available.title' : 'unavailable.title' }`}
                                         />
                                    </span>
                                </div>
                            </Grid>
                            <Grid item className={ classes.colButton }>
                                <Button
                                    variant="outlined"
                                    disabled={ isCartLoading || !isAvailable || isLoading }
                                    onClick={ () => addItemToCartAction(createCartItemAddToCart(sku, 1), cartId) }
                                    fullWidth
                                    className={ classes.button }
                                >
                                    <span className={ classes.buttonInner }>
                                        <FormattedMessage id={ 'add.to.cart.button.title' } />
                                        <span className={ classes.buttonIcon }>
                                            <CartIcon />
                                        </span>
                                    </span>
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            );
        });
    };

    return (
        <div className={ classes.block }>
            { renderProductItems() }
        </div>
    );
};

export const WishlistProductsList = connect(withStyles(styles)(WishlistProductsListComponent));
