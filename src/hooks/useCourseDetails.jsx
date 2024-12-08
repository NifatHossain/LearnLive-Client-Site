import React from 'react';
import useAxiosPublic from './useAxiosPublic';
import { useQuery } from '@tanstack/react-query';

const useCourseDetails = (id) => {
    const axiosPublic=useAxiosPublic()
    const { isLoading, refetch,data: courseDetails=[] } = useQuery({
        queryKey: ['details'],
        queryFn:async () => {
            const res = await axiosPublic.get(`/getCourseDetails/${id}`)
            // console.log(res.data)
            return res.data;
          },

    })
    return [isLoading,courseDetails,refetch]
};

export default useCourseDetails;