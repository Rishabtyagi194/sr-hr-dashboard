import { BsThreeDotsVertical } from "react-icons/bs";
import { FiRefreshCw } from "react-icons/fi";
import { MdDelete, MdEdit } from "react-icons/md";
import { useNavigate } from "react-router-dom";

export const JobCard = ({ job, onDelete }) => {
  const navigate = useNavigate();

  const openJobDetails = () => {
    navigate(`/jobposting/${job.job_id}`); // ✅ KEPT AS REQUESTED
  };

  return (
    <div
      onClick={openJobDetails}
      className="flex items-start justify-between bg-white rounded-lg border border-gray-200 shadow p-4 mb-3 hover:shadow-md transition cursor-pointer"
    >
      {/* LEFT */}
      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          className="mt-2"
          onClick={(e) => e.stopPropagation()}
        />

        <div>
          <h2 className="font-semibold text-gray-800">
            {job?.jobTitle || "NA"}
          </h2>
          <p className="text-sm text-gray-500">{job?.location}</p>

          {job?.Status && (
            <span className="inline-block text-xs text-gray-600 bg-gray-100 px-2 py-0.5 rounded mt-1">
              {job.Status}
            </span>
          )}
        </div>
      </div>

      {/* MIDDLE */}
      {job?.totalResponses !== undefined && (
        <div className="flex items-center gap-6">
          <div className="text-center">
            <p className="text-blue-600 font-bold">
              {job.totalResponses || 0}
            </p>
            <p className="text-xs text-gray-500">Total Responses</p>
          </div>
          <div className="text-center">
            <p className="text-gray-800 font-bold">
              {job.shortlisted || 0}
            </p>
            <p className="text-xs text-gray-500">Shortlisted</p>
          </div>
        </div>
      )}

      {/* RIGHT */}
      <div
        className="flex items-center gap-4 text-gray-500"
        onClick={(e) => e.stopPropagation()}
      >
        <FiRefreshCw className="cursor-pointer" />

        <MdEdit
          className="cursor-pointer"
          onClick={() =>
            navigate(`/jobposting/${job.job_id}`) // ✅ SAME ROUTE
          }
        />

        {job?.job_id && (
          <MdDelete
            className="cursor-pointer text-red-500 hover:text-red-600"
            onClick={() => onDelete(job.job_id)}
          />
        )}

        <BsThreeDotsVertical className="cursor-pointer" />

        <div className="text-xs text-gray-400">
          Posted on:{" "}
          {new Date(job?.created_at || job?.createdAt).toLocaleDateString(
            "en-GB"
          )}
        </div>
      </div>
    </div>
  );
};
