import { useNavigate } from "react-router-dom";
import {
  FaBriefcase,
  FaRupeeSign,
  FaMapMarkerAlt,
  FaStar,
} from "react-icons/fa";
import { MdDelete, MdEdit } from "react-icons/md";

export const JobCard = ({ job, onDelete, type = "job" }) => {
  const navigate = useNavigate();

  const openJobDetails = () => {
    navigate(`/jobposting/${job.job_id}`);
  };

  return (
    <div
      onClick={openJobDetails}
      className="bg-white border border-gray-200 mb-4 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer flex justify-between gap-6"
    >
      {/* LEFT SECTION */}
      <div className="flex-1">
        {/* Title */}
        <h2 className="text-lg font-semibold text-gray-900">
          {job?.jobTitle || job?.internshipTitle || "Not Disclosed"}
        </h2>

        {/* Company + Rating */}
        <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
          <FaStar className="text-yellow-500 text-xs" />
          <span>{job?.rating || "0.0"}</span>
          <span className="text-gray-400">|</span>
          <span>{job?.reviews || "NA"} Reviews</span>
        </div>

        {/* Job Meta */}
        <div className="flex flex-wrap items-center gap-6 text-sm text-gray-700 mt-4">
          <div className="flex items-center gap-2">
            <FaBriefcase className="text-gray-500" />
            <span>
              {job?.experinceFrom || "0"} - {job?.experinceTo || "1"} yrs
            </span>
          </div>

          <div className="flex items-center gap-2">
            <FaRupeeSign className="text-gray-500" />
            {job?.salaryRangeFrom && job?.salaryRangeTo ? (
              <span>
                {job.salaryRangeFrom} - {job.salaryRangeTo} LPA 
              </span>
            ) : (
                <span>
                {job.OfferStipend} 
              </span>
            //   <span className="text-gray-400">Not Disclosed</span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <FaMapMarkerAlt className="text-gray-500" />
            <span>
              {job?.jobLocation?.city || job?.intershipLocation?.country ||job?.locality || "NA"}
            </span>
          </div>
        </div>

        {/* Description */}
        <div
  className="text-sm text-gray-600 mt-3 line-clamp-2"
  dangerouslySetInnerHTML={{
    __html: job?.jobDescription || "No description available",
  }}
/>

        {/* Status */}
        {job?.Status && (
          <span className="inline-block mt-3 text-xs px-3 py-1 rounded-full bg-blue-50 text-blue-700">
            {job.Status}
          </span>
        )}

        {/* Posted Date */}
        <p className="text-xs text-gray-400 mt-3">
          Posted on{" "}
          {new Date(job?.created_at || job?.createdAt).toLocaleDateString(
            "en-GB"
          )}
        </p>
      </div>

      {/* RIGHT SECTION */}
      <div
        className="flex flex-col items-end justify-between"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Stats */}
        <div className="flex gap-6 text-center">
        <div
      className="cursor-pointer"
      onClick={() =>
        navigate(`/hiring/${job?.job_id}/applies?tab=n`)
      }
    >
      <p className="text-blue-600 font-bold">
        {job?.totalResponses || 0}
      </p>
      <p className="text-xs text-gray-500">Responses</p>
    </div>
          <div>
            <p className="font-bold text-gray-800">
              {job?.shortlisted || 0}
            </p>
            <p className="text-xs text-gray-500">Shortlisted</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4 mt-6 text-gray-500">
          {/* EDIT */}
          <MdEdit
            className="cursor-pointer hover:text-blue-600"
            onClick={() => navigate(`/jobposting/editjob/${job.job_id}`)}
          />

          {/* DELETE */}
          <MdDelete
            className="cursor-pointer hover:text-red-600"
            onClick={() => onDelete(job.job_id, type)}
          />
        </div>
      </div>
    </div>
  );
};
