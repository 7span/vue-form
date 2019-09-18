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
    name: {
      interface: "textbox",
      type: "text",
      label: "Name",
      placeholder: "e.g. Harsh Kansagara",
      value: "Harsh",
      disabled: true,
      messages: {
        desc: "No numbers please",
        valid: "This is valid",
        invalid: "This is invalid"
      }
    },
    email: {
      interface: "textbox",
      placeholder: "e.g. mail@theharsh.in",
      type: "email"
    },
    gender: {
      interface: "radio",
      value: "male",
      design: {
        grid: 2,
        col: 6
      },
      options: [
        {
          label: "Male",
          value: "male"
        },
        {
          label: "Female",
          value: "female"
        }
      ]
    },
    husbund_name: {
      interface: "textbox"
    },
    father_name: {
      interface: "textbox"
    },
    education: {
      interface: "textbox",
      value: [
        {
          _id: "1234",
          value: "1111"
        }
      ],
      repeater: {
        max: 4,
        min: 2
      },
      design: {
        col: 12
      }
    },
    training: {
      interface: "group",
      design: {
        col: 12
      },
      fields: {
        company: {
          interface: "textbox",
          design: {
            col: 4
          }
        },
        years: {
          interface: "textbox",
          type: "number",
          design: {
            col: 4
          }
        },
        salary: {
          interface: "textbox",
          design: {
            col: 4
          }
        }
      }
    },
    experience: {
      interface: "group",
      repeater: {
        max: 10,
        min: 2
      },
      design: {
        col: 12
      },
      fields: {
        e_company: {
          interface: "textbox",
          design: {
            col: 4
          }
        },
        e_years: {
          interface: "textbox",
          type: "number",
          design: {
            col: 4
          }
        },
        // salary: {
        //   interface: "input",
        //   design: {
        //     col: 4
        //   }
        // }
        e_po_title: {
          interface: "select",
          label: "Title",
          messages: {
            invalid: "Please enter a valid title"
          },
          options: [
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
        }
      }
    },
    skills: {
      interface: "checkbox",
      design: {
        grid: 4,
        col: 12
      },
      value: ["html", "js"],
      options: [
        {
          label: "HTML",
          value: "html"
        },
        {
          label: "CSS",
          value: "css"
        },
        {
          label: "JS",
          value: "js"
        },
        {
          label: "VueJS",
          value: "vue"
        },
        {
          label: "React",
          value: "react"
        },
        {
          label: "Angular",
          value: "angular"
        },
        {
          label: "Ready To Learn New Tech",
          value: "learn"
        }
      ]
    },
    state: {
      interface: "select",
      choices: {
        request: {
          url: "https://api.mcook.co.in:8989/web/v3/search_form_entity/",
          params: {
            type: "inventory_category",
            search: null
          },
          adapter(res) {
            return res.data.data;
          }
        }
      },
      design: {
        col: 4
      }
    },
    city: {
      interface: "select",
      options: [
        {
          label: "Ahmedabad",
          value: "ahmedabad"
        },
        {
          label: "Rajkot",
          value: "rajkot"
        }
      ],
      design: {
        col: 4
      }
    },

    desc: {
      interface: "textarea",
      rows: 2,
      design: {
        col: 12
      }
    },
    photo: {
      interface: "textbox"
    },
    birth_date: {
      interface: "textbox",
      type: "date"
    }
  }
};
