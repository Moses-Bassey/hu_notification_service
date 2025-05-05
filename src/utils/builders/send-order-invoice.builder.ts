import { OrderInvoiceDetailsProcessor } from 'src/types/types';

export const send_order_invoice_template = (
  template: OrderInvoiceDetailsProcessor,
): string => {
  return `<!DOCTYPE html>
    <html lang="en">
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Order Invoice Details</title>
    <body>
          <div
          style="
            max-width: 800px;
            padding: 20px;
            width: 100%;
            margin: 0px auto;
          "
        >
          <table style="width: 100%">
            <tr>
              <td>
                <div>
                  <p
                    style="
                      font-size: 18px;
                      color: rgb(45, 45, 45);
                      font-weight: 600;
                    "
                  >
                    ${template.business.business_name}
                  </p>
                  <p style="font-size: 14px; color: rgb(102, 112, 133)">
                   ${template.business.address}
                  </p>
                  <p style="font-size: 14px; color: rgb(102, 112, 133)">
                    ${template.business.phone_number}
                  </p>
                  <p style="font-size: 14px; color: rgb(102, 112, 133)">
                    ${template.business.email_address}
                  </p>
                </div>
              </td>
              <td style="text-align: right">
                <p
                  style="font-size: 20px; color: rgb(45, 45, 45); font-weight: 500"
                >
                  ${template.invoice_number}
                </p>
              </td>
            </tr>
          </table>
          <table
            style="
              width: 100%;
              margin-top: 20px;
              border-top: 1px solid rgb(239, 239, 244);
            "
          >
            <tr>
              <td style="text-align: center; padding: 30px 0px">
                <p style="font-size: 16px; color: rgb(45, 45, 45)">Status</p>
                <span
                  style="
                    color: rgb(2, 122, 72);
                    font-size: 12px;
                    background-color: rgb(236, 253, 243);
                    border-radius: 10px;
                    padding: 3px 10px;
                  "
                  >${template.payment_status}</span
                >
              </td>
              <td style="text-align: center; padding: 30px 0px">
                <p style="font-size: 16px; color: rgb(45, 45, 45)">Issue on</p>
                <p style="color: rgb(102, 112, 133); font-size: 14px">
                  ${template.issued_on}
                </p>
              </td>
              <td style="text-align: center; padding: 30px 0px">
                <p style="font-size: 16px; color: rgb(45, 45, 45)">Due on</p>
                <p style="color: rgb(102, 112, 133); font-size: 14px">
                  ${template.due_on}
                </p>
              </td>
              <td style="text-align: center; padding: 30px 0px">
                <p style="font-size: 16px; color: rgb(45, 45, 45)">Amount Due</p>
                <p style="color: rgb(102, 112, 133); font-size: 14px">${
                  template.amount_due
                }</p>
              </td>
            </tr>
          </table>
          <div>
            <p style="font-size: 14px">To</p>
            <div>
              <p style="font-size: 18px; color: rgb(45, 45, 45); font-weight: 600">
                ${template.customer.customer_name}
              </p>
              <p style="font-size: 14px; color: rgb(102, 112, 133)">
                ${template.customer.address}
              </p>
              <p style="font-size: 14px; color: rgb(102, 112, 133)">
                ${template.customer.phone_number}
              </p>
              <p style="font-size: 14px; color: rgb(102, 112, 133)">
                ${template.customer.email_address}
              </p>
            </div>
          </div>
          <table style="margin-top: 30px; width: 100%">
            <tr style="border-top: 1px solid rgb(239, 239, 244)">
              <td style="padding: 10px 0px">
                <span style="font-size: 16px; color: rgb(102, 112, 133)"
                  >Items</span
                >
              </td>
              <td style="padding: 20px 0px; text-align: right">
                <span style="font-size: 16px; color: rgb(102, 112, 133)"
                  >Amount</span
                >
              </td>
            </tr>
            ${template.products.map((product) => {
              return `<tr style="border-top: 1px solid rgb(239, 239, 244)">
                <td style="padding: 10px 0px">
                  <span
                    style="font-size: 16px; color: rgb(45, 45, 45); font-weight: 500"
                    >${product.quantity} ${product.product_name}</span
                  >
                </td>
                <td style="padding: 20px 0px; text-align: right">
                  <span
                    style="font-size: 14px; color: rgb(45, 45, 45); font-weight: 500"
                    >$${product.price}</span
                  >
                </td>
              </tr>`;
            })}
            
            
            <tr style="border-top: 1px solid rgb(239, 239, 244)">
              <td style="padding: 10px 0px">
                <p style="font-size: 16px; color: rgb(102, 112, 133)">
                  Shipping fee
                </p>
                <p style="font-size: 16px; color: rgb(102, 112, 133)">VAT</p>
              </td>
              <td style="padding: 20px 0px; text-align: right">
                <p style="font-size: 14px; color: rgb(45, 45, 45)">${
                  template.shipping_fee
                }</p>
                <p style="font-size: 14px; color: rgb(45, 45, 45)">${
                  template.vat
                }</p>
              </td>
            </tr>
            <tr style="border-top: 1px solid rgb(239, 239, 244)">
              <td style="padding: 10px 0px">
                <span
                  style="font-size: 16px; color: rgb(45, 45, 45); font-weight: 500"
                  >Total</span
                >
              </td>
              <td style="padding: 20px 0px; text-align: right">
                <span
                  style="font-size: 14px; color: rgb(45, 45, 45); font-weight: 500"
                  >${template.amount_due}</span
                >
              </td>
            </tr>
          </table>
        </div>
    </body>
    
    </html> `;
};
