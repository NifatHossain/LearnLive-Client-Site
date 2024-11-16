import React from 'react';
import useAxiosPublic from './useAxiosPublic';
import { useQuery } from '@tanstack/react-query';

const useAllCourse = () => {
    const axiosPublic=useAxiosPublic()
    const { isLoading, refetch,data: courses=[] } = useQuery({
        queryKey: ['courses'],
        queryFn:async () => {
            const res = await axiosPublic.get(`/getAllCourses`)
            return res.data;
          },

    })
    return [isLoading,courses,refetch]
};

export default useAllCourse;