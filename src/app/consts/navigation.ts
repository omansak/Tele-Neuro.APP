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
    }
}


export const NAVIGATION_MENU = [
    {
        Header: "YÖNETİM",
        Children: [
            NAVIGATION_ROUTE.ROUTE_CATEGORY_MANAGEMENT
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