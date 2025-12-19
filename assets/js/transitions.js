(function () {
  function initPageTransitions() {
    // Tek sayfa senaryosu için Barba.js kullanılmıyor.
    // Çoklu sayfa eklenirse burada Barba transition'ları kurulabilir.
  }

  document.addEventListener('DOMContentLoaded', initPageTransitions);

  window.Transitions = {
    initPageTransitions,
  };
})();
