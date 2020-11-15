const counts = {
  installs: 0,
  activations: 0,
  fetches: 0
};

self.addEventListener("install", () => {
  console.log("installs", ++counts.installs);
});

self.addEventListener("activations", () => {
  console.log("activations", ++counts.activations);
});

/*self.addEventListener('fetch', fetchEvent => {
  const request = fetchEvent.request;
  fetchEvent.respondWith(fetch(request).then( responseFromFetch => {return responseFromFetch;}));}); // end addEventL
*/
self.addEventListener('fetch', async fetchEvent => {
  const request = fetchEvent.request;
  try {
    const res = fetch(request);
    fetchEvent.respondWith(res);
  }
  catch(err) {
    console.error(err);
  }
})
