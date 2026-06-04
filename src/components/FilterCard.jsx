import React from "react"
import { Label } from "./ui/label"
import { RadioGroup, RadioGroupItem } from "./ui/radio-group"
import { useDispatch } from "react-redux"
import { setSearchJobByText } from "@/redux/jobSlice"

const filterData = [
  {
    filterType: "Location",
    array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"]
  },
  {
    filterType: "Industry",
    array: ["Frontend Developer", "Backend Developer", "Full Stack Developer"]
  },
  {
    filterType: "Salary",
    array: ["0-40k", "42-1Lakh", "1Lakh - 5Lakh"]
  },
]

const FilterCard = () => {
  const dispatch = useDispatch()

  // 🔥 FIX: include filter type in value so it doesn't overwrite blindly
  const changeHandler = (filterType, value) => {
    dispatch(setSearchJobByText(`${filterType}:${value}`))
  }

  return (
    <div className="w-full bg-white p-3 rounded-md">
      <h1 className="font-bold text-lg">Filter Jobs</h1>
      <hr className="mt-3" />

      {filterData.map((data, index) => (
        <div key={index} className="mt-4">
          <h1 className="font-bold text-lg">{data.filterType}</h1>

          <RadioGroup>
            {data.array.map((item, i) => {
              const id = `${data.filterType}-${i}`

              return (
                <div key={id} className="flex items-center space-x-2 my-2">
                  <RadioGroupItem
                    value={item}
                    id={id}
                    onClick={() => changeHandler(data.filterType, item)}
                  />
                  <Label htmlFor={id}>{item}</Label>
                </div>
              )
            })}
          </RadioGroup>
        </div>
      ))}
    </div>
  )
}

export default FilterCard