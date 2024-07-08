import React from 'react';
import ReceiptPopup from '../../Components/ReceiptPopup/ReceiptPopup';
import './Terms&Conditions.css';
import { FcInspection } from "react-icons/fc";

const TermsConditions = ({ onClose }) => {

    console.log('Work Order receipt component rendered');


    const handleReprintReceipt = () => {
        window.print();
    };
//implement workorder body content here
    const TermsConditions = (

        <div className="terms-Cons-receipt">
            <div className='termsIcon'>
                <FcInspection />
            </div>
            <div className="terms-Cons-receipt-header">
                <h3 className='termsTitile'>Terms and Conditions</h3>
            </div>
            <div className='TermsDetails'>
                <ul type='square'>
                    <li>Once an online order has been placed, it cannot be cancelled.</li>
                    <li>When you successfully place your order, you must pick it up within 12 hours.</li>
                    <li>When you arrive to pick up your order, please bring the downloaded bill with you.</li>
                </ul>
            </div>
	    </div>
    );
    return (
        <ReceiptPopup bodyContent={TermsConditions} onClose={onClose} onPrint={handleReprintReceipt} />
    );
};

export default  TermsConditions;