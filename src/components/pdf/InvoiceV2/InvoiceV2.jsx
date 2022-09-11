import {
  Document,
  Page,
  View,
  Text,
  Font,
  Image,
  StyleSheet,
} from '@react-pdf/renderer';

import styles from './styles';
import Logo from './LOGO.jpg'

Font.register({
  family: 'Roboto',
  fonts: [
    {
      src: '/assets/fonts/Microsoft Sans Serif Regular font.ttf',
      fontStyle: 'regular',
      fontWeight: 400,
    },
  ],
});

function InvoiceV2(props) {
  const {
    paid,
    orderId,
    servedBy,
    created,
    customer,
    cartItems,
    subtotal,
    discountTotal,
    taxTotal,
    total,
    product_image,
    changes,
    order_note,
    paymentDetailsPayment,
  } = props.order;
  console.log("orderdf",product_image)
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
         <View style={styles.recieptHeaderContainer}>
            <View style={styles.imageItem}>
              <Image
                  style={styles.image}
                  src={Logo}
                />
            </View>
            <View >
              <Text >ORDER INVOICE</Text>
              <Text>Order # : {orderId}</Text>
              <Text>Received On : {date}</Text>
            </View>
          </View>
   
          <View>
            <Text style={styles.date}>{date}</Text>
          </View>
          <View style={styles.shopInfoContainer}>
            <Text style={styles.shopTitle}>Aporajita Tumi By Shatabdi</Text>
            <Text style={styles.shopDescription}>Dhanmondi Outlet</Text>
            <Text style={styles.shopDescription}>
            Shop no 207, Level 2, Genetic Plaza, Dhanmondi 27
            </Text>
          </View>
          <View style={styles.customerAddressContainer}>
            <View style={styles.addressInformation}>
              <Text style={styles.addressTitle}>BILL TO</Text>
              <Text>{customer.fullname}</Text>
              <Text>{customer.delivery_address}</Text>
              {/* // <Text>Outside Dhaka</Text> */}
              {/* <Text>Bangladesh</Text> */}
              <Text>{customer.phone}</Text>
            </View>
            <View style={styles.addressInformation}>
              <Text style={styles.addressTitle}>SHIP TO</Text>
              <Text>{customer.fullname}</Text>
              <Text>{customer.delivery_address} </Text>

              {/* // <Text>Outside Dhaka</Text> */}
              {/* <Text>Bangladesh</Text> */}
              <Text>{customer.phone}</Text>
            </View>
          </View>
          <View style={styles.tableHeaderContainer}>
            <Text style={styles.tableHeaderItem}>Product</Text>
            <Text style={styles.tableHeaderData}>Quantity</Text>
            <Text style={styles.tableHeaderData}>Total Price</Text>
          </View>
          <View style={styles.underline} />
          {cartItems?.map((item, index) => {
            return (
              <View key={index}>
                <View style={styles.tableProductListContainer}>
                  <Text style={styles.productName}>
                    {item.image}image {item.name} ({item.variantName}: {item.variantValue}){'\n'}
                    <Text style = {styles.productCode}>
                      SKU : {} /Barcode : {}
                    </Text>
                  </Text>
                  {console.log("item",item)}
                  <Text style={styles.tableData}>
                    {item.addedQuantity} x{' BDT '}
                    {/* {item.unitPrice !== item.price && (
                      <Text style={styles.strikedText}>
                        {item.price.toFixed(2)}
                      </Text>
                    )} */}
                    {item.unitPrice || item.price}
                  </Text>
                  <Text style={styles.tableData}>
                    BDT {(item.addedQuantity * item.unitPrice).toFixed(2)}
                  </Text>
                </View>
                <View style={styles.underline} />
              </View>
            );
          })}
          <View style={styles.geryTableContainer}>
            <Text style={styles.tableDataItem} />
            <Text style={styles.tableData}>Subtotal</Text>
            <Text style={styles.tableData}>BDT {subtotal}</Text>
          </View>
          <View style={styles.tableSummaryContainer}>
            <Text style={styles.tableDataItem} />
            <Text style={styles.tableData}>Vat / Tax</Text>
            <Text style={styles.tableData}>BDT {taxTotal}</Text>
          </View>
          <View style={styles.geryTableContainer}>
            <Text style={styles.tableDataItem} />
            <Text style={styles.tableDataBold}>Total</Text>
            <Text style={styles.tableData}>BDT {total}</Text>
          </View>
          <View style={styles.tableSummaryContainer}>
            <Text style={styles.tableDataItem} />
            <Text style={styles.tableDataBold}>Total Paid</Text>
            <Text style={styles.tableDataBold}>BDT {paid}</Text>
          </View>
          <View style={styles.geryTableContainer}>
            <Text style={styles.tableDataItem} />
            <Text style={styles.tableDataBold}>Total Due</Text>
            {paid > total ? (
              <Text style={styles.tableDataRed}>BDT - {paid - total}</Text>
            ) : (
              <Text style={styles.tableDataRed}>BDT {total - paid}</Text>
            )}
          </View>
          <View style={styles.underline} />
          {paymentDetailsPayment.map((payment, index) => {
            return (
              <View style={styles.tableSummaryContainer} key={index}>
                <Text style={styles.tableDataItem} />
                <Text style={styles.tableData}>{payment.type}</Text>
                <Text style={styles.tableDataRed}>{payment.amount}</Text>
              </View>
            );
          })}
          <View style={styles.footerContainer}>
            <Text>Order ID: {orderId}</Text>
            <Text>Served By : {servedBy}</Text>
            <Text>
              {new Date(created).toDateString()} at{' '}
              {new Date(created).toLocaleTimeString()}
            </Text>
            <Text style={styles.orderNoteDescription}>
              Order Note: {order_note}
            </Text>
          </View>
          <View>
            <Text style={styles.thanksText}>THANK YOU FOR YOUR ORDER</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
}

export default InvoiceV2;
