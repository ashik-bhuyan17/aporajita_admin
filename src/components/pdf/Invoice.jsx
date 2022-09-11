import {
  Document,
  Page,
  View,
  Text,
  Font,
  StyleSheet,
} from '@react-pdf/renderer';

Font.register({
  family: 'Roboto',
  fonts: [
    {
      src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.0/fonts/Roboto/roboto-light-webfont.ttf',
      fontStyle: 'light',
    },
    {
      src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.0/fonts/Roboto/roboto-regular-webfont.ttf',
      fontStyle: 'normal',
    },
    {
      src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.0/fonts/Roboto/roboto-medium-webfont.ttf',
      fontStyle: 'medium',
    },
    {
      src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.0/fonts/Roboto/roboto-bold-webfont.ttf',
      fontStyle: 'bold',
    },
  ],
});

const styles = StyleSheet.create({
  body: {
    padding: 40,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontSize: 14,
  },
  date: {
    fontSize: 10,
    fontStyle: 'medium',
  },
  underline: {
    height: 1,
    margin: 2,
    backgroundColor: 'black',
  },
  shopInfoContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 20,
  },
  shopTitle: {
    fontStyle: 'bold',
    fontSize: 15,
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
    fontSize: 20,
  },
  invoiceID: {
    fontStyle: 'light',
  },
  tableHeaderContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontStyle: 'bold',
  },
  tableHeaderItem: {
    display: 'flex',
    flexDirection: 'row',
    width: 230,
  },
  tableHeaderData: {
    display: 'flex',
    flexDirection: 'row',
    width: 130,
  },
  tableProductListContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    fontStyle: 'light',
    display: 'flex',
    flexDirection: 'row',
    width: 130,
  },
  tableDataBold: {
    fontStyle: 'light',
    display: 'flex',
    flexDirection: 'row',
    width: 130,
    fontStyle: 'medium',
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
  },
  footerContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 30,
  },
});

function Invoice({
  cartItems,
  subtotal,
  discountTotal,
  taxTotal,
  total,
  changes,
  paymentDetailsPayment,
}) {
  const today = new Date();
  const date =
    today.toLocaleString('default', { month: 'long' }) +
    ' ' +
    today.getDate() +
    ', ' +
    today.getFullYear();
  const time =
    today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
  return (
    <Document>
      <Page size="A4">
        <View style={styles.body}>
          <View>
            <Text style={styles.date}>{date}</Text>
          </View>
          <View style={styles.shopInfoContainer}>
            <Text style={styles.shopTitle}>Aporajita Tumi</Text>
            <Text style={styles.shopDescription}>Dhanmondi Outlet</Text>
            <Text style={styles.shopDescription}>
              Shop no 207, Level 2, Genetic Plaza, Dhanmondi 27
            </Text>
          </View>
          <View style={styles.InvoiceInfoContainer}>
            <Text style={styles.invoiceTitle}>INVOICE / RECEIPT</Text>
            <Text style={styles.invoiceID}>Invoice #000016</Text>
          </View>
          <View style={styles.tableHeaderContainer}>
            <Text style={styles.tableHeaderItem}>Item</Text>
            <Text style={styles.tableHeaderData}>Quantity</Text>
            <Text style={styles.tableHeaderData}>Price (BDT)</Text>
          </View>
          <View style={styles.underline} />
          {cartItems.map((item, index) => {
            return (
              <View key={index}>
                <View style={styles.tableProductListContainer}>
                  <Text style={styles.tableDataItem}>
                    {item.name} (Variant: {item.variant.value})
                  </Text>
                  <Text style={styles.tableData}>
                    {item.addedQuantity} x{' '}
                    {item.unitPrice !== item.price && (
                      <Text style={styles.strikedText}>
                        {item.price.toFixed(2)}
                      </Text>
                    )}{' '}
                    {item.unitPrice}
                  </Text>
                  <Text style={styles.tableData}>
                    {(item.addedQuantity * item.unitPrice).toFixed(2)}
                  </Text>
                </View>
                <View style={styles.underline} />
              </View>
            );
          })}
          <View style={styles.tableSummaryContainer}>
            <Text style={styles.tableDataItem} />
            <Text style={styles.tableData}>Subtotal</Text>
            <Text style={styles.tableData}>{subtotal}</Text>
          </View>
          <View style={styles.tableSummaryContainer}>
            <Text style={styles.tableDataItem} />
            <Text style={styles.tableData}>Discount</Text>
            <Text style={styles.tableData}>{discountTotal}</Text>
          </View>
          <View style={styles.tableSummaryContainer}>
            <Text style={styles.tableDataItem} />
            <Text style={styles.tableData}>Tax/Vat</Text>
            <Text style={styles.tableData}>{taxTotal}</Text>
          </View>
          <View style={styles.tableSummaryContainer}>
            <Text style={styles.tableDataItem} />
            <Text style={styles.tableData}>Total</Text>
            <Text style={styles.tableData}>{total}</Text>
          </View>
          <View style={styles.underline} />
          {paymentDetailsPayment.map((payment, index) => {
            return (
              <View style={styles.tableSummaryContainer} key={index}>
                <Text style={styles.tableDataItem} />
                <Text style={styles.tableData}>{payment.type}</Text>
                <Text style={styles.tableData}>{payment.amount}</Text>
              </View>
            );
          })}
          <View style={styles.underline} />
          <View style={styles.tableSummaryContainer}>
            <Text style={styles.tableDataItem} />
            <Text style={styles.tableDataBold}>Outstanding</Text>
            <Text style={styles.tableDataBold}>{changes}</Text>
          </View>
          <View style={styles.underline} />
          <View style={styles.footerContainer}>
            <Text>Served By : Pronob Gosh</Text>
            <Text>
              {date} at {time}
            </Text>
          </View>
        </View>
      </Page>
    </Document>
  );
}

export default Invoice;
