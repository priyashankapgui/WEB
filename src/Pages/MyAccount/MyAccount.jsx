import React, { useState } from 'react';
import "./MyAccount.css";
//import Layout from '../../Components/Layout/Layout';

const MyAccount = () => {
    const [activeTab, setActiveTab] = useState('myDetails');

    const renderContent = () => {
        switch (activeTab) {
            case 'myDetails':
                return (
                    <div className="content-section">
                        <h2>My Details</h2>
                        <h3>Personal Information</h3>
                        <hr></hr>
                        <form>
                            <label>
                                First Name:
                                <input type="text" name="firstName" />
                            </label>
                            <label>
                                Last Name:
                                <input type="text" name="lastName" />
                            </label>
                            <label>
                                Mobile:
                                <input type="text" name="mobile" />
                            </label>
                            <label>
                                Birthday:
                                <input type="date" name="birthday" />
                            </label>
                        </form>
                        <h3>Email Info</h3>
                        <hr></hr>
                        <form>
                            <label>
                                Email:
                                <input type="email" name="email" />
                            </label>
                        </form>
                    </div>
                );
            case 'orders':
                return (
                    <div className="content-section">
                        <h2>Orders</h2><hr></hr>
                        <p>No orders yet.</p>
                    </div>
                );
            case 'accountSettings':
                return (
                    <div className="content-section">
                        <h2>Account Settings</h2>
                        <h3>Change Password</h3>
                        <hr></hr>
                        <form>
                            <label>
                                Password:
                                <input type="password" name="password" />
                            </label>
                            <label>
                                Confirm Password:
                                <input type="password" name="confirmPassword" />
                            </label>
                        </form>
                    </div>
                );
            case 'Logout':
                return (
                    <div className="content-section">
                        <h2>Logout</h2>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        
            <div className="my-account">
                <h1 className="heading">My Account</h1>
                <div className="my-account-container">
                    <div className="sidebar">
                        <ul>
                            <li
                                className={activeTab === 'myDetails' ? 'active' : ''}
                                onClick={() => setActiveTab('myDetails')}
                            >
                                My Details
                            </li>
                            <li
                                className={activeTab === 'orders' ? 'active' : ''}
                                onClick={() => setActiveTab('orders')}
                            >
                                Orders
                            </li>
                            <li
                                className={activeTab === 'accountSettings' ? 'active' : ''}
                                onClick={() => setActiveTab('accountSettings')}
                            >
                                Account Settings
                            </li>

                            <li
                            className={activeTab === 'logout' ? 'active' : ''}
                            onClick={() => setActiveTab('logout')}
                        >
                            Logout
                        </li>
                        </ul>
                    </div>
                    <div className="content">
                        {renderContent()}
                    </div>
                </div>
            </div>
        
    );
};

export default MyAccount;
