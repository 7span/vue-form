import axios from "axios";

export default {
  config: {
    axios: axios,
    defaults: {
      block: {
        size: {
          desktop: 6
        }
        //gap: "xs"
      }
    }
  },
  fields: {
    state: {
      interface: "select",
      block: {
        size: {
          desktop: 6
        }
      },
      props: {
        url: "https://api.mcook.co.in:8989/web/v3/search_form_entity/",
        params: {
          type: "inventory_category",
          search: null
        },
        responseHook(res) {
          return res.data.data;
        }
      }
    },
    name: {
      interface: "textbox",
      value: "Harsh",
      props: {
        desc: "No numbers please",
        type: "text",
        label: "Name",
        placeholder: "e.g. Harsh Kansagara",
        disabled: true
      }
    },
    email: {
      interface: "textbox",
      value: "hello",
      rules: "required|email",
      props: {
        placeholder: "e.g. mail@theharsh.in",
        type: "email"
      }
    },
    gender: {
      interface: "radio",
      value: "male",
      props: {
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
      }
    },
    husbund_name: {
      interface: "textbox"
    },
    father_name: {
      interface: "textbox"
    },
    education: {
      interface: "textbox",
      block: {
        size: 12
      },
      value: [
        {
          _id: "1234",
          value: "1111"
        }
      ],
      repeater: {
        max: 4,
        min: 2
      }
    },
    training: {
      interface: "group",
      block: {
        size: 12
      },
      fields: {
        company: {
          interface: "textbox",
          size: "xs"
        },
        years: {
          interface: "textbox",
          type: "number",
          size: "xs"
        },
        salary: {
          interface: "textbox",
          size: "xs"
        }
      }
    },
    experience: {
      interface: "group",
      repeater: {
        max: 10,
        min: 2
      },
      block: {
        size: 12
      },
      fields: {
        e_company: {
          interface: "textbox",
          block: {
            size: 4
          }
        },
        e_years: {
          interface: "textbox",
          type: "number",
          block: {
            size: 4
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
          block: {
            size: 4
          },
          props: {
            label: "Title",

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
            ]
          }
        }
      }
    },
    skills: {
      interface: "checkbox",
      value: ["html", "js"],
      props: {
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
      }
    },
    city: {
      interface: "select",
      props: {
        options: [
          {
            label: "Ahmedabad",
            value: "ahmedabad"
          },
          {
            label: "Rajkot",
            value: "rajkot"
          }
        ]
      },
      block: {
        size: 4
      }
    },
    desc: {
      interface: "textarea",
      props: {
        rows: 2
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
