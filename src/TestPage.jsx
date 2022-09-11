import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import InvoiceV2 from './components/pdf/InvoiceV2/InvoiceV2';
import { useEffect, useState } from 'react';
import Progress from './components/loading/Progress';

function TestPage() {
  const [isLoading, setIsLoading] = useState(true);
  const cartItems = [
    {
      name: 'Demo proudct',
      addedQuantity: '10',
      unitPrice: 80.0,
      price: 100.0,
      variant: '10',
    },
  ];
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);
  return (
    <div>
      <div className="page-container">
        <Progress isAnimating={isLoading} key={0} />
        <PDFDownloadLink
          className="btn btn-primary"
          document={
            <InvoiceV2
              cartItems={cartItems}
              subtotal={100.0}
              discountTotal={100.0}
              taxTotal={0.0}
              total={100.0}
              changes={0.0}
              paymentDetailsPayment={[{}]}
            />
          }
          fileName="fee_acceptance.pdf"
        >
          {({ blob, url, loading, error }) =>
            loading ? 'Loading document...' : 'Download now!'
          }
        </PDFDownloadLink>
        <hr />
        <PDFViewer className="react-pdf-viewer">
          <InvoiceV2
            cartItems={cartItems}
            subtotal={100.0}
            discountTotal={100.0}
            taxTotal={0.0}
            total={100.0}
            changes={0.0}
            paymentDetailsPayment={[{}]}
          />
        </PDFViewer>
      </div>
    </div>
  );
}

export default TestPage;
