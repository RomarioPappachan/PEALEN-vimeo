import React from "react";

export default function Faculty({ faculty, onAddFaculty }) {
  return (
    <div
      key={faculty.id}
      className="w-full h-12 flex bg-[var(--background-primary)] hover:bg-[#72c347]/30 cursor-pointer"
      onClick={(e) => onAddFaculty(e, faculty)}
    >
      <div className="w-1/6 h-full flex justify-center items-center">
        <img
          src={faculty.profilePicture}
          alt={`${faculty.firstName} icon`}
          className="size-8 rounded-full overflow-hidden object-cover drop-shadow-sm"
          loading="lazy"
        />
      </div>
      <div className="w-4/6 h-full flex flex-col justify-center">
        <h4 className="text-[var(--text-primary)] text-sm font-semibold">
          {faculty.firstName} {faculty.lastName}
        </h4>
        <p className="text-[var(--text-primary)] text-xs">
          {faculty.facultyCode}
        </p>
      </div>
      <div className="w-1/6 h-full flex flex-col justify-center">
        <p className="text-xs text-[var(--text-primary)] italic font-light">
          {faculty.designation}
        </p>
      </div>
    </div>
  );
}
