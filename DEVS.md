This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First you need to make sure you are using proper environment:

1. Node.js (>=14) and yarn package manager
1. Rustup and Rust nightly toolchain with wasm compilation target

After you cloned the repository also install all requred dependencies:

```bash
yarn
```

## NEAR backend

First, you want to compile contracts and deploy them to testnet:

```bash
yarn test:deploy
```

## Web application

First, run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [NEAR Examples](https://examples.near.org/) - Wondering what you can build with NEAR? Check out these examples for inspiration! You can also view these examples on GitHub.
- [NEAR University Resources](https://www.near.university/resources) - NEAR Resources Reading List. Whether you're a developer coming from web2 or web3 (eg. Ethereum) or a curious traveler wondering what all the fuss is about ... this page should help
- [Rust Language](https://www.rust-lang.org/) - Rust programming language homepage
- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!
