import React, { useEffect, useState } from 'react'
import {
    Table,
    TableCaption,
    TableHead,
    TableHeader,
    TableRow,
    TableBody,
    TableCell
} from '../ui/table'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Edit2, MoreHorizontal } from 'lucide-react'
import { Popover, PopoverTrigger, PopoverContent } from '../ui/popover'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const CompaniesTable = () => {

    // ✅ FIX: searchCompanyByText should be string, not array
    const { companies = [], searchCompanyByText = "" } = useSelector(state => state.company)

    const [filterCompany, setFilterCompany] = useState([])
    const navigate = useNavigate()

    // ✅ Filtering logic
    useEffect(() => {
        const filteredCompany = companies.filter((company) => {

            // If no search text → show all
            if (!searchCompanyByText) return true

            return company?.name
                ?.toLowerCase()
                .includes(searchCompanyByText.toLowerCase())
        })

        setFilterCompany(filteredCompany)
    }, [companies, searchCompanyByText])

    return (
        <div>
            <Table>
                <TableCaption>A List of your recent registered companies</TableCaption>

                <TableHeader>
                    <TableRow>
                        <TableHead>Logo</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {
                        filterCompany.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={4} className="text-center">
                                    You haven't registered any company yet.
                                </TableCell>
                            </TableRow>
                        ) : (
                            filterCompany.map((company) => (
                                <TableRow key={company._id}>
                                    
                                    <TableCell>
                                        <Avatar>
                                            <AvatarImage src={company.logo} />
                                        </Avatar>
                                    </TableCell>

                                    <TableCell>{company.name}</TableCell>

                                    <TableCell>
                                        {company.createdAt?.split("T")[0]}
                                    </TableCell>

                                    <TableCell className="text-right cursor-pointer">
                                        <Popover>
                                            <PopoverTrigger>
                                                <MoreHorizontal />
                                            </PopoverTrigger>

                                            <PopoverContent className="w-32">
                                                <div onClick={() => navigate(`/admin/companies/${company._id}`)} className='flex items-center gap-2 cursor-pointer'>
                                                    <Edit2 className='w-4' />
                                                    <span>Edit</span>
                                                </div>
                                            </PopoverContent>
                                        </Popover>
                                    </TableCell>

                                </TableRow>
                            ))
                        )
                    }
                </TableBody>
            </Table>
        </div>
    )
}

export default CompaniesTable