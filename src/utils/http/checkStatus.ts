// import router from '/@/router';

const error = (err: string) => {
  console.log(err);
};
export function checkStatus(status: number, msg: string): void {
  switch (status) {
    case 400:
      error(`${msg}`);
      break;
    // 401: Not logged in
    // Jump to the login page if not logged in, and carry the path of the current page
    // Return to the current page after successful login. This step needs to be operated on the login page.
    case 401:
      error('sys.api.errMsg401');
      // userStore.setToken(undefined);
      // userStore.setSessionTimeout(true);
      break;
    case 403:
      error('sys.api.errMsg403');
      break;
    // 404请求不存在
    case 404:
      error('sys.api.errMsg404');
      break;
    case 405:
      error('sys.api.errMsg405');
      break;
    case 408:
      error('sys.api.errMsg408');
      break;
    case 500:
      error('sys.api.errMsg500');
      break;
    case 501:
      error('sys.api.errMsg501');
      break;
    case 502:
      error('sys.api.errMsg502');
      break;
    case 503:
      error('sys.api.errMsg503');
      break;
    case 504:
      error('sys.api.errMsg504');
      break;
    case 505:
      error('sys.api.errMsg505');
      break;
    default:
  }
}
