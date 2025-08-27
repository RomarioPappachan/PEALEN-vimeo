import { create } from "zustand";
import { createTestQuestion } from "@/api/course";

export const useNewQuestionStore = create((set, get) => ({
  newQuestion: {
    questionText: "",
    questionImage: null,
    options: [
      { text: "", image: null, id: crypto.randomUUID() },
      { text: "", image: null, id: crypto.randomUUID() },
      { text: "", image: null, id: crypto.randomUUID() },
      { text: "", image: null, id: crypto.randomUUID() },
    ],
    correctAnswer: { id: null, text: "", image: null },
  },

  changeQuestionText: (text) => {
    set((state) => {
      return {
        newQuestion: {
          ...state.newQuestion,
          questionText: text,
        },
      };
    });
  },

  changeQuestionImage: (image) => {
    set((state) => {
      return {
        newQuestion: {
          ...state.newQuestion,
          questionImage: image,
        },
      };
    });
  },

  changeOptionText: (optionIndex, optionText) => {
    set((state) => {
      const optionsArray = state.newQuestion.options;
      const updatedOptions = optionsArray.map((option, idx) => {
        if (idx === optionIndex) {
          return { ...option, text: optionText };
        }
        return option;
      });

      let updatedCorrectAnswer = state.newQuestion.correctAnswer;
      const editedOption = updatedOptions[optionIndex];

      // If this option is the selected correct answer, update it too
      if (editedOption.id === state.newQuestion.correctAnswer.id) {
        updatedCorrectAnswer = { ...editedOption };
      }

      return {
        newQuestion: {
          ...state.newQuestion,
          options: updatedOptions,
          correctAnswer: updatedCorrectAnswer,
        },
      };
    });
  },

  changeOptionImage: (optionIndex, optionImage) => {
    set((state) => {
      const optionsArray = state.newQuestion.options;
      const updatedOptions = optionsArray.map((option, idx) => {
        if (idx === optionIndex) {
          return { ...option, image: optionImage };
        }
        return option;
      });

      let updatedCorrectAnswer = state.newQuestion.correctAnswer;
      const editedOption = updatedOptions[optionIndex];

      // If this option is the selected correct answer, update it too
      if (editedOption.id === state.newQuestion.correctAnswer.id) {
        updatedCorrectAnswer = { ...editedOption };
      }

      return {
        newQuestion: {
          ...state.newQuestion,
          options: updatedOptions,
          correctAnswer: updatedCorrectAnswer,
        },
      };
    });
  },

  changeCorrectAnswer: (newOption) => {
    set((state) => {
      return {
        newQuestion: {
          ...state.newQuestion,
          correctAnswer: { id: null, text: "", image: null },
        },
      };
    });

    if (newOption?.text || newOption?.image) {
      set((state) => {
        return {
          newQuestion: {
            ...state.newQuestion,
            correctAnswer: newOption,
          },
        };
      });
    }
  },

  addOptionField: () => {
    set((state) => {
      const newOption = {
        id: crypto.randomUUID(),
        text: "",
        image: null,
      };
      const optionsArray = state.newQuestion.options;
      const updatedOptions = [...optionsArray, newOption];

      return {
        newQuestion: {
          ...state.newQuestion,
          options: updatedOptions,
        },
      };
    });
  },

  removeOptionField: (optionIndex) => {
    set((state) => {
      const optionsArray = state.newQuestion.options;
      const removedOption = optionsArray[optionIndex];
      const updatedOptions = optionsArray.filter((_, i) => i !== optionIndex);

      let updatedCorrectAnswer = state.newQuestion.correctAnswer;

      // If removed option was the correct answer → reset it
      if (removedOption.id === state.newQuestion.correctAnswer.id) {
        updatedCorrectAnswer = { id: null, text: "", image: null };
      }

      return {
        newQuestion: {
          ...state.newQuestion,
          options: updatedOptions,
          correctAnswer: updatedCorrectAnswer,
        },
      };
    });
  },

  addNewQuestion: async (videoId) => {
    try {
      const { newQuestion } = get();

      const formData = new FormData();

      // Append question text
      formData.append("questionText", newQuestion.questionText);

      // Build options array with { value, image } structure
      const formattedOptions = newQuestion.options.map((opt) => {
        const option = {};

        option.id = opt.id;

        if (opt.text?.trim()) {
          option.value = opt.text.trim();
        }

        if (opt.image) {
          option.image = true;
        }

        return option;
      });

      // Append options as JSON string
      formData.append("options", JSON.stringify(formattedOptions));

      // Append question image (if present)
      if (newQuestion.questionImage) {
        formData.append("questionImage", newQuestion.questionImage);
      }

      // Append correct answer id (if present)
      if (newQuestion.correctAnswer.id) {
        formData.append("correctAnswerId", newQuestion.correctAnswer.id);
      }

      // Append correct answer text (if present)
      if (newQuestion.correctAnswer.text) {
        formData.append("correctAnswer", newQuestion.correctAnswer.text);
      }

      // Append correct answer image (if present)
      if (newQuestion.correctAnswer.image) {
        formData.append("correctAnswerImage", newQuestion.correctAnswer.image);
      }

      // Append each option image in order (if present)
      newQuestion.options.forEach((opt) => {
        if (opt.image) {
          formData.append("optionImages", opt.image);
        }
      });

      // ✅ Call the API with formData
      const res = await createTestQuestion(videoId, formData);
      return res;
    } catch (error) {
      throw error;
    }
  },

  resetNewQuestionStore: () => {
    set({
      newQuestion: {
        questionText: "",
        questionImage: null,
        options: [
          { text: "", image: null, id: crypto.randomUUID() },
          { text: "", image: null, id: crypto.randomUUID() },
          { text: "", image: null, id: crypto.randomUUID() },
          { text: "", image: null, id: crypto.randomUUID() },
        ],
        correctAnswer: { id: null, text: "", image: null },
      },
    });
  },
}));
