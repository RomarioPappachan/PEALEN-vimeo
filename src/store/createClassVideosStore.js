import { deleteMuxVideo } from "@/api/muxVideo";
import { create } from "zustand";

export const useCreateClassVideosStore = create((set) => ({
  classVideos: [],

  // Class Videos handlers

  addNewClassVideo: () => {
    set((state) => ({
      classVideos: [
        ...state.classVideos,
        {
          id: crypto.randomUUID(),
          videoType: "class",
          title: "",
          subject: "",
          image: null,
          videoUrl: "", // main video
          muxUploadId: "",
          muxAssetId: "",
          demoVideourl: "", // demo video
          muxDemoUploadId: "",
          muxDemoAssetId: "",
          animationUrl: "", // animation video
          muxAnimationUploadId: "",
          muxAnimationAssetId: "",
          pdf: null,
          srt: null,
          videoSteps: [],
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

  addClassVideoDetails: (name, value, videoIndex) => {
    set((state) => {
      const updatedClassVideos = state.classVideos.map((video, index) => {
        if (index === videoIndex) {
          return { ...video, [name]: value };
        }
        return video;
      });
      return { classVideos: updatedClassVideos };
    });
  },

  addClassVideoThumbnail: (imageFile, videoIndex) => {
    set((state) => {
      const updatedClassVideos = state.classVideos.map((video, index) => {
        if (index === videoIndex) {
          return { ...video, videoThumbnail: imageFile };
        }
        return video;
      });
      return { classVideos: updatedClassVideos };
    });
  },

  addMainClassVideoIds: (
    videoIndex,
    uploadId,
    playbackId,
    assetId,
    videoType
  ) => {
    set((state) => {
      const updatedClassVideos = state.classVideos.map((video, index) => {
        if (index === videoIndex) {
          if (videoType === "demo") {
            return {
              ...video,
              muxDemoUploadId: uploadId,
              demoVideourl: playbackId, // demo video
              muxDemoAssetId: assetId,
            };
          } else if (videoType === "animation") {
            return {
              ...video,
              muxAnimationUploadId: uploadId,
              animationUrl: playbackId, // animation video
              muxAnimationAssetId: assetId,
            };
          } else {
            return {
              ...video,
              muxUploadId: uploadId,
              videoUrl: playbackId, // main video
              muxAssetId: assetId,
            };
          }
        }
        return video;
      });
      return { classVideos: updatedClassVideos };
    });
  },

  addClassVideoTranscript: (videoIndex, file) => {
    set((state) => {
      const updatedClassVideos = state.classVideos.map((video, index) => {
        if (index === videoIndex) {
          return { ...video, srt: file };
        }
        return video;
      });
      return { classVideos: updatedClassVideos };
    });
  },

  addClassVideoSteps: (newVideoStep, videoIndex) => {
    set((state) => {
      const updatedClassVideos = state.classVideos.map((video, index) => {
        if (index === videoIndex) {
          const updatedvideoSteps = video.videoSteps;
          updatedvideoSteps.push(newVideoStep);
          return { ...video, videoSteps: updatedvideoSteps };
        }
        return video;
      });
      return { classVideos: updatedClassVideos };
    });
  },

  removeClassVideoSteps: (videoIndex, stepIndex) => {
    set((state) => {
      const updatedClassVideos = state.classVideos.map((video, index) => {
        if (index === videoIndex) {
          const updatedvideoSteps = video.videoSteps.filter(
            (_, index) => index !== stepIndex
          );
          return { ...video, videoSteps: updatedvideoSteps };
        }
        return video;
      });
      return { classVideos: updatedClassVideos };
    });
  },

  addClassVideoQuestions: (videoIndex) => {
    set((state) => {
      const updatedClassVideos = state.classVideos.map((video, index) => {
        if (index === videoIndex) {
          const newQuestion = {
            id: crypto.randomUUID(),
            question: "",
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
      return { classVideos: updatedClassVideos };
    });
  },

  removeClassVideoQuestions: (videoIndex, questionIndex) => {
    set((state) => {
      const updatedClassVideos = state.classVideos.map((video, index) => {
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
      return { classVideos: updatedClassVideos };
    });
  },

  addClassQuestionOptions: (videoIndex, questionIndex) => {
    set((state) => {
      const updatedClassVideos = state.classVideos.map((video, index) => {
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
      return { classVideos: updatedClassVideos };
    });
  },

  removeClassQuestionOptions: (videoIndex, questionIndex, optionIndex) => {
    set((state) => {
      const updatedClassVideos = state.classVideos.map((video, index) => {
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
      return { classVideos: updatedClassVideos };
    });
  },

  updateQuestionText: (videoIndex, questionIndex, questionText) => {
    set((state) => {
      const updatedVideos = state.classVideos.map((video, idx) => {
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
      return { classVideos: updatedVideos };
    });
  },

  updateQuestionImage: (videoIndex, questionIndex, imageFile) => {
    set((state) => {
      const updatedVideos = state.classVideos.map((video, idx) => {
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
      return { classVideos: updatedVideos };
    });
  },

  updateOptionText: (videoIndex, questionIndex, optionIndex, optionText) => {
    set((state) => {
      const updatedVideos = state.classVideos.map((video, idx) => {
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
      return { classVideos: updatedVideos };
    });
  },

  updateOptionImage: (videoIndex, questionIndex, optionIndex, imageFile) => {
    set((state) => {
      const updatedVideos = state.classVideos.map((video, idx) => {
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
      return { classVideos: updatedVideos };
    });
  },

  updateCorrectAnswer: (videoIndex, questionIndex, correctAnswer) => {
    set((state) => {
      const updatedVideos = state.classVideos.map((video, idx) => {
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
      return { classVideos: updatedVideos };
    });
  },

  updateChallengeText: (videoIndex, challengeText) => {
    set((state) => {
      const updatedVideos = state.classVideos.map((video, idx) => {
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
      return { classVideos: updatedVideos };
    });
  },

  updateChallengeImage: (videoIndex, imageFile) => {
    set((state) => {
      const updatedVideos = state.classVideos.map((video, idx) => {
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
      return { classVideos: updatedVideos };
    });
  },

  removeClassVideo: (classVideoId) => {
    set((state) => ({
      classVideos: state.classVideos.filter(
        (_, index) => index !== classVideoId
      ),
    }));
  },

  // API's
  // delete video from MUX
  removeMuxVideo: async (videoIndex, muxAssetId, videoType) => {
    set({ loading: true, error: null });
    try {
      const res = await deleteMuxVideo(muxAssetId);

      set((state) => {
        const updatedClassVideos = state.classVideos.map((video, index) => {
          if (index === videoIndex) {
            if (videoType === "demo") {
              return {
                ...video,
                muxDemoUploadId: "",
                demoVideourl: "", // demo video
                muxDemoAssetId: "",
              };
            } else if (videoType === "animation") {
              return {
                ...video,
                muxAnimationUploadId: "",
                animationUrl: "", // animation video
                muxAnimationAssetId: "",
              };
            } else {
              return {
                ...video,
                muxUploadId: "",
                videoUrl: "", // main video
                muxAssetId: "",
              };
            }
          }
          return video;
        });
        return { classVideos: updatedClassVideos };
      });

      return res;
    } catch (error) {
      set({ error: "Failed to create a new course", loading: false });
      throw error;
    }
  },
}));
