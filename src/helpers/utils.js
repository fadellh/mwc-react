/* eslint-disable no-nested-ternary */
export const displayDate = (timestamp) => {
  const date = new Date(timestamp);

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June', 'July',
    'August', 'September', 'October', 'November', 'December'
  ];

  const day = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear();

  // return day + ' ' + monthNames[monthIndex] + ' ' + year;
  return `${monthNames[monthIndex]} ${day}, ${year}`;
};

export const displayMoneyIdr = (n) => {
  // change to integer
  n = parseInt(n, 10);

  //currency indonesia
  const format = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  });
  
  return format.format(n);
};

export const displayMoney = (n) => {
  // Convert to integer
  n = parseInt(n, 10);

  // Currency formatting for US Dollars
  const format = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2, // Typically you want 2 decimal places for USD
  });

  return format.format(n);
};

export const getCoordByAddress = (addressArray) => {
  let location = {};
  if (Array.isArray(addressArray?.results) && addressArray?.results.length > 0) {
    location = addressArray?.results[0]?.geometry?.location || {};
  }
  return location;
}

export const calculateTotal = (arr) => {
  if (!arr || arr?.length === 0) return 0;

  const total = arr.reduce((acc, val) => acc + val, 0);

  return total.toFixed(2);
};

export const displayActionMessage = (msg, status = 'info') => {
  const div = document.createElement('div');
  const span = document.createElement('span');

  div.className = `toast ${status === 'info'
    ? 'toast-info'
    : status === 'success'
      ? 'toast-success'
      : 'toast-error'
    // eslint-disable-next-line indent
    }`;
  span.className = 'toast-msg';
  span.textContent = msg;
  div.appendChild(span);


  if (document.querySelector('.toast')) {
    document.body.removeChild(document.querySelector('.toast'));
    document.body.appendChild(div);
  } else {
    document.body.appendChild(div);
  }

  setTimeout(() => {
    try {
      document.body.removeChild(div);
    } catch (e) {
      console.log(e);
    }
  }, 3000);
};
