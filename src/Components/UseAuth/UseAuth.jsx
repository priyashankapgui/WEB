import secureLocalStorage from "react-secure-storage";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import CustomAlert from "../Alerts/CustomAlert/CustomAlert";
import MainSpiner from "../Spiner/MainSpiner/MainSpiner";

export function useAuth() {
    const user = secureLocalStorage.getItem("user");
    const token = secureLocalStorage.getItem("accessToken");
    const [data, setData] = useState(true);
    
    useEffect(() => {
        console.log("User: ", user);
        if (!user && !token) {
            setData(false);
        } else {
          fetch(`http://localhost:8080/api/customer/verify`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }).then((response) => {
            if (!response.ok) {
              secureLocalStorage.removeItem("accessToken");
              secureLocalStorage.removeItem("user");
              setData(false);
            }
            else{
                setData(true);
            }
          });
        }
      }, [token, user]);

    return data;
}

export default function UseAuth({ redirect }) {
  const navigate = useNavigate();
  const user = secureLocalStorage.getItem("user");
  const token = secureLocalStorage.getItem("accessToken");
  const [loading, setLoading] = useState(false);
  const [userType, setUserType] = useState("");

  useEffect(() => {
    console.log("User: ", user);
    setLoading(true);
    if (!user && !token) {
      setUserType("guest");
      if (redirect) {
        navigate("/login");
        return;
      } else {
        setLoading(false);
      }
    } else {
      fetch(`http://localhost:8080/api/customer/verify`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((response) => {
        if (!response.ok) {
          secureLocalStorage.removeItem("accessToken");
          secureLocalStorage.removeItem("user");
          setUserType("returnUser");
          if (redirect) {
            navigate("/login");
            return;
          } else {
            setLoading(false);
          }
        } else {
          setLoading(false);
        }
      });
    }
  }, [navigate, redirect, token, user]);

  return (
    <>
      {loading ? (
        <MainSpiner />
      ) : (
        <>
          {userType === "returnUser" && (
            <CustomAlert
              severity="success"
              title="You have been logged out"
              message="You may login to continue shopping"
              duration={5000}
              onClose={() => {
                console.log("Alert closed");
              }}
            />
          )}
          {userType === "guest" && (
            <CustomAlert
              severity="success"
              title="Welcome"
              message="Login to enjoy extra benefits"
              duration={5000}
              onClose={() => {
                console.log("Alert closed");
              }}
            />
          )}
          <Outlet />
        </>
      )}
    </>
  );
}
