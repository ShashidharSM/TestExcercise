class Page {
  async open(path = "/index.html") {
    await browser.url(path);
  }
}

export default Page;
