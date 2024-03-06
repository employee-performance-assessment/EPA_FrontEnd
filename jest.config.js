module.exports = {
  // среда тестирования - браузер
  verbose: true,
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
<<<<<<< HEAD
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/fileMock.js',
=======
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/__mocks__/fileMock.js',
>>>>>>> 6e720b665f0eb5abdcfb4386ee404cf291466178
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
};
