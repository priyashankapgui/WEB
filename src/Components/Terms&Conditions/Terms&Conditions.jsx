import React, { useState, useEffect } from 'react';
import ReceiptPopup from '../ReceiptPopup/ReceiptPopup';
import './Terms&Conditions.css';
import axios from 'axios';

const TermsConditions = ({ onClose }) => {

    console.log('Work Order receipt component rendered');


    const handleReprintReceipt = () => {
        window.print();
    };


//implement workorder body content here

    const TermsConditions = (

        <div className="work-order-receipt">
            <div className="work-order-receipt-header">

Hi Dinuriii................

            </div>
	</div>









    );

    return (
        <ReceiptPopup bodyContent={TermsConditions} onClose={onClose} onPrint={handleReprintReceipt} />
    );
};

export default  TermsConditions;