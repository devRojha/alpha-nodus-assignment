'use client';

import { useRouter } from 'next/navigation';

type JobCardProps = {
  id: string;
  title: string;
  location: string;
  date: string;
};

export default function JobCard({
  id,
  title,
  location,
  date,
}: JobCardProps) {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => router.push(`/Job/${id}`)}
      className="w-full border grid grid-cols-7 shadow-sm rounded-md p-4 hover:bg-slate-50 transition mb-2"
    >
      <div className="col-span-5 pl-4">
        <div className="font-bold font-serif flex">{title}</div>
        <div className="italic flex">Location : {location}</div>
      </div>

      <div className="col-span-2 text-slate-500">
        <div className="italic flex">Date : {date}</div>
      </div>
    </button>
  );
}
