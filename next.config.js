/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_URL1:
      "https://joyce-spotify-graphql.herokuapp.com/graphql?query=%7B%0A%20%20queryArtists(byName%3A%22Red%20Hot%20Chili%20Peppers%22)%20%7B%0A%20%20%20%20name%0A%20%20%20%20id%0A%20%20%20%20image%0A%20%20%7D%0A%7D%0A",
    API_URL2:
      "https://joyce-spotify-graphql.herokuapp.com/graphql?query=%7B%0A%20%20queryArtists(byName%3A%20%22Red%20Hot%20Chili%20Peppers%22)%20%7B%0A%20%20%20%20name%0A%20%20%20%20id%0A%20%20%20%20image%0A%20%20%20%20albums%20%7B%0A%20%20%20%20%20%20name%0A%20%20%20%20%20%20id%0A%20%20%20%20%20%20image%20%0A%20%20%20%20%20%20tracks%20%7B%0A%20%20%20%20%20%20%20%20id%0A%20%20%20%20%20%20%20%20name%0A%20%20%20%20%20%20%20%20preview_url%0A%20%20%20%20%20%20%20%20artists%20%7B%0A%20%20%20%20%20%20%20%20%20%20name%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D%0A",
  },
  webpackDevMiddleware: false,
};

module.exports = nextConfig;
