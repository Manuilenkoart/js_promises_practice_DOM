'use strict';

const firstResolve = new Promise((resolve) => {
  document.addEventListener('click', () => {
    resolve('First promise was resolved');
  });
});

const firstReject = new Promise((resolve, reject) => {
  setTimeout(() => reject(new Error('First promise was rejected')), 3000);
});

Promise.race([firstResolve, firstReject])
  .then((data) => promeseHandler(data, 'success'))
  .catch((err) => promeseHandler(err, 'error'));

const secondPromise = new Promise((resolve) => {
  resolve('Second promise was resolved');
});

const thirdPromise = new Promise((resolve) => {
  resolve('Third promise was resolved');
});

function promeseHandler(data, classStatus) {
  const div = document.createElement('div');

  div.setAttribute('data-qa', 'notification');
  div.classList.add(classStatus);
  div.textContent = data;

  document.body.appendChild(div);
}

let leftClickState = false;
let rightClickState = false;

document.addEventListener('mouseup', (e) => {
  if (e.button === 0) {
    leftClickState = true;
  }

  if (e.button === 2) {
    rightClickState = true;
  }

  if (leftClickState && rightClickState) {
    thirdPromise.then((data) => promeseHandler(data, 'success'));
    leftClickState = false;
    rightClickState = false;
  }

  secondPromise.then((data) => promeseHandler(data, 'success'));
});
