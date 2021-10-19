(function() {
  const btnBookmark = document.querySelector('.btn-bookmark');
  const btnsForModals = document.querySelectorAll('.btn-back-project');

  const modalOverlay = document.querySelector('.modal-overlay');
  const modal = document.querySelector('.modal');
  const modalArticles = document.querySelectorAll('.modal-article');
  const modalClose = document.querySelector('.modal__close');

  const btnsForPledge = document.querySelectorAll('.btn-pledge-continue');
  const congratsCard = document.querySelector('.modal-support-card');
  const btnFinishPledge = document.querySelector('.btn-finish-pledge');

  const statsDollars = document.querySelector('.stats__dollars');
  const statsBackers = document.querySelector('.stats__backers');
  
  const menu = document.querySelector('.menu'); 
  const hamburgerIcon = document.querySelector('.hamburger-icon');
  const hamburgerClose = document.querySelector('.hamburger-close');

  const progressBar = document.querySelector('#progressbar>div');

  let moneyBacked = 30000;
  let totalBackers = 5007;

  var body = document.body,
    html = document.documentElement;

  var heightOfPage = Math.max( body.scrollHeight, body.offsetHeight, 
                       html.clientHeight, html.scrollHeight, html.offsetHeight );


  function openModal() {
    modalOverlay.classList.add('modal-overlay--active');
    modal.classList.add('modal--active');
    const pledgeIndex = this.dataset['id'];

    for (let modalArticle of modalArticles) {
      modalArticle.classList.remove('modal-article--active');
    };

    if (window.scrollY+modal.clientHeight < heightOfPage) {
      modal.style.marginTop = `${window.scrollY}px`;
    } else {
      modal.style.marginTop = `${heightOfPage-modal.clientHeight}px`;
    };

    modalArticles[pledgeIndex].classList.add('modal-article--active');
  };

  function switchModalArticle() {
    const pledgeIndex = this.dataset['id'];

    for (let modalArticle of modalArticles) {
      modalArticle.classList.remove('modal-article--active');
    };

    modalArticles[pledgeIndex].classList.add('modal-article--active');
  };

  function closeModal() {
    modalOverlay.classList.remove('modal-overlay--active');
    modal.classList.remove('modal--active');
    congratsCard.classList.remove('modal-support-card--active');
  };

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  function updateProgressBar(moneyAmount, moneyGoal = 100000) {
    let moneyWeHaveInPercentage = (moneyAmount / moneyGoal).toFixed(2) * 100;
    if (moneyWeHaveInPercentage > 100) moneyWeHaveInPercentage = 100;
    progressBar.style.width = `${moneyWeHaveInPercentage}%`;
  }

  function congratulateUserForPledging() {
    const pledgeIndex = this.parentElement.parentElement.parentElement.dataset['id'];
    const pledgeAmount = Number(this.parentElement.parentElement.parentElement.querySelector('.pledge-amount') ? this.parentElement.parentElement.parentElement.querySelector('.pledge-amount').value : 0 || 0);

    switch (pledgeIndex) {
      case '0': console.log('0000'); break;
      case '1': if (pledgeAmount < 25) return; break;
      case '2': if (pledgeAmount < 75) return;; break;
      case '3': console.log('XXXXX'); break;
    }
    
    moneyBacked += pledgeAmount;
    totalBackers++;

    updateProgressBar(moneyBacked);

    statsDollars.textContent = `$${numberWithCommas(moneyBacked)}`;
    statsBackers.textContent = totalBackers;

    modal.classList.remove('modal--active');
    congratsCard.classList.add('modal-support-card--active');
  };


  function toggleMobileMenu() {
    menu.classList.toggle('menu--active');
  };


  btnBookmark.addEventListener('click', () => {
    btnBookmark.classList.toggle('btn-bookmark--bookmarked');
  });

  modalClose.addEventListener('click', closeModal);

  modalOverlay.addEventListener('click', function(event) {
    if (event.target.classList.contains('modal-overlay')) closeModal();
  });

  for (let btn of btnsForModals) {
    btn.addEventListener('click', openModal);
  };

  for (let modalArticle of modalArticles) {
    modalArticle.addEventListener('click', switchModalArticle);
  };btnsForPledge

  for (let btn of btnsForPledge) {
    btn.addEventListener('click', congratulateUserForPledging);
  };

  btnFinishPledge.addEventListener('click', closeModal);

  hamburgerIcon.addEventListener('click', toggleMobileMenu);
  hamburgerClose.addEventListener('click', toggleMobileMenu);
})();