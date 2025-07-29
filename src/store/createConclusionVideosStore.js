import { deleteMuxVideo } from "@/api/muxVideo";
import { create } from "zustand";

export const useCreateConclusionVideosStore = create((set) => ({
  conclusionVideos: [],

  // Conclusion Videos handlers

  addNewConclusionVideo: () => {
    set((state) => ({
      conclusionVideos: [
        ...state.conclusionVideos,
        {
          id: crypto.randomUUID(),
          videoType: "conclusion",
          videoTitle: "",
          image: null,
          videoUrl: "", // conclusion video
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

  setConclusionVideoDetails: (name, value, videoIndex) => {
    set((state) => {
      const updatedConclusionVideos = state.conclusionVideos.map(
        (video, index) => {
          if (index === videoIndex) {
            return { ...video, [name]: value };
          }
          return video;
        }
      );
      return { conclusionVideos: updatedConclusionVideos };
    });
  },

  // Mux Video actions

  addConclusionVideoIds: (videoIndex, uploadId, playbackId, assetId) => {
    set((state) => {
      const updatedConclusionVideos = state.conclusionVideos.map(
        (video, index) => {
          if (index === videoIndex) {
            return {
              ...video,
              muxUploadId: uploadId,
              videoUrl: playbackId, // main video
              muxAssetId: assetId,
            };
          }
          return video;
        }
      );
      return { conclusionVideos: updatedConclusionVideos };
    });
  },

  // delete video from MUX
  removeMuxVideo: async (videoIndex, muxAssetId) => {
    set({ loading: true, error: null });
    try {
      const res = await deleteMuxVideo(muxAssetId);

      set((state) => {
        const updatedConclusionVideos = state.conclusionVideos.map(
          (video, index) => {
            if (index === videoIndex) {
              return {
                ...video,
                muxUploadId: "",
                videoUrl: "", // main video
                muxAssetId: "",
              };
            }
            return video;
          }
        );
        return { conclusionVideos: updatedConclusionVideos };
      });

      return res;
    } catch (error) {
      set({ error: "Failed to create a new course", loading: false });
      throw error;
    }
  },

  // conclusion video challenge actions

  addConclusionVideoQuestions: (videoIndex) => {
    set((state) => {
      const updatedConclusionVideos = state.conclusionVideos.map(
        (video, index) => {
          if (index === videoIndex) {
            const newQuestion = {
              id: crypto.randomUUID(),
              question: "",
              options: [
                { id: crypto.randomUUID(), textOption: "", imageOption: "" },
                { id: crypto.randomUUID(), textOption: "", imageOption: "" },
                { id: crypto.randomUUID(), textOption: "", imageOption: "" },
                { id: crypto.randomUUID(), textOption: "", imageOption: "" },
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
        }
      );
      return { conclusionVideos: updatedConclusionVideos };
    });
  },

  removeConclusionVideoQuestions: (videoIndex, questionIndex) => {
    set((state) => {
      const updatedConclusionVideos = state.conclusionVideos.map(
        (video, index) => {
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
        }
      );
      return { conclusionVideos: updatedConclusionVideos };
    });
  },

  addConclusionQuestionOptions: (videoIndex, questionIndex) => {
    set((state) => {
      const updatedConclusionVideos = state.conclusionVideos.map(
        (video, index) => {
          if (index === videoIndex) {
            const updatedQuestions = video.test.questions.map(
              (question, idx) => {
                if (idx === questionIndex) {
                  const newOption = {
                    id: crypto.randomUUID(),
                    textOption: "",
                    imageOption: "",
                  };
                  return {
                    ...question,
                    options: [...question.options, newOption],
                  };
                }
                return question;
              }
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
        }
      );
      return { conclusionVideos: updatedConclusionVideos };
    });
  },

  removeConclusionQuestionOptions: (videoIndex, questionIndex, optionIndex) => {
    set((state) => {
      const updatedConclusionVideos = state.conclusionVideos.map(
        (video, index) => {
          if (index === videoIndex) {
            const updatedQuestions = video.test.questions.map(
              (question, idx) => {
                if (idx === questionIndex) {
                  const updatedOptions = question.options.filter(
                    (_, i) => i !== optionIndex
                  );
                  return { ...question, options: updatedOptions };
                }
                return question;
              }
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
        }
      );
      return { conclusionVideos: updatedConclusionVideos };
    });
  },

  updateQuestionText: (videoIndex, questionIndex, questionText) => {
    set((state) => {
      const updatedVideos = state.conclusionVideos.map((video, idx) => {
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
      return { conclusionVideos: updatedVideos };
    });
  },

  updateQuestionImage: (videoIndex, questionIndex, imageFile) => {
    set((state) => {
      const updatedVideos = state.conclusionVideos.map((video, idx) => {
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
      return { conclusionVideos: updatedVideos };
    });
  },

  updateOptionText: (videoIndex, questionIndex, optionIndex, optionText) => {
    set((state) => {
      const updatedVideos = state.conclusionVideos.map((video, idx) => {
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
      return { conclusionVideos: updatedVideos };
    });
  },

  updateOptionImage: (videoIndex, questionIndex, optionIndex, imageFile) => {
    set((state) => {
      const updatedVideos = state.conclusionVideos.map((video, idx) => {
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
      return { conclusionVideos: updatedVideos };
    });
  },

  updateCorrectAnswer: (videoIndex, questionIndex, correctAnswer) => {
    set((state) => {
      const updatedVideos = state.conclusionVideos.map((video, idx) => {
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
      return { conclusionVideos: updatedVideos };
    });
  },

  updateChallengeText: (videoIndex, challengeText) => {
    set((state) => {
      const updatedVideos = state.conclusionVideos.map((video, idx) => {
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
      return { conclusionVideos: updatedVideos };
    });
  },

  updateChallengeImage: (videoIndex, imageFile) => {
    set((state) => {
      const updatedVideos = state.conclusionVideos.map((video, idx) => {
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
      return { conclusionVideos: updatedVideos };
    });
  },

  removeConclusionVideo: (videoId) => {
    set((state) => ({
      conclusionVideos: state.conclusionVideos.filter(
        (_, index) => index !== videoId
      ),
    }));
  },
}));
