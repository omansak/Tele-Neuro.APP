export const ROUTE = ``;
export const ROUTE_FAULT = `**`;
export const ROUTE_ROOT = `/`;

export const NAVIGATION_ROUTE = {
    ROUTE_CATEGORY_MANAGEMENT: {
        PageTitle: "Tele-Neuro | Kategori Yönetimi",
        PageHeader: "Kategori Yönetimi",
        MenuName: "Kategori Yönetimi",
        IconClass: "link-icon icon sli-book-open",
        Route: "category-management"
    },
    ROUTE_EXERCISE_MANAGEMENT: {
        PageTitle: "Tele-Neuro | Egzersiz Yönetimi",
        PageHeader: "Egzersiz Yönetimi",
        MenuName: "Egzersiz Yönetimi",
        IconClass: "link-icon icon sli-magic-wand",
        Route: "exercise-management"
    },
    ROUTE_PROGRAM_MANAGEMENT: {
        PageTitle: "Tele-Neuro | Program Yönetimi",
        PageHeader: "Program Yönetimi",
        MenuName: "Program Yönetimi",
        IconClass: "link-icon icon sli-grid",
        Route: "program-management"
    },
    ROUTE_PROGRAM_USER_MANAGEMENT: {
        PageTitle: "Tele-Neuro | Program Kullanıcı Yönetimi",
        PageHeader: "Program Kullanıcı Yönetimi",
        MenuName: "Program Kullanıcı Yönetimi",
        IconClass: "link-icon icon sli-grid",
        Route: "program-user-management/:id"
    },
    ROUTE_USER_MANAGEMENT: {
        PageTitle: "Tele-Neuro | Kullanıcı Yönetimi",
        PageHeader: "Kullanıcı Yönetimi",
        MenuName: "Kullanıcı Yönetimi",
        IconClass: "link-icon icon sli-user",
        Route: "user-management"
    },
    ROUTE_PROGRAM: {
        PageTitle: "Tele-Neuro | %s",
        PageHeader: "Program İçeriği",
        Route: "program/:id",
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
        Header: "Dashboard",
        Children: [
            NAVIGATION_ROUTE.ROUTE_DASHBOARD,
        ],
    },
    {
        Header: "YÖNETİM",
        Children: [
            NAVIGATION_ROUTE.ROUTE_CATEGORY_MANAGEMENT,
            NAVIGATION_ROUTE.ROUTE_EXERCISE_MANAGEMENT,
            NAVIGATION_ROUTE.ROUTE_PROGRAM_MANAGEMENT,
            NAVIGATION_ROUTE.ROUTE_USER_MANAGEMENT,
        ],
    },
    {
        Header: "MEDINE",
        Children: [
            {
                PageTitle: "Tele-Neuro | Appointments",
                PageHeader: "Appointments",
                MenuName: "Appointments",
                IconClass: "link-icon icofont-stethoscope-alt",
                Route: "#"
            }
        ]
    },
    {
        Header: "UI Kit",
        Children: [
            {
                MenuName: "Components",
                IconClass: "link-icon icofont-stethoscope-alt",
                Children: [
                    {
                        PageTitle: "Tele-Neuro | Appointments",
                        PageHeader: "Appointments",
                        MenuName: "Appointments",
                        IconClass: "link-icon icofont-stethoscope-alt",
                        Route: "#"
                    },
                    {
                        PageTitle: "Tele-Neuro | Appointments",
                        PageHeader: "Appointments",
                        MenuName: "Appointments",
                        IconClass: "link-icon icofont-stethoscope-alt",
                        Route: "#"
                    }
                ]
            }
        ]
    }
]