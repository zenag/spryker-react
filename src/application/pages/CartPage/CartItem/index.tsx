import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { CartItemProps as Props } from './types';
import { SquareImage } from '@components/SquareImage';
import { Price } from '@components/Price';
import { withStyles, Grid, Typography, Button } from '@material-ui/core';
import { pathProductPageBase } from '@constants/routes';
import { styles } from './styles';
import { withRouter } from 'react-router-dom';
import { SprykerQuantityCounter } from '@components/UI/SprykerQuantityCounter';
import { IIndexSignature } from '@interfaces/common';

const CartItemComponent: React.FC<Props> = (props): JSX.Element => {
    const {
        classes,
        sku,
        image,
        quantity,
        superAttributes,
        handleDeleteItem,
        handleChangeQty,
        name,
        prices: {
            priceDefaultGross,
            priceOriginalGross
        },
        isUpdateToDefault,
        abstractSku,
        calculations: { unitPriceToPayAggregation },
        history
    } = props;

    const onSelectProductHandler = (): void => {
        const location = {
            pathname: `${ pathProductPageBase }/${ abstractSku }`,
            state: { superAttributes }
        };

        history.push(location);
    };

    const renderSuperAttributes = superAttributes ? (
        superAttributes.map((attr: IIndexSignature, index: number) => {
            const attributeTitle = Object.keys(attr)[0].split('_').join(' ');
            const attributeValue = Object.values(attr)[0];

            return (
                <div key={`${ sku }-attr-${ index }`} className={ classes.attributes }>
                    {`${ attributeTitle }: `}
                    <span className={ classes.attributesValue }>{ attributeValue }</span>
                </div>
            );
        })
    ) : null;

    const shouldShowOriginalPrice = (quantity === 1) && priceOriginalGross;

    return (
        <Grid container wrap="nowrap" className={ classes.productItem }>
            <Grid item className={ classes.imageOuter }>
                <SquareImage image={ image } alt={ name } classes={ { imgWrapper: classes.imgWrapper } } />
            </Grid>
            <Grid item className={ classes.contentOuter }>
                <Grid container className={ classes.fullHeight }>
                    <Grid item xs={ 12 } sm={ 8 } md={ 9 } className={ classes.info }>
                        <div className={ classes.growedBlock }>
                            <Typography component="h5" variant="h5" className={ classes.name }>
                                <Button onClick={ onSelectProductHandler } className={ classes.nameLink }>
                                    { name }
                                </Button>
                            </Typography>
                            { renderSuperAttributes }
                        </div>
                        <div className={`${ classes.attributes } ${ classes.attributesQty }`}>
                            <span className={ classes.attributesTitle }>
                                <FormattedMessage id={ 'word.quantity.title' } />:
                            </span>
                            <SprykerQuantityCounter
                                name={ sku }
                                value={ quantity }
                                handleChangeQty={ handleChangeQty }
                                isUpdateToDefault={ isUpdateToDefault }
                            />
                        </div>
                    </Grid>
                    <Grid item xs={ 12 } sm={ 4 } md={ 3 } className={ classes.info }>
                        <div className={ classes.pricesHoler }>
                            { priceDefaultGross &&
                                <Typography
                                    component="p"
                                    className={`
                                        ${ classes.price }
                                        ${ shouldShowOriginalPrice ? classes.newPrice : '' }
                                    `}
                                >
                                    <Price value={ quantity * priceDefaultGross } />
                                </Typography>
                            }
                            { shouldShowOriginalPrice &&
                                <Typography component="p" className={`${ classes.price } ${ classes.oldPrice }`}>
                                    <Price value={ priceOriginalGross } isOriginal />
                                </Typography>
                            }
                        </div>
                        { (quantity > 1) &&
                            <div className={ classes.eachPrice }>
                                (
                                <Price value={ unitPriceToPayAggregation } />&nbsp;
                                <FormattedMessage id={ 'word.each.title' } />)
                            </div>
                        }
                    </Grid>
                    <Grid item xs={ 12 } className={ classes.removeBtnColumn }>
                        <div className={ classes.removeBtn } onClick={ () => handleDeleteItem(sku) }>
                            <span className={ classes.removeBtnIcon } />
                            <span className={ classes.removeBtnText }>
                                <FormattedMessage id={ 'remove.button.title' } />
                            </span>
                        </div>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export const CartItem = withStyles(styles)(withRouter(CartItemComponent));
