'use client';

export default function LiveClassAdmin() {
  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Create Live Class</h1>

      <input placeholder="Title" />
      <input placeholder="YouTube Live Embed URL" />

      <button className="mt-4 bg-primary px-4 py-2 text-white">
        Save
      </button>
    </div>
  );
}
