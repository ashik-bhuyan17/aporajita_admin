import { StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  body: {
    padding: 50,
    fontFamily: 'Roboto',
    fontStyle: 'light',
    fontSize: 9,
  },
  date: {
    fontSize: 10,
    fontStyle: 'bold',
  },
  underline: {
    height: 1,
    backgroundColor: '#ddd',
  },
  shopInfoContainer: {
    marginBottom: 20,
  },
  shopTitle: {
    fontStyle: 'bold',
  },
  shopDescription: {
    fontStyle: 'light',
  },
  InvoiceInfoContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 20,
  },
  invoiceTitle: {
    fontStyle: 'bold',
  },
  invoiceID: {
    fontStyle: 'light',
  },
  tableHeaderContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontStyle: 'bold',
    marginTop: 30,
  },
  tableHeaderItem: {
    display: 'flex',
    flexDirection: 'row',
    width: 230,
    padding: '5px',
  },
  tableHeaderData: {
    display: 'flex',
    flexDirection: 'row',
    width: 130,
    textAlign: 'right',
    padding: '5px',
  },
  productName: {
    fontStyle: 'bold',
    color: 'blue',
    width: 230,
    marginLeft: '5px',
  },
  tableProductListContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: '5px 0px',
  },
  tableMultupleRow: {
    display: 'flex',
    flexDirection: 'col',
  },
  strikedText: {
    textDecoration: 'line-through',
  },
  // tablePaymentData: {
  //   display: 'flex',
  //   flexDirection: 'row',
  //   width: 130,
  //   borderTop: '1px solid black',
  // },
  tableData: {
    display: 'flex',
    flexDirection: 'row',
    width: 130,
    textAlign: 'right',
    marginRight: '5px',
  },
  tableDataBold: {
    display: 'flex',
    flexDirection: 'row',
    width: 130,
    fontStyle: 'bold',
    textAlign: 'right',
    marginRight: '5px',
  },
  tableDataRed: {
    display: 'flex',
    flexDirection: 'row',
    width: 130,
    fontStyle: 'bold',
    color: 'red',
    textAlign: 'right',
    marginRight: '5px',
  },
  tableDataItem: {
    display: 'flex',
    flexDirection: 'row',
    width: 230,
  },
  tableSummaryContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: '5px 0px',
    textAlign: 'right',
    marginRight: '5px',
  },
  geryTableContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: '5px 0px',
    backgroundColor: '#e2eaec',
  },
  footerContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 30,
  },
  customerAddressContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: '10',
  },
  addressInformation: {
    paddingRight: '30',
    width: 300,
  },
  addressTitle: {
    fontStyle: 'bold',
  },
  thanksText: {
    marginTop: '10',
    fontSize: 18,
    textAlign: 'center',
  },
  orderNote: {
    marginTop: '10',
    fontStyle: 'bold',
    fontSize: 11,
  },
  orderNoteDescription: {
    marginTop: '10',
    fontStyle: 'bold',
  },
});

export default styles;
