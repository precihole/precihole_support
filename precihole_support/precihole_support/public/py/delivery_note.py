# Auto-create Commissioning when a Delivery Note is inserted
import frappe 
def create_commissioning(doc, method):
    
    if doc.division == "Machine Tools Division" and doc.business_property in ["Machines - Local", "Machines - Export"]:
        
        # Check if Commissioning already exists for this Delivery Note
        if not frappe.db.exists("Commissioning", {"delivery_note": doc.name}):

            # Prepare Commissioning data
            commissioning_data = {
                "doctype": "Commissioning",
                "delivery_note": doc.name,
                "customer": doc.customer,
                "location": frappe.utils.strip_html(doc.shipping_address or ""),  # adjust if your field is different
                #"warranty_start_date": doc.posting_date  # ✅ Warranty Start Date from Delivery Note
            }

            # If Delivery Note has items, take the first one
            if doc.items:
                first_item = doc.items[0]
                commissioning_data["machine_no"] = first_item.item_code  # Machine Number
                commissioning_data["machine_type"] = first_item.item_name # Item Name
                
                if first_item.against_sales_order:
                    commissioning_data["sales_order_number"] = first_item.against_sales_order    

            # Create Commissioning record
            commissioning = frappe.get_doc(commissioning_data)

            # ✅ Add default "Work Done" checklist
            work_done_tasks = [
                "Machine foundation done according to PMT drawing. If required",
                "Install of machine as per layout",
                "Machine leveling",
                "Check electric input as per machine name plate",
                "Check all motor direction",
                "Oil filling as recommended by PMT",
                "Drill Re-Grinding machine installation",
                "Re-Grinding machine Manual",
                "Machine Manual"
            ]
            for task in work_done_tasks: 
                commissioning.append("work_done", {"task": task}) # ensure 'work_done' is the correct child table fieldname 
                
            commissioning.insert(ignore_permissions=True)