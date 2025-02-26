import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Displaysteps from '../AddCourse/Displaysteps';
import { getFullDetailsOfCourse } from '../../../../services/operations/courseDetailsAPI';
import { setCourse, setEditCourse } from '../../../../slices/courseSlice';

export default function Editcourse(){
    const dispatch=useDispatch()
    const {courseId}=useParams();
    const {course}=useSelector((state)=>state.course);
    const [loading,setloading]=useState(false)
    const {token}=useSelector((state)=>state.auth)

    useEffect(()=>{
        const populatecoursedetails=async()=>{
            setloading(true)
            const result= await getFullDetailsOfCourse(courseId,token) 
            if(result?.courseDetails){
                dispatch(setEditCourse(true))
                dispatch(setCourse(result?.courseDetails))
            }
            setloading(false)
        }
        populatecoursedetails();
           // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    if(loading){
        return (
            <div className="grid flex-1 place-items-center">
            <div className="spinner"></div>
             </div>
        )
    }

  return (
    <div>
      <h1 className="mb-14 text-3xl font-medium text-richblack-5">
        Edit Course 
    </h1>
      <div className="mx-auto max-w-[600px]">
        {
            course ? (<Displaysteps/>):(<p className="mt-14 text-center text-3xl font-semibold text-richblack-100">
                Course not found...
                </p>)
        }
      </div>
    </div>
  )
}


