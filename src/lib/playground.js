// const fs = require("fs");
// const path = require("path");

export function runCode() {
  my_plugin(function ({ matchComponents, theme }) {
  //   let iconsDir = path.join(__dirname, "./vendor/heroicons/optimized")
  //   let values = {}
  //   let icons = [
  //     ["", "/24/outline"],
  //     ["-solid", "/24/solid"],
  //     ["-mini", "/20/solid"]
  //   ]
  //   icons.forEach(([suffix, dir]) => {
  //     fs.readdirSync(path.join(iconsDir, dir)).map(file => {
  //       let name = path.basename(file, ".svg") + suffix
  //       values[name] = { name, fullPath: path.join(iconsDir, dir, file) }
  //     })
  //   })
    
    matchComponents({
        "type": (text) => {
          console.log(text + " a type")
          theme("b theme")
        },
      }, "b types")
  })
}

function my_plugin(components, options) {
  components({
    matchComponents: (callback, text) => {
      callback.type("my");
      callback.type(text);
    },
    theme: function (obj) {
      console.log(obj);
    },
  });
}
