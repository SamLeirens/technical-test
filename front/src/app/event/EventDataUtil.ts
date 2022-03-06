export const getEventCreationJson = [
    {
        "name": "title",
        "label": "Title",
        "component": "text"
    },
    {
        "name": "type",
        "component": "select",
        "label": "Type",
        "options": [
            {
                "label": "Generic",
                "value": "generic"
            },
            {
                "label": "Holiday",
                "value": "holiday"
            }
        ]
    },
    {
        "name": [
            "startDate",
            "endDate"
        ],
        "component": "range_picker",
        "label": "Date"
    },
    {
        "name": "description",
        "label": "Description",
        "component": "textarea"
    }
]