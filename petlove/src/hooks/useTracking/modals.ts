export function modals() {
  const LOCAL_STORAGE_KEY = '@petlove:current-modal';
  const triggerEvent = (action: 'open' | 'close', name: string) => {
    window.dataLayer.push({
      event: 'modal',
      action,
      name,
    });
  };

  const checkModalChange = () => {
    const searchParams = new URLSearchParams(window.location.search);
    const newModal = searchParams.get('modal') || '';

    if (newModal) {
      window.localStorage.setItem(LOCAL_STORAGE_KEY, newModal);
      triggerEvent('open', newModal);
      return;
    }

    const currentModal = window.localStorage.getItem(LOCAL_STORAGE_KEY);

    if (currentModal) {
      triggerEvent('close', currentModal);
    }
  };

  checkModalChange();

  window.addEventListener('popstate', checkModalChange);
  window.addEventListener('pushState', checkModalChange);
  window.addEventListener('replaceState', checkModalChange);

  const originalPushState = history.pushState;
  const originalReplaceState = history.replaceState;

  history.pushState = function (
    data: Record<string, unknown>,
    unused: string,
    url?: string | URL | null,
  ) {
    const result = originalPushState.apply(this, [data, unused, url]);
    window.dispatchEvent(new Event('pushState'));
    return result;
  };

  history.replaceState = function (
    data: Record<string, unknown>,
    unused: string,
    url?: string | URL | null,
  ) {
    const result = originalReplaceState.apply(this, [data, unused, url]);
    window.dispatchEvent(new Event('replaceState'));
    return result;
  };
}
