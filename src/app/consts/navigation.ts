import { UserRoleDefinition } from "./defaults";

export const ROUTE = ``;
export const ROUTE_FAULT = `**`;
export const ROUTE_ROOT = `/`;

export const NAVIGATION_ROUTE = {
    ROUTE_CATEGORY_MANAGEMENT: {
        PageTitle: "Tele-NöroRehab | Kategori Yönetimi",
        PageHeader: "Kategori Yönetimi",
        MenuName: "Kategori Yönetimi",
        IconClass: "link-icon icon sli-book-open",
        Route: "category-management",
        Role: UserRoleDefinition.Editor
    },
    ROUTE_EXERCISE_MANAGEMENT: {
        PageTitle: "Tele-NöroRehab | Egzersiz Yönetimi",
        PageHeader: "Egzersiz Yönetimi",
        MenuName: "Egzersiz Yönetimi",
        IconClass: "link-icon icon sli-magic-wand",
        Route: "exercise-management",
        Role: UserRoleDefinition.Contributor
    },
    ROUTE_BROCHURE_MANAGEMENT: {
        PageTitle: "Tele-NöroRehab | Broşür Yönetimi",
        PageHeader: "Broşür Yönetimi",
        MenuName: "Broşür Yönetimi",
        IconClass: "link-icon icon sli-notebook",
        Route: "brochure-management",
        Role: UserRoleDefinition.Contributor
    },
    ROUTE_PROGRAM_MANAGEMENT: {
        PageTitle: "Tele-NöroRehab | Program Yönetimi",
        PageHeader: "Program Yönetimi",
        MenuName: "Program Yönetimi",
        IconClass: "link-icon icon sli-grid",
        Route: "program-management",
        Role: UserRoleDefinition.Contributor
    },
    ROUTE_PROGRAM_USER_MANAGEMENT: {
        PageTitle: "Tele-NöroRehab | Program Kullanıcı Yönetimi",
        PageHeader: "Program Kullanıcı Yönetimi",
        MenuName: "Program Kullanıcı Yönetimi",
        Route: "program-user-management/:id",
        Role: UserRoleDefinition.Contributor
    },
    ROUTE_BROCHURE_USER_MANAGEMENT: {
        PageTitle: "Tele-NöroRehab | Broşür Kullanıcı Yönetimi",
        PageHeader: "Broşür Kullanıcı Yönetimi",
        MenuName: "Broşür Kullanıcı Yönetimi",
        Route: "brochure-user-management/:id",
        Role: UserRoleDefinition.Contributor
    },
    ROUTE_USER_MANAGEMENT: {
        PageTitle: "Tele-NöroRehab | Kullanıcı Yönetimi",
        PageHeader: "Kullanıcı Yönetimi",
        MenuName: "Kullanıcı Yönetimi",
        IconClass: "link-icon icon sli-user",
        Route: "user-management",
        Role: UserRoleDefinition.Contributor
    },
    ROUTE_PROGRAM: {
        PageTitle: "Tele-NöroRehab | %s",
        PageHeader: "Program İçeriği",
        Route: "program/:id",
    },
    ROUTE_CONVERSATION: {
        PageTitle: "Mesajlaşma",
        MenuName: "Mesajlaşma",
        IconClass: "link-icon icon sli-briefcase",
        Route: "conversation",
    },
    ROUTE_CATEGORIES: {
        PageTitle: "Tele-NöroRehab | Kategoriler",
        PageHeader: "Kategoriler",
        MenuName: "Kategoriler",
        IconClass: "link-icon icon sli-chemistry",
        Route: "categories",
        Role: UserRoleDefinition.Contributor
    },
    ROUTE_CATEGORY: {
        PageTitle: "Tele-NöroRehab | %s",
        PageHeader: "%s",
        Route: "category-detail/:id",
    },
    ROUTE_LOGIN: {
        PageTitle: "Tele-NöroRehab | Giriş",
        PageHeader: "Tele-NöroRehab | Giriş",
        Route: "login",
    },
    ROUTE_DASHBOARD: {
        PageTitle: "Tele-NöroRehab | Dashboard",
        MenuName: "Dashboard",
        IconClass: "link-icon icon sli-home",
        Route: ""
    },
}


export const NAVIGATION_MENU = [
    {
        Header: "Tele-NöroRehab",
        Children: [
            NAVIGATION_ROUTE.ROUTE_DASHBOARD,
            NAVIGATION_ROUTE.ROUTE_CATEGORIES,
        ],
    },
    {
        Header: "YÖNETİM",
        Children: [
            NAVIGATION_ROUTE.ROUTE_CONVERSATION,
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
    //                     PageTitle: "Tele-NöroRehab | Appointments",
    //                     PageHeader: "Appointments",
    //                     MenuName: "Appointments",
    //                     IconClass: "link-icon icofont-stethoscope-alt",
    //                     Route: "#"
    //                 },
    //                 {
    //                     PageTitle: "Tele-NöroRehab | Appointments",
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