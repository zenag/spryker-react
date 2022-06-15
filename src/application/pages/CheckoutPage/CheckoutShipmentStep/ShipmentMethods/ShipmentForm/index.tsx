import * as React from 'react';
import { withStyles, RadioGroup, FormControlLabel, Radio, Typography } from '@material-ui/core';
import { InputChangeEvent } from '@interfaces/common';
import { IShipmentFormProps as Props } from './types';
import { styles } from './styles';
import { Price } from '@components/Price';

const ShipmentFormComponent: React.FC<Props> = (props): JSX.Element => {
    const { classes, currentMode, formName, labelForm, collections, onChangeHandler } = props;

    const handleSelectionsChange = (event: InputChangeEvent): void => {
        const { value } = event.target;
        const price = collections.filter(item => item.id === value)[0].price;

        onChangeHandler(value, price);
    };

    const renderCollectionItems = (): JSX.Element[] => collections.map(item => (
        <FormControlLabel
            key={`${formName}${item.id}`}
            aria-label={ item.id }
            value={ item.id }
            classes={{
                root: `${classes.inputRadio} ${(currentMode === item.id) ? classes.checkedInputRadio : '' }`,
                label: `${classes.radioLabel} ${(currentMode === item.id) ? classes.checkedRadioLabel : '' }`
            }}
            control={
                <Radio
                    classes={ { root: classes.radio, checked: classes.checkedRadio } }
                    checked={ currentMode === item.id }
                />
            }
            label={ <>{`${item.name}: `}<Price value={item.price} /></> }
        />
    ));

    return (
        <form key={ formName } className={ classes.form }>
            <div className={classes.formHeading}>
                <Typography component="span" variant="h3" color="textSecondary" className={ classes.formTitle }>
                    { labelForm.name }
                </Typography>
                { Boolean(labelForm.icon) && <span className={ classes.formIcon }>{ labelForm.icon }</span> }
            </div>
            <RadioGroup
                aria-label={ formName }
                name="shipmentMethodSelection"
                value={ currentMode }
                onChange={ handleSelectionsChange }
                classes={{
                    root: classes.radioGroup
                }}
            >
                { renderCollectionItems() }
            </RadioGroup>
        </form>
    );
};

export const ShipmentForm = withStyles(styles)(ShipmentFormComponent);
