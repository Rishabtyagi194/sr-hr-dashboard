export default function CandidateSearchResults({
  show,
  loading,
  candidates,
  onSelect,
}) {
  if (!show)
    return (
      <div className="h-full flex items-center justify-center text-gray-400">
        Search results will appear here
      </div>
    );

  if (loading)
    return <div className="text-center text-gray-500">Loading...</div>;

  if (!candidates.length)
    return <div className="text-center text-gray-500">No candidates found</div>;

  return (
    <div className="space-y-3">
      {candidates.map((c) => (
        <div
          key={c._id}
          onClick={() => onSelect(c)}
          className="bg-white p-4 rounded-lg border cursor-pointer hover:shadow"
        >
          <h3 className="font-semibold">{c.name}</h3>
          <p className="text-sm text-gray-500">
            {c.designation} • {c.experience} yrs
          </p>
        </div>
      ))}
    </div>
  );
}
