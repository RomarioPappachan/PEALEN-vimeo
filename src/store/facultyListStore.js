// src/store/facultyStore.js
import { create } from "zustand";

export const useFacultyListStore = create((set, get) => ({
  // Initialize with the faculty data
  loading: false,
  error: null,
  faculties: [
    {
      id: "f1e2d3c4-b5a6-7890-1234-56789abcdef0",
      firstName: "Alice",
      lastName: "Johnson",
      designation: "Professor",
      profilePicture:
        "https://images.pexels.com/photos/3184405/pexels-photo-3184405.jpeg",
      facultyCode: "FC101",
    },
    {
      id: "a1b2c3d4-e5f6-7890-1234-56789abcdef1",
      firstName: "Bob",
      lastName: "Smith",
      designation: "Associate Professor",
      profilePicture:
        "https://images.pexels.com/photos/3775535/pexels-photo-3775535.jpeg",
      facultyCode: "FC102",
    },
    {
      id: "b2c3d4e5-f6a7-8901-2345-6789abcdef12",
      firstName: "Carol",
      lastName: "Williams",
      designation: "Assistant Professor",
      profilePicture:
        "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg",
      facultyCode: "FC103",
    },
    {
      id: "c3d4e5f6-a7b8-9012-3456-789abcdef123",
      firstName: "David",
      lastName: "Brown",
      designation: "Lecturer",
      profilePicture:
        "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg",
      facultyCode: "FC104",
    },
    {
      id: "d4e5f6a7-b8c9-0123-4567-89abcdef1234",
      firstName: "Eva",
      lastName: "Davis",
      designation: "Senior Lecturer",
      profilePicture:
        "https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg",
      facultyCode: "FC105",
    },
    {
      id: "e5f6a7b8-c9d0-1234-5678-9abcdef12345",
      firstName: "Frank",
      lastName: "Miller",
      designation: "Professor of Practice",
      profilePicture:
        "https://images.pexels.com/photos/3775532/pexels-photo-3775532.jpeg",
      facultyCode: "FC106",
    },
    {
      id: "f6a7b8c9-d0e1-2345-6789-abcdef123456",
      firstName: "Grace",
      lastName: "Wilson",
      designation: "Assistant Professor",
      profilePicture:
        "https://images.pexels.com/photos/1181691/pexels-photo-1181691.jpeg",
      facultyCode: "FC107",
    },
    {
      id: "a7b8c9d0-e1f2-3456-789a-bcdef1234567",
      firstName: "Henry",
      lastName: "Moore",
      designation: "Associate Professor",
      profilePicture:
        "https://images.pexels.com/photos/3775534/pexels-photo-3775534.jpeg",
      facultyCode: "FC108",
    },
    {
      id: "b8c9d0e1-f2a3-4567-89ab-cdef12345678",
      firstName: "Ivy",
      lastName: "Taylor",
      designation: "Lecturer",
      profilePicture:
        "https://images.pexels.com/photos/1181692/pexels-photo-1181692.jpeg",
      facultyCode: "FC109",
    },
    {
      id: "c9d0e1f2-a3b4-5678-9abc-def123456789",
      firstName: "Jack",
      lastName: "Anderson",
      designation: "Senior Lecturer",
      profilePicture:
        "https://images.pexels.com/photos/3775533/pexels-photo-3775533.jpeg",
      facultyCode: "FC110",
    },
    {
      id: "d0e1f2a3-b4c5-6789-abcd-ef1234567890",
      firstName: "Karen",
      lastName: "Thomas",
      designation: "Professor",
      profilePicture:
        "https://images.pexels.com/photos/1181693/pexels-photo-1181693.jpeg",
      facultyCode: "FC111",
    },
    {
      id: "e1f2a3b4-c5d6-789a-bcde-f12345678901",
      firstName: "Leo",
      lastName: "Jackson",
      designation: "Associate Professor",
      profilePicture:
        "https://images.pexels.com/photos/3775536/pexels-photo-3775536.jpeg",
      facultyCode: "FC112",
    },
    {
      id: "f2a3b4c5-d6e7-89ab-cdef-123456789012",
      firstName: "Mia",
      lastName: "White",
      designation: "Assistant Professor",
      profilePicture:
        "https://images.pexels.com/photos/1181694/pexels-photo-1181694.jpeg",
      facultyCode: "FC113",
    },
    {
      id: "a3b4c5d6-e7f8-9abc-def1-234567890123",
      firstName: "Nathan",
      lastName: "Harris",
      designation: "Lecturer",
      profilePicture:
        "https://images.pexels.com/photos/3775537/pexels-photo-3775537.jpeg",
      facultyCode: "FC114",
    },
    {
      id: "b4c5d6e7-f8a9-abcd-ef12-345678901234",
      firstName: "Olivia",
      lastName: "Martin",
      designation: "Senior Lecturer",
      profilePicture:
        "https://images.pexels.com/photos/1181695/pexels-photo-1181695.jpeg",
      facultyCode: "FC115",
    },
    {
      id: "c5d6e7f8-a9b0-bcde-f123-456789012345",
      firstName: "Paul",
      lastName: "Thompson",
      designation: "Professor of Practice",
      profilePicture:
        "https://images.pexels.com/photos/3775538/pexels-photo-3775538.jpeg",
      facultyCode: "FC116",
    },
    {
      id: "d6e7f8a9-b0c1-cdef-1234-567890123456",
      firstName: "Quinn",
      lastName: "Garcia",
      designation: "Assistant Professor",
      profilePicture:
        "https://images.pexels.com/photos/1181696/pexels-photo-1181696.jpeg",
      facultyCode: "FC117",
    },
    {
      id: "e7f8a9b0-c1d2-def1-2345-678901234567",
      firstName: "Rachel",
      lastName: "Martinez",
      designation: "Associate Professor",
      profilePicture:
        "https://images.pexels.com/photos/3775539/pexels-photo-3775539.jpeg",
      facultyCode: "FC118",
    },
    {
      id: "f8a9b0c1-d2e3-ef12-3456-789012345678",
      firstName: "Steve",
      lastName: "Robinson",
      designation: "Lecturer",
      profilePicture:
        "https://images.pexels.com/photos/1181697/pexels-photo-1181697.jpeg",
      facultyCode: "FC119",
    },
    {
      id: "a9b0c1d2-e3f4-f123-4567-890123456789",
      firstName: "Tina",
      lastName: "Clark",
      designation: "Senior Lecturer",
      profilePicture:
        "https://images.pexels.com/photos/3775540/pexels-photo-3775540.jpeg",
      facultyCode: "FC120",
    },
  ],
  // Searched results
  searchedFaculties: [],

  // Action to search and set results
  searchFaculties: async (query) => {
    set({ loading: true, error: null });

    try {
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      const lowerQuery = query.toLowerCase();

      // Use get() to access faculties from the store
      const filtered = get().faculties.filter(
        (item) =>
          item.firstName.toLowerCase().includes(lowerQuery) ||
          item.lastName.toLowerCase().includes(lowerQuery) ||
          item.facultyCode.toLowerCase().includes(lowerQuery)
      );

      set({ searchedFaculties: filtered, loading: false });
    } catch (error) {
      set({ error: "Search failed", loading: false });
    }
  },

  // Action to reset search (optional)
  resetSearch: () => set({ searchedFaculties: [] }),
}));
