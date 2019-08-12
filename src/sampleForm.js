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
      interface: "input",
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
      interface: "input",
      placeholder: "e.g. mail@theharsh.in",
      type: "email"
    },
    gender: {
      interface: "choice",
      type: "radio",
      value: "male",
      design: {
        grid: 2,
        col: 6
      },
      choices: [
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
      interface: "input"
    },
    father_name: {
      interface: "input"
    },
    education: {
      interface: "input",
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
          interface: "input",
          design: {
            col: 4
          }
        },
        years: {
          interface: "input",
          type: "number",
          design: {
            col: 4
          }
        },
        salary: {
          interface: "input",
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
          interface: "input",
          design: {
            col: 4
          }
        },
        e_years: {
          interface: "input",
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
        }
      }
    },
    skills: {
      interface: "choice",
      type: "checkbox",
      design: {
        grid: 4,
        col: 12
      },
      value: ["html", "js"],
      choices: [
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
      choices: [
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
      interface: "file"
    },
    birth_date: {
      interface: "input",
      type: "date"
    }
  }
};
