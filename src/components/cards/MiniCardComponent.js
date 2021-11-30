import React from 'react';
import { Column } from 'simple-flexbox';
import { createUseStyles, useTheme } from 'react-jss';
import { Grid, Typography } from '@material-ui/core';

const useStyles = createUseStyles((theme) => ({
    container: {
        backgroundColor: '#FFFFFF',
        border: `1px solid ${theme.color.lightGrayishBlue2}`,
        borderRadius: 4,
        cursor: 'pointer',
        width: '250',
        // display: 'flex',
        // justifyContent: 'center',
        // textAlign: 'center',
        padding: '40px 40px',
        '&:hover': {
            borderColor: theme.color.lightBlue,
            '&:nth-child(n) > span': {
                color: theme.color.lightBlue
            }
        }
    },
    title: {
        ...theme.typography.cardTitle,
        color: theme.color.grayishBlue2,
        marginBottom: 12,
        minWidth: 102,
        textAlign: 'center'
    },
    value: {
        color: theme.color.veryDarkGrayishBlue,
        fontWeight: 'bold',
        fontSize: 40,
        letterSpacing: '1px',
        lineHeight: '50px',
        textAlign: 'center'
    }
}));

function MiniCardComponent({ className = '', title, value }) {
    const theme = useTheme();
    const classes = useStyles({ theme });
    const composedClassName = [classes.container, className].join(' ');
    return (
        <Column flexGrow={1} className={composedClassName} horizontal='center' vertical='center'>
            <Grid item xs container direction="column" className={classes.user}>
                <Grid item className={classes.user}>
                    <Typography variant="body2">Welcome,</Typography>
                    <Typography variant="h6" style={{fontSize: '30px'}}>
                        Shreya
                    </Typography>
                </Grid>
            </Grid> 
        </Column>
        
    );
}

export default MiniCardComponent;
