import React, { useContext, useState, useEffect } from 'react'
import { AppContext } from '../context/AppContext'
import { useParams } from 'react-router-dom'
import Loading from '../components/Loading'
import Navbar from '../components/Navbar'
import { assets, jobsData } from '../assets/assets'
import kconvert from 'k-convert'
import moment from 'moment'
import JobCard from '../components/JobCard'
import Footer from '../components/Footer'

const ApplyJob = () => {
  const { id } = useParams()
  const [Jobdata, setJobdata] = useState(null)
  const { jobs } = useContext(AppContext)

  const fetchJob = async () => {
    const data = jobs.filter(job => job._id.toString() === id)
    if (data.length !== 0) {
      setJobdata(data[0])
      console.log(data[0])
    }
  }

  useEffect(() => {
    if (jobs.length > 0) {
      fetchJob()
    }
  }, [id, jobs])

  return Jobdata ? (
    <>
      <Navbar />
      <div className='min-h-screen flex flex-col py-10 container px-4 2xl:px-20 mx-auto'>
        <div className='bg-white text-black rounded-lg w-full'>

          <div className='flex justify-between items-center flex-wrap gap-8 px-14 py-16 mb-6 bg-sky-50 border border-sky-400 rounded-xl'>

            <div className='flex flex-col md:flex-row items-center'>

              <img className="h-16 bg-white rounded-lg p-4 mr-4 max-md:mb-4 " src={assets.company_icon} alt="" />

              <div className='text-center md:text-left text-neutral-700'>
                <h1 className='text-2xl sm:text-4xl font-medium'>{Jobdata.title}</h1>

                <div className='flex flex-row flex-wrap max-md:justify-center gap-y-2 gap-6 items-center text-gray-600 mt-2'>

                  <span className='flex items-center gap-1'>
                    <img src={assets.suitcase_icon} alt="" />
                    {Jobdata.companyId?.name}
                  </span>

                  <span className='flex items-center gap-1'>
                    <img src={assets.location_icon} alt="" />
                    {Jobdata.location}
                  </span>

                  <span className='flex items-center gap-1'>
                    <img src={assets.person_icon} alt="" />
                    {Jobdata.level}
                  </span>

                  <span className='flex items-center gap-1'>
                    <img src={assets.money_icon} alt="" />
                    CTC: {kconvert.convertTo(Jobdata.salary)}
                  </span>

                </div>
              </div>
            </div>

            <div className='flex flex-col justify-center text-end  text-sm max-md:text-center'>
              <button className='bg-blue-500 text-white px-10 py-2.5 rounded-md mb-2'>
                Apply Now
              </button>
              <p className='text-gray-600 mt-1'>
                Posted {moment(Jobdata.date).fromNow()}
              </p>
            </div>

          </div>
          <div className="flex flex-col lg:flex-row justify-between items-start">
            <div className='w-full lg:w-2/3'>
              <h2 className='text-2xl font-bold mb-4'>Job description</h2>
              <div className="rich-text" dangerouslySetInnerHTML={{ __html: Jobdata.description }}></div>
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1.5 rounded-md text-sm mb-2 transition">
                Apply Now
              </button>
            </div>
            {/* Right section */}
            <div className='w-full lg:w-1/3 mt-8 lg:mt-0 lg:ml-8 space-y-5'>
              <h2>More jobs from {Jobdata.companyId.name}</h2>
              {jobs.filter(job=>job._id!=jobsData._id && job.companyId._id==Jobdata.companyId._id)
              .filter(job=>true).slice(0,4)
              .map((job,index)=> <JobCard key={index} job={job}/>)}
            </div>
          </div>
        </div>
      </div>
      <Footer/> 

    </>
  ) : (
    <Loading />
  )
}

export default ApplyJob