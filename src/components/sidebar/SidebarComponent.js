import React, { useContext } from 'react';
import { createUseStyles, useTheme } from 'react-jss';
import { useHistory } from 'react-router-dom';
import SLUGS from 'resources/slugs';
import {
    IconArticles,
    IconContacts,
    IconLogout,
    IconOverview,
    IconSubscription,
} from 'assets/icons';
import { convertSlugToUrl } from 'resources/utilities';
import LogoComponent from './LogoComponent';
import Menu from './MenuComponent';
import MenuItem from './MenuItemComponent';
import UserContext from "contexts/userContext";

const useStyles = createUseStyles({
    separator: {
        borderTop: ({ theme }) => `1px solid ${theme.color.lightGrayishBlue}`,
        marginTop: 16,
        marginBottom: 16,
        opacity: 0.06
    }
});

function SidebarComponent() {
    const { push } = useHistory();
    const theme = useTheme();
    const classes = useStyles({ theme });
    const isMobile = window.innerWidth <= 1080;
    const { logout } = (useContext(UserContext));

    // async function logout() {
    //     push(SLUGS.login);
    // }

    function onClick(slug, parameters = {}) {
        push(convertSlugToUrl(slug, parameters));
    }

    return (
        <Menu isMobile={isMobile}>
            <div style={{ paddingTop: 30, paddingBottom: 30 }}>
                <LogoComponent />
            </div>
            <MenuItem
                id={SLUGS.dashboard}
                title='Dashboard'
                icon={IconSubscription}
                onClick={() => onClick(SLUGS.dashboard)}
            />
            <MenuItem
                id={SLUGS.expenses}
                items={SLUGS.expenses}
                title='Expenses'
                icon={IconOverview}
                onClick={() => onClick(SLUGS.expenses)}
            >
            </MenuItem>
            <MenuItem
                id={SLUGS.todo}
                title='To Do'
                icon={IconArticles}
                onClick={() => onClick(SLUGS.todo)}
            />
             <MenuItem
                id={SLUGS.collaborate}
                title='Collaborate'
                icon={IconContacts}
                onClick={() => onClick(SLUGS.collaborate)}
            />
            <div className={classes.separator}></div>

            <MenuItem id='logout' title='Logout' icon={IconLogout} onClick={logout} />
        </Menu>
    );
}

export default SidebarComponent;
