'use client';

import ApplicationCard from '@/components/ApplicationCard';
import NoDataComponent from '@/components/NoDataComponent';
import axios from 'axios';
import { headers } from 'next/headers';
import { useEffect, useState, useCallback } from 'react';

type Application = {
  id: string;
  name: string;
  jobTitle: string;
  resumeUrl : string;
  coverLetterUrl? : string;
  status : string
};

export default function Application() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchApplications = useCallback(async () => {
    try {
        setLoading(true);

        const res = await axios.get(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/application?page=${page}`,
            {
                headers: {
                authorization: localStorage.getItem("token"),
                },
            }
        );


      if (res.data?.success) {
        setApplications(res.data.response);
      }
    } 
    catch (err) {
      console.error('Failed to fetch jobs', err);
    } 
    finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    fetchApplications();
  }, [fetchApplications]);

  return (
    <div className="h-screen">
      <div className="flex justify-center font-bold mb-6">
        All Applicant
      </div>
      <div className="mx-6 shadow-md h-[78%] justify-center overflow-auto">
        {loading && <p className="text-center">Loading...</p>}

        {applications.map((application) => {

          return (
            <ApplicationCard
              key={application.id}
              id={application.id}
              name={application.name}
              jobTitle={application.jobTitle}
              resumeUrl={application.resumeUrl}
              coverLetterUrl={application.coverLetterUrl}
              onUpdated={fetchApplications}   
            />
          );
        })}
      </div>

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
