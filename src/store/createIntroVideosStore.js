import { deleteMuxVideo } from "@/api/muxVideo";
import { create } from "zustand";

export const useCreateIntroVideosStore = create((set) => ({
  introVideos: [],

  // Intro Video handlers

  addNewIntroVideo: () => {
    set((state) => ({
      introVideos: [
        ...state.introVideos,
        {
          id: crypto.randomUUID(),
          videoType: "intro",
          videoTitle: "",
          image: null,
          videoUrl: "", // intro video
          muxUploadId: "",
          muxAssetId: "",
          pdf: "",
          test: {
            challenge: {
              challengeText: "",
              image: "",
            },
            questions: [
              {
                id: crypto.randomUUID(),
                question: {
                  questionText: "",
                  image: "",
                },
                options: [
                  { id: crypto.randomUUID(), optionText: "", image: "" },
                  { id: crypto.randomUUID(), optionText: "", image: "" },
                  { id: crypto.randomUUID(), optionText: "", image: "" },
                  { id: crypto.randomUUID(), optionText: "", image: "" },
                ],
                correctAnswer: {},
              },
            ],
          },
        },
      ],
    }));
  },

  setIntroVideoDetails: (name, value, videoIndex) => {
    set((state) => {
      const updatedIntroVideos = state.introVideos.map((video, index) => {
        if (index === videoIndex) {
          return { ...video, [name]: value };
        }
        return video;
      });
      return { introVideos: updatedIntroVideos };
    });
  },

  // Mux Video actions

  addIntroVideoIds: (videoIndex, uploadId, playbackId, assetId) => {
    set((state) => {
      const updatedIntroVideos = state.introVideos.map((video, index) => {
        if (index === videoIndex) {
          return {
            ...video,
            muxUploadId: uploadId,
            videoUrl: playbackId, // main video
            muxAssetId: assetId,
          };
        }
        return video;
      });
      return { introVideos: updatedIntroVideos };
    });
  },

  // delete video from MUX
  removeMuxVideo: async (videoIndex, muxAssetId) => {
    set({ loading: true, error: null });
    try {
      const res = await deleteMuxVideo(muxAssetId);

      set((state) => {
        const updatedIntroVideos = state.introVideos.map((video, index) => {
          if (index === videoIndex) {
            return {
              ...video,
              muxUploadId: "",
              videoUrl: "", // main video
              muxAssetId: "",
            };
          }
          return video;
        });
        return { introVideos: updatedIntroVideos };
      });

      return res;
    } catch (error) {
      set({ error: "Failed to create a new course", loading: false });
      throw error;
    }
  },

  // Intro challenge actions

  addIntroVideoQuestions: (videoIndex) => {
    set((state) => {
      const updatedIntroVideos = state.introVideos.map((video, index) => {
        if (index === videoIndex) {
          const newQuestion = {
            id: crypto.randomUUID(),
            question: {
              questionText: "",
              image: "",
            },
            options: [
              { id: crypto.randomUUID(), optionText: "", image: "" },
              { id: crypto.randomUUID(), optionText: "", image: "" },
              { id: crypto.randomUUID(), optionText: "", image: "" },
              { id: crypto.randomUUID(), optionText: "", image: "" },
            ],
            correctAnswer: "",
          };

          return {
            ...video,
            test: {
              ...video.test,
              questions: [...video.test.questions, newQuestion],
            },
          };
        }
        return video;
      });
      return { introVideos: updatedIntroVideos };
    });
  },

  removeIntroVideoQuestions: (videoIndex, questionIndex) => {
    set((state) => {
      const updatedIntroVideos = state.introVideos.map((video, index) => {
        if (index === videoIndex) {
          const updatedQuestions = video.test.questions.filter(
            (_, i) => i !== questionIndex
          );

          return {
            ...video,
            test: {
              ...video.test,
              questions: updatedQuestions,
            },
          };
        }
        return video;
      });
      return { introVideos: updatedIntroVideos };
    });
  },

  addIntroQuestionOptions: (videoIndex, questionIndex) => {
    set((state) => {
      const updatedIntroVideos = state.introVideos.map((video, index) => {
        if (index === videoIndex) {
          const updatedQuestions = video.test.questions.map((question, idx) => {
            if (idx === questionIndex) {
              const newOption = {
                id: crypto.randomUUID(),
                optionText: "",
                image: "",
              };
              return {
                ...question,
                options: [...question.options, newOption],
              };
            }
            return question;
          });

          return {
            ...video,
            test: {
              ...video.test,
              questions: updatedQuestions,
            },
          };
        }
        return video;
      });
      return { introVideos: updatedIntroVideos };
    });
  },

  removeIntroQuestionOptions: (videoIndex, questionIndex, optionIndex) => {
    set((state) => {
      const updatedIntroVideos = state.introVideos.map((video, index) => {
        if (index === videoIndex) {
          const updatedQuestions = video.test.questions.map((question, idx) => {
            if (idx === questionIndex) {
              const updatedOptions = question.options.filter(
                (_, i) => i !== optionIndex
              );
              return { ...question, options: updatedOptions };
            }
            return question;
          });

          return {
            ...video,
            test: {
              ...video.test,
              questions: updatedQuestions,
            },
          };
        }
        return video;
      });
      return { introVideos: updatedIntroVideos };
    });
  },

  updateQuestionText: (videoIndex, questionIndex, questionText) => {
    set((state) => {
      const updatedVideos = state.introVideos.map((video, idx) => {
        if (idx === videoIndex) {
          const updatedQuestions = video.test.questions.map((q, qIdx) => {
            if (qIdx === questionIndex) {
              return {
                ...q,
                question: { ...q.question, questionText },
              };
            }
            return q;
          });
          return {
            ...video,
            test: { ...video.test, questions: updatedQuestions },
          };
        }
        return video;
      });
      return { introVideos: updatedVideos };
    });
  },

  updateQuestionImage: (videoIndex, questionIndex, imageFile) => {
    set((state) => {
      const updatedVideos = state.introVideos.map((video, idx) => {
        if (idx === videoIndex) {
          const updatedQuestions = video.test.questions.map((q, qIdx) => {
            if (qIdx === questionIndex) {
              return {
                ...q,
                question: { ...q.question, image: imageFile },
              };
            }
            return q;
          });
          return {
            ...video,
            test: { ...video.test, questions: updatedQuestions },
          };
        }
        return video;
      });
      return { introVideos: updatedVideos };
    });
  },

  updateOptionText: (videoIndex, questionIndex, optionIndex, optionText) => {
    set((state) => {
      const updatedVideos = state.introVideos.map((video, idx) => {
        if (idx === videoIndex) {
          const updatedQuestions = video.test.questions.map((q, qIdx) => {
            if (qIdx === questionIndex) {
              const updatedOptions = q.options.map((opt, oIdx) => {
                if (oIdx === optionIndex) {
                  return { ...opt, optionText };
                }
                return opt;
              });
              return { ...q, options: updatedOptions };
            }
            return q;
          });
          return {
            ...video,
            test: { ...video.test, questions: updatedQuestions },
          };
        }
        return video;
      });
      return { introVideos: updatedVideos };
    });
  },

  updateOptionImage: (videoIndex, questionIndex, optionIndex, imageFile) => {
    set((state) => {
      const updatedVideos = state.introVideos.map((video, idx) => {
        if (idx === videoIndex) {
          const updatedQuestions = video.test.questions.map((q, qIdx) => {
            if (qIdx === questionIndex) {
              const updatedOptions = q.options.map((opt, oIdx) => {
                if (oIdx === optionIndex) {
                  return { ...opt, image: imageFile };
                }
                return opt;
              });
              return { ...q, options: updatedOptions };
            }
            return q;
          });
          return {
            ...video,
            test: { ...video.test, questions: updatedQuestions },
          };
        }
        return video;
      });
      return { introVideos: updatedVideos };
    });
  },

  updateCorrectAnswer: (videoIndex, questionIndex, correctAnswer) => {
    set((state) => {
      const updatedVideos = state.introVideos.map((video, idx) => {
        if (idx === videoIndex) {
          const updatedQuestions = video.test.questions.map((q, qIdx) => {
            if (qIdx === questionIndex) {
              return { ...q, correctAnswer };
            }
            return q;
          });
          return {
            ...video,
            test: { ...video.test, questions: updatedQuestions },
          };
        }
        return video;
      });
      return { introVideos: updatedVideos };
    });
  },

  updateChallengeText: (videoIndex, challengeText) => {
    set((state) => {
      const updatedVideos = state.introVideos.map((video, idx) => {
        if (idx === videoIndex) {
          return {
            ...video,
            test: {
              ...video.test,
              challenge: { ...video.test.challenge, challengeText },
            },
          };
        }
        return video;
      });
      return { introVideos: updatedVideos };
    });
  },

  updateChallengeImage: (videoIndex, imageFile) => {
    set((state) => {
      const updatedVideos = state.introVideos.map((video, idx) => {
        if (idx === videoIndex) {
          return {
            ...video,
            test: {
              ...video.test,
              challenge: { ...video.test.challenge, image: imageFile },
            },
          };
        }
        return video;
      });
      return { introVideos: updatedVideos };
    });
  },

  removeIntroVideo: (introVideoId) => {
    set((state) => ({
      introVideos: state.introVideos.filter(
        (_, index) => index !== introVideoId
      ),
    }));
  },
}));
