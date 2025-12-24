'use client';

import JobCard from '@/components/JobCard';
import axios from 'axios';
import { useEffect, useState } from 'react';

type Job = {
  id: string;
  title: string;
  location: string;
  createdAt: string;
};

export default function Job() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);

        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/job?page=${page}`
        );

        if (res.data?.success) {
            setJobs(res.data.response);
        }
      } 
      catch (err) {
        console.error('Failed to fetch jobs', err);
      } 
      finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [page]); 

  return (
    <div className="h-screen">
      <div className="flex justify-center font-bold mb-6">
        All Jobs
      </div>
      <div className="mx-6 shadow-md rounded-md h-[78%] justify-center overflow-auto">
        {loading && <p className="text-center">Loading...</p>}

        {jobs?.map((job) => {
            const date = job.createdAt.split('T')[0]; 

            return (
                <JobCard
                    key={job.id}
                    id={job.id}
                    title={job.title}
                    location={job.location}
                    date={date}
                />
            );
        })}

      </div>

      {/* Pagination */}
      <div className="flex justify-center gap-4 mt-4">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
        >
          Prev
        </button>

        <button onClick={() => setPage((p) => p + 1)}>
          Next
        </button>
      </div>
    </div>
  );
}
