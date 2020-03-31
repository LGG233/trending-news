# Repository: Trending-News

#### Trending-News is a monorepo -- a single repository under source control for both client and server code.

### What are the benefits of a monorepo?

- **_Leaner process._** Full-stack development often entails both client and server changes at the same time. The result is one pull request instead of two.
- **_Everything in one place._** No need to switch back and forth between multiple respositories.

### What are the dangers of a monorepo?

- **_Unintended code bleeds._** Individual systems must remain independent. Server code should be a standalone folder that could be moved to it's own repository; same for Client code. This becomes especially important and apparent come deployment time.
- **_Increased deployment complexity._** In a continuous delivery pipeline, source control changes typically trigger deployments. In a monorepo, multiple applications are under the same source control repository. This adds manageable complexity to the deployment process.

### Best Practices:

- Client and Server maintain their own `package.json` files.
