import { AppPage } from './app.po';

describe('Golf Pool App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display header', () => {
    page.navigateTo();
    expect(page.getHeaderText()).toEqual('Welcome to golf-pool!');
  });
});
