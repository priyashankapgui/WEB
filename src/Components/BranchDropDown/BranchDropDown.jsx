import React, { useState, useEffect, useRef } from 'react';
import { IoMdArrowDropdown } from "react-icons/io";
import axios from 'axios';
import './BranchDropDown.css';

const BranchDropDown = ({ id, name, height, width, onChange, editable, borderRadius, marginTop }) => {
    const [selectedOption, setSelectedOption] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [options, setOptions] = useState([]);
    const dropdownRef = useRef(null);
    const placeholder = "Select a branch";
    

    useEffect(() => {
        axios.get('http://localhost:8080/branchesWeb')
            .then(response => {
                setOptions(response.data);
                const savedBranchName = localStorage.getItem('selectedBranch');
                const storedBranchName = localStorage.getItem('selectedBranch');
console.log('branch', { branchName: storedBranchName });
              
                if (savedBranchName) {
                    setSelectedOption(savedBranchName);
                }
            })
            .catch(error => console.error('Error fetching branch options:', error));
    }, []);

    const handleOptionClick = (option) => {
        setSelectedOption(option.branchName);
        localStorage.setItem('selectedBranch', option.branchName);
        localStorage.setItem('selectedBranchId', option.branchId);
        
      
        onChange(option);
        setIsOpen(false);
    };

    const toggleDropdown = () => {
        if (editable) {
            setIsOpen(!isOpen);
        }
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div
            id={id}
            name={name}
            ref={dropdownRef}
            className="dropdown-container"
            style={{
                borderRadius: borderRadius || '0.625em',
                height: height || '2.6em',
                width: width || '15.625em',
                marginTop: marginTop || '0.313em',
            }}
        >
            <div
                className={`dropdown-selected ${editable ? '' : 'disabled'}`}
                onClick={toggleDropdown}
                tabIndex={editable ? 0 : -1}
            >
                <span>{selectedOption || placeholder}</span>
                <IoMdArrowDropdown className="dropdown-arrow" />
            </div>
            {isOpen && (
                <div className="dropdown-list">
                    {options.map((option, index) => (
                        <div
                            key={index}
                            className="dropdown-option"
                            onClick={() => handleOptionClick(option)}
                        >
                            {option.branchName}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default BranchDropDown;