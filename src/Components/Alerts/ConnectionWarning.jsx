import React, { useState, useEffect } from 'react';
import './ConnectionWarning.css';

const ConnectionWarning = ({ message }) => {
  const [online, setOnline] = useState(navigator.onLine);
  const [showOnlineMessage, setShowOnlineMessage] = useState(false);
  const [customMessage, setCustomMessage] = useState(message);

  useEffect(() => {
    const handleOnline = () => {
      setOnline(true);
      setShowOnlineMessage(true);
      setTimeout(() => setShowOnlineMessage(false), 3000);
    };

    const handleOffline = () => {
      setOnline(false);
      setShowOnlineMessage(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  useEffect(() => {
    if (message) {
      setCustomMessage(message);
      setShowOnlineMessage(true);
      setTimeout(() => setShowOnlineMessage(false), 3000);
    }
  }, [message]);

  return (
    <>
      {!online && (
        <div className="connection-warning offline">
          You are offline. Please check your internet connection.
        </div>
      )}
      {online && showOnlineMessage && customMessage && (
        <div className="connection-warning custom-message">
          {customMessage}
        </div>
      )}
    </>
  );
};

export default ConnectionWarning;
