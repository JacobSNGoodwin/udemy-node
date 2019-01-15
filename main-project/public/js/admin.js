const deleteProduct = (btn) => {
  const prodId = btn.parentNode.querySelector('[name=productId]').value;
  const csrf= btn.parentNode.querySelector('[name=_csrf]').value;

  // will send to current host without absolute URL
  fetch('/admin/product/' + prodId, {
    method: 'DELETE',
    headers: {
      'csrf-token': csrf
    }
  })
  .then(result => {
    console.log(result);
  })
  .catch(err => {
    console.log(err);
  })
};