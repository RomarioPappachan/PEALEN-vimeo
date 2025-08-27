// "use client";
// import React, { useState } from "react";
// import { useCourseTestAndChallengeStore } from "@/store/courseTestAndChallengeStore";
// import NewQuestionForm from "./NewQuestionForm";
// import { LuChevronLeft, LuChevronRight, LuPlus, LuX } from "react-icons/lu";
// import Question from "./Question";

// export default function Questions() {
//   const {
//     questions,
//     handleNextQuestion,
//     handlePreviousQuestion,
//     isTestLoading,
//     isChallengeActionButtonsDisabled,
//   } = useCourseTestAndChallengeStore();

//   const [isQuestionFormOpen, setIsQuestionFormOpen] = useState(false);

//   return (
//     <>
//       {!isQuestionFormOpen && (
//         <div className="flex items-center justify-end gap-x-2 mb-4 pe-2">
//           <button
//             type="button"
//             className="mr-10 px-2 py-1 rounded-sm text-sm font-semibold transition disabled:opacity-60 cursor-pointer text-[var(--border-secondary)] flex items-center justify-center gap-x-2 box-border border border-transparent hover:border-[var(--border-secondary)]"
//             onClick={() => {
//               setIsQuestionFormOpen(true);
//             }}
//           >
//             <LuPlus className="text-base" />
//             <span>New Question</span>
//           </button>
//           <button
//             type="button"
//             className="px-2 py-1 rounded-sm text-sm font-semibold transition disabled:opacity-60 cursor-pointer text-[var(--border-secondary)] flex items-center justify-center gap-x-1 box-border border border-transparent hover:border-[var(--border-secondary)]"
//             onClick={handlePreviousQuestion}
//           >
//             <LuChevronLeft />
//             <span>Previous</span>
//           </button>
//           <button
//             type="button"
//             className="px-2 py-1 rounded-sm text-sm font-semibold transition disabled:opacity-60 cursor-pointer text-[var(--border-secondary)] flex items-center justify-center gap-x-1 box-border border border-transparent hover:border-[var(--border-secondary)]"
//             onClick={handleNextQuestion}
//           >
//             <span>Next</span>
//             <LuChevronRight />
//           </button>
//         </div>
//       )}

//       {isQuestionFormOpen ? (
//         <NewQuestionForm onClose={() => setIsQuestionFormOpen(false)} />
//       ) : questions.length > 0 ? (
//         <Question />
//       ) : (
//         <p className="text-[var(--text-secondary)] italic">
//           No questions added yet
//         </p>
//       )}
//     </>
//   );
// }

"use client";
import React, { useState } from "react";
import { useCourseTestAndChallengeStore } from "@/store/courseTestAndChallengeStore";
import NewQuestionForm from "./NewQuestionForm";
import { LuChevronLeft, LuChevronRight, LuPlus, LuX } from "react-icons/lu";
import Question from "./Question";

export default function Questions() {
  const {
    questions,
    handleNextQuestion,
    handlePreviousQuestion,
    isTestLoading,
    isQuestionsActionButtonsDisabled,
  } = useCourseTestAndChallengeStore();

  const [isQuestionFormOpen, setIsQuestionFormOpen] = useState(false);

  return (
    <>
      {isTestLoading || isQuestionsActionButtonsDisabled ? (
        <div className="w-full min-h-48 flex items-center justify-center space-x-2">
          <span className="w-4 h-4 bg-[#72C347] rounded-full animate-bounce [animation-delay:-0.3s]"></span>
          <span className="w-4 h-4 bg-[#72C347] rounded-full animate-bounce [animation-delay:-0.15s]"></span>
          <span className="w-4 h-4 bg-[#72C347] rounded-full animate-bounce"></span>
        </div>
      ) : isQuestionFormOpen || questions.length < 1 ? (
        <NewQuestionForm onClose={() => setIsQuestionFormOpen(false)} />
      ) : (
        <>
          <div className="flex items-center justify-end gap-x-2 mb-4 pe-2">
            <button
              type="button"
              className="mr-10 px-2 py-1 rounded-sm text-sm font-semibold transition disabled:opacity-60 cursor-pointer text-[var(--border-secondary)] flex items-center justify-center gap-x-2 box-border border border-transparent hover:border-[var(--border-secondary)]"
              onClick={() => {
                setIsQuestionFormOpen(true);
              }}
            >
              <LuPlus className="text-base" />
              <span>New Question</span>
            </button>
            <button
              type="button"
              className="px-2 py-1 rounded-sm text-sm font-semibold transition disabled:opacity-60 cursor-pointer text-[var(--border-secondary)] flex items-center justify-center gap-x-1 box-border border border-transparent hover:border-[var(--border-secondary)]"
              onClick={handlePreviousQuestion}
            >
              <LuChevronLeft />
              <span>Previous</span>
            </button>
            <button
              type="button"
              className="px-2 py-1 rounded-sm text-sm font-semibold transition disabled:opacity-60 cursor-pointer text-[var(--border-secondary)] flex items-center justify-center gap-x-1 box-border border border-transparent hover:border-[var(--border-secondary)]"
              onClick={handleNextQuestion}
            >
              <span>Next</span>
              <LuChevronRight />
            </button>
          </div>
          <Question />
        </>
      )}
    </>
  );
}
