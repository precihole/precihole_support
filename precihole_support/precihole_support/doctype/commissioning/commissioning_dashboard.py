from frappe import _

def get_data():
    return {
        "fieldname": "commissioning",
        "transactions": [
            {
                "label": _("Related Documents"),
                "items": [
                    "Training Sheet",
                    "Customer Satisfactory"
                ]
            }
        ]
    }