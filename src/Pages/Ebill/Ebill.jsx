import React from "react";
import Ebill from '../../Components/EbillTemplate/Ebill';
import './Ebill.css';
import greenleaflogo from "../../Assets/Green Leaf Super.png";
import { HiOutlineDownload } from "react-icons/hi";
import { FaHome } from "react-icons/fa";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export default function LastPage() {
  const downloadBill = () => {
    const input = document.querySelector('.Ebill-component');
    html2canvas(input)
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        pdf.addImage(imgData, 'PNG', 0, 0);
        pdf.save("bill.pdf");
      });
  };

  return (
    <div className="ebillmainContainer">
      <div className="ebillleftcontainer">
        <h2 className="billthank">Thank You!</h2>
        <img className="greenimage" src={greenleaflogo} alt="greenleaf logo" />
        <h3 className="bill-flexflow-text">Green Leaf Super Mart</h3>
        <div className="bill-companyName">
          <p>Hexacode Solutions Pvt Ltd</p>
        </div>
      </div>
      <div className="bill-rightcontainer">
        <div className="viewEbill-frame">
          <div className="Ebill-component">
            <Ebill />
          </div>
        </div>
        <div className="button-container">
            <HiOutlineDownload className="billbutton" onClick={downloadBill} />
            <FaHome className="billbutton" onClick={() => { window.location.href = "/";}}/>
        </div>
      </div>
    </div>
  );
}
