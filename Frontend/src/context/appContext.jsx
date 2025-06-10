import React, { createContext, useState } from "react";
export const AppContext = createContext();

export const AppContextProvider = (props) => {
    const [searchFilter, setSearchFilter] = useState({

        title: "",
        location:""
    });
    const [isSearch, setIsSearch] = useState();
    const [jobs, setJobs] = useState([]);

    const [showRecruiterLogin, setShowRecruiterLogin] = useState(false);

    const value = {
        searchFilter, setSearchFilter, isSearch, setIsSearch,
        jobs, setJobs,
        showRecruiterLogin,setShowRecruiterLogin
    }

    return (<AppContext.Provider value={value}>{props.children }</AppContext.Provider>)
}