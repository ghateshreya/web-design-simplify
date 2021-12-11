import React from 'react';
import { Column, Row } from 'simple-flexbox';
import { createUseStyles } from 'react-jss';
import MiniCardComponent from 'components/cards/MiniCardComponent';
// import TodayTrendsComponent from './TodayTrendsComponent';
import UnresolvedTicketsComponent from './UnresolvedTicketsComponent';
import TasksComponent from './TasksComponent';
// import FullCalendar from '@fullcalendar/react'
// import dayGridPlugin from '@fullcalendar/daygrid'
// import interactionPlugin from '@fullcalendar/interaction'
import { useHistory } from 'react-router-dom';
import SLUGS from 'resources/slugs';
import Button from '@restart/ui/esm/Button';
import { convertSlugToUrl } from 'resources/utilities';

const useStyles = createUseStyles((theme) => ({
    cardsContainer: {
        marginRight: -30,
        marginTop: -30
    },
    cardRow: {
        marginTop: 30,
        '@media (max-width: 768px)': {
            marginTop: 0
        }
    },
    miniCardContainer: {
        backgroundColor: '#FFAE42',
        color: 'white',
        flexGrow: 1,
        marginRight: 30,
        height: '15vh',
        '@media (max-width: 768px)': {
            marginTop: 30,
            maxWidth: 'none'
        }
    },
    todayTrends: {
        marginTop: 30
    },
    lastRow: {
        marginTop: 30
    },
    unresolvedTickets: {
        marginRight: 30,
        '@media (max-width: 1024px)': {
            marginRight: 0
        }
    },
    tasks: {
        marginTop: 0,
        '@media (max-width: 1024px)': {
            marginTop: 30
        }
    },
    statContainer: {
        // borderBottom: `1px solid ${theme.color.lightGrayishBlue2}`,
        // padding: '24px 32px 24px 32px',
        // height: 'auto',
        // height: 'calc(114px - 48px)',
        // '&:last-child': {
        //     border: 'none'
        // }
    },
    stats: {
        borderTop: `1px solid ${theme.color.lightGrayishBlue2}`,
        width: '100%'
    },
    statTitle: {
        fontWeight: '600',
        fontSize: 16,
        lineHeight: '22px',
        letterSpacing: '0.3px',
        textAlign: 'center',
        color: theme.color.grayishBlue2,
        whiteSpace: 'nowrap',
        marginBottom: 6
    },
    statValue: {
        ...theme.typography.title,
        textAlign: 'center',
        color: theme.color.veryDarkGrayishBlue
    },
    container: {
        marginRight: 30,
        backgroundColor: '#FFFFFF',
        border: `1px solid ${theme.color.lightGrayishBlue2}`,
        borderRadius: 4,
        cursor: 'pointer',
        marginTop: 30,
        height: '15vh',
        width: '20vw',
        '@media (max-width: 768px)': {
            marginTop: 30,
            width: '140vw'
        },
    },
    calendar: {
        marginTop: '20px',
    }
}));



function DashboardComponent() {
    const classes = useStyles();
    const { push } = useHistory();
    function onClick(slug, parameters = {}) {
        push(convertSlugToUrl(slug, parameters));
    }
    // function renderStat(title, value) {
    //     return (
    //         <Column
    //             flexGrow={1}
    //             className={classes.statContainer}
    //             vertical='center'
    //             horizontal='center'
    //         >
    //             <span className={classes.statTitle}>{title}</span>
    //             <span className={classes.statValue}>{value}</span>
    //         </Column>
    //     );
    // }
    return (
        <Column>
            <Row
                className={classes.cardsContainer}
                wrap
                flexGrow={1}
                horizontal='space-between'
                breakpoints={{ 768: 'column' }}
            >
                <Row
                    className={classes.cardRow}
                    wrap
                    flexGrow={1}
                    horizontal='space-between'
                    breakpoints={{ 384: 'column' }}
                >
                    <MiniCardComponent
                        className={classes.miniCardContainer}
                    />
                </Row>
                </Row> 
                <Row className={classes.cardRow}
                    wrap
                    flexGrow={1}
                    horizontal='space-between'
                    breakpoints={{ 384: 'column' }}>
                <section class="section pt-0 position-relative pull-top">
                    <div class="container">
                        <div class="rounded p-5 bg-white" style={{backgroundColor: 'white', border: '1px solid #DFE0EB'}}>
                            <div class="row">
                                <div class="col-lg-4 col-md-6 mt-5 mt-md-0 text-center">
                                    <i class="ti-stats-up icon-primary h1"></i>
                                    <h3 class="mt-4 text-capitalize h5 ">Improve efficiency</h3>
                                    <p class="regular text-muted">Keep track of your expenses and plan ahead to make the most of your time</p>
                    
                                        <Button onClick={() => onClick(SLUGS.expenses)} style={{ color: "white", backgroundColor:  'rgb(108, 99, 255)', border: '1px solid white', borderRadius: '3px' }}>
                                                Visit
                                            </Button>
                                            </div>
                                <div class="col-lg-4 col-md-6 mt-5 mt-md-0 text-center">
                                    <i class="ti-calendar icon-primary h1"></i>
                                    <h3 class="mt-4 text-capitalize h5 ">Stay on schedule</h3>
                                    <p class="regular text-muted">Never miss your tasks and easily manage your day by prioritizing your daily routine</p>
                                    <Button onClick={() => onClick(SLUGS.todo)} style={{ color: "white", backgroundColor:  'rgb(108, 99, 255)', border: '1px solid white', borderRadius: '3px' }}>
                                                Visit
                                            </Button>
                                </div>
                                <div class="col-lg-4 col-md-12 mt-5 mt-lg-0 text-center">
                                    <i class="ti-world icon-primary h1"></i>
                                    <h3 class="mt-4 text-capitalize h5 ">Stay connected </h3>
                                    <p class="regular text-muted">Check availability of your peers to better to manage meetings and discussions</p>
                                    <Button onClick={() => onClick(SLUGS.collaborate)} style={{ color: "white", backgroundColor:  'rgb(108, 99, 255)', border: '1px solid white', borderRadius: '3px' }}>
                                                Visit
                                            </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                </Row>
                {/* <Row
                    flexGrow={1}
                    wrap
                    className={classes.container}
                    horizontal='center'
                    breakpoints={{ 1024: 'column' }}
                >
                     <Row flexGrow={1} breakpoints={{ 1024: classes.stats }}>
                        {renderStat('Complete Tasks', '05')}
                        {renderStat('Pending Tasks', '10')}
                        {renderStat('Total Tasks', '15')}
                    </Row>
                </Row>
            </Row> */}
            
            {/* <div className={classes.calendar}>
                <FullCalendar 
                        defaultView="dayGridMonth" 
                        plugins={[dayGridPlugin, interactionPlugin]}
                        editable={true}
                        // eventDrop={this.handleEventDrop}
                        // eventClick={this.handleEventClick}
                        // events={this.formatEvents()}
                    />            
            </div> */}
            {/* <Row
                horizontal='space-between'
                className={classes.lastRow}
                breakpoints={{ 1024: 'column' }}
            >
                <UnresolvedTicketsComponent containerStyles={classes.unresolvedTickets} />
                <TasksComponent containerStyles={classes.tasks} />
            </Row> */}
        </Column>
    );
}

export default DashboardComponent;
