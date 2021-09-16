export const environment = {
  production: false,
  request: {
    host: "https://localhost:44384/",
    rootEndPoint: "api/",
    endPoints: {
      category: {
        updateCategory: "Category/UpdateCategory",
        listCategories: "Category/ListCategories",
        toggleCategoryStatus: "Category/ToggleCategoryStatus",
      },
      exercise: {
        updateExercise: "Exercise/UpdateExercise",
        listExercises: "Exercise/ListExercises",
        toggleExerciseStatus: "Exercise/ToggleExerciseStatus",
      }
    }
  }
};

