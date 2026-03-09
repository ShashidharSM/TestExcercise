export const config = {
  runner: "local",
  specs: ["./wdio/specs/**/*.e2e.js"],
  maxInstances: 1,
  capabilities: [
    {
      browserName: "chrome",
      "goog:chromeOptions": {
        args: ["--headless=new", "--window-size=1400,1000"]
      }
    }
  ],
  logLevel: "warn",
  bail: 0,
  baseUrl: "http://127.0.0.1:4567",
  waitforTimeout: 10000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 2,
  services: [
    [
      "static-server",
      {
        port: 4567,
        folders: [
          {
            mount: "/",
            path: "./standalone"
          }
        ]
      }
    ]
  ],
  framework: "mocha",
  reporters: ["spec"],
  mochaOpts: {
    ui: "bdd",
    timeout: 60000
  }
};
