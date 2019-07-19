import axios from "axios";

export default {
  config: {
    axios: axios,
    defaults: {
      design: {
        col: 6
      }
    }
  },

  fields: {
    po_no: {
      interface: "input",
      type: "text",
      label: "P.O. No.",
      value: "PO-1",
      validation: "required",
      design: {
        col: 4
      },
      readonly: true
    },
    date: {
      interface: "input",
      type: "date",
      label: "Date",
      value: "2019-01-01",
      validation: "required",
      design: {
        col: 4
      }
    },
    vendor_id: {
      interface: "select",
      label: "Select Vendor",
      choices: [
        {
          value: 1,
          label: "Amee Jagani"
        },
        {
          value: 2,
          label: "Harsh K"
        },
        {
          value: 3,
          label: "Kaushal"
        },
        {
          value: 4,
          label: "Kaushal"
        },
        {
          value: 5,
          label: "Kaushal2"
        }
      ],
      validation: "required",
      design: {
        col: 4
      }
    },
    po_item: {
      interface: "group",
      label: "P.O. Items",
      choices: ["po_title", "qty", "rate", "amount"],
      design: {
        col: 12
      },
      repeater: {
        min: 1
      },
      fields: {
        po_title: {
          interface: "select",
          label: "Title",
          messages: {
            invalid: "Please enter a valid title"
          },
          choices: {
            request: {
              labelKey: "title",
              valueKey: "value",
              url: "https://api.mcook.co.in:8989/web/v3/search_form_entity",
              params: {
                type: "inventory_items",
                search: null
              }
            }
          },
          validation: "required",
          design: {
            col: 6
          }
        },
        qty: {
          interface: "input",
          type: "number",
          label: "Quantity",
          validation: "required",
          design: {
            col: 2
          }
        },
        rate: {
          interface: "input",
          type: "number",
          label: "Rate",
          validation: "required",
          design: {
            col: 2
          }
        },
        amount: {
          interface: "input",
          type: "number",
          label: "Amount",
          validation: "required",
          design: {
            col: 2
          }
        }
      }
    }
  }
};
