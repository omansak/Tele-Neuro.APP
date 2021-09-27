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
    ROUTE_EXERCISE_PROGRAM: {
        PageTitle: "Tele-Neuro | Program Yönetimi",
        PageHeader: "Program Yönetimi",
        MenuName: "Program Yönetimi",
        IconClass: "link-icon icon sli-grid",
        Route: "program-management"
    },
}


export const NAVIGATION_MENU = [
    {
        Header: "YÖNETİM",
        Children: [
            NAVIGATION_ROUTE.ROUTE_CATEGORY_MANAGEMENT,
            NAVIGATION_ROUTE.ROUTE_EXERCISE_MANAGEMENT,
            NAVIGATION_ROUTE.ROUTE_EXERCISE_PROGRAM,
        ]
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