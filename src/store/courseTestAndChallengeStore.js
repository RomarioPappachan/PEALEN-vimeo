import { create } from "zustand";
import { fetchTestByVideoId } from "@/api/course";

export const useCourseTestAndChallengeStore = create((set, get) => ({
  selectedVideoId: null,
  challenge: {},
  questions: [
    // {
    //   questionText:
    //     "In a 1000 metre race, X beats Y by 10 meters or by 2 seconds. Find the time taken by X to complete the race?",
    //   questionImage: null,
    //   options: [
    //     { text: "2 minutes 6 seconds", image: null },
    //     { text: "2 minutes 12 seconds", image: null },
    //     { text: "3 minutes 18 seconds", image: null },
    //     { text: "3 minutes 24 seconds", image: null },
    //   ],
    //   correctAnswer: { text: "3 minutes 24 seconds", image: null },
    // },
    // {
    //   questionText:
    //     "P can run 35m while Q can run 40m. In a 500 meter race, Q beats P by?",
    //   questionImage: null,
    //   options: [
    //     { text: "62.5 m", image: null },
    //     { text: "455 m", image: null },
    //     { text: "45 m", image: null },
    //     { text: "437.5 m", image: null },
    //   ],
    //   correctAnswer: { text: "62.5 m", image: null },
    // },
  ],

  selectedQuestionIndex: 0,

  isTestLoading: false,

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

  getVideoTestAndChallenge: async (videoId) => {
    set({
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
          challenge: res?.test?.challenge || {},
          questions: res?.test?.questions || [],
          isTestLoading: false,
        });
      }
      return;
    } catch (error) {
      console.log(error);
      set({
        challenge: {},
        questions: [],
        selectedQuestionIndex: 0,
        isTestLoading: false,
      });
      return error;
    }
  },
}));
