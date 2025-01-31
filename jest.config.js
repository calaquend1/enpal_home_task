module.exports = {
    preset: "ts-jest",
    testEnvironment: "jsdom",
    transform: {
      "^.+\\.tsx?$": "ts-jest",
    },
    transformIgnorePatterns: [
      "node_modules/(?!axios)", // Transpile Axios
    ],
  };