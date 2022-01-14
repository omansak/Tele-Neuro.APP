import { UserRoleDefinition } from "./defaults";

export const ROUTE = ``;
export const ROUTE_FAULT = `**`;
export const ROUTE_ROOT = `/`;

export const NAVIGATION_ROUTE = {
    ROUTE_CATEGORY_MANAGEMENT: {
        PageTitle: "Tele-Neuro | Kategori Yönetimi",
        PageHeader: "Kategori Yönetimi",
        MenuName: "Kategori Yönetimi",
        IconClass: "link-icon icon sli-book-open",
        Route: "category-management",
        Role: UserRoleDefinition.Editor
    },
    ROUTE_EXERCISE_MANAGEMENT: {
        PageTitle: "Tele-Neuro | Egzersiz Yönetimi",
        PageHeader: "Egzersiz Yönetimi",
        MenuName: "Egzersiz Yönetimi",
        IconClass: "link-icon icon sli-magic-wand",
        Route: "exercise-management",
        Role: UserRoleDefinition.Editor
    },
    ROUTE_BROCHURE_MANAGEMENT: {
        PageTitle: "Tele-Neuro | Broşür Yönetimi",
        PageHeader: "Broşür Yönetimi",
        MenuName: "Broşür Yönetimi",
        IconClass: "link-icon icon sli-notebook",
        Route: "brochure-management",
        Role: UserRoleDefinition.Editor
    },
    ROUTE_PROGRAM_MANAGEMENT: {
        PageTitle: "Tele-Neuro | Program Yönetimi",
        PageHeader: "Program Yönetimi",
        MenuName: "Program Yönetimi",
        IconClass: "link-icon icon sli-grid",
        Route: "program-management",
        Role: UserRoleDefinition.Contributor
    },
    ROUTE_PROGRAM_USER_MANAGEMENT: {
        PageTitle: "Tele-Neuro | Program Kullanıcı Yönetimi",
        PageHeader: "Program Kullanıcı Yönetimi",
        MenuName: "Program Kullanıcı Yönetimi",
        Route: "program-user-management/:id",
        Role: UserRoleDefinition.Contributor
    },
    ROUTE_BROCHURE_USER_MANAGEMENT: {
        PageTitle: "Tele-Neuro | Broşür Kullanıcı Yönetimi",
        PageHeader: "Broşür Kullanıcı Yönetimi",
        MenuName: "Broşür Kullanıcı Yönetimi",
        Route: "brochure-user-management/:id",
        Role: UserRoleDefinition.Contributor
    },
    ROUTE_USER_MANAGEMENT: {
        PageTitle: "Tele-Neuro | Kullanıcı Yönetimi",
        PageHeader: "Kullanıcı Yönetimi",
        MenuName: "Kullanıcı Yönetimi",
        IconClass: "link-icon icon sli-user",
        Route: "user-management",
        Role: UserRoleDefinition.Contributor
    },
    ROUTE_PROGRAM: {
        PageTitle: "Tele-Neuro | %s",
        PageHeader: "Program İçeriği",
        Route: "program/:id",
    },
    ROUTE_CONVERSATION: {
        PageTitle: "Mesajlaşma",
        Route: "conversation",
    },
    ROUTE_CATEGORIES: {
        PageTitle: "Tele-Neuro | Kategoriler",
        PageHeader: "Kategoriler",
        MenuName: "Kategoriler",
        IconClass: "link-icon icon sli-chemistry",
        Route: "categories",
    },
    ROUTE_CATEGORY: {
        PageTitle: "Tele-Neuro | %s",
        PageHeader: "%s",
        Route: "category-detail/:id",
    },
    ROUTE_LOGIN: {
        PageTitle: "Tele-Neuro | Giriş",
        PageHeader: "Tele-Neuro | Giriş",
        Route: "login",
    },
    ROUTE_DASHBOARD: {
        PageTitle: "Tele-Neuro | Dashboard",
        MenuName: "Dashboard",
        IconClass: "link-icon icon sli-home",
        Route: ""
    },
}


export const NAVIGATION_MENU = [
    {
        Header: "Tele-Neuro",
        Children: [
            NAVIGATION_ROUTE.ROUTE_DASHBOARD,
            NAVIGATION_ROUTE.ROUTE_CATEGORIES,
        ],
    },
    {
        Header: "YÖNETİM",
        Children: [
            NAVIGATION_ROUTE.ROUTE_CATEGORY_MANAGEMENT,
            NAVIGATION_ROUTE.ROUTE_EXERCISE_MANAGEMENT,
            NAVIGATION_ROUTE.ROUTE_PROGRAM_MANAGEMENT,
            NAVIGATION_ROUTE.ROUTE_USER_MANAGEMENT,
            NAVIGATION_ROUTE.ROUTE_BROCHURE_MANAGEMENT,
        ],
    },
    // {
    //     Header: "UI Kit",
    //     Children: [
    //         {
    //             MenuName: "Components",
    //             IconClass: "link-icon icofont-stethoscope-alt",
    //             Children: [
    //                 {
    //                     PageTitle: "Tele-Neuro | Appointments",
    //                     PageHeader: "Appointments",
    //                     MenuName: "Appointments",
    //                     IconClass: "link-icon icofont-stethoscope-alt",
    //                     Route: "#"
    //                 },
    //                 {
    //                     PageTitle: "Tele-Neuro | Appointments",
    //                     PageHeader: "Appointments",
    //                     MenuName: "Appointments",
    //                     IconClass: "link-icon icofont-stethoscope-alt",
    //                     Route: "#"
    //                 }
    //             ]
    //         }
    //     ]
    // }
]