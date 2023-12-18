export function runCode() {
  my_test(function ({ matchComponents, theme }) {
    a(
      {
        a: (test) => {
          console.log(test + " a type");
          b("b test");
        },
      },
      "btypes"
    );
  });
}

function my_test(a, b) {
  a({
    a: (callback) => {
      callback.a("my");
    },
    b: function (obj) {
      console.log(obj);
    },
  });
}
