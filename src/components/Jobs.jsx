import React from 'react'
import Navbar from './shared/Navbar'
import FilterCard from './FilterCard'
import Job from './Job'
import { useSelector } from 'react-redux'

const Jobs = () => {
    const { allJobs, searchJobByText } = useSelector(store => store.job)

    console.log("ALL JOBS:", allJobs)
    console.log("SEARCH FILTER:", searchJobByText)

    // 🔥 FIXED FILTER LOGIC
    const filteredJobs = allJobs.filter((job) => {
    if (!searchJobByText) return true

    const [type, value] = searchJobByText.split(":")

    if (!type || !value) return true

    const v = value.toLowerCase()

    if (type === "Location") {
        return job?.location?.toLowerCase()?.includes(v)
    }

    if (type === "Industry") {
        // 🔥 FIX: match keywords, not full string
        return job?.title?.toLowerCase()?.includes(v.split(" ")[0])
    }

    if (type === "Salary") {
        // 🔥 FIX: range-based fallback
        const salary = Number(job?.salary)

        if (value === "0-40k") return salary <= 40
        if (value === "42-1Lakh") return salary > 40 && salary <= 100
        if (value === "1Lakh - 5Lakh") return salary > 100

        return true
    }

    return true
})

    return (
        <div>
            <Navbar />

            <div className='max-w-7xl mx-auto mt-5'>
                <div className='flex gap-5'>

                    {/* Filter Section */}
                    <div className='w-[20%]'>
                        <FilterCard />
                    </div>

                    {/* Jobs Section */}
                    {
                        filteredJobs.length <= 0 ? (
                            <span>Jobs Not Found</span>
                        ) : (
                            <div className='flex-1 h-[88vh] overflow-y-auto pb-5'>
                                <div className='grid grid-cols-3 gap-4'>
                                    {
                                        filteredJobs.map((job) => (
                                            <div key={job?._id}>
                                                <Job job={job} />
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        )
                    }

                </div>
            </div>
        </div>
    )
}

export default Jobs