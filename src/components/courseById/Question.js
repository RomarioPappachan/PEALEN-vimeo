"use client";
import React, { useEffect, useState } from "react";

import ViewQuestion from "./ViewQuestion";
import EditQuestion from "./EditQuestion";
import { deleteQuestionById } from "@/api/course";
import { useCourseTestAndChallengeStore } from "@/store/courseTestAndChallengeStore";
import toast from "react-hot-toast";

export default function Question() {
  const {
    questions,
    selectedQuestionIndex,
    selectedVideoId,
    getVideoTestAndChallenge,
  } = useCourseTestAndChallengeStore();
  const [question, setQuestion] = useState([]);

  const [isDeleting, setIsDeleting] = useState(false);

  const [isEditQuestion, setIsEditQuestion] = useState(false);

  useEffect(() => {
    setQuestion(questions[selectedQuestionIndex]);
  }, [selectedQuestionIndex]);

  const handleDeleteQuestionById = async (e) => {
    e.preventDefault();
    setIsDeleting(true);
    try {
      const res = await deleteQuestionById(question.id);
      console.log(res);
      toast.success("Deleted question successfully");
      await getVideoTestAndChallenge(selectedVideoId);
    } catch (error) {
      console.log(error);
      toast.error("Error deleting question");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      {!isEditQuestion ? (
        <ViewQuestion
          question={question}
          selectedQuestionIndex={selectedQuestionIndex}
        />
      ) : (
        <EditQuestion onCancel={() => setIsEditQuestion(false)} />
      )}
      {/* buttons  */}
      {!isEditQuestion && (
        <div className="flex justify-end gap-4 mt-6">
          <button
            type="button"
            className={`px-4 py-2 text-sm font-semibold text-white bg-gray-500 rounded-xl ${
              isDeleting ? "cursor-not-allowed" : "cursor-pointer"
            }`}
            disabled={isDeleting}
            onClick={handleDeleteQuestionById}
          >
            Delete
          </button>
          <button
            type="button"
            className={`px-4 py-2 text-sm font-semibold text-white bg-[#72C347] rounded-xl ${
              isDeleting ? "cursor-not-allowed" : "cursor-pointer"
            }`}
            disabled={isDeleting}
            onClick={() => setIsEditQuestion(true)}
          >
            Edit Question
          </button>
        </div>
      )}
    </>
  );
}
