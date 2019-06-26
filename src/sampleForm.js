export default {
  config: {
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
      value: ["male"],

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
      interface: "input",
      hide(values) {
        return values.gender == "male";
      }
    },
    father_name: {
      interface: "input",
      hide(values) {
        return values.gender == "female";
      }
    },
    education: {
      interface: "input",
      value: ["111", "222"],
      repeater: {
        max: 4,
        min: 2
      },
      design: {
        col: 12
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
      ]
    },
    desc: {
      interface: "textarea"
    },
    photo: {
      interface: "file"
    }
  }
};
