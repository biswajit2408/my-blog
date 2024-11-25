import { faker } from '@faker-js/faker';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import Iconify from 'src/components/iconify';
import AppWidgetSummary from "./overview/app-widget-summary";
import AppWebsiteVisits from "./overview/app-website-visits";
import AppCurrentVisits from "./overview/app-current-visits";
import AppConversionRates from "./overview/app-conversion-rates";
import AppCurrentSubject from "./overview/app-current-subject";
import AppNewsUpdate from "./overview/app-news-update";
import {AppContext} from "../context/AppContext";
import {useContext} from "react";


// ----------------------------------------------------------------------

export default function Dashboard() {

    const { resources } = useContext(AppContext);
    const loggedUser = resources?.loggedUser;

    return (
        <Container maxWidth="xl">
            <Typography variant="h4" sx={{ mb: 5 }}>
                Hi {loggedUser?.name}, Welcome back 👋
            </Typography>

            <Grid container spacing={3}>
                <Grid xs={12} sm={6} md={4}>
                    <AppWidgetSummary
                        title="Weekly Sales"
                        total={714000}
                        color="success"
                        icon={<img alt="icon" src="/assets/icons/glass/ic_glass_bag.png" />}
                    />
                </Grid>

                <Grid xs={12} sm={6} md={4}>
                    <AppWidgetSummary
                        title="New Users"
                        total={1352831}
                        color="info"
                        icon={<img alt="icon" src="/assets/icons/glass/ic_glass_users.png" />}
                    />
                </Grid>

                <Grid xs={12} sm={6} md={4}>
                    <AppWidgetSummary
                        title="Item Orders"
                        total={1723315}
                        color="warning"
                        icon={<img alt="icon" src="/assets/icons/glass/ic_glass_buy.png" />}
                    />
                </Grid>

            </Grid>
        </Container>
    );
}
