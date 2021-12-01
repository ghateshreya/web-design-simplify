import React from 'react';
import { Column, Row } from 'simple-flexbox';
import { createUseStyles } from 'react-jss';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'

const useStyles = createUseStyles((theme) => ({
    calendar: {
        marginTop: '20px',
    }
}));



function CollaborateComponent() {
    const classes = useStyles();

    return (
        <Column> 
            <div className={classes.calendar}>
                <FullCalendar 
                        defaultView="dayGridMonth" 
                        plugins={[dayGridPlugin, interactionPlugin]}
                        editable={true}
                        // eventDrop={this.handleEventDrop}
                        // eventClick={this.handleEventClick}
                        // events={this.formatEvents()}
                    />            
            </div>
        </Column>
    );
}

export default CollaborateComponent;

