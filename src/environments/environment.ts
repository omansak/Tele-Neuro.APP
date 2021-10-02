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
      },
      utility: {
        listExercisePropertyDefinitions: "Utility/ListExercisePropertyDefinitions"
      }
    }
  }
};

