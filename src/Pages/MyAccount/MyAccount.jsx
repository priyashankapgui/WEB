import React, { useState,useEffect } from 'react';
import "./MyAccount.css";
import Layout from '../../Components/Layout/Layout';
import InputField from '../../Components/InputField/InputField';
import InputLable from '../../Components/InputLable/InputLable';
import Buttons from '../../Components/Button/Button';
import CustomAlert from '../../Components/Alerts/CustomAlert/CustomAlert';
import { FaRegEye, FaEyeSlash } from "react-icons/fa";
import LoaderComponent from '../../Components/Spiner/HashLoader/HashLoader';
import secureLocalStorage from 'react-secure-storage';
import PasswordStrengthBar from "react-password-strength-bar";
import { useAuth } from '../../Components/UseAuth/UseAuth';
import { customerUpdate, customerUpdatePassword } from '../../Api/MyAccountAPI/MyAccountAPI';
import Orders from '../../Components/Orders/Orders';

const MyAccount = () => {
    const isLoggedIn = useAuth();
    const [activeTab, setActiveTab] = useState('myDetails');
    const [showAlertSuccess, setShowAlertSuccess] = useState(false);
    const [showAlertError, setShowAlertError] = useState("");
    const [loading, setLoading] = useState(false); // Loading state
    const [logoutLoading, setLogoutLoading] = useState(false); // Loading state
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    let user = secureLocalStorage.getItem("user");
    const token = secureLocalStorage.getItem("accessToken");
    // const [customerData, setCustomerData] = useState(
    //     {
    //         firstName: user?.firstName,
    //         lastName: user?.lastName,
    //         phone: user?.phone,
    //         address:user?.address,
    //         email: user?.email,
    //     }
    // );

    useEffect(() => {
        const activeTab = sessionStorage.getItem('activeTab');
        if (activeTab) {
            setActiveTab(activeTab);
        }
    }, []);

    const clickTab = (tab) => {
        setActiveTab(tab);
        sessionStorage.setItem('activeTab', tab);
    };

    const [customerData, setCustomerData] = useState({
        firstName: "",
        lastName: "",
        phone: "",
        address: "",
        email: ""
    });

    useEffect(() => {
        setCustomerData({
            firstName: user?.firstName,
            lastName: user?.lastName,
            phone: user?.phone,
            address: user?.address,
            email: user?.email,
        });
    }, [token, user]);

    const handleCustomerDataUpdate = async(e) => {
        e.preventDefault();
        setLoading(true);
        try{
            const user = secureLocalStorage.getItem('user');
            const response = await customerUpdate(user.customerId, customerData);
            if(response.status === 200){
                const updatedCustomerData = await response.data;
                setCustomerData({
                    firstName: updatedCustomerData.firstName,
                    lastName: updatedCustomerData.lastName,
                    phone: updatedCustomerData.phone,
                    address: updatedCustomerData.address,
                    email: updatedCustomerData.email,
                });
                secureLocalStorage.setItem("user", updatedCustomerData);
                setShowAlertSuccess('Customer updated successfully');
            }
            else{
                const error = await response.data;
                setShowAlertError(error.message);
            }
        }
        catch(error){
            setShowAlertError(error.message);
            console.log(error);
        }
        finally{
            setLoading(false);
        }
    };

    const handlePasswordUpdate = async(e) => {
        e.preventDefault();
        setLoading(true);
        if (!currentPassword || !password || !confirmPassword) {
            setLoading(false);
            setShowAlertError('Please fill in all fields');
            return;
        }
        if(password !== confirmPassword){
            setLoading(false);
            setShowAlertError('Passwords do not match');
            return;
        }
        try{
            const user = secureLocalStorage.getItem('user');
            const response = await customerUpdatePassword(user.customerId, currentPassword, password);
            if(response.status === 200){
                setLoading(false);
                setShowAlertSuccess('Password updated successfully');
            }
            else{
                setLoading(false);
                const responseError = await response.data;
                setShowAlertError(responseError.message);
            }
        }
        catch(error){
            setShowAlertError(error.message);
        }
        finally{
            setLoading(false);
        }
    };

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const toggleShowConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const toggleShowCurrentPassword = () => {
        setShowCurrentPassword(!showCurrentPassword);
    };

    const handleLogout = () => {
        setLogoutLoading(true);
        secureLocalStorage.removeItem('accessToken');
        secureLocalStorage.removeItem('user');
        window.location.href = '/';
    }

    
    const renderContent = () => {
        switch (activeTab) {
            case 'myDetails':
                return (
                    <div className="content-section-ma">
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
                                    value={customerData.firstName}
                                    onChange={(e) => setCustomerData({ ...customerData, firstName: e.target.value })}
                                />
                            <InputLable htmlFor="lastName" color="#000">
                                Last Name:
                            </InputLable>
                                <InputField
                                    type="text"
                                    name="lastName"
                                    editable={true}
                                    value={customerData.lastName}
                                    onChange={(e) => setCustomerData({ ...customerData, lastName: e.target.value })}
                                />
                            
                            <InputLable htmlFor="mobile" color="#000">
                                Mobile:
                            </InputLable>
                                <InputField
                                    type="text"
                                    name="mobile"
                                    editable={true}
                                    value={customerData.phone}
                                    onChange={(e) => setCustomerData({ ...customerData, phone: e.target.value })}
                                />
                            
                            <InputLable htmlFor="address" color="#000">
                                Address:
                            </InputLable>
                                <InputField
                                    type="text"
                                    name="address"
                                    editable={true}
                                    value={customerData.address}
                                    onChange={(e) => setCustomerData({...customerData,address: e.target.value})}
                                />
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
                                    value={customerData.email}
                                    onChange={(e) => setCustomerData({ ...customerData, email: e.target.value })}
                                />
                            
                        </form>
                        {loading ? (
                                <div className='loading-container'>
                                    <LoaderComponent/>
                                </div>
                            ) : (
                            <Buttons
                                type="submit"
                                style={{
                                backgroundColor: "#51B541",
                                color: "white",
                                }}
                                value="Save"
                                onClick={handleCustomerDataUpdate}
                            >
                                Save
                            </Buttons>
                        )}
                    </div>
                );
            case 'orders':
                return (
                    <div className="content-section-ma">
                        <h2>Orders</h2><hr></hr>
                        <Orders />
                    </div>
                );
            case 'accountSettings':
                return (
                    <div className="content-section-ma">
                        <h2>Account Settings</h2>
                        <h3>Change Password</h3>
                        <hr></hr>
                        <form>
                            <InputLable  htmlFor="password" color="#000">
                                Current Password:
                            </InputLable>
                                <InputField
                                    type={showCurrentPassword ? "text" : "password"}
                                    name="currentpassword"
                                    editable={true}
                                    placeholder="Enter Current Password"
                                    value={currentPassword}
                                    onChange={(e) => setCurrentPassword(e.target.value)}
                                    >

                                    {showCurrentPassword ? (
                                        <FaRegEye
                                          onClick={toggleShowCurrentPassword}
                                          style={{ cursor: "pointer" }}
                                        />
                                      ) : (
                                        <FaEyeSlash
                                          onClick={toggleShowCurrentPassword}
                                          style={{ cursor: "pointer" }}
                                        />
                                      )}
                                </InputField>
                            <InputLable  htmlFor="password" color="#000">
                                Password:
                            </InputLable>
                                <InputField
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    editable={true}
                                    placeholder="Enter Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    >
                                    
                                    {showPassword ? (
                                        <FaRegEye
                                          onClick={toggleShowPassword}
                                          style={{ cursor: "pointer" }}
                                        />
                                      ) : (
                                        <FaEyeSlash
                                          onClick={toggleShowPassword}
                                          style={{ cursor: "pointer" }}
                                        />
                                      )}
                                </InputField>
                                    {password && (
                                        <PasswordStrengthBar
                                        password={password}
                                        minLength={8}
                                        scoreWordStyle={{
                                            fontSize: "14px",
                                            fontFamily: "Poppins",
                                        }}
                                        scoreWords={[
                                            "very weak",
                                            "weak",
                                            "good",
                                            "strong",
                                            "very strong",
                                        ]}
                                        shortScoreWord="should be atlest 8 characters long"
                                        />
                                    )}
                            <InputLable  htmlFor="password" color="#000">
                                Confirm Password:
                            </InputLable>
                                <InputField
                                    type={showConfirmPassword ? "text" : "password"}
                                    name="confirmPassword"
                                    editable={true}
                                    placeholder="Confirm Password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    >
                                    {showConfirmPassword ? (
                                        <FaRegEye
                                          onClick={toggleShowConfirmPassword}
                                          style={{ cursor: "pointer" }}
                                        />
                                      ) : (
                                        <FaEyeSlash
                                          onClick={toggleShowConfirmPassword}
                                          style={{ cursor: "pointer" }}
                                        />
                                      )}
                                </InputField>
                            {loading ? (
                                <div className='loading-container'>
                                    <LoaderComponent size={50} />
                                </div>
                            ) : (
                                <Buttons
                                    type="submit"
                                    style={{
                                    backgroundColor: "#51B541",
                                    color: "white",
                                    }}
                                    value="Save"
                                    onClick={handlePasswordUpdate}
                                >
                                    Save
                                </Buttons>
                            )}
                        </form>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <Layout>
            <div className="my-account">
                <h1 className="heading-ma">My Account</h1>
                <div className="my-account-container">
                    <div className="sidebar-my-account">
                            <ul>
                                <li
                                    className={activeTab === 'myDetails' ? 'active' : ''}
                                    onClick={() => clickTab('myDetails')}
                                >
                                    My Details
                                </li>
                                <li
                                    className={activeTab === 'orders' ? 'active' : ''}
                                    onClick={() => clickTab('orders')}
                                >
                                    Orders
                                </li>
                                <li
                                    className={activeTab === 'accountSettings' ? 'active' : ''}
                                    onClick={() => clickTab('accountSettings')}
                                >
                                    Account Settings
                                </li>

                            </ul>
                            <div
                                className={activeTab === 'logout' ? 'active' : ''}
                                onClick={() => setActiveTab('logout')}
                            >
                                {logoutLoading ? (
                                <div className='loading-container'>
                                    <LoaderComponent size={50}/>
                                </div>
                                ) : (
                                    <Buttons
                                    style= {{
                                        backgroundColor: "#df3e0d",
                                        color: "#f7f7f7",
                                    }}
                                    onClick={handleLogout}
                                    >
                                        Logout
                                    </Buttons>
                                )}
                            </div>
                    </div>
                    <div className="myaccount-content">
                        {isLoggedIn ? renderContent() : <p>Please login to view this page</p>}
                    </div>
                </div>
                {showAlertSuccess && (
                <CustomAlert
                    severity="success"
                    title="Success"
                    message={showAlertSuccess}
                    duration={3000}
                    onClose={() => window.location.reload()}
                />
                )}

                {showAlertError && (
                <CustomAlert
                    severity="error"
                    title="Error"
                    message={showAlertError}
                    duration={10000}
                    onClose={() => setShowAlertError("")}
                />
                )}
            </div>
        </Layout> 
    );
};

export default MyAccount;
