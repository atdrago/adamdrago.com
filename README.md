This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Testing PDF Downloads

The resume PDF download runs the /work page in a headless version of Chromium using Puppeteer. This setup can require some extra configuration (beyond the usual `npm install`) when running on certain systems.

### M1 Apple Architecture

```
Error: spawn Unknown system error -86
```

We need to install the M1 version of chromium, so we can do that through `brew`, and then update Puppeteer globals to point to that installation path:

**Steps:**

1. Open a terminal and run:
   ```
   brew install chromium --no-quarantine
   `which chromium`
   ```
2. Chromium should open. If there is a security warning (I didn't get one), go to `System Preferences` > `Security & Privacy` > `General` and click "Open anyway".
3. Quit Chromium.app
4. To `~/.zshrc` add:
   ```
   export PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
   export PUPPETEER_EXECUTABLE_PATH=`which chromium`
   ```
5. Restart the terminal

**Notes:**

- `86` is the "unknown arch" error ([source](https://github.com/pa11y/pa11y/issues/619#issuecomment-986182745))
- You need to manually install `chromium` and then run it to verify that it opens ([source](https://github.com/puppeteer/puppeteer/issues/6622#issuecomment-787912758))
- If you get an error that Chromium is damaged, you should reinstall chromium using `--no-quarantine` ([source](https://www.reddit.com/r/MacOS/comments/q9d772/homebrew_chromium_is_damaged_and_cant_be_openend/hkh5sxm/?utm_source=reddit&utm_medium=web2x&context=3))
