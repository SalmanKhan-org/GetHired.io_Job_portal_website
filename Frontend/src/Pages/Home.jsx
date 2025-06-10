import React, { useContext, useState } from 'react'
import Hero from '../Components/Hero'
import JobListing from '../Components/JobListing'
import AppDownload from '../Components/AppDownload'
import { AppContext } from '../context/appContext'
import RecruiterLogin from '../Components/RecruiterLogin'

const Home = () => {
    const { showRecruiterLogin } = useContext(AppContext);
    return (
        <div>
            {showRecruiterLogin && <RecruiterLogin/>}
            <Hero />
            <JobListing />
            <AppDownload />
        </div>
    )
}

export default Home
