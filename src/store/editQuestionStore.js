import { create } from "zustand";
import { updateQuestionById } from "@/api/course";

export const useEditQuestionStore = create((set, get) => ({
  updatedQuestion: {
    id: null,
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

  // load detail to edit
  setQuestionToEdit: (questionDetails) => {
    set((state) => {
      return {
        updatedQuestion: {
          ...state.updatedQuestion,
          id: questionDetails?.id || null,
          questionText: questionDetails?.questionText || "",
          questionImage: questionDetails?.questionImage || null,
          options: questionDetails?.options,
          correctAnswer: questionDetails?.correctAnswer,
        },
      };
    });
  },

  changeQuestionText: (text) => {
    set((state) => {
      return {
        updatedQuestion: {
          ...state.updatedQuestion,
          questionText: text,
        },
      };
    });
  },

  changeQuestionImage: (image) => {
    set((state) => {
      return {
        updatedQuestion: {
          ...state.updatedQuestion,
          questionImage: image,
        },
      };
    });
  },

  changeOptionText: (optionIndex, optionText) => {
    set((state) => {
      const optionsArray = state.updatedQuestion.options;
      const updatedOptions = optionsArray.map((option, idx) => {
        if (idx === optionIndex) {
          return { ...option, text: optionText };
        }
        return option;
      });

      return {
        updatedQuestion: {
          ...state.updatedQuestion,
          options: updatedOptions,
        },
      };
    });
  },

  changeOptionImage: (optionIndex, optionImage) => {
    set((state) => {
      const optionsArray = state.updatedQuestion.options;
      const updatedOptions = optionsArray.map((option, idx) => {
        if (idx === optionIndex) {
          return { ...option, image: optionImage };
        }
        return option;
      });

      return {
        updatedQuestion: {
          ...state.updatedQuestion,
          options: updatedOptions,
        },
      };
    });
  },

  changeCorrectAnswer: (newOption) => {
    set((state) => {
      return {
        updatedQuestion: {
          ...state.updatedQuestion,
          correctAnswer: { id: null, text: "", image: null },
        },
      };
    });

    if (newOption?.text || newOption?.image) {
      set((state) => {
        return {
          updatedQuestion: {
            ...state.updatedQuestion,
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
        image: "",
      };
      const optionsArray = state.updatedQuestion.options;
      const updatedOptions = [...optionsArray, newOption];

      return {
        updatedQuestion: {
          ...state.updatedQuestion,
          options: updatedOptions,
        },
      };
    });
  },

  removeOptionField: (optionIndex) => {
    set((state) => {
      const optionsArray = state.updatedQuestion.options;
      const updatedOptions = optionsArray.filter((_, i) => i !== optionIndex);

      return {
        updatedQuestion: {
          ...state.updatedQuestion,
          options: updatedOptions,
        },
      };
    });
  },

  editQuestionById: async () => {
    try {
      const { updatedQuestion } = get();

      const questionId = updatedQuestion?.id;

      const formData = new FormData();

      // Append question text
      formData.append("questionText", updatedQuestion.questionText);

      // Build options array with { value, image } structure
      const formattedOptions = updatedQuestion.options.map((opt) => {
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
      if (updatedQuestion.questionImage) {
        formData.append("questionImage", updatedQuestion.questionImage);
      }

      // Append correct answer id (if present)
      if (updatedQuestion.correctAnswer.id) {
        formData.append("correctAnswerId", updatedQuestion.correctAnswer.id);
      }

      // Append correct answer text (if present)
      if (updatedQuestion.correctAnswer.text) {
        formData.append("correctAnswer", updatedQuestion.correctAnswer.text);
      }

      // Append correct answer image (if present)
      if (updatedQuestion.correctAnswer.image) {
        formData.append(
          "correctAnswerImage",
          updatedQuestion.correctAnswer.image
        );
      }

      // Append each option image in order (if present)
      updatedQuestion.options.forEach((opt) => {
        if (opt.image) {
          formData.append("optionImages", opt.image);
        }
      });

      // ✅ Call the API with formData
      const res = await updateQuestionById(questionId, formData);
      return res;
    } catch (error) {
      throw error;
    }
  },

  resetUpdatedQuestionStore: () => {
    set({
      updatedQuestion: {
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
