import {useState} from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

import {users} from 'src/_mock/user';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';

import TableNoData from '../table-no-data';
import UserTableRow from '../user-table-row';
import UserTableHead from '../user-table-head';
import TableEmptyRows from '../table-empty-rows';
import UserTableToolbar from '../user-table-toolbar';
import {emptyRows, applyFilter, getComparator} from '../utils';
import Grid from "@mui/material/Unstable_Grid2";
import FormProvider from "../../../components/FormProvider";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

// ----------------------------------------------------------------------

export default function AddUser() {
    return (
        <Container>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                <Typography variant="h4">Add User</Typography>
            </Stack>
            <Grid container={true} spacing={1}>
                <Grid item xs={12}>
                    <Card sx={{p:2}}>
                        <FormProvider>
                            <Box sx={{display: 'flex', gap: 3}}>
                                <Box width={'50%'}>
                                    <TextField label="First Name" variant="outlined" fullWidth={true}/>
                                </Box>
                                <Box width={'50%'}>
                                    <TextField label="Email Address" variant="outlined" fullWidth={true}/>
                                </Box>
                            </Box>
                        </FormProvider>
                    </Card>
                </Grid>
            </Grid>
    </Container>
    )
}
