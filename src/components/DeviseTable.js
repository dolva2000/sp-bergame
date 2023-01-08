/* eslint-disable */

import * as React from 'react';
import { Card } from '@mui/material';
// import { DataGrid } from '@mui/x-data-grid';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import moment from 'moment';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 12,
    color: theme.palette.info.main
  },
  [`&.${tableCellClasses.footer}`]: {
    fontSize: 14,
    color: theme.palette.success.light
  }
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  color: theme.palette.info.main
}));

const DeviseTable = (props) => {
  const { devises } = props;

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - devises?.length) : 0;

  return (
    <Card>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table" size="small">
          <TableHead>
            <StyledTableRow>
              <StyledTableCell align="center">Date</StyledTableCell>
              <StyledTableCell align="center">USD => CDF</StyledTableCell>
              <StyledTableCell align="center">EUR => CDF</StyledTableCell>
              <StyledTableCell align="center">CFA => CDF</StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {devises
              ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, idx) => (
                <StyledTableRow
                  hover
                  key={idx.toString()}
                  // sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <StyledTableCell
                    component="th"
                    align="center"
                    scope="row"
                    sx={{ width: 200 }}
                  >
                    {moment(row.date).format('DD/MM/yyyy')}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.usd_cdf}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.eur_cdf}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.cfa_cdf}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            {emptyRows > 0 && (
              <StyledTableRow
                style={{
                  height: 30 * emptyRows
                }}
              >
                <StyledTableCell colSpan={6} />
              </StyledTableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 50, 100]}
        component="div"
        count={devises?.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage="Ligne par page"
        // eslint-disable-next-line arrow-body-style
        labelDisplayedRows={({ from, to, count }) => {
          return `${from} - ${to} sur ${
            count !== -1 ? count : `plus de ${to}`
          }`;
        }}
      />
    </Card>
  );
};

DeviseTable.propTypes = {
  devises: PropTypes.array
};

export default DeviseTable;
