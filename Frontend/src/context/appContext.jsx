import { useAuth, useUser } from "@clerk/clerk-react";
import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { toast } from "sonner";
export const AppContext = createContext();

export const AppContextProvider = (props) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const { user } = useUser();
    const { getToken } = useAuth();
    const [searchFilter, setSearchFilter] = useState({

        title: "",
        location:""
    });
    const [isSearch, setIsSearch] = useState();
    const [jobs, setJobs] = useState([]);

    const [showRecruiterLogin, setShowRecruiterLogin] = useState(false);
    const [companyToken, setCompanyToken] = useState();
    const [companyData, setCompanyData] = useState();

    const [userData, setUserData] = useState(null);
    const [userApplications, setUserApplications] = useState([]);

    const fetchCompanyData = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/v1/company/company', {
                headers: {
                    token: companyToken
                }
            });
            if (data?.success) {
                setCompanyData(data?.company);
            }
        } catch (error) {
            toast.error(error?.response.data.message);
        }
    }

    const fetchUserData = async () => {
        try {
            const token = await getToken();
            const { data } = await axios.get(`${backendUrl}/api/v1/user`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (data.success) {
                console.log(data.user);
                setUserData(data?.user);
            }

        } catch (error) {
            toast.error(error?.response.data.message);
        }
    }

    //fetch Jobs
    const fetchJobs = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/v1/jobs/');
            if (data.success) {
                setJobs(data.allJobs);
                console.log(data.allJobs);
            }
        } catch (error) {
            toast.error(error?.response.data.message);
        }
    }

    //fetch User Applied Jobs
    const fetchUserApplications = async () => {
        try {
            const token = await getToken();
            const { data } = await axios.get(`${backendUrl}/api/v1/user/jobs`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (data.success) {
                setUserApplications(data?.jobs);
            }
        } catch (error) {
            toast.error(error?.response.data.message);
        }
    }

 



    useEffect(() => {
        if (companyToken) {
            fetchCompanyData();
        }
    }, [companyToken]);

    useEffect(() => {
        if (user) {
            fetchUserData();
            fetchUserApplications();
        }
    }, [user]);

    useEffect(() => {
        fetchJobs();
        const storedCompanyToken = localStorage.getItem('companyToken');
        if (storedCompanyToken) {
            setCompanyToken(storedCompanyToken);
        }
    }, []);

    const value = {
        searchFilter, setSearchFilter, isSearch, setIsSearch,
        jobs, setJobs,
        showRecruiterLogin, setShowRecruiterLogin,
        companyData, setCompanyData,
        companyToken, setCompanyToken, backendUrl,
        userData, setUserData, userApplications, setUserApplications, fetchUserData, fetchUserApplications
    }

    

    return (<AppContext.Provider value={value}>{props.children }</AppContext.Provider>)
}