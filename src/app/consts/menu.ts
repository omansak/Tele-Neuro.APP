import { ROUTE_MANAGEMENT_CATEGORY } from "./routes";

export const NAVIGATION_CATEGORY_MANAGEMENT = {
    Title: "Kategori Yönetimi",
    IconClass: "link-icon icon sli-book-open",
    Path: ROUTE_MANAGEMENT_CATEGORY,
    Data: {
        PageTitle: "Kategori Düzenle"
    }
}

export const MENU_ADMIN = [
    {
        Title: "YÖNETİM",
        Children: [
            NAVIGATION_CATEGORY_MANAGEMENT,
            {
                Title: "Appointments",
                IconClass: "link-icon icofont-stethoscope-alt",
                Path: "#"
            }
        ]
    },
    {
        Title: "MEDINE",
        Children: [
            {
                Title: "Dashboard",
                IconClass: "link-icon icofont-thermometer-alt",
                Path: "#"
            },
            {
                Title: "Appointments",
                IconClass: "link-icon icofont-stethoscope-alt",
                Path: "#"
            }
        ]
    },
    {
        Title: "UI Kit",
        Children: [
            {
                Title: "Components",
                // IconClass: "link-icon icofont-stethoscope-alt",
                Children: [
                    {
                        Title: "Appointments",
                        // IconClass: "link-icon icofont-stethoscope-alt",
                        Path: "#"
                    }
                ]
            }
        ]
    }
]