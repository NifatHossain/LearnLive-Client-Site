import React from 'react';
import useAxiosPublic from './useAxiosPublic';
import { useQuery } from '@tanstack/react-query';

const useCourseContent = (id) => {
    const axiosPublic=useAxiosPublic()
    const { isLoading, refetch,data: courseContents=[] } = useQuery({
        queryKey: ['details'],
        queryFn:async () => {
            const res = await axiosPublic.get(`/getCourseContents/${id}`)
            // console.log(res.data)
            return res.data;
          },

    })
    return [isLoading,courseContents,refetch]
};

export default useCourseContent;