# Copyright (c) 2024, Precihole Sports Pvt Ltd and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document


class Commissioning(Document):
	def before_submit(self):
		for task in self.work_done:
			if not task.out_comes:
				frappe.throw('Out comes is mandatory')
		docstatus = frappe.db.get_value('Training Sheet', {'commissioning': self.name}, 'docstatus')
		if docstatus == None:
			frappe.throw('No training sheet found')
		if docstatus == 1:
			return
		frappe.throw('Either Training Sheet is in Draft or Cancelled')