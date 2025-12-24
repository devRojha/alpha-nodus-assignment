'use client';

import axios from 'axios';
import { useState } from 'react';

type ApplicationCard = {
  id: string;
  name: string;
  jobTitle: string;
  resumeUrl : string;
  coverLetterUrl? : string;
  onUpdated: () => void;
};

export default function ApplicationCard({
  id,
  name,
  resumeUrl,
  jobTitle,
  coverLetterUrl,
  onUpdated,
}: ApplicationCard) {
  const [loading, setLoading] = useState(false);

  const submitApplication = async (newStatus: 'hired' | 'rejected') => {
    try {
      setLoading(true);

      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/application`,
        {
          id,
          status: newStatus,
        },
        {
            headers: {
                authorization: localStorage.getItem("token"),
            },
        }
      );

      if (res.data?.success) {
        alert(res.data.message);
        onUpdated(); // refetch
      }
    } catch (err) {
      console.error('Update failed', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border grid grid-cols-7 shadow-sm rounded-md p-4 mb-2">
      <div className="col-span-3 pl-4">
        <div className="font-bold font-serif">{jobTitle}</div>
        <div className="italic">Name : {name}</div>
      </div>

      <div className="col-span-2 text-slate-500 flex flex-col">
        <a className="italic hover:text-blue-700" target='blank' href={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${resumeUrl}`}>See resume</a>
        <a className={`${coverLetterUrl ? "" : "hidden"} italic hover:text-blue-700`} target='blank' href={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${coverLetterUrl}`}>See cover letter</a>
      </div>

      <div className="col-span-2 space-x-10">
        <button
          disabled={loading}
          onClick={() => submitApplication('hired')}
          className="text-green-600"
        >
          Accept
        </button>
        <button
          disabled={loading}
          onClick={() => submitApplication('rejected')}
          className="text-red-600"
        >
          Reject
        </button>
      </div>
    </div>
  );
}
