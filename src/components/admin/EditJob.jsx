
import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Button } from '../ui/button'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '../ui/select'
import { Loader2, ArrowLeft } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'sonner'

import { JOB_API_END_POINT } from '@/utils/constant'
import useGetAllAdminJobs from '@/hooks/useGetAllAdminJobs'
import useGetAllCompanies from '@/hooks/useGetAllCompanies'

const EditJob = () => {

    const { id } = useParams()
    const navigate = useNavigate()

    // Fetch admin jobs and companies
    useGetAllAdminJobs()
    useGetAllCompanies()

    const { allAdminJobs = [] } = useSelector(store => store.job)
    const { companies = [] } = useSelector(store => store.company)

    const [input, setInput] = useState({
        title: "",
        description: "",
        requirements: "",
        salary: "",
        location: "",
        jobType: "",
        experience: "",
        position: "",
        companyId: ""
    })

    const [loading, setLoading] = useState(false)
    const [fetching, setFetching] = useState(true)

    // Find the selected job using its JOB ID
    useEffect(() => {
        if (!allAdminJobs.length) return

        const selectedJob = allAdminJobs.find(
            job => job._id === id
        )

        if (!selectedJob) {
            setFetching(false)
            toast.error("Job not found")
            return
        }

        setInput({
            title: selectedJob.title || "",
            description: selectedJob.description || "",
            requirements: Array.isArray(selectedJob.requirements)
                ? selectedJob.requirements.join(", ")
                : "",
            salary: selectedJob.salary ?? "",
            location: selectedJob.location || "",
            jobType: selectedJob.jobType || "",
            experience: selectedJob.experienceLevel ?? "",
            position: selectedJob.position ?? "",
            companyId: selectedJob.company?._id || selectedJob.company || ""
        })

        setFetching(false)

    }, [allAdminJobs, id])

    const changeEventHandler = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    const selectChangeHandler = (value) => {
        setInput({
            ...input,
            companyId: value
        })
    }

    const submitHandler = async (e) => {
        e.preventDefault()

        if (!input.companyId) {
            toast.error("Please select a company")
            return
        }

        try {
            setLoading(true)

            const res = await axios.put(
                `${JOB_API_END_POINT}/update/${id}`,
                input,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    withCredentials: true
                }
            )

            if (res.data.success) {
                toast.success(res.data.message)
                navigate("/admin/jobs")
            }

        } catch (err) {
            toast.error(
                err?.response?.data?.message ||
                err.message ||
                "Something went wrong"
            )
        } finally {
            setLoading(false)
        }
    }

    if (fetching) {
        return (
            <div>
                <Navbar />
                <div className="flex justify-center items-center my-20">
                    <Loader2 className="animate-spin mr-2" />
                    Loading job details...
                </div>
            </div>
        )
    }

    return (
        <div>
            <Navbar />

            <div className="flex items-center justify-center w-screen my-5">

                <form
                    onSubmit={submitHandler}
                    className="p-8 max-w-4xl border border-gray-200 shadow-lg rounded-md"
                >

                    <div className="flex items-center gap-4 mb-5">

                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => navigate("/admin/jobs")}
                        >
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back
                        </Button>

                        <h1 className="font-bold text-xl">
                            Edit Job
                        </h1>

                    </div>

                    <div className="grid grid-cols-2 gap-2">

                        <div>
                            <Label>Title</Label>
                            <Input
                                name="title"
                                value={input.title}
                                onChange={changeEventHandler}
                            />
                        </div>

                        <div>
                            <Label>Description</Label>
                            <Input
                                name="description"
                                value={input.description}
                                onChange={changeEventHandler}
                            />
                        </div>

                        <div>
                            <Label>Requirements</Label>
                            <Input
                                name="requirements"
                                value={input.requirements}
                                onChange={changeEventHandler}
                            />
                        </div>

                        <div>
                            <Label>Salary</Label>
                            <Input
                                type="number"
                                name="salary"
                                value={input.salary}
                                onChange={changeEventHandler}
                            />
                        </div>

                        <div>
                            <Label>Location</Label>
                            <Input
                                name="location"
                                value={input.location}
                                onChange={changeEventHandler}
                            />
                        </div>

                        <div>
                            <Label>Job Type</Label>
                            <Input
                                name="jobType"
                                value={input.jobType}
                                onChange={changeEventHandler}
                            />
                        </div>

                        <div>
                            <Label>Experience Level</Label>
                            <Input
                                type="number"
                                name="experience"
                                value={input.experience}
                                onChange={changeEventHandler}
                            />
                        </div>

                        <div>
                            <Label>No. of Positions</Label>
                            <Input
                                type="number"
                                name="position"
                                value={input.position}
                                onChange={changeEventHandler}
                            />
                        </div>

                        <div className="col-span-2">
                            <Label>Company</Label>

                            <Select
                                value={input.companyId}
                                onValueChange={selectChangeHandler}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a Company" />
                                </SelectTrigger>

                                <SelectContent>
                                    <SelectGroup>
                                        {companies.map(company => (
                                            <SelectItem
                                                key={company._id}
                                                value={company._id}
                                            >
                                                {company.name}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>

                    </div>

                    <Button
                        type="submit"
                        disabled={loading}
                        className="w-full my-4 bg-blue-600 text-white"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Please Wait
                            </>
                        ) : (
                            "Update Job"
                        )}
                    </Button>

                </form>
            </div>
        </div>
    )
}

export default EditJob
