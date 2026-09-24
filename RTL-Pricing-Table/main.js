const prices = {
  basic: 39,
  pro: 99,
  business: 249
};

const digits = new Intl.NumberFormat('ar-EG', { maximumFractionDigits: 0 });
const billing = document.getElementById('billing');

function render() {
  const yearly = billing.querySelector('input:checked').value === 'yearly';

  document.querySelectorAll('.plan').forEach((plan) => {
    const monthly = prices[plan.dataset.plan];
    const total = yearly ? monthly * 10 : monthly;
    plan.querySelector('.amount').textContent = digits.format(total);
    plan.querySelector('.period').textContent = yearly ? '/ سنويًا' : '/ شهريًا';
    plan.querySelector('.plan-note').textContent = yearly
      ? 'يعادل ' + digits.format(Math.round(total / 12)) + ' ر.س. شهريًا'
      : '';
  });
}

billing.addEventListener('change', render);
render();
