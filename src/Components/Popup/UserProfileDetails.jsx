import React, { useState } from 'react';
import { Icon } from "@iconify/react";
import styled from 'styled-components';
import SubPopup from './SubPopup';
import Buttons from '../Button/Button';
import InputLabel from '../InputLable/InputLable';
import InputField from '../InputField/InputField';
import InputDropdown from '../InputDropDown/InputDropDown';
import { useDropzone } from 'react-dropzone';
import dropdownOptions from '../../Data.json';


const FormBackground = styled.div`
  height: fit-content;
`;

const FlexContent = styled.div`
  display: inline-flex;
  gap: 2.5em;
`;

const ChangeDP = styled.div`
  width: 4.688em;
  height: 4.688em;
  background-color: lightgray;
  border-radius: 50%;
  margin-top: -1.875em;
  position: relative;
  overflow: hidden; 
`;

const UploadLabel = styled.label`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const PreviewImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ProfileDP = styled.div`
    width: 2.1875em; 
    height: 2.1875em; 
    margin-left: 1.25em; 
    margin-right: 0.625em; 
    border-radius: 50%;
    flex-shrink: 0;
    background-color: lightgray;
`;



function UserProfileDetails() {
    const [editable, setEditable] = useState(false);
    const [imageUrl, setImageUrl] = useState(null);

    const toggleEditable = () => {
        setEditable(!editable);
    };

    const handleDrop = (acceptedFiles) => {
        const file = acceptedFiles[0];
        const url = URL.createObjectURL(file);
        setImageUrl(url);
    };

    const { getRootProps, getInputProps } = useDropzone({
        accept: 'image/*',
        multiple: false,
        onDrop: handleDrop
    });

    return (
        <>
            <SubPopup
                triggerComponent={<ProfileDP />}
                popupPosition="70%"
                headBG="none"
                title={
                    <>
                        My Profile <Icon icon="tabler:edit" style={{ fontSize: "1em" }} onClick={toggleEditable} />
                    </>
                }

                headTextColor="black"
                closeIconColor="red"
                btnName="Save"
                btnBG="green"
                btnTextColor="white"
                bodyContent={(
                    <FormBackground>
                        <div className="location">
                            <InputLabel for="location" color="green">Location</InputLabel>
                            <InputDropdown id="location" name="location" editable={true} options={dropdownOptions.dropDownOptions.locationOptions} />
                        </div>
                        
                        <FlexContent>
                            <div className="uname">
                                <InputLabel for="uname" color="green">User Name</InputLabel>
                                <InputField type="text" id="uname" name="uname" editable={true} />

                            </div>
                            <ChangeDP {...getRootProps()}>
                                {/* Preview image */}
                                {imageUrl && <PreviewImage src={imageUrl} alt="Preview" />}
                                {/* Camera icon */}
                                <UploadLabel htmlFor="profilePicture">
                                    <Icon icon="fluent:camera-add-20-regular" style={{ fontSize: "0.813em" }} />
                                </UploadLabel>
                                {/* Hidden file input */}
                                <input {...getInputProps()} style={{ display: "none" }} />
                            </ChangeDP>
                        </FlexContent>
                        {/* Other fields */}
                        <div className="Email">
                            <InputLabel for="email" color="green">Email</InputLabel>
                            <InputField type="email" id="email" name="email" editable={true} />
                        </div>
                        <div className="Telephone">
                            <InputLabel for="telephone" color="green">Telephone</InputLabel>
                            <InputField type="text" id="telephone" name="telephone" editable={true} />
                        </div>
                        <div className="PasswordField">
                            <InputLabel for="userPassword" color="green">Do you want to change your password?</InputLabel>
                            <InputField type="password" id="currentPassword" name="currentPassword" placeholder="Current Password" editable={true} />
                            <InputField type="password" id="newPassword" name="newPassword" placeholder="New Password" editable={true} />
                            <InputField type="password" id="conf_newPassword" name="conf_newPassword" placeholder="Confirm New Password" editable={true} />
                        </div>
                        <Buttons type="submit" id="save-btn" style={{ backgroundColor: "green", color: "white" }}> Save </Buttons>

                    </FormBackground>

                )}
            />
        </>
    );
}

export default UserProfileDetails;
