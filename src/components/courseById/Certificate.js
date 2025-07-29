"use client";
import { useState } from "react";
import EditCourseCertificate from "./EditCourseCertificate";
import ShowCourseCertificate from "./ShowCourseCertificate";
import { LuPen } from "react-icons/lu";

function Certificate({ onPrevious }) {
  const [isEditCertificate, setIsEditCertificate] = useState(false);

  return (
    <div>
      <div className="flex items-center justify-end">
        {/* <Link
            href={`/dashboard/courses`}
            className="flex justify-center items-center gap-1 text-sm text-[#72C347] hover:underline"
          >
            <LuChevronLeft className="text-xl" />
            <span>Back</span>
          </Link> */}

        <button
          type="button"
          className="flex justify-center items-center gap-2 text-sm text-[#72C347] cursor-pointer hover:underline"
          onClick={() => {
            isEditCertificate
              ? setIsEditCertificate(false)
              : setIsEditCertificate(true);
          }}
        >
          {!isEditCertificate && <LuPen className="text-md" />}
          <span>{isEditCertificate ? "Cancel" : "Edit Certificate"}</span>
        </button>
      </div>

      <div>
        {isEditCertificate ? (
          <EditCourseCertificate onEdit={setIsEditCertificate} />
        ) : (
          <ShowCourseCertificate onPrevious={onPrevious} />
        )}
      </div>
    </div>
  );
}

export default Certificate;
