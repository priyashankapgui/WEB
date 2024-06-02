import React, { useState, useEffect } from 'react';
import './Ebill.css';
import greenleafBillLogo from "../.././Assets/greenleafBillLogo.svg";

const Ebill = () => {
    const [billedItems, setBilledItems] = useState([]);

    useEffect(() => {
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        setBilledItems(cartItems);
    }, []);

    const calculateAmount = (item) => {
        const unitPrice = parseFloat(item.sellingPrice);
        const qty = parseFloat(item.quantity);
        const discount = parseFloat(item.discount);
        return (unitPrice * qty - (unitPrice * qty * discount / 100)).toFixed(2);
    };

    const calculateGrossTotal = () => {
        return billedItems.reduce((total, item) => total + parseFloat(item.sellingPrice) * item.quantity, 0).toFixed(2);
    };

    const calculateTotalDiscount = () => {
        return billedItems.reduce((total, item) => {
            const discountAmount = (parseFloat(item.sellingPrice) * item.quantity) * (parseFloat(item.discount) / 100);
            return total + discountAmount;
        }, 0).toFixed(2);
    };

    const calculateNetTotal = () => {
        return billedItems.reduce((total, item) => total + parseFloat(calculateAmount(item)), 0).toFixed(2);
    };

    return (
        <>
            <div className="sales-receipt">
                <div className="sales-receipt-header">
                    <div className="logo">
                        <img className="sales-receipt-sys-logo" src={greenleafBillLogo} alt="greenmart logo" />
                    </div>
                    <div className="sales-receipt-store-details">
                        <h5 className='shopName'>Green Leaf Super Mart</h5>
                        <p className='branchAddress'>No: 30, Main Street, Galle</p>
                        <p className='branchPhone'>091 222 223 1</p>
                        <p className='branchEmail'>galle@greenleaf.com</p>
                    </div>
                </div>
                <hr className='invoice-line-top' />
                <h5 className='payment-Ereceipt-Txt'>e - Payment Receipt</h5>
                <hr className='invoice-line-top' />
                <div className="receipt-content">
                    <table className='receipt-details-table'>
                        <tbody>
                            <tr>
                                <td className='receipt-details-label'>Order No:</td>
                                <td className='receipt-details-value'>GAL-ORD1234567</td>
                            </tr>
                            <tr>
                                <td className='receipt-details-label'>Ordered At:</td>
                                <td className='receipt-details-value'>01/06/2024 12:34 PM</td>
                            </tr>
                            <tr>
                                <td className='receipt-details-label'>Payment Method:</td>
                                <td className='receipt-details-value'>Card</td>
                            </tr>
                            <tr>
                                <td className='receipt-details-label'>Name:</td>
                                <td className='receipt-details-value'>Dinu Kithmini</td>
                            </tr>
                            <tr>
                                <td className='receipt-details-label'>Phone:</td>
                                <td className='receipt-details-value'>071 123 4567</td>
                            </tr>
                        </tbody>
                    </table>

                    <hr className='invoice-line' />

                    <div className="items">
                        <table className='item-table'>
                            <thead>
                                <tr>
                                    <th>Description</th>
                                    <th style={{ textAlign: 'center' }}>Qty</th>
                                    <th style={{ textAlign: 'right' }}>Dis%</th>
                                    <th style={{ textAlign: 'right' }}>Amount(Rs)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {billedItems.map((item, index) => (
                                    <React.Fragment key={index}>
                                        <tr>
                                            <td colSpan={4}>{index + 1}. {item.productName}</td>
                                        </tr>
                                        <tr>
                                            <td>{parseFloat(item.sellingPrice).toFixed(2)}</td>
                                            <td style={{ textAlign: 'center' }}>{parseFloat(item.quantity).toFixed(2)}</td>
                                            <td style={{ textAlign: 'right' }}>{parseFloat(item.discount).toFixed(2)}</td>
                                            <td style={{ textAlign: 'right' }}>{calculateAmount(item)}</td>
                                        </tr>
                                    </React.Fragment>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <hr className='invoice-line' />
                <div className="billMiddle">
                    <div className="total">
                        <table className='total-table'>
                            <tbody>
                                <tr>
                                    <td>No Items</td>
                                    <td style={{ textAlign: 'right' }}>{billedItems.length}</td>
                                </tr>
                                <tr>
                                    <td>Gross Total</td>
                                    <td style={{ textAlign: 'right' }}>{calculateGrossTotal()}</td>
                                </tr>
                                <tr>
                                    <td>Total Discount</td>
                                    <td style={{ textAlign: 'right' }}>{calculateTotalDiscount()}</td>
                                </tr>
                                <tr style={{ fontSize: "14px", fontWeight: "bold" }}>
                                    <td>Net Total</td>
                                    <td style={{ textAlign: 'right' }}>{calculateNetTotal()}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <hr className='invoice-line-top' />
                <div className="ebil_footer">
                    <h5 className='thankyou'>Thank you for shopping!</h5>
                    <p>© <span style={{ fontFamily: "Princess Sofia, cursive" }}>Flex Flow -</span> Powered By HexaCode Solutions Pvt Ltd.</p>
                    <hr className='invoice-line' />
                    <p className='special-note'>Please note that once an online order is placed, it cannot be canceled.</p>
                </div>
            </div >
        </>
    );
};

export default Ebill;