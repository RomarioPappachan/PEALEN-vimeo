import { create } from "zustand";
import { fetchTestByVideoId } from "@/api/course";

export const useCourseTestAndChallengeStore = create((set, get) => ({
  selectedVideoId: null,
  testId: null,
  challenge: {},
  questions: [],

  selectedQuestionIndex: 0,

  isTestLoading: false,

  isQuestionsActionButtonsDisabled: false,
  isChallengeActionButtonsDisabled: false,

  setSelectedVideoId: (videoId) => {
    set({ selectedVideoId: null });
    if (videoId) {
      set({ selectedVideoId: videoId });
    }
  },

  handleNextQuestion: () => {
    const { questions, selectedQuestionIndex } = get();
    const qLength = questions.length;

    if (selectedQuestionIndex < qLength - 1) {
      set((state) => {
        return {
          selectedQuestionIndex: state.selectedQuestionIndex + 1,
        };
      });
    }
  },

  handlePreviousQuestion: () => {
    const { selectedQuestionIndex } = get();

    if (selectedQuestionIndex > 0) {
      set((state) => {
        return {
          selectedQuestionIndex: state.selectedQuestionIndex - 1,
        };
      });
    }
  },

  disableChallengeButtons: (value) => {
    set({ isChallengeActionButtonsDisabled: value });
  },

  disableQuestionButtons: (value) => {
    set({ isQuestionsActionButtonsDisabled: value });
  },

  getVideoTestAndChallenge: async (videoId) => {
    set({
      testId: null,
      challenge: {},
      questions: [],
      selectedQuestionIndex: 0,
      isTestLoading: true,
    });
    try {
      const res = await fetchTestByVideoId(videoId);
      console.log(res?.challenge);
      if (res.success) {
        set({
          testId: res?.test?.id,
          challenge: res?.test?.challenge || {},
          questions: res?.test?.questions || [],
          isTestLoading: false,
        });
      }
      return;
    } catch (error) {
      console.log(error);
      set({
        testId: null,
        challenge: {},
        questions: [],
        selectedQuestionIndex: 0,
        isTestLoading: false,
      });
      return error;
    }
  },
}));
