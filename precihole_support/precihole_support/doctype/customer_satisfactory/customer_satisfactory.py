# Copyright (c) 2024, Precihole Sports Pvt Ltd and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document

class CustomerSatisfactory(Document):
    def before_save(self):
        if self.commissioning:
            visit_items = frappe.get_all(
                "Commissioning Visit Item",
                filters={"parent": self.commissioning},
                fields=["engineer"],   # adjust if field is actually 'service_engineer'
                limit=1
            )

            if visit_items:
                self.service_engineer = visit_items[0].get("engineer") or ""
