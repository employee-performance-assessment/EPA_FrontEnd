const reportWebVitals = (onPerfEntry) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
<<<<<<< HEAD
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
=======
    import('web-vitals').then(({
      getCLS, getFID, getFCP, getLCP, getTTFB,
    }) => {
>>>>>>> 6e720b665f0eb5abdcfb4386ee404cf291466178
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
  }
};

export default reportWebVitals;
