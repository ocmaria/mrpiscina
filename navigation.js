(() => {
  const navigation = document.getElementById('main-nav');
  if (!navigation) return;
  const groups = [...navigation.querySelectorAll('.nav-group')];
  const toggle = document.querySelector('.menu-toggle');
  const closeGroups = () => groups.forEach(group => { group.open = false; });
  groups.forEach(group => group.addEventListener('toggle', () => {
    if (group.open) groups.forEach(other => { if (other !== group) other.open = false; });
  }));
  document.addEventListener('click', event => {
    if (!navigation.contains(event.target)) closeGroups();
  });
  document.addEventListener('keydown', event => {
    if (event.key !== 'Escape') return;
    const opened = groups.find(group => group.open);
    if (opened) {
      opened.open = false;
      opened.querySelector('summary').focus();
      event.preventDefault();
    } else if (navigation.classList.contains('is-open') && toggle) {
      navigation.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.focus();
      event.preventDefault();
    }
  });
  navigation.querySelectorAll('a').forEach(link => {
    if (!link.hash && link.pathname === location.pathname) link.setAttribute('aria-current', 'page');
    link.addEventListener('click', closeGroups);
  });
})();