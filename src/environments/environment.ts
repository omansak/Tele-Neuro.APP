export const environment = {
  production: false,
  request: {
    host: "https://localhost:44384/",
    rootEndPoint: "api/",
    endPoints: {
      category: {
        updateCategory: "Category/UpdateCategory",
        listCategories: "Category/ListCategories",
        listActiveCategories: "Category/ListActiveCategories",
        toggleCategoryStatus: "Category/ToggleCategoryStatus",
      },
      exercise: {
        updateExercise: "Exercise/UpdateExercise",
        listExercises: "Exercise/ListExercises",
        toggleExerciseStatus: "Exercise/ToggleExerciseStatus",
        searchExercises: "Exercise/SearchExercises",
      },
      program: {
        updateProgram: "Program/UpdateProgram",
        toggleProgramStatus: "Program/ToggleProgramStatus",
        listPrograms: "Program/ListPrograms",
        assignExercise: "Program/AssignExercise",
        assignedExercises: "Program/AssignedExercises",
        changeSequenceAssignedExercise: "Program/ChangeSequenceAssignedExercise",
        deleteAssignedExercise: "Program/DeleteAssignedExercise",
        assignUser: "Program/AssignUser",
        deleteAssignedUser: "Program/DeleteAssignedUser",
        listAssignedUsers: "Program/ListAssignedUsers",
        programInfo: "Program/ProgramInfo",
      },
      content: {
        programInfo: "Content/ProgramInfo",
        assignedExercises: "Content/AssignedExercises",
        getActiveExercise: "Content/GetActiveExercise",
      },
      utility: {
        listExercisePropertyDefinitions: "Utility/ListExercisePropertyDefinitions",
        listRoleDefinitions: "Utility/ListRoleDefinitions"
      },
      login: {
        login: "Login/Login",
        logout: "Login/Logout",
        refreshToken: "Login/RefreshToken",
      },
      user: {
        listFilterUsers: "User/ListFilterUsers",
        addUser: "User/AddUser",
        toggleUserStatus: "User/ToggleUserStatus",
      }
    }
  }
};

