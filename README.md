# zoning-guide-detroit

Let's build a website that helps explain Detroit's zoning code.

We started this project on the 2018-09-10 civic tech hackathon at WeWork. Our hackathon slide deck can be found [here](https://docs.google.com/presentation/d/1pZMpCYmuuGy8EJjk9DJUdPwjpkRc9JUTEUQBDbnh7XU/edit#slide=id.g6099c04ea9_2_0)!

## Getting started

1. Install the Gatsby CLI: `npm install -g gatsby-cli`

2. Clone this repository: `git@github.com:Detroit-Urban-Tech-Meetup/zoning-guide-detroit.git`

3. Enter the directory: `cd zoning-guide-detroit`

4. Next, you `yarn` or `npm install`

5. Replace `<your API key>` with [your Airtable API Key](https://support.airtable.com/hc/en-us/articles/219046777-How-do-I-get-my-API-key-) in `example.env` and rename to `.env.development`

6. Start developing with `gatsby develop` - Gatsby will access the Airtable, build nodes, etc and will start serving at `localhost:8000`. You can access the GraphiQL Explorer at `localhost:8000/___graphql`: this is the internal store of all the data that Gatsby can use to build the site.

### Common development errors
