
class FakeLocalStorage implements Storage {
  [key: string]: any;
  [index: number]: string;

  length: number;

  clear(): void {
  }

  getItem(key: string): string | null {
    return null;
  }

  key(index: number): string | null {
    return null;
  }

  removeItem(key: string): void {
  }

  setItem(key: string, data: string): void {
  }

}

class UiController {
  private readonly _isBrowser = typeof window !== 'undefined';
  private _fakeLocalStorage = new FakeLocalStorage();

  get isBrowser() {
    return this._isBrowser;
  }

  get localStorage() {
    return this._isBrowser ? window.localStorage : this._fakeLocalStorage;
  }

  set documentTitle(value: string) {
    if (this._isBrowser) {
      document.title = value;
    }
  }

}

export const ui = new UiController();


