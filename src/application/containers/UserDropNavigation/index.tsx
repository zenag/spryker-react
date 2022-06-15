import * as React from 'react';
import { connect } from './connect';
import { withRouter, NavLink } from 'react-router-dom';
import { withStyles, IconButton } from '@material-ui/core';
import { pathCustomerOverview, pathLoginPage } from '@constants/routes';
import { UserDrop } from './UserDrop';
import { PopoverWrapper } from '@components/PopoverWrapper';
import { UserIcon } from './icons';
import { ClickEvent } from '@interfaces/common';
import { IUserDropNavigationProps as Props, IUserDropNavigationState as State } from './types';
import { styles } from './styles';

@connect
@(withRouter as Function)
class UserDropNavigationComponent extends React.Component<Props, State> {
    public readonly state: State = {
        isPopupOpened: false,
        isContentHovered: false,
        isButtonHovered: false
    };

    public componentDidUpdate = (prevProps: Props): void => {
        const isSameLocation = this.props.location.pathname !== prevProps.location.pathname;

        if (isSameLocation) {
            this.setState({ isPopupOpened: false });
        }
    };

    protected closePopover = (): void => {
        const { isButtonHovered, isContentHovered } = this.state;

        if (!isButtonHovered && !isContentHovered) {
            this.setState({ isPopupOpened: false });
        }
    };

    protected onHoverButtonHandler = (): void => {
        const { isTouch } = this.props;

        if (!isTouch) {
            this.setState({ isPopupOpened: true, isButtonHovered: true });
        }
    };

    protected onHoverContentHandler = (): void => {
        this.setState({ isButtonHovered: false, isContentHovered: true });
    };

    protected onUnhoverButtonHandler = (): void => {
        this.setState({ isButtonHovered: false }, (): void => {
            this.closePopover();
        });
    };

    protected onUnhoverContentHandler = (): void => {
        this.setState({ isContentHovered: false }, (): void => {
            this.closePopover();
        });
    };

    protected handleLogout = (event: ClickEvent): void => {
        event.preventDefault();
        this.props.logoutAction();
        this.props.history.push(pathLoginPage);
    };

    public render(): JSX.Element {
        const { isPopupOpened } = this.state;
        const { classes, isUserLoggedIn } = this.props;
        const pathToRedirect = isUserLoggedIn ? pathCustomerOverview : pathLoginPage;

        return (
            <div className={ classes.wrapper }>
                <IconButton
                    aria-label="person"
                    component={ ({ innerRef, ...props }) => <NavLink { ...props } to={ pathToRedirect } /> }
                    onMouseEnter={ this.onHoverButtonHandler }
                    onMouseLeave={ this.onUnhoverButtonHandler }
                    className={`${classes.iconButton} ${isPopupOpened ? classes.isPopupOpened : '' }`}
                >
                    <span className={ classes.icon }>
                        <UserIcon />
                    </span>
                </IconButton>

                <PopoverWrapper
                    openPopup={ isPopupOpened }
                    closePopoverHandler={ this.closePopover }
                    classes={{ popover: classes.userPopover }}
                >
                    <UserDrop
                        onLogoutClick={ this.handleLogout }
                        isUserLoggedIn={ isUserLoggedIn }
                        onMouseEnter={ this.onHoverContentHandler }
                        onMouseLeave={ this.onUnhoverContentHandler }
                    />
                </PopoverWrapper>

            </div>
        );
    }
}

export const UserDropNavigation = withStyles(styles)(UserDropNavigationComponent);
