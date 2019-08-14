import { GerenciadorUiPage } from './app.po';

describe('gerenciador-ui App', () => {
  let page: GerenciadorUiPage;

  beforeEach(() => {
    page = new GerenciadorUiPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
