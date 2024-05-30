import React, { useState } from 'react';
import "./MyAccount.css";
import Layout from '../../Components/Layout/Layout';
import InputField from '../../Components/InputField/InputField';
import InputLable from '../../Components/InputLable/InputLable';
import Buttons from '../../Components/Button/Button';


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
                                <InputLable htmlFor="firstName" color="#000">
                                            First Name:
                                </InputLable>
                                <InputField
                                    type="text"
                                    name="firstName"
                                    editable={true}
                                    placeholder="Enter First Name"
                                />
                            <InputLable htmlFor="lastName" color="#000">
                                Last Name:
                            </InputLable>
                                <InputField
                                    type="text"
                                    name="lastName"
                                    editable={true}
                                    placeholder="Enter Last Name"
                                />
                            
                            <InputLable htmlFor="mobile" color="#000">
                                Mobile:
                            </InputLable>
                                <InputField
                                    type="text"
                                    name="mobile"
                                    editable={true}
                                    placeholder="Enter Mobile Number"
                                />
                            
                            <InputLable htmlFor="birthday" color="#000">
                                Birthday:
                                <InputField
                                    type="date"
                                    name="birthday"
                                    editable={true}
                                />
                            </InputLable>
                        </form>
                        <h3>Email Information</h3>
                        <hr></hr>
                        <form>
                            <InputLable htmlFor="email" color="#000">
                                Email:
                            </InputLable>
                                <InputField
                                    type="email"
                                    name="email"
                                    editable={true}
                                    placeholder="Enter Email"
                                />
                            
                        </form>

                        <Buttons
                            type="submit"
                            style={{
                            width: "20vh",
                            height: "7vh",
                            backgroundColor: "#51B541",
                            color: "white",
                            }}
                            value="Save"
                        >
                            Save
                        </Buttons>
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
                            <InputLable  htmlFor="password" color="#000">
                                Password:
                            </InputLable>
                                <InputField
                                    type="password"
                                    name="password"
                                    editable={true}
                                    placeholder="Enter Password"
                                />
                            
                            <InputLable  htmlFor="password" color="#000">
                                Confirm Password:
                            </InputLable>
                                <InputField
                                    type="password"
                                    name="confirmPassword"
                                    editable={true}
                                    placeholder="Confirm Password"
                                />
                            <Buttons
                                type="submit"
                                style={{
                                width: "20vh",
                                height: "7vh",
                                backgroundColor: "#51B541",
                                color: "white",
                                }}
                                value="Save"
                            >
                                Save
                        </Buttons>
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
        <Layout>
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
        </Layout> 
    );
};

export default MyAccount;
