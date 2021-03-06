export const environment = {
  production: false,
  request: {
    host: "https://api.telenororehab.com/",
    hubEndpoint: "Hub/",
    rootEndPoint: "api/",
    endPoints: {
      notificationHub: "Notification",
      category: {
        updateCategory: "Category/UpdateCategory",
        listCategories: "Category/ListCategories",
        listActiveCategories: "Category/ListActiveCategories",
        getCategory: "Category/GetCategory",
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
        listProgramsByCategory: "Program/listProgramsByCategory",
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
        selfAssignedPrograms: "Content/SelfAssignedPrograms",
        selfAssignedBrochures: "Content/SelfAssignedBrochures",
      },
      utility: {
        listExercisePropertyDefinitions: "Utility/ListExercisePropertyDefinitions",
        listRoleDefinitions: "Utility/ListRoleDefinitions"
      },
      stat: {
        insertRelationStatLog: "Stat/InsertRelationStatLog",
        completedExercisesOfProgram: "Stat/CompletedExercisesOfProgram",
        userStats: "Stat/UserStats",
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
      },
      conversation: {
        createConversation: "Conversation/CreateConversation",
        userConversations: "Conversation/UserConversations",
        conversationMessages: "Conversation/ConversationMessages",
        insertMessage: "Conversation/InsertMessage",
        readConversationAllMessages: "Conversation/ReadConversationAllMessages/:id",
        userUnreadConversationCount: "Conversation/UserUnreadConversationCount",
      },
      brochure: {
        brochureInfo: "Brochure/BrochureInfo",
        listBrochures: "Brochure/ListBrochures",
        updateBrochure: "Brochure/UpdateBrochure",
        toggleBrochureStatus: "Brochure/ToggleBrochureStatus",
        assignUser: "Brochure/AssignUser",
        deleteAssignedUser: "Brochure/DeleteAssignedUser",
        listAssignedUsers: "Brochure/ListAssignedUsers",
      }
    }
  }
};

